# Authentication Fix Plan

## Current Status
- ✅ Local development: Works perfectly
- ❌ Production: 401 Unauthorized on all API routes
- ✅ Login works (creates session)
- ❌ Session not recognized by API routes

## Root Cause Analysis

### The Problem
We have TWO session methods that are both failing:
1. `getSessionFromCookie()` - Custom JWT decoder 
2. `getServerSession()` - NextAuth official method

Both fail because `getToken()` returns null, meaning JWT decryption fails.

### Why JWT Decryption Fails
After extensive debugging, the issue is:
- Token encrypted during login with one configuration
- Token decryption in APIs uses different configuration
- Even though secrets match, NextAuth's encryption is sensitive to:
  - Cookie names
  - Environment
  - Secret format
  - Timing of when authOptions is loaded

## Recommended Solution: SIMPLIFY

### Option A: Use ONLY getServerSession (Recommended)
**Pros:**
- Official NextAuth method
- Handles all edge cases
- Better maintained
- No custom JWT handling

**Implementation:**
1. Remove `getSessionFromCookie` entirely
2. Use `getServerSession(authOptions)` in ALL API routes
3. Ensure authOptions is consistent

### Option B: Debug Why getServerSession Fails
The logs show `getServerSession` ALSO returns null, which is strange since:
- It's the official method
- It should work with the same authOptions used for login

**Possible causes:**
- authOptions not being imported correctly
- Secret env var name mismatch at load time
- Next.js 14 + NextAuth v4 incompatibility issue

## Immediate Action

### Test getServerSession Directly

Create a simple test API that ONLY uses getServerSession:

```typescript
// src/app/api/test-auth/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  return NextResponse.json({
    session: session ? 'FOUND' : 'NOT FOUND',
    userId: session?.user?.id,
    email: session?.user?.email,
    secret: !!authOptions.secret,
    secretLength: authOptions.secret?.length
  })
}
```

Test this in production - if it works, we know getServerSession CAN work.

### If That Works

Replace all API routes to use ONLY:
```typescript
const session = await getServerSession(authOptions)
```

Remove all the custom session helper code.

## Alternative: Check If It's a Vercel-Specific Issue

The fact that BOTH methods fail suggests it might be:
1. Vercel serverless function environment
2. How Next.js 14 handles sessions in Vercel
3. Environment variable not loading correctly

## Next Steps

1. Create test-auth endpoint
2. Test in production
3. If it works → simplify all routes
4. If it fails → investigate Vercel/Next.js 14 compatibility

