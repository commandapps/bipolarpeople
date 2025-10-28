import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export async function GET(request: NextRequest) {
  // @ts-expect-error - NextAuth v5 beta compatibility issue
  return handler(request)
}

export async function POST(request: NextRequest) {
  // @ts-expect-error - NextAuth v5 beta compatibility issue
  return handler(request)
}
