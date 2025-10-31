// Debug endpoint to check session structure
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionFromCookie } from '@/lib/session'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    
    // Try custom helper (uses getToken from next-auth/jwt)
    const customSession = await getSessionFromCookie(request)
    
    // Try getServerSession fallback
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ')
    const req = {
      headers: {
        get: (name: string) => {
          if (name.toLowerCase() === 'cookie') return cookieHeader
          return request.headers.get(name) || undefined
        },
        cookie: cookieHeader
      }
    } as any
    const res = {
      getHeader: () => undefined,
      setHeader: () => {},
      removeHeader: () => {},
    } as any
    const nextAuthSession = await getServerSession(req as any, res as any, authOptions)
    
    return NextResponse.json({
      cookies: {
        count: allCookies.length,
        names: allCookies.map(c => c.name),
        hasNextAuth: allCookies.some(c => 
          c.name.includes('next-auth') || c.name.includes('authjs')
        )
      },
      customSession: customSession ? {
        found: true,
        userId: customSession.user.id,
        email: customSession.user.email,
        username: customSession.user.username,
      } : { found: false },
      nextAuthSession: nextAuthSession ? {
        found: true,
        userId: nextAuthSession.user?.id,
        email: nextAuthSession.user?.email,
        username: (nextAuthSession.user as any)?.username,
        userKeys: Object.keys(nextAuthSession.user || {})
      } : { found: false },
      authSecret: process.env.AUTH_SECRET ? 'Set' : 'Not set',
      recommendation: !customSession && !nextAuthSession ? 
        'Please log out and log back in to get a new JWT token with the updated callback.' : null
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to get session',
      details: error?.message || 'Unknown error',
      stack: error?.stack
    }, { status: 500 })
  }
}