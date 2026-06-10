# BipolarPeople.com — Codebase Report (Ticket A1)

**Date:** June 2026  
**Repo:** `bipolarpeople-main`

---

## Framework & version

| Item | Value |
|------|--------|
| Framework | **Next.js 15.5.3** (App Router) |
| React | 19.1.0 |
| TypeScript | 5.x |
| Styling | **Tailwind CSS 4** via `@import "tailwindcss"` in `src/app/globals.css` |
| Fonts | Fraunces + Hanken Grotesk (Google Fonts via `next/font`) |
| Auth (legacy) | NextAuth 4 + Vercel Postgres + Resend — **out of scope per ticket backlog; to be de-emphasized** |
| Email | Resend (`src/lib/email.ts`) |

**Router:** App Router only. Routes live under `src/app/**/page.tsx`.

---

## Routing map

| Route | File | Notes |
|-------|------|--------|
| `/` | `src/app/page.tsx` | Homepage (redesigned) |
| `/resources` | `src/app/resources/page.tsx` | **Bug (A2):** currently renders the “Understanding Bipolar Disorder” article, not an index |
| `/resources/treatment` | `src/app/resources/treatment/page.tsx` | Treatment article |
| `/resources/families` | `src/app/resources/families/page.tsx` | Families article |
| `/resources/about` | — | **Missing (A2):** article body should move here |
| `/resources/reading-list` | — | **Missing (E1)** |
| `/stories` | `src/app/stories/page.tsx` | **Bug (A3):** was a hub; tickets require published-story listing |
| `/stories/share` | `src/app/stories/share/page.tsx` | Submission form (not wired to backend) |
| `/stories/[id]` | `src/app/stories/[id]/page.tsx` | Single story; hardcoded mock object |
| `/stories/famous-people` | `src/app/stories/famous-people/page.tsx` | Curated famous-people page (mockup) |
| `/stories/community` | `src/app/stories/community/page.tsx` | Community stories grid (mockup) |
| `/tools` | `src/app/tools/page.tsx` | Tools index |
| `/tools/mood-tracker` | `src/app/tools/mood-tracker/page.tsx` | Uses **localStorage** directly |
| `/tools/journal` | `src/app/tools/journal/page.tsx` | Client-only; no persistent save to API |
| `/tools/episode-planner` | `src/app/tools/episode-planner/page.tsx` | Client-only |
| `/tools/medication` | `src/app/tools/medication/page.tsx` | Client-only |
| `/community` | `src/app/community/page.tsx` | **Over-claims (B1):** “moderated by mental health professionals”, fake counts |
| `/research` | `src/app/research/page.tsx` | Research interest page |
| `/app` | `src/app/app/page.tsx` | BipolarAware landing |
| `/crisis-resources` | `src/app/crisis-resources/page.tsx` | Crisis resources |
| `/login`, `/register`, `/profile` | auth routes | **Out of scope** — no accounts per tickets |
| `/privacy`, `/terms`, `/contact`, `/disclaimer` | — | **Missing (F3)** |

API routes under `src/app/api/` include auth, mood, journal, medications, episodes — **server persistence exists but conflicts with local-only tool ticket (C1)**.

---

## Styling approach

- **Design tokens** in `src/app/globals.css` as CSS variables (`--accent`, `--surface`, `--ground`, etc.) with `[data-theme="dark"]` overrides.
- Tailwind 4 `@theme inline` maps tokens to utility classes (`text-accent`, `bg-surface`, etc.).
- Shared UI: `src/components/ui/*`, layout in `src/components/layout/*`.
- Theme toggle: `src/components/theme/ThemeProvider.tsx`.

**A4 gap:** Some older pages (`/tools`, `/community`, resource sub-pages) still use hard-coded gray/blue Tailwind, not design tokens.

---

## Data & API layer

| Layer | Status |
|-------|--------|
| Vercel Postgres + NextAuth | Present; used by `/api/auth/*`, tool API routes |
| Tool APIs | `/api/mood`, `/api/journal`, `/api/medications`, `/api/episodes/plans` — require session |
| Mood tracker UI | **Already uses localStorage** (`bipolar-mood-entries`) — bypasses API |
| Stories | Hardcoded in `[id]/page.tsx`; no content files |
| Reading list | Not implemented |
| Story submissions | Form logs to console only |

---

## “Loading…” issue (Ticket A1)

**Finding:** Tool pages (`/tools/mood-tracker`, `/tools/journal`, etc.) do **not** show permanent `Loading…`. They render immediately.

Permanent/bare `Loading…` appears on **`/community`** only:

- `src/app/community/page.tsx` lines ~89–91, ~141, ~194, ~197: buttons show `Loading...` while `useSession()` status is `'loading'`. Because auth is out of scope, session checks should be removed (B1).

Other `Loading...` strings: Suspense fallbacks on `/login`, `/register`, `/verify-email` (auth pages — out of scope).

---

## Deviations from ticket assumptions

1. **Auth exists** but tickets scope it out → remove nav sign-in, rewrite community without session.
2. **Server tool APIs exist** but tickets require local-only → tools should use shared C1 module, not API.
3. **`/resources` is an article**, not an index (A2).
4. **`/stories` was a hub**, not a listing (A3).
5. **Mockup pages** (`famous-people`, `community`) added in prior session — kept as supplementary; main `/stories` index per tickets lists curated published stories.
6. **Legal pages missing** (F3).
7. **Community over-claims** moderation and fake activity numbers (B1/B2).

---

## Ticket implementation status (updated as work proceeds)

See git history after ticket work. Initial gaps: A2, A3, E1, B1, B2, C1, C2, D1, D2, D3, F3.
