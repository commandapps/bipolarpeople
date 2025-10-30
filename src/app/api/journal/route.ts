import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch journal entries
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const favoriteOnly = searchParams.get('favoriteOnly') === 'true'

    let query = 'SELECT * FROM journal_entries WHERE user_id = $1'
    const params: any[] = [session.user.id]

    if (category) {
      params.push(category)
      query += ` AND category = $${params.length}`
    }

    if (tag) {
      params.push(tag)
      query += ` AND $${params.length} = ANY(tags)`
    }

    if (startDate) {
      params.push(startDate)
      query += ` AND entry_date >= $${params.length}`
    }

    if (endDate) {
      params.push(endDate)
      query += ` AND entry_date <= $${params.length}`
    }

    if (favoriteOnly) {
      query += ' AND is_favorite = true'
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
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.content || !body.entry_date) {
      return NextResponse.json(
        { error: 'Missing required fields: content, entry_date' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO journal_entries (
        user_id, title, content, mood_at_time, mood_score, location, weather,
        tags, category, is_private, is_favorite, episode_type, episode_severity,
        entry_date, entry_time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        session.user.id,
        body.title || null,
        body.content,
        body.mood_at_time || null,
        body.mood_score || null,
        body.location || null,
        body.weather || null,
        body.tags || [],
        body.category || 'daily',
        body.is_private ?? true,
        body.is_favorite || false,
        body.episode_type || null,
        body.episode_severity || null,
        body.entry_date,
        body.entry_time || new Date().toTimeString().split(' ')[0]
      ]
    )

    return NextResponse.json(
      { entry: result.rows[0], message: 'Journal entry created' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Journal creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create journal entry' },
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

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    // Build update query dynamically
    const updateFields: string[] = []
    const values: any[] = [session.user.id, id]
    let paramIndex = 3

    const allowedFields = [
      'title', 'content', 'mood_at_time', 'mood_score', 'location', 'weather',
      'tags', 'category', 'is_private', 'is_favorite', 'episode_type', 'episode_severity'
    ]

    Object.entries(updates).forEach(([key, value]) => {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = $${paramIndex}`)
        values.push(value)
        paramIndex++
      }
    })

    if (updateFields.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    const result = await sql.query(
      `UPDATE journal_entries 
       SET ${updateFields.join(', ')}
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
      values
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json({ entry: result.rows[0], message: 'Entry updated' })

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
      'DELETE FROM journal_entries WHERE user_id = $1 AND id = $2',
      [session.user.id, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Entry deleted' })

  } catch (error) {
    console.error('Journal deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete journal entry' },
      { status: 500 }
    )
  }
}