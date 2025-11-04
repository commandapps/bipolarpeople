import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch journal entries
export async function GET(request: NextRequest) {
  try {
    // Use the simple getServerSession pattern that works in production
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Convert user.id to integer - database expects INTEGER
    const userId = parseInt(session.user.id, 10)
    
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = 'SELECT * FROM journal_entries WHERE user_id = $1'
    const params: any[] = [userId]

    if (category && category !== 'all') {
      params.push(category)
      query += ` AND category = $${params.length}`
    }

    if (tag && tag !== 'all') {
      params.push(tag)
      query += ` AND $${params.length} = ANY(tags)`
    }

    query += ` ORDER BY entry_date DESC, entry_time DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ entries: rows })

  } catch (error) {
    console.error('Journal fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journal entries' },
      { status: 500 }
    )
  }
}

// POST - Create journal entry
export async function POST(request: NextRequest) {
  try {
    // Use the simple getServerSession pattern that works in production
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.content || !body.entry_date) {
      console.error('Validation failed - missing fields:', {
        hasContent: !!body.content,
        hasEntryDate: !!body.entry_date
      })
      return NextResponse.json(
        { error: 'Missing required fields: content, entry_date' },
        { status: 400 }
      )
    }

    // Validate mood_score if provided
    if (body.mood_score !== null && body.mood_score !== undefined) {
      if (body.mood_score < -5 || body.mood_score > 5) {
        return NextResponse.json(
          { error: 'mood_score must be between -5 and 5' },
          { status: 400 }
        )
      }
    }

    // Validate episode_severity if provided
    if (body.episode_severity !== null && body.episode_severity !== undefined) {
      if (body.episode_severity < 1 || body.episode_severity > 10) {
        return NextResponse.json(
          { error: 'episode_severity must be between 1 and 10' },
          { status: 400 }
        )
      }
    }

    // Convert user.id to integer - database expects INTEGER, not VARCHAR
    // users.id is INTEGER (SERIAL), so we must convert NextAuth's string ID
    const userId = parseInt(session.user.id, 10)
    
    if (isNaN(userId)) {
      console.error('Invalid user ID:', session.user.id)
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }
    
    console.log('Inserting journal entry with user_id:', userId, 'type:', typeof userId)
    
    // Prepare values - convert empty strings to null for optional fields
    const values = [
      userId,
      body.title?.trim() || null,
      body.content.trim(),
      body.mood_at_time?.trim() || null,
      body.mood_score !== undefined && body.mood_score !== null ? body.mood_score : null,
      body.location?.trim() || null,
      body.weather?.trim() || null,
      Array.isArray(body.tags) ? body.tags : [],
      body.category?.trim() || 'daily',
      body.is_private ?? true,
      body.is_favorite || false,
      body.episode_type?.trim() || null,
      body.episode_severity !== undefined && body.episode_severity !== null ? body.episode_severity : null,
      body.entry_date,
      body.entry_time || new Date().toTimeString().split(' ')[0]
    ]
    
    console.log('Insert values:', values.map((v, i) => `$${i+1}: ${typeof v} = ${JSON.stringify(v).substring(0, 50)}`).join('\n'))
    
    const result = await sql.query(
      `INSERT INTO journal_entries (
        user_id, title, content, mood_at_time, mood_score, location, weather,
        tags, category, is_private, is_favorite, episode_type, episode_severity,
        entry_date, entry_time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      values
    )
    
    console.log('✅ Insert successful! Entry ID:', result.rows[0]?.id)

    return NextResponse.json(
      { entry: result.rows[0], message: 'Journal entry created successfully' },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Journal creation error:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      detail: error?.detail,
      constraint: error?.constraint,
      stack: error?.stack?.split('\n').slice(0, 3).join('\n')
    })
    // Return more detailed error in development
    const errorMessage = error?.message || 'Unknown error'
    const errorDetail = error?.detail || error?.constraint || null
    
    console.error('Full error object:', JSON.stringify(error, null, 2))
    
    return NextResponse.json(
      { 
        error: 'Failed to create journal entry',
        message: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error',
        detail: process.env.NODE_ENV === 'development' ? errorDetail : undefined,
        code: error?.code
      },
      { status: 500 }
    )
  }
}

// PUT - Update journal entry
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    const body = await request.json()

    // Build update query dynamically based on provided fields
    const updates: string[] = []
    const values: any[] = [session.user.id, id]
    let paramIndex = 3

    // Map of field names to their values
    const fieldMap: Record<string, any> = {
      title: body.title,
      content: body.content,
      mood_at_time: body.mood_at_time,
      mood_score: body.mood_score,
      location: body.location,
      weather: body.weather,
      tags: body.tags,
      category: body.category,
      is_private: body.is_private,
      is_favorite: body.is_favorite,
      episode_type: body.episode_type,
      episode_severity: body.episode_severity,
      entry_date: body.entry_date,
      entry_time: body.entry_time
    }

    // Add fields to update query
    Object.entries(fieldMap).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = $${paramIndex}`)
        values.push(value)
        paramIndex++
      }
    })

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    // Always update the updated_at timestamp
    updates.push('updated_at = NOW()')

    const result = await sql.query(
      `UPDATE journal_entries 
       SET ${updates.join(', ')}
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
      values
    )

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Entry not found or unauthorized' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      entry: result.rows[0],
      message: 'Journal entry updated successfully'
    })

  } catch (error) {
    console.error('Journal update error:', error)
    return NextResponse.json(
      { error: 'Failed to update journal entry' },
      { status: 500 }
    )
  }
}

// DELETE - Delete journal entry
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    const result = await sql.query(
      'DELETE FROM journal_entries WHERE user_id = $1 AND id = $2 RETURNING id',
      [session.user.id, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Entry not found or unauthorized' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Journal entry deleted successfully',
      id: result.rows[0].id
    })

  } catch (error) {
    console.error('Journal deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete journal entry' },
      { status: 500 }
    )
  }
}