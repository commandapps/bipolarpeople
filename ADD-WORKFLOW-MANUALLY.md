# Add GitHub Actions Workflow Manually

Since GitHub API restrictions prevented us from pushing the workflow file, you need to add it manually.

## Option 1: Use GitHub Web UI (Easiest)

### Step 1: Copy the workflow file content
Read the file: `.github/workflows/vercel-deploy.yml`

### Step 2: Create the file in GitHub
1. Go to: https://github.com/commandapps/bipolarpeople
2. Click "Add file" → "Create new file"
3. In the filename box, type exactly: `.github/workflows/vercel-deploy.yml`
4. Paste the entire contents of the workflow file
5. Click "Commit new file"

**Or** just click this link to create it directly:
https://github.com/commandapps/bipolarpeople/new/main

Then navigate to: `.github/workflows/vercel-deploy.yml`

---

## Option 2: Use GitHub CLI (If installed)

```bash
# Read the workflow file
cat .github/workflows/vercel-deploy.yml

# Copy the content above, then use GitHub CLI:
gh workflow create .github/workflows/vercel-deploy.yml
```

---

## After Adding the Workflow

Once you've added the workflow file to GitHub:

1. **Wait a moment** - GitHub Actions might automatically trigger
2. **Or manually trigger it:**
   - Go to: https://github.com/commandapps/bipolarpeople/actions
   - Click "Deploy to Vercel (main)"
   - Click "Run workflow"

3. **Watch it deploy!** 🎉

---

## What Should Happen

1. GitHub Actions workflow starts
2. It checks out your code
3. Installs dependencies
4. Builds your Next.js app
5. Deploys to Vercel

Check progress at: https://github.com/commandapps/bipolarpeople/actions

