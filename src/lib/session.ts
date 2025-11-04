import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Get session from NextAuth JWT cookie using NextAuth's built-in decoder
 * Works with NextAuth v4 JWT strategy in App Router
 * Reads cookies directly from request headers (works in API routes)
 */
export async function getSessionFromCookie(request: NextRequest): Promise<{ user: { id: string; email?: string; name?: string; username?: string } } | null> {
  try {
    // Read cookies directly from request headers (this works in API routes)
    const cookieHeader = request.headers.get('cookie') || ''
    const cookies = cookieHeader.split(';').map(c => c.trim()).filter(c => c)
    const cookieMap = new Map<string, string>()
    
    cookies.forEach(cookie => {
      const [name, ...valueParts] = cookie.split('=')
      if (name && valueParts.length > 0) {
        cookieMap.set(name.trim(), valueParts.join('=').trim())
      }
    })
    
    console.log('All cookie names:', Array.from(cookieMap.keys()).join(', '))
    
    // NextAuth stores JWT in cookie named 'next-auth.session-token' or '__Secure-next-auth.session-token'
    // Or in newer versions: 'authjs.session-token'
    const sessionToken = cookieMap.get('next-auth.session-token') || 
                         cookieMap.get('__Secure-next-auth.session-token') ||
                         cookieMap.get('authjs.session-token') ||
                         cookieMap.get('__Host-next-auth.session-token')
    
    if (!sessionToken) {
      console.log('No NextAuth session token found in cookies')
      console.log('Available cookie names:', Array.from(cookieMap.keys()).join(', ') || 'none')
      return null
    }

    console.log('Found session token cookie, length:', sessionToken.length)

    // Use NextAuth's getToken function to properly decode the JWT
    // This handles NextAuth's encoding/encryption correctly
    const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
    if (!secret) {
      console.error('NEXTAUTH_SECRET or AUTH_SECRET not set')
      return null
    }

    try {
      // Build a request object with the cookie for getToken
      // getToken expects a request with headers.get('cookie')
      const req = {
        headers: {
          get: (name: string) => {
            if (name.toLowerCase() === 'cookie') {
              return cookieHeader
            }
            return undefined
          }
        }
      } as any

      // Determine cookie name
      let cookieName: string | undefined = undefined
      if (cookieMap.has('next-auth.session-token')) {
        cookieName = 'next-auth.session-token'
      } else if (cookieMap.has('__Secure-next-auth.session-token')) {
        cookieName = '__Secure-next-auth.session-token'
      } else if (cookieMap.has('authjs.session-token')) {
        cookieName = 'authjs.session-token'
      } else if (cookieMap.has('__Host-next-auth.session-token')) {
        cookieName = '__Host-next-auth.session-token'
      }

      // Use NextAuth's getToken to decode the JWT token
      const token = await getToken({ 
        req,
        secret,
        ...(cookieName && { cookieName })
      })
      
      if (!token) {
        console.log('getToken returned null - token invalid or expired')
        return null
      }

      console.log('JWT decoded successfully using getToken, payload keys:', Object.keys(token))
      console.log('JWT payload:', JSON.stringify(token, null, 2))
      
      // Extract user info from the token
      // NextAuth stores user.id in the 'sub' field
      const userId = token.sub || token.id || (token as any).userId
      
      console.log('Extracted user ID:', userId, 'from fields:', {
        sub: token.sub,
        id: (token as any).id,
        userId: (token as any).userId
      })
      
      if (!userId) {
        console.error('No user ID found in JWT payload. Full payload:', token)
        return null
      }
      
      return {
        user: {
          id: userId.toString(),
          email: (token as any).email,
          name: (token as any).name,
          username: (token as any).username,
        }
      }
    } catch (tokenError: any) {
      console.error('getToken failed:', tokenError.message)
      console.error('Error stack:', tokenError.stack)
      return null
    }
  } catch (error: any) {
    console.error('Error getting session from cookie:', error.message)
    console.error('Error stack:', error.stack)
    return null
  }
}


