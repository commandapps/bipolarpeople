import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch mood entries
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse user ID as integer (session.user.id is a string)
    const userId = parseInt(session.user.id as string, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

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
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse user ID as integer (session.user.id is a string)
    const userId = parseInt(session.user.id as string, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

    const body = await request.json()
    
    // Validate required fields
    if (body.mood_score === undefined || body.entry_date === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: mood_score, entry_date' },
        { status: 400 }
      )
    }

    // Validate ranges (mood_score is -5 to 5)
    if (body.mood_score < -5 || body.mood_score > 5) {
      return NextResponse.json(
        { error: 'mood_score must be between -5 and 5' },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO mood_entries (
        user_id, mood_score, energy_level, anxiety_level,
        sleep_hours, activities, symptoms, notes, entry_date
      ) VALUES (
        ${userId},
        ${body.mood_score},
        ${body.energy_level || null},
        ${body.anxiety_level || null},
        ${body.sleep_hours || null},
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
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse user ID as integer (session.user.id is a string)
    const userId = parseInt(session.user.id as string, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
    }

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