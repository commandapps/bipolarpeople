import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendPasswordChangedEmail } from '@/lib/email'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { token, password, confirmPassword } = await request.json()

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Get reset token
    const resetToken = await db.getPasswordResetToken(token)
    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Get user by ID from token
    const user = await db.getUserById(resetToken.user_id)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password
    await db.updateUserPassword(user.id, hashedPassword)

    // Delete reset token
    await db.deletePasswordResetToken(token)

    // Send password changed email
    await sendPasswordChangedEmail(user.email, user.username || user.email)

    return NextResponse.json({
      message: 'Password reset successfully! You can now log in with your new password.'
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Password reset failed. Please try again.' },
      { status: 500 }
    )
  }
}
