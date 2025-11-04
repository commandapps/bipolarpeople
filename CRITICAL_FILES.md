# Critical Files for Review

## Authentication & Session Management
1. `src/lib/auth.ts` - NextAuth configuration
2. `src/lib/session.ts` - Session helper (recently added)
3. `src/app/api/auth/[...nextauth]/route.ts` - NextAuth handler
4. `src/app/api/auth/register/route.ts` - Registration

## Journal API (Main Issue Area)
1. `src/app/api/journal/route.ts` - Journal CRUD operations
2. `src/app/tools/journal/page.tsx` - Journal UI component

## Configuration
1. `package.json` - Dependencies
2. `tsconfig.json` - TypeScript config
3. `.env.local` - Environment variables (not in repo - check what's needed)

## Other Important Files
- `src/lib/db.ts` - Database queries
- `src/lib/email.ts` - Email sending
- `src/hooks/useJournal.ts` - Journal hook

## Recent Changes (Key Files)
All authentication fixes are in:
- `src/lib/session.ts` (NEW - main fix)
- `src/app/api/journal/route.ts` (UPDATED)
- `src/lib/auth.ts` (UPDATED - fixed getServerSession)
