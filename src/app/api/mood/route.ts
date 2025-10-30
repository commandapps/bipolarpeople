import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch mood entries
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user ID from email
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const userId = userResult.rows[0].id

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '30')

    const { rows } = await sql`
      SELECT * FROM mood_entries 
      WHERE user_id = ${userId}
      ORDER BY entry_date DESC, created_at DESC 
      LIMIT ${limit}
    `

    return NextResponse.json({ entries: rows })

  } catch (error) {
    console.error('Mood fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mood entries' },
      { status: 500 }
    )
  }
}

// POST - Create mood entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user ID from email
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const userId = userResult.rows[0].id

    const body = await request.json()
    
    // Validate required fields
    if (body.mood === undefined || body.entry_date === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: mood, entry_date' },
        { status: 400 }
      )
    }

    // Validate ranges
    if (body.mood < 1 || body.mood > 7) {
      return NextResponse.json(
        { error: 'mood must be between 1 and 7' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO mood_entries (
        user_id, mood_score, energy_level, anxiety_level,
        sleep_hours, activities, symptoms, notes, entry_date
      ) VALUES (
        ${userId},
        ${body.mood},
        ${body.energy || null},
        ${body.anxiety || null},
        ${body.sleep || null},
        ${JSON.stringify(body.activities || [])},
        ${JSON.stringify(body.symptoms || [])},
        ${body.notes || null},
        ${body.entry_date}
      )
      RETURNING *
    `

    return NextResponse.json(
      { entry: result.rows[0], message: 'Mood entry created' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Mood creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create mood entry' },
      { status: 500 }
    )
  }
}

// DELETE - Delete mood entry
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user ID from email
    const userResult = await sql`
      SELECT id FROM users WHERE email = ${session.user.email} LIMIT 1
    `
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const userId = userResult.rows[0].id

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing entry id' }, { status: 400 })
    }

    const result = await sql`
      DELETE FROM mood_entries 
      WHERE user_id = ${userId} AND id = ${id}
    `

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Entry deleted' })

  } catch (error) {
    console.error('Mood deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete mood entry' },
      { status: 500 }
    )
  }
}