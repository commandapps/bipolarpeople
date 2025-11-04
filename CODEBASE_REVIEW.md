# Codebase Review Document

## Project Overview
Next.js 15.5.3 application with NextAuth.js v4 authentication, PostgreSQL database via Vercel Postgres, and TypeScript.

## Project Structure

### Key Directories
- `src/app/` - Next.js App Router pages and API routes
- `src/lib/` - Core utilities and configurations
- `src/hooks/` - React hooks
- `scripts/` - Utility scripts (excluded from build)
- `.github/workflows/` - CI/CD workflows

### Key Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration (excludes `scripts/` directory)
- `.env.local` - Environment variables (not in repo)

## Authentication Architecture

### Authentication Flow
1. User registers via `/api/auth/register`
2. Email verification required via `/api/auth/verify-email`
3. Login via NextAuth credentials provider
4. JWT sessions stored in cookies

### Key Authentication Files
- `src/lib/auth.ts` - NextAuth configuration, JWT callbacks
- `src/lib/session.ts` - `getSessionFromCookie()` helper for API routes
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `src/app/api/auth/register/route.ts` - Registration endpoint

### Recent Authentication Fixes
- **Problem**: `cookies()` from `next/headers` was hanging in API routes
- **Solution**: Read cookies directly from `request.headers.get('cookie')`
- **Implementation**: Created `getSessionFromCookie()` helper that works in App Router

## API Routes

### Journal API (`src/app/api/journal/route.ts`)
- GET: Fetch journal entries with filters
- POST: Create new journal entry
- PUT: Update journal entry
- DELETE: Delete journal entry

**Current Implementation**:
- Uses `getSessionFromCookie()` first, falls back to `getServerSession()`
- Reads cookies from request headers (not `cookies()` function)
- Converts `user.id` to integer for database

### Other API Routes
- `/api/mood` - Mood tracking entries
- `/api/medications` - Medication management
- `/api/episodes/plans` - Episode planning
- `/api/debug/session` - Session debugging endpoint

## Database Schema

### Key Tables
- `users` - User accounts (id: INTEGER/SERIAL, email, password_hash, email_verified)
- `journal_entries` - Journal entries (user_id: INTEGER, foreign key to users.id)
- `verification_tokens` - Email verification tokens
- `sessions` - NextAuth sessions

**Important**: `users.id` and `journal_entries.user_id` are both INTEGER types (not VARCHAR).

## Environment Variables Required
- `AUTH_SECRET` - NextAuth JWT signing secret
- `DATABASE_URL` - Vercel Postgres connection string
- `RESEND_API_KEY` - Email sending API key
- `EMAIL_FROM` - Sender email address
- `AUTH_URL` - Base URL for auth callbacks (defaults to localhost:3000)

## Known Issues & Solutions

### 1. Authentication in API Routes
**Issue**: `getServerSession()` from NextAuth doesn't work reliably in App Router API routes.

**Solution**: 
- Created `getSessionFromCookie()` in `src/lib/session.ts`
- Uses `getToken()` from `next-auth/jwt` to decode JWT
- Reads cookies from `request.headers.get('cookie')` instead of `cookies()`

### 2. Cookies Function Hanging
**Issue**: `cookies()` from `next/headers` can hang in API routes in Next.js 15.

**Solution**: All API routes now read cookies from request headers directly:
```typescript
const cookieHeader = request.headers.get('cookie') || ''
```

### 3. User ID Type Conversion
**Issue**: NextAuth returns user ID as string, database expects INTEGER.

**Solution**: 
```typescript
const userId = parseInt(session.user.id, 10)
if (isNaN(userId)) {
  return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 })
}
```

## Deployment

### GitHub Actions Workflow
- Located in `.github/workflows/vercel-deploy.yml`
- Builds Next.js app
- Deploys to Vercel production

### Build Process
1. Install dependencies
2. Run `next build` (no --turbopack flag)
3. Deploy via Vercel CLI

### Current Build Status
- TypeScript compilation: ✅ Passing
- ESLint: Warnings (mostly `any` types, non-blocking)
- Scripts directory excluded from TypeScript build

## Client-Side Code

### Journal Page (`src/app/tools/journal/page.tsx`)
- Uses `credentials: 'include'` in fetch calls to send cookies
- Handles form submission, editing, deletion
- Error handling displays detailed server messages

### Authentication Pages
- `/login` - Login page
- `/register` - Registration page
- `/register/success` - Registration confirmation

## Utility Scripts (Not in Build)
- `scripts/clear-users.ts` - Delete all users and related data
- `scripts/verify-user-email.ts` - Manually verify user emails
- `scripts/check-db.ts` - Database connection check

## Recent Changes Summary

### Latest Commits
1. **Fix authentication in API routes** - Read cookies from request headers
2. **Fix TypeScript build errors** - Exclude scripts, fix type assertions
3. **Fix auth.ts getServerSession call** - Add missing response parameter
4. **Update families page** - UI improvements

### Key Files Modified
- `src/lib/session.ts` - New file, session helper
- `src/app/api/journal/route.ts` - Updated to use new session helper
- `src/lib/auth.ts` - Fixed getServerSession signature
- `tsconfig.json` - Excluded scripts directory

## Testing Checklist

### Authentication Flow
- [ ] User can register
- [ ] Verification email sent (or manually verified)
- [ ] User can log in
- [ ] Session persists across requests
- [ ] User can log out

### Journal Functionality
- [ ] Can fetch journal entries (GET)
- [ ] Can create journal entry (POST)
- [ ] Can update journal entry (PUT)
- [ ] Can delete journal entry (DELETE)
- [ ] All operations require authentication

### Debug Endpoints
- `/api/debug/session` - Check session and cookie status

## Dependencies

### Core
- `next@15.5.3`
- `next-auth@^4.24.0`
- `@vercel/postgres` - Database client
- `bcryptjs` - Password hashing
- `resend` - Email sending

### Development
- `typescript`
- `@types/node`
- `@types/react`

## File Structure (Key Files Only)

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── journal/route.ts ⭐ (Main API endpoint)
│   │   └── debug/session/route.ts
│   ├── tools/
│   │   └── journal/page.tsx ⭐ (Client component)
│   ├── login/
│   └── register/
├── lib/
│   ├── auth.ts ⭐ (NextAuth config)
│   ├── session.ts ⭐ (Session helper - NEW)
│   ├── db.ts (Database queries)
│   └── email.ts (Email sending)
└── hooks/
    └── useJournal.ts

scripts/
├── clear-users.ts
└── verify-user-email.ts

package.json
tsconfig.json
```

⭐ = Critical files for authentication/journal functionality

## Common Error Patterns

### "Unauthorized" (401)
- Check if session cookie exists
- Verify `AUTH_SECRET` is set
- Ensure user is logged in
- Check `getSessionFromCookie()` returns session

### "Failed to create journal entry" (500)
- Check user ID is valid integer
- Verify database connection
- Check required fields (content, entry_date)
- Review server logs for database errors

### Build Failures
- TypeScript errors in scripts - excluded from build now
- Missing types - check `@types/*` packages
- ESLint errors - mostly warnings, non-blocking

## Next Steps / Recommendations

1. **Session Management**: Consider adding session refresh logic
2. **Error Handling**: Standardize error responses across all API routes
3. **Type Safety**: Replace `any` types with proper interfaces
4. **Testing**: Add unit tests for session helper
5. **Monitoring**: Add logging/monitoring for production issues



