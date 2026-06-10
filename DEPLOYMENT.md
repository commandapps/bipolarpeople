# Deployment Guide - Bipolar People

## Overview
This Next.js application is ready to deploy to Vercel with CI/CD via GitHub Actions.

> 📚 **New to this?** Start with [QUICK-START.md](./QUICK-START.md) for the simplest approach, or [VERCEL-SETUP-GUIDE.md](./VERCEL-SETUP-GUIDE.md) for detailed step-by-step instructions with explanations.

## Current Status ✅
- ✅ Next.js 15.5 app with app router
- ✅ GitHub Actions workflow configured
- ✅ Vercel deployment configuration
- ✅ Database schema designed
- ✅ Authentication with NextAuth
- ✅ Email service with Resend
- ✅ Discourse SSO integration ready

## Next Steps - Setup Required

### 1. GitHub Repository Setup
- [ ] Ensure your code is pushed to GitHub
- [ ] Verify the `.github/workflows/vercel-deploy.yml` file is committed

### 2. Vercel Project Setup
You need to connect your Vercel account to GitHub and configure secrets:

#### Step 1: Get Your Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it a name like "GitHub Actions Deploy"
4. Set expiration to "Never" (or your preferred time)
5. Click "Generate Token"
6. **Copy the token immediately** (you won't see it again)

#### Step 2: Get Your Vercel Org and Project IDs

You have two options:

**Option A: Use Vercel CLI (Recommended)**
```bash
# 1. Install Vercel CLI if you haven't
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link your project (this creates a .vercel folder)
vercel link

# You'll be asked:
# - Which team/org? (select yours)
# - Which project? (select or create new)

# 4. Check the .vercel/project.json file
cat .vercel/project.json
# This will show your orgId and projectId
```

**Option B: Find them in Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to Settings → General
4. Scroll down to see "Project ID" and "Team ID" (this is your Org ID)

#### Step 3: Add GitHub Secrets

Go to your GitHub repository: `https://github.com/yourusername/repo/settings/secrets/actions`

Click "New repository secret" for each:
1. **VERCEL_TOKEN** - Paste the token from Step 1
2. **VERCEL_ORG_ID** - Your team/org ID from Step 2
3. **VERCEL_PROJECT_ID** - Your project ID from Step 2

### 3. Environment Variables Setup
Configure these in Vercel dashboard → Project → Settings → Environment Variables

#### Database (Vercel Postgres)
- `DATABASE_URL` - Auto-provided by Vercel Postgres
- `POSTGRES_URL` - Auto-provided
- `POSTGRES_PRISMA_URL` - Auto-provided
- Or use individual credentials:
  - `PGHOST`
  - `PGDATABASE`
  - `PGPASSWORD`
  - `PGUSER`

#### Authentication
- `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `AUTH_URL` - Your production URL (e.g., https://bipolarpeople.vercel.app)

#### Email Service (Resend)
- `RESEND_API_KEY` - Get from https://resend.com/api-keys
- `EMAIL_FROM` - Your verified domain (e.g., noreply@yourdomain.com)

#### Discourse SSO (Optional)
- `DISCOURSE_URL` - Your Discourse forum URL
- `DISCOURSE_SSO_SECRET` - SSO secret from Discourse settings

### 4. Database Schema Setup

**IMPORTANT:** You need to run the SQL schema to create all tables.

#### Option A: Use Vercel Postgres Dashboard
1. Go to Vercel Dashboard → Your Project → Storage → Postgres
2. Click "Query" tab
3. Paste the contents of `schema.sql` 
4. Execute the SQL

#### Option B: Use psql from terminal
```bash
# Get connection string from Vercel
vercel env pull

# Run schema
psql $POSTGRES_URL < schema.sql
```

### 5. First Deployment

After setting up secrets and schema:

```bash
# Push to main branch triggers automatic deployment
git push origin main
```

Or manually trigger via GitHub Actions:
- Go to Actions tab → "Deploy to Vercel (main)" → Run workflow

### 6. Verification Checklist

After deployment, verify:

- [ ] Homepage loads at production URL
- [ ] `/register` allows user registration
- [ ] Verification emails are sent (check Resend dashboard)
- [ ] `/login` allows login after email verification
- [ ] `/tools/mood-tracker` works
- [ ] `/tools/journal` works
- [ ] `/tools/medication` works
- [ ] `/tools/episode-planner` works
- [ ] Database tables exist and are accessible

### 7. Domain Setup (Optional)

If you have a custom domain:
1. Go to Vercel → Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `AUTH_URL` environment variable

## Environment Variables Reference

### Required for Production:
```
# Database
DATABASE_URL=postgres://...

# Auth
AUTH_SECRET=your-secret-here
AUTH_URL=https://your-app.vercel.app

# Email
RESEND_API_KEY=re_xxx
EMAIL_FROM=noreply@yourdomain.com
```

### Optional:
```
# Discourse Integration
DISCOURSE_URL=https://your-forum.com
DISCOURSE_SSO_SECRET=your-sso-secret
```

## Troubleshooting

### Build Fails
- Check all environment variables are set in Vercel
- Verify Node version matches `package.json` (20.x)
- Check Vercel build logs

### Database Connection Fails
- Verify `DATABASE_URL` is set correctly
- Check Vercel Postgres is active
- Ensure schema has been run

### Emails Not Sending
- Verify Resend API key is correct
- Check domain is verified in Resend
- View logs in Vercel dashboard

### GitHub Actions Fails
- Verify all three Vercel secrets are set
- Check workflow has access to secrets
- View Actions logs for specific errors

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Check GitHub Actions logs  
3. Review application logs in Vercel dashboard

