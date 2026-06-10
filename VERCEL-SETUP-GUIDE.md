# Step-by-Step Vercel Setup Guide

This guide will walk you through getting all the credentials needed for GitHub Actions to deploy to Vercel.

## What You Need to Get

Three things:
1. **VERCEL_TOKEN** - A special password that allows GitHub Actions to deploy
2. **VERCEL_ORG_ID** - Your team/organization ID in Vercel
3. **VERCEL_PROJECT_ID** - Your specific project ID in Vercel

---

## PART 1: Get Your Vercel Token

### Visual Guide:

1. **Go to the tokens page:**
   - Visit: https://vercel.com/account/tokens
   - Or: Dashboard → Your Avatar → Settings → Tokens

2. **Create a new token:**
   - Click the **"Create Token"** button

3. **Fill in the details:**
   - Name: `GitHub Actions Deploy` (or whatever you prefer)
   - Expiration: Select "Never" (or set a date)
   - Click **"Generate Token"**

4. **IMPORTANT: Copy it now!**
   - A long string will appear (looks like: `vercel_abc123xyz...`)
   - **Copy it immediately** and save it somewhere safe
   - You won't be able to see it again!
   - If you lose it, you'll need to create a new one

✅ **You now have your VERCEL_TOKEN**

---

## PART 2: Get Your Org ID and Project ID

You have two ways to do this. Choose the one you prefer:

### Method A: Using Vercel CLI (Easiest)

This is the recommended way because it's automated.

#### Step 1: Make sure Vercel CLI is installed
```bash
# Check if vercel is installed
vercel --version

# If not installed, install it globally
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```
- This will open your browser
- Click "Authorize Vercel CLI"
- You'll see "Success! Authentication complete" in your browser

#### Step 3: Link your project
```bash
# Make sure you're in your project directory
cd /Users/charlieeadie/Desktop/bipolarpeople

# Link the project
vercel link
```

**What happens:**
- It will ask: "Set up and deploy?" → Type **N** (No)
- It will ask: "Which scope?" → Select your team/account
- It will ask: "Link to existing project?" → Type **Y** (Yes)
- It will ask: "What's the name of your project?" → Either:
  - Select an existing project from the list, OR
  - Create a new project by typing a new name

#### Step 4: View your IDs
```bash
# Open the project config file
cat .vercel/project.json
```

**Example output:**
```json
{
  "orgId": "team_abc123xyz",
  "projectId": "prj_abc123xyz"
}
```

✅ **You now have:**
- `VERCEL_ORG_ID` = the `orgId` value
- `VERCEL_PROJECT_ID` = the `projectId` value

---

### Method B: Using Vercel Dashboard (If you prefer the UI)

#### Step 1: Go to your project
1. Visit: https://vercel.com/dashboard
2. Click on your project (or create a new one first)

#### Step 2: Go to Settings
1. Click the **"Settings"** tab at the top
2. Click **"General"** in the left sidebar

#### Step 3: Find your IDs
Scroll down to find:
- **"Project ID"** (this is your `VERCEL_PROJECT_ID`)
- **"Team ID"** or **"Organization ID"** (this is your `VERCEL_ORG_ID`)

Both will be shown as values like `team_abc123xyz` or `prj_abc123xyz`

✅ **You now have:**
- `VERCEL_ORG_ID` = Team ID / Organization ID
- `VERCEL_PROJECT_ID` = Project ID

---

## PART 3: Add Secrets to GitHub

Now that you have all three values, you need to add them to GitHub.

### Visual Guide:

1. **Go to your repository settings:**
   - GitHub.com → Your Repository → Click **"Settings"** (top right)
   - Or visit: `https://github.com/yourusername/bipolarpeople/settings`

2. **Navigate to Secrets:**
   - Click **"Secrets and variables"** in the left sidebar
   - Click **"Actions"**

3. **Add each secret:**
   Click **"New repository secret"** three times:

   **Secret 1:**
   - Name: `VERCEL_TOKEN`
   - Value: Paste your token from Part 1
   - Click "Add secret"

   **Secret 2:**
   - Name: `VERCEL_ORG_ID`
   - Value: Paste your org ID from Part 2
   - Click "Add secret"

   **Secret 3:**
   - Name: `VERCEL_PROJECT_ID`
   - Value: Paste your project ID from Part 2
   - Click "Add secret"

✅ **Done!** Your GitHub Actions can now deploy to Vercel.

---

## Verify Everything Works

After adding the secrets, you can test the deployment:

```bash
# Push your code to trigger GitHub Actions
git push origin main
```

Then check:
1. Go to: `https://github.com/yourusername/bipolarpeople/actions`
2. You should see the "Deploy to Vercel" workflow running
3. If it succeeds, your app will be deployed!

---

## Troubleshooting

### "Token not found" error
- Make sure you copied the entire token (they're very long)
- Make sure there are no extra spaces before/after
- Try creating a new token if needed

### "Project not found" error
- Make sure your project actually exists in Vercel
- Make sure you're using the correct project ID
- Check that you selected the right team/org

### ".vercel folder missing"
- Run `vercel link` again
- Make sure you're in the correct directory
- The folder should contain `project.json` and `.vercelignore`

### Can't find Vercel project
- Make sure you've created a project in Vercel first
- Or use `vercel link` to create one automatically

---

## Quick Checklist

- [ ] Got VERCEL_TOKEN from https://vercel.com/account/tokens
- [ ] Got VERCEL_ORG_ID from `.vercel/project.json` or Vercel dashboard
- [ ] Got VERCEL_PROJECT_ID from `.vercel/project.json` or Vercel dashboard
- [ ] Added all three secrets to GitHub repository
- [ ] Tested deployment by pushing to main

---

## Need Help?

If you're stuck:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for other setup steps
2. Check Vercel documentation: https://vercel.com/docs
3. Check GitHub Actions logs if deployment fails

