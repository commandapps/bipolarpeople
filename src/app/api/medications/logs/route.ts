import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch medication logs
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const medicationId = searchParams.get('medicationId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '50')
    const takenOnly = searchParams.get('takenOnly') === 'true'

    let query = `
      SELECT ml.*, m.medication_name, m.dosage 
      FROM medication_logs ml
      JOIN medications m ON ml.medication_id = m.id
      WHERE ml.user_id = $1
    `
    const params: any[] = [session.user.id]

    if (medicationId) {
      params.push(medicationId)
      query += ` AND ml.medication_id = $${params.length}`
    }

    if (startDate) {
      params.push(startDate)
      query += ` AND DATE(ml.taken_at) >= $${params.length}`
    }

    if (endDate) {
      params.push(endDate)
      query += ` AND DATE(ml.taken_at) <= $${params.length}`
    }

    if (takenOnly) {
      query += ' AND ml.taken = true'
    }

    query += ` ORDER BY ml.taken_at DESC LIMIT $${params.length + 1}`
    params.push(limit)

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ logs: rows })

  } catch (error) {
    console.error('Medication logs fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medication logs' },
      { status: 500 }
    )
  }
}

// POST - Log medication taken
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.medication_id) {
      return NextResponse.json(
        { error: 'Missing required field: medication_id' },
        { status: 400 }
      )
    }

    // Verify medication belongs to user
    const medicationCheck = await sql.query(
      'SELECT id FROM medications WHERE id = $1 AND user_id = $2',
      [body.medication_id, session.user.id]
    )

    if (medicationCheck.rowCount === 0) {
      return NextResponse.json(
        { error: 'Medication not found or does not belong to user' },
        { status: 404 }
      )
    }

    const result = await sql.query(
      `INSERT INTO medication_logs (
        medication_id, user_id, taken_at, dosage_taken, taken,
        notes, side_effects_experienced, mood_before, mood_after
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        body.medication_id,
        session.user.id,
        body.taken_at || new Date().toISOString(),
        body.dosage_taken || null,
        body.taken ?? true,
        body.notes || null,
        body.side_effects_experienced || null,
        body.mood_before || null,
        body.mood_after || null
      ]
    )

    return NextResponse.json(
      { log: result.rows[0], message: 'Medication logged' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Medication log error:', error)
    return NextResponse.json(
      { error: 'Failed to log medication' },
      { status: 500 }
    )
  }
}

// PUT - Update medication log
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing log id' }, { status: 400 })
    }

    // Build update query dynamically
    const updateFields: string[] = []
    const values: any[] = [session.user.id, id]
    let paramIndex = 3

    const allowedFields = [
      'taken_at', 'dosage_taken', 'taken', 'notes',
      'side_effects_experienced', 'mood_before', 'mood_after'
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
      `UPDATE medication_logs 
       SET ${updateFields.join(', ')}
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
      values
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Log not found' }, { status: 404 })
    }

    return NextResponse.json({ log: result.rows[0], message: 'Log updated' })

  } catch (error) {
    console.error('Medication log update error:', error)
    return NextResponse.json(
      { error: 'Failed to update medication log' },
      { status: 500 }
    )
  }
}

// DELETE - Delete medication log
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing log id' }, { status: 400 })
    }

    const result = await sql.query(
      'DELETE FROM medication_logs WHERE user_id = $1 AND id = $2',
      [session.user.id, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Log not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Log deleted' })

  } catch (error) {
    console.error('Medication log deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete medication log' },
      { status: 500 }
    )
  }
}