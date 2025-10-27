import { NextRequest, NextResponse } from 'next/server'
import { getVerificationToken, deleteVerificationToken, updateUser, getUserByEmail } from '@/lib/db'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Get verification token
    const verificationToken = await getVerificationToken(token)
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Get user by email
    const user = await getUserByEmail(verificationToken.identifier)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user email verification status
    await updateUser(user.id, {
      emailVerified: new Date()
    })

    // Delete verification token
    await deleteVerificationToken(token)

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name || 'there')

    return NextResponse.json({
      message: 'Email verified successfully! You can now log in to your account.',
      verified: true
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Email verification failed. Please try again.' },
      { status: 500 }
    )
  }
}
