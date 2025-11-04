# Codebase Structure Overview

## API Routes (`src/app/api/`)

### Authentication Routes
- `auth/[...nextauth]/route.ts` - NextAuth handler
- `auth/register/route.ts` - User registration
- `auth/verify-email/route.ts` - Email verification
- `auth/forgot-password/route.ts` - Password reset request
- `auth/reset-password/route.ts` - Password reset

### Core Feature Routes
- `journal/route.ts` ⭐ - Journal entries (GET, POST, PUT, DELETE)
- `mood/route.ts` - Mood tracking entries
- `medications/route.ts` - Medication management
- `medications/logs/route.ts` - Medication logs
- `episodes/plans/route.ts` - Episode planning

### Utility Routes
- `debug/session/route.ts` - Session debugging endpoint
- `discourse/sso/route.ts` - Discourse SSO integration

## Tool Pages (`src/app/tools/`)

### Main Tools
- `page.tsx` - Tools dashboard/landing page
- `journal/page.tsx` ⭐ - Journal interface (main issue area)
- `mood-tracker/page.tsx` - Mood tracking interface
- `medication/page.tsx` - Medication management interface
- `episode-planner/page.tsx` - Episode planning interface

## Directory Structure

```
src/app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.ts
│   │   ├── register/
│   │   │   └── route.ts
│   │   ├── verify-email/
│   │   │   └── route.ts
│   │   ├── forgot-password/
│   │   │   └── route.ts
│   │   └── reset-password/
│   │       └── route.ts
│   ├── journal/
│   │   └── route.ts ⭐
│   ├── mood/
│   │   └── route.ts
│   ├── medications/
│   │   ├── route.ts
│   │   └── logs/
│   │       └── route.ts
│   ├── episodes/
│   │   └── plans/
│   │       └── route.ts
│   ├── debug/
│   │   └── session/
│   │       └── route.ts
│   └── discourse/
│       └── sso/
│           └── route.ts
└── tools/
    ├── page.tsx
    ├── journal/
    │   └── page.tsx ⭐
    ├── mood-tracker/
    │   └── page.tsx
    ├── medication/
    │   └── page.tsx
    └── episode-planner/
        └── page.tsx
```

⭐ = Files directly related to the current authentication issue

## Total API Routes: 12
## Total Tool Pages: 5



