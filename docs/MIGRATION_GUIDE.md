# Database Migration Guide

## Overview

This guide will help you run the database schema migration to create all the necessary tables for your Bipolar People app.

---

## Prerequisites

1. ✅ You have a Vercel Postgres database created
2. ✅ You have your database connection string
3. ✅ You have Node.js and npm installed

---

## Option 1: Run Migration Locally (Recommended for Development)

### Step 1: Get Your Database Connection String

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Navigate to your project → Storage tab
3. Click on your Postgres database
4. Go to the ".env.local" tab
5. Copy the `POSTGRES_URL` value

### Step 2: Create Local Environment File

Create a `.env.local` file in your project root:

```bash
# .env.local
DATABASE_URL=your_postgres_url_here
POSTGRES_URL=your_postgres_url_here
```

⚠️ **Never commit `.env.local` to git!** It should already be in `.gitignore`

### Step 3: Run the Migration

```bash
npm run db:migrate
```

You should see output like:
```
🚀 Starting database migration...

Found 23 statements to execute

✓ [1/23] alter
✓ [2/23] create
✓ [3/23] index
...
✅ Migration complete!
```

### Step 4: Verify Tables Were Created

```bash
npm run db:check
```

You should see all tables with row counts (or 0 if they're empty):
```
✓ users: 0 rows
✓ verification_tokens: 0 rows
✓ password_reset_tokens: 0 rows
✓ sessions: 0 rows
✓ mood_entries: 0 rows
✓ medications: 0 rows
✓ medication_logs: 0 rows
✓ journal_entries: 0 rows
✓ episode_plans: 0 rows
```

---

## Option 2: Run Migration via Vercel Dashboard

### Step 1: Go to Database

1. Go to Vercel Dashboard → Your Project
2. Click Storage tab
3. Click your Postgres database
4. Click "Query" tab

### Step 2: Run Schema

1. Open `src/lib/schema.sql` in your editor
2. Copy the entire contents (without the markdown code block)
3. Paste into the Vercel Query editor
4. Click "Run"

---

## Option 3: Run Migration via Vercel CLI

### Step 1: Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### Step 2: Link Your Project

```bash
vercel link
```

Follow the prompts to select your project.

### Step 3: Pull Environment Variables

```bash
vercel env pull .env.local
```

This will download your environment variables including `DATABASE_URL`.

### Step 4: Run Migration

```bash
npm run db:migrate
```

---

## Troubleshooting

### Error: "missing_connection_string"

**Cause:** The `DATABASE_URL` or `POSTGRES_URL` environment variable is not set.

**Solution:**
1. Create a `.env.local` file with your database connection string
2. Or run: `vercel env pull .env.local`

### Error: "relation 'users' already exists"

**Cause:** Some tables already exist in your database.

**Solution:** This is normal! The script uses `CREATE TABLE IF NOT EXISTS` which is safe to run multiple times. The migration will skip tables that already exist.

### Error: "ALTER TABLE users...column already exists"

**Cause:** The users table extensions already exist.

**Solution:** This is expected if you've run the migration before. The migration is idempotent (safe to run multiple times).

### Error: "connection refused" or timeout

**Cause:** Database connection issue.

**Solution:**
1. Check your database connection string is correct
2. Check if your Vercel Postgres database is running
3. Try the Vercel dashboard to run queries instead

---

## What Gets Created

The migration creates the following tables:

| Table | Purpose |
|-------|---------|
| `users` (extended) | Adds username, display_name, timezone to NextAuth users |
| `mood_entries` | Daily mood tracking data |
| `medications` | Medication master list |
| `medication_logs` | When medications were taken |
| `journal_entries` | Personal journal entries |
| `episode_plans` | Crisis/safety plans |
| `episode_timeline` | Historical episode tracking |
| `user_settings` | User preferences and settings |

Plus indexes for performance and triggers for automatic timestamp updates.

---

## Next Steps

After running the migration successfully:

1. ✅ Verify with `npm run db:check`
2. ✅ Start your development server: `npm run dev`
3. ✅ Test the tools (mood tracker, journal, etc.)
4. ✅ Create API endpoints (see `docs/database_and_tools_setup.md`)

---

## Need Help?

- Check Vercel Postgres docs: https://vercel.com/docs/storage/vercel-postgres
- Review the schema file: `src/lib/schema.sql`
- Check the database setup guide: `docs/database_and_tools_setup.md`

---

## Important Notes

⚠️ **Don't run the migration in production multiple times unnecessarily**

✅ **The migration is safe to run multiple times** (uses IF NOT EXISTS)

✅ **Always backup your database before running migrations in production**

✅ **Test the migration locally first** before running on production

