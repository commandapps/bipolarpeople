import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { validateSSORequest, generateSSOUrl, createDiscourseUser } from '@/lib/discourse-sso'

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      // Redirect to login with return URL
      const returnUrl = request.url
      return NextResponse.redirect(new URL(`/login?returnUrl=${encodeURIComponent(returnUrl)}`, request.url))
    }

    // Get SSO parameters from Discourse
    const { searchParams } = new URL(request.url)
    const sso = searchParams.get('sso')
    const sig = searchParams.get('sig')
    const returnUrl = searchParams.get('return_sso_url')

    if (!sso || !sig) {
      return NextResponse.json(
        { error: 'Missing SSO parameters' },
        { status: 400 }
      )
    }

    // Validate SSO request
    const secret = process.env.DISCOURSE_SSO_SECRET
    if (!secret) {
      console.error('DISCOURSE_SSO_SECRET not configured')
      return NextResponse.json(
        { error: 'SSO not configured' },
        { status: 500 }
      )
    }

    const validatedPayload = validateSSORequest(sso, sig, secret)
    if (!validatedPayload) {
      return NextResponse.json(
        { error: 'Invalid SSO signature' },
        { status: 400 }
      )
    }

    // Create Discourse user object
    const discourseUser = createDiscourseUser({
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    })

    // Generate SSO URL for Discourse
    const discourseUrl = process.env.DISCOURSE_URL || 'https://bipolarpeople.discourse.group'
    const ssoUrl = generateSSOUrl(discourseUrl, discourseUser, returnUrl || undefined)

    // Redirect to Discourse with SSO
    return NextResponse.redirect(ssoUrl)

  } catch (error) {
    console.error('Discourse SSO error:', error)
    return NextResponse.json(
      { error: 'SSO authentication failed' },
      { status: 500 }
    )
  }
}
