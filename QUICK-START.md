# Quick Start: Getting Your Vercel Credentials

This is the simplest way to get all the IDs you need for GitHub Actions.

## The 3-Step Process

### Step 1: Get VERCEL_TOKEN
Open: https://vercel.com/account/tokens

1. Click "Create Token"
2. Name it (e.g., "GitHub Actions")
3. Generate and **copy immediately**

✅ You now have: `VERCEL_TOKEN`

---

### Step 2: Get VERCEL_ORG_ID and VERCEL_PROJECT_ID

Run these commands in your project:

```bash
# 1. Login to Vercel (if not already)
vercel login

# 2. Link your project to Vercel
vercel link

# When prompted:
# - Set up and deploy? → N
# - Which scope? → (select your account)
# - Link to existing project? → Y (or create new one)

# 3. Display your IDs
npm run vercel:ids
```

✅ You now have: `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

---

### Step 3: Add to GitHub Secrets

Go to: `https://github.com/yourusername/bipolarpeople/settings/secrets/actions`

Add three secrets:
1. Name: `VERCEL_TOKEN` → Your token from Step 1
2. Name: `VERCEL_ORG_ID` → Your org ID from Step 2
3. Name: `VERCEL_PROJECT_ID` → Your project ID from Step 2

✅ Done! GitHub can now deploy to Vercel automatically.

---

## That's It!

Now push your code to trigger a deployment:

```bash
git push origin main
```

Watch it deploy at: https://github.com/yourusername/bipolarpeople/actions

---

## Need More Help?

- See `VERCEL-SETUP-GUIDE.md` for detailed screenshots and troubleshooting
- See `DEPLOYMENT.md` for complete deployment instructions

