import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendPasswordResetEmail } from '@/lib/email'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.getUserByEmail(email)
    if (!user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({
        message: 'If an account with that email exists, you will receive a password reset link.'
      })
    }

    // Generate reset token
    const token = randomBytes(32).toString('hex')

    // Store password reset token
    await db.createPasswordResetToken(user.id, token)

    // Send password reset email
    await sendPasswordResetEmail(email, token, user.username || user.email)

    return NextResponse.json({
      message: 'If an account with that email exists, you will receive a password reset link.'
    })

  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'Password reset request failed. Please try again.' },
      { status: 500 }
    )
  }
}
