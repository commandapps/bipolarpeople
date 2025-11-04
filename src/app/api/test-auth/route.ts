import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    console.log('=== TEST AUTH ===')
    console.log('authOptions.secret exists:', !!authOptions.secret)
    console.log('authOptions.secret length:', authOptions.secret?.length)
    console.log('NEXTAUTH_SECRET env:', !!process.env.NEXTAUTH_SECRET)
    console.log('AUTH_SECRET env:', !!process.env.AUTH_SECRET)
    
    const session = await getServerSession(authOptions)
    
    console.log('getServerSession result:', session ? 'FOUND' : 'NOT FOUND')
    if (session) {
      console.log('Session user:', session.user)
    }
    
    return NextResponse.json({
      method: 'getServerSession(authOptions)',
      sessionFound: !!session,
      userId: session?.user?.id || null,
      email: session?.user?.email || null,
      authOptionsSecretExists: !!authOptions.secret,
      authOptionsSecretLength: authOptions.secret?.length || 0,
      envNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      envAuthSecret: !!process.env.AUTH_SECRET
    })
  } catch (error: any) {
    console.error('Test auth error:', error)
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}

