import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, createPasswordResetToken } from '@/lib/db'
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
    const user = await getUserByEmail(email)
    if (!user) {
      // Return success even if user doesn't exist (security best practice)
      return NextResponse.json({
        message: 'If an account with that email exists, you will receive a password reset link.'
      })
    }

    // Generate reset token
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Create password reset token
    await createPasswordResetToken({
      email,
      token,
      expires
    })

    // Send password reset email
    await sendPasswordResetEmail(email, token, user.name || 'there')

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
