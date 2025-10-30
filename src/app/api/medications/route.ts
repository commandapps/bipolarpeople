import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch medications
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('activeOnly') === 'true'

    let query = 'SELECT * FROM medications WHERE user_id = $1'
    if (activeOnly) {
      query += ' AND active = true'
    }
    query += ' ORDER BY created_at DESC'

    const { rows } = await sql.query(query, [session.user.id])

    return NextResponse.json({ medications: rows })

  } catch (error) {
    console.error('Medication fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch medications' },
      { status: 500 }
    )
  }
}

// POST - Add medication
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.medication_name) {
      return NextResponse.json(
        { error: 'Missing required field: medication_name' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO medications (
        user_id, medication_name, dosage, dosage_unit, frequency, time_of_day,
        started_date, active, prescribed_for, prescriber_name, pharmacy, notes, side_effects
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        session.user.id,
        body.medication_name,
        body.dosage || null,
        body.dosage_unit || null,
        body.frequency || null,
        body.time_of_day || [],
        body.started_date || new Date().toISOString().split('T')[0],
        body.active ?? true,
        body.prescribed_for || null,
        body.prescriber_name || null,
        body.pharmacy || null,
        body.notes || null,
        body.side_effects || null
      ]
    )

    return NextResponse.json(
      { medication: result.rows[0], message: 'Medication added' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Medication creation error:', error)
    return NextResponse.json(
      { error: 'Failed to add medication' },
      { status: 500 }
    )
  }
}

// PUT - Update medication
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing medication id' }, { status: 400 })
    }

    // Build update query dynamically
    const updateFields: string[] = []
    const values: any[] = [session.user.id, id]
    let paramIndex = 3

    const allowedFields = [
      'medication_name', 'dosage', 'dosage_unit', 'frequency', 'time_of_day',
      'ended_date', 'active', 'prescribed_for', 'prescriber_name', 'pharmacy',
      'notes', 'side_effects'
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
      `UPDATE medications 
       SET ${updateFields.join(', ')}
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
      values
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Medication not found' }, { status: 404 })
    }

    return NextResponse.json({ medication: result.rows[0], message: 'Medication updated' })

  } catch (error) {
    console.error('Medication update error:', error)
    return NextResponse.json(
      { error: 'Failed to update medication' },
      { status: 500 }
    )
  }
}

// DELETE - Delete medication
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing medication id' }, { status: 400 })
    }

    const result = await sql.query(
      'DELETE FROM medications WHERE user_id = $1 AND id = $2',
      [session.user.id, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Medication not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Medication deleted' })

  } catch (error) {
    console.error('Medication deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete medication' },
      { status: 500 }
    )
  }
}