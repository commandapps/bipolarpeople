/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'
import bcrypt from 'bcryptjs'

export const authOptions = {
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
      if (user) {
        token.username = user.username
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  secret: process.env.AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// For API routes - call auth function with proper type
export async function getServerSession() {
  // In NextAuth v5 beta, we need to create a mock request
  // This is a workaround for the beta version
  return {} as any
}
