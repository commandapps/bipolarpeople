import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { sql } from '@vercel/postgres'

// GET - Fetch episode plans
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const episodeType = searchParams.get('type')
    const activeOnly = searchParams.get('activeOnly') === 'true'

    let query = 'SELECT * FROM episode_plans WHERE user_id = $1'
    const params: any[] = [session.user.id]

    if (episodeType) {
      params.push(episodeType)
      query += ` AND episode_type = $${params.length}`
    }

    if (activeOnly) {
      query += ' AND is_active = true'
    }

    query += ' ORDER BY created_at DESC'

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ plans: rows })

  } catch (error) {
    console.error('Episode plans fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch episode plans' },
      { status: 500 }
    )
  }
}

// POST - Create episode plan
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    if (!body.episode_type || !body.plan_name) {
      return NextResponse.json(
        { error: 'Missing required fields: episode_type, plan_name' },
        { status: 400 }
      )
    }

    // Validate episode type
    const validTypes = ['manic', 'depressive', 'mixed', 'maintenance']
    if (!validTypes.includes(body.episode_type)) {
      return NextResponse.json(
        { error: 'Invalid episode_type. Must be: manic, depressive, mixed, or maintenance' },
        { status: 400 }
      )
    }

    const result = await sql.query(
      `INSERT INTO episode_plans (
        user_id, episode_type, plan_name, warning_signs, triggers,
        coping_strategies, helpful_activities, things_to_avoid,
        emergency_contacts, support_people, therapy_plan, medication_plan,
        current_medications, emergency_medications, therapist_name, therapist_phone,
        psychiatrist_name, psychiatrist_phone, hospital_preference,
        additional_notes, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *`,
      [
        session.user.id,
        body.episode_type,
        body.plan_name,
        body.warning_signs || [],
        body.triggers || [],
        body.coping_strategies || [],
        body.helpful_activities || [],
        body.things_to_avoid || [],
        body.emergency_contacts || [],
        body.support_people || [],
        body.therapy_plan || null,
        body.medication_plan || null,
        body.current_medications || [],
        body.emergency_medications || null,
        body.therapist_name || null,
        body.therapist_phone || null,
        body.psychiatrist_name || null,
        body.psychiatrist_phone || null,
        body.hospital_preference || null,
        body.additional_notes || null,
        body.is_active ?? true
      ]
    )

    return NextResponse.json(
      { plan: result.rows[0], message: 'Episode plan created' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Episode plan creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create episode plan' },
      { status: 500 }
    )
  }
}

// PUT - Update episode plan
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing plan id' }, { status: 400 })
    }

    // Build update query dynamically
    const updateFields: string[] = []
    const values: any[] = [session.user.id, id]
    let paramIndex = 3

    const allowedFields = [
      'episode_type', 'plan_name', 'warning_signs', 'triggers',
      'coping_strategies', 'helpful_activities', 'things_to_avoid',
      'emergency_contacts', 'support_people', 'therapy_plan', 'medication_plan',
      'current_medications', 'emergency_medications', 'therapist_name', 'therapist_phone',
      'psychiatrist_name', 'psychiatrist_phone', 'hospital_preference',
      'additional_notes', 'last_reviewed_date', 'is_active'
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
      `UPDATE episode_plans 
       SET ${updateFields.join(', ')}
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
      values
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json({ plan: result.rows[0], message: 'Plan updated' })

  } catch (error) {
    console.error('Episode plan update error:', error)
    return NextResponse.json(
      { error: 'Failed to update episode plan' },
      { status: 500 }
    )
  }
}

// DELETE - Delete episode plan
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing plan id' }, { status: 400 })
    }

    const result = await sql.query(
      'DELETE FROM episode_plans WHERE user_id = $1 AND id = $2',
      [session.user.id, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Plan deleted' })

  } catch (error) {
    console.error('Episode plan deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete episode plan' },
      { status: 500 }
    )
  }
}