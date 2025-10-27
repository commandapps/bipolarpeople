import { NextRequest, NextResponse } from 'next/server'
import { createUser, emailExists } from '@/lib/db'
import { createVerificationToken } from '@/lib/db'
import { sendVerificationEmail } from '@/lib/email'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword, displayName } = await request.json()

    // Validation
    if (!name || !email || !password || !confirmPassword) {
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

    // Check if email already exists
    if (await emailExists(email)) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // Create user
    const user = await createUser({
      name,
      email,
      password,
      displayName: displayName || null
    })

    // Generate verification token
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await createVerificationToken({
      identifier: email,
      token,
      expires
    })

    // Send verification email
    await sendVerificationEmail(email, token, name)

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
      userId: user.id
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
