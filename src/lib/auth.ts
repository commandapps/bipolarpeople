/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.getUserByEmail(credentials.email)
        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash)
        if (!isPasswordValid) {
          return null
        }

        // Require email verification before allowing login
        if (!user.email_verified) {
          throw new Error('Please verify your email before logging in')
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.display_name || user.username,
          username: user.username,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // On first login, user object is provided
      if (user) {
        token.sub = user.id  // Ensure sub is set to user.id
        token.id = user.id   // Also set id for compatibility
        token.email = user.email
        token.name = user.name
        token.username = user.username
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub || token.id  // Use sub first, fallback to id
        session.user.email = token.email
        session.user.name = token.name
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Helper function to get session in App Router API routes
// Note: This function is deprecated - use getSessionFromCookie from '@/lib/session' instead
export async function getSession(request: Request) {
  const cookies = request.headers.get('cookie') || ''
  
  // Create a mock request object for getServerSession
  const mockReq = {
    headers: {
      get: (name: string) => {
        if (name.toLowerCase() === 'cookie') return cookies
        return request.headers.get(name)
      },
      cookie: cookies,
    },
  } as any
  
  // Create a mock response object for getServerSession
  const mockRes = {
    getHeader: () => undefined,
    setHeader: () => {},
    removeHeader: () => {},
  } as any
  
  return await getServerSession(mockReq, mockRes, authOptions)
}
