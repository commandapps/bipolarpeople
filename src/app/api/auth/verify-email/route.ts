import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { error: 'Verification token is required' },
      { status: 400 }
    )
  }

  try {
    const verificationToken = await db.getVerificationToken(token)
    
    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Mark user as verified
    await db.updateUser(verificationToken.user_id, { email_verified: true })
    
    // Delete the verification token
    await db.deleteVerificationToken(token)

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    })
  } catch (error: unknown) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}
