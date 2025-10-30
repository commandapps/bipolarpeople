# ✅ Next Steps - You're Almost There!

## What We Just Did

✅ Got your Vercel credentials  
✅ Linked your project to Vercel  
✅ Created all necessary files  

---

## What You Need to Do Now

### Step 1: Add GitHub Secrets (2 minutes)

**Go to:** `https://github.com/yourusername/bipolarpeople/settings/secrets/actions`

Add these three secrets (see `GITHUB-SECRETS.md` for exact values):

1. `VERCEL_TOKEN` → `qmHqsiAfBfVux0eSFYJjNSaG`
2. `VERCEL_ORG_ID` → `team_aECiG1V5L4rZ7AHusvX3T25W`
3. `VERCEL_PROJECT_ID` → `prj_93ACkIrD17Dg1Dpq9sgmP8XwbHjx`

Click "New repository secret" for each one, paste the value, and save.

### Step 2: Set Up Environment Variables in Vercel (5 minutes)

Go to your Vercel project: https://vercel.com/your-username/bipolarpeople/settings/environment-variables

Add these **required** environment variables:

#### Auth
- `AUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `AUTH_URL` - Your Vercel URL (e.g., `https://bipolarpeople.vercel.app`)

#### Email (Resend)
- `RESEND_API_KEY` - Get from: https://resend.com/api-keys
- `EMAIL_FROM` - Your verified domain (e.g., `noreply@yourdomain.com`)

#### Database (If you create one)
- `DATABASE_URL` - Will be auto-provided by Vercel Postgres

### Step 3: Set Up Your Database (10 minutes)

**Option A: Create Vercel Postgres**
1. Go to Vercel Dashboard → Your Project → Storage
2. Click "Create Database" → Postgres
3. Once created, click "Query" tab
4. Paste the contents of `schema.sql`
5. Click "Run" to create all tables

**Option B: Use Existing Database**
```bash
psql $YOUR_DATABASE_URL < schema.sql
```

Then verify:
```bash
npm run db:check
```

### Step 4: Deploy! 🚀

Once you've added the secrets, you can deploy:

```bash
# Push to GitHub (triggers automatic deployment)
git add .
git commit -m "Add deployment configuration"
git push origin main
```

Or trigger manually in GitHub Actions:
1. Go to: https://github.com/yourusername/bipolarpeople/actions
2. Click "Deploy to Vercel (main)"
3. Click "Run workflow"

---

## Verification Checklist

After deployment, check:

- [ ] App loads at your Vercel URL
- [ ] `/register` page works
- [ ] Can register a new user
- [ ] Email verification email is sent (check Resend dashboard)
- [ ] Can verify email and log in
- [ ] `/tools/mood-tracker` works
- [ ] Database operations work

---

## If Something Goes Wrong

### Check GitHub Actions Logs
Go to: https://github.com/yourusername/bipolarpeople/actions

Click on the latest workflow run to see logs.

### Check Vercel Deploy Logs
Go to: https://vercel.com/your-username/bipolarpeople/deployments

Click on a deployment to see logs.

### Common Issues

**"Token not found"**
- Secret name must be exactly: `VERCEL_TOKEN`
- No extra spaces in the value

**"Project not found"**
- Check that project ID is correct
- Verify project exists in Vercel

**Database connection fails**
- Make sure schema was run
- Check DATABASE_URL is set in Vercel

---

## Need Help?

See these guides:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- [VERCEL-SETUP-GUIDE.md](./VERCEL-SETUP-GUIDE.md) - Detailed Vercel setup
- [README.md](./README.md) - General project info

---

## Summary

You have everything you need! Just:
1. ✅ Add 3 secrets to GitHub
2. ✅ Set environment variables in Vercel
3. ✅ Run database schema
4. 🚀 Push to GitHub to deploy

Good luck! 🎉

