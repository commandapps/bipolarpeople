# Complete Discourse Forum Integration Guide
**For: bipolarpeople.com**  
**Date: October 30, 2025**

---

## OVERVIEW

You have Discourse SSO code written, but it's not connected. Here's the complete setup guide.

**What You Have:**
- ✅ Discourse SSO library (`/lib/discourse-sso.ts`)
- ✅ API endpoint (`/api/discourse/sso/route.ts`)
- ✅ Community page with Discourse links
- ✅ NextAuth authentication

**What's Missing:**
- ❌ Discourse instance (do you have one?)
- ❌ Discourse SSO configuration
- ❌ Environment variables
- ❌ Database connection for user sync

---

## STEP 1: SET UP DISCOURSE INSTANCE

### Option A: Managed Hosting (Recommended - Easiest)

**Use Official Discourse Hosting ($50-100/month)**

1. Go to https://discourse.org/pricing
2. Choose "Standard" plan ($50/month for small community)
3. They handle all infrastructure, updates, backups

**Pros:**
- Zero maintenance
- Expert support
- Automatic updates
- Best reliability

**Cons:**
- Monthly cost ($50-100)

### Option B: Self-Hosted on DigitalOcean ($20-40/month)

**Requirements:**
- DigitalOcean droplet (4GB RAM minimum)
- Domain/subdomain (e.g., community.bipolarpeople.com)
- 2-3 hours setup time

**Steps:**

1. **Create Droplet**
```bash
# On DigitalOcean:
# - Choose Ubuntu 22.04 LTS
# - Select 4GB RAM / 2 CPU droplet ($24/month)
# - Add your SSH key
# - Create droplet
```

2. **Point DNS to Droplet**
```
# In your DNS settings (Vercel, Cloudflare, etc.):
Type: A Record
Name: community
Value: [Your DigitalOcean droplet IP]
TTL: 300
```

3. **Install Discourse**
```bash
# SSH into your droplet:
ssh root@your-droplet-ip

# Clone Discourse Docker:
git clone https://github.com/discourse/discourse_docker.git /var/discourse
cd /var/discourse

# Run setup:
./discourse-setup

# Answer prompts:
# - Hostname: community.bipolarpeople.com
# - Email: your-admin@email.com
# - SMTP server: (use Resend SMTP)
#   - Server: smtp.resend.com
#   - Port: 587
#   - Username: resend
#   - Password: [Your Resend API key]
# - Let's Encrypt email: your-admin@email.com
```

4. **Wait for Build** (15-30 minutes)
```bash
# Installation will take a while
# When done, visit: https://community.bipolarpeople.com
```

### Option C: Use Existing Free Discourse ($0/month)

**If you already have a Discourse instance:**
- Skip to Step 2 ✅

---

## STEP 2: CONFIGURE DISCOURSE SSO

Once Discourse is running, configure it to accept SSO from your site:

### 2.1: Enable SSO Provider in Discourse

1. **Log into Discourse as Admin**
   - Go to https://community.bipolarpeople.com (or your URL)
   
2. **Navigate to Settings**
   - Click your avatar → Admin → Settings
   
3. **Search for "SSO"**
   
4. **Configure These Settings:**

```
enable sso provider: ✅ (check this)

sso provider secrets:
bipolarpeople|YOUR_RANDOM_SECRET_HERE

# Generate secret with:
# openssl rand -hex 32
# Example: 8f3c9d2e1a5b7f9c4d8e2a6b3f7c9d1e5a8b4f7c9d2e6a3b8f5c7d1e9a4b6f3c

sso provider url: https://bipolarpeople.com/api/discourse/sso

sso provider name: Bipolar People

enable sso: ✅ (check this)

sso url: https://bipolarpeople.com/api/discourse/sso

sso secret: [Same secret as above]

sso overrides email: ✅ (check this)
sso overrides username: ✅ (check this)  
sso overrides name: ✅ (check this)
sso overrides avatar: ✅ (check this)
```

5. **Save Settings**

### 2.2: Set Up Return URLs

In Discourse Admin → Settings:

```
sso allows all return paths: ✅

OR

sso return url whitelist:
https://bipolarpeople.com
https://www.bipolarpeople.com
https://community.bipolarpeople.com
```

---

## STEP 3: UPDATE YOUR ENVIRONMENT VARIABLES

Add these to your Vercel environment variables:

### In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables

2. Add these variables:

```bash
# Discourse Configuration
DISCOURSE_URL=https://community.bipolarpeople.com
DISCOURSE_SSO_SECRET=8f3c9d2e1a5b7f9c4d8e2a6b3f7c9d1e5a8b4f7c9d2e6a3b8f5c7d1e9a4b6f3c

# (Use the same secret you put in Discourse settings above)
```

3. **Redeploy** your site so it picks up the new env vars

---

## STEP 4: FIX YOUR SSO FLOW

Your current code has a small issue. Here's the corrected version:

### Update: `/src/app/api/discourse/sso/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createDiscourseUser } from '@/lib/discourse-sso'
import crypto from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sso = searchParams.get('sso')
    const sig = searchParams.get('sig')

    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      // Store return URL for after login
      const returnUrl = request.url
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(returnUrl)}`, request.url)
      )
    }

    if (!sso || !sig) {
      return NextResponse.json(
        { error: 'Missing SSO parameters' },
        { status: 400 }
      )
    }

    // Get secrets
    const secret = process.env.DISCOURSE_SSO_SECRET
    const discourseUrl = process.env.DISCOURSE_URL

    if (!secret || !discourseUrl) {
      console.error('Discourse SSO not configured properly')
      return NextResponse.json(
        { error: 'SSO not configured' },
        { status: 500 }
      )
    }

    // Verify signature
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(sso)
      .digest('hex')

    if (sig !== expectedSig) {
      console.error('Invalid SSO signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      )
    }

    // Decode payload from Discourse
    const payload = Buffer.from(sso, 'base64').toString('utf-8')
    const params = new URLSearchParams(payload)
    const nonce = params.get('nonce')
    const returnPath = params.get('return_sso_url')

    if (!nonce) {
      return NextResponse.json(
        { error: 'Missing nonce' },
        { status: 400 }
      )
    }

    // Create user payload
    const discourseUser = createDiscourseUser({
      id: session.user.id || session.user.email!,
      name: session.user.name || null,
      email: session.user.email!,
      username: session.user.username || session.user.email!.split('@')[0],
      image: session.user.image || null,
    })

    // Build response payload
    const responsePayload = new URLSearchParams({
      nonce: nonce,
      email: discourseUser.email,
      external_id: discourseUser.external_id,
      username: discourseUser.username,
      name: discourseUser.name,
    })

    if (discourseUser.avatar_url) {
      responsePayload.append('avatar_url', discourseUser.avatar_url)
    }
    if (discourseUser.bio) {
      responsePayload.append('bio', discourseUser.bio)
    }

    // Encode response
    const responsePayloadEncoded = Buffer.from(
      responsePayload.toString()
    ).toString('base64')

    // Sign response
    const responseSig = crypto
      .createHmac('sha256', secret)
      .update(responsePayloadEncoded)
      .digest('hex')

    // Build return URL
    const returnUrl = new URL(returnPath || `${discourseUrl}/session/sso_login`, discourseUrl)
    returnUrl.searchParams.set('sso', responsePayloadEncoded)
    returnUrl.searchParams.set('sig', responseSig)

    // Redirect back to Discourse
    return NextResponse.redirect(returnUrl.toString())

  } catch (error) {
    console.error('Discourse SSO error:', error)
    return NextResponse.json(
      { error: 'SSO authentication failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
```

---

## STEP 5: UPDATE COMMUNITY PAGE LINK

### Update: `/src/app/community/page.tsx`

Change line 95 from:
```typescript
href="https://bipolarpeople.discourse.group/session/sso"
```

To:
```typescript
href="/api/discourse/sso"
```

Or better yet, make it dynamic:

```typescript
// Around line 95:
{session ? (
  <a 
    href={`${process.env.NEXT_PUBLIC_DISCOURSE_URL || 'https://community.bipolarpeople.com'}/session/sso_provider?return_path=/`}
    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
  >
    Enter Forum
  </a>
) : (
```

Actually, the cleanest approach is to have users click and be auto-redirected via your SSO endpoint:

```typescript
{session ? (
  <Link 
    href="/api/discourse/sso?return_path=/"
    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
  >
    Enter Forum
  </Link>
) : (
```

Wait, even better - let's make a proper flow:

```typescript
{session ? (
  <a 
    href={`${process.env.NEXT_PUBLIC_DISCOURSE_URL}/session/sso_provider`}
    className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
  >
    Enter Forum
  </a>
) : (
```

And add to your `.env.local` and Vercel:
```
NEXT_PUBLIC_DISCOURSE_URL=https://community.bipolarpeople.com
```

---

## STEP 6: TEST THE INTEGRATION

### 6.1: Manual Test

1. **Register a new account** on bipolarpeople.com
   - Go to `/register`
   - Create account
   - Verify email

2. **Try to access community**
   - Go to `/community`
   - Click "Enter Forum"
   - Should redirect to Discourse SSO
   - Then redirect to your `/api/discourse/sso` endpoint
   - Then redirect back to Discourse logged in

3. **Verify you're logged into Discourse**
   - Should see your username
   - Should be able to post

### 6.2: Debug Common Issues

**Problem: "Invalid signature" error**
```bash
# Solution: Make sure DISCOURSE_SSO_SECRET matches exactly in both:
# 1. Discourse settings (sso secret)
# 2. Your environment variables

# Test your secret:
echo -n "test" | openssl dgst -sha256 -hmac "YOUR_SECRET"
```

**Problem: "SSO not configured" error**
```bash
# Solution: Check environment variables are set
# In Vercel dashboard, verify:
# - DISCOURSE_URL is set
# - DISCOURSE_SSO_SECRET is set
# Then redeploy
```

**Problem: Redirect loop**
```bash
# Solution: Check these Discourse settings:
# - sso provider url: https://bipolarpeople.com/api/discourse/sso
# - sso url: https://bipolarpeople.com/api/discourse/sso
# Both should point to your site, not to Discourse
```

**Problem: "User not found" in Discourse**
```bash
# Solution: Check that user data is being passed correctly
# Add logging to your SSO endpoint:
console.log('SSO User:', discourseUser)
# Verify email, username, external_id are present
```

---

## STEP 7: CONFIGURE DISCOURSE CATEGORIES

Once SSO is working, set up your forum structure:

### Recommended Categories:

1. **Create Categories** (Admin → Categories → New Category)

```
📋 Announcements (Read-only except admins)
├─ Site Updates
└─ Community Guidelines

💬 General Discussion
├─ Introductions
├─ Daily Check-ins
└─ Random Chat

🌡️ Living with Bipolar
├─ Manic Episodes
├─ Depressive Episodes
├─ Mixed Episodes
└─ Stable Periods

💊 Treatment & Medication
├─ Medication Experiences
├─ Therapy Discussions
└─ Alternative Treatments

❤️ Relationships & Life
├─ Family & Friends
├─ Dating & Romance
├─ Work & Career
└─ Parenting

🆘 Support & Crisis
├─ Need to Talk (private, trusted users only)
├─ Crisis Resources
└─ Recovery Stories

🔧 Tools & Tracking
├─ Mood Tracking Tips
├─ Journaling
└─ Episode Management

🧠 Education & Research
├─ Understanding Bipolar
├─ Research & News
└─ Ask the Experts
```

2. **Set Permissions**

```
For each category, configure:
- Who can see
- Who can create topics
- Who can reply
- Auto-watch settings
```

3. **Create Welcome Topics**

For each category, pin a welcome topic explaining:
- What belongs here
- Community guidelines specific to that category
- How to get help

---

## STEP 8: SET UP MODERATION

### 8.1: Assign Moderators

1. Go to Admin → Users
2. Find user → Grant Moderation
3. Recommended: Start with 2-3 moderators

### 8.2: Configure Moderation Settings

**Trust Levels** (Admin → Settings → Trust Levels):
```
Basic User (TL0): Can read, post limited
Member (TL1): Full posting after 1 day + 5 posts
Regular (TL2): Trusted user after 50 days + 100 posts
Leader (TL3): Can recategorize, close topics
```

**Spam Protection** (Admin → Settings → Spam):
```
✅ Enable Akismet (anti-spam)
✅ Enable watching categories
✅ Auto-silence new users with suspicious activity
```

**Flags & Reports** (Admin → Settings → Flags):
```
✅ Notify moderators of flags via email
✅ Hide posts after 3 flags
✅ Auto-hide offensive content
```

### 8.3: Create Moderation Guidelines

Create a private category for moderators with:
- Response templates
- Escalation procedures
- Crisis intervention protocol
- When to involve professional help

---

## STEP 9: CRISIS DETECTION & SAFETY

**CRITICAL:** Set up automated crisis detection

### 9.1: Configure Watched Words

Admin → Settings → Watched Words:

```
Action: Flag
Words: suicide, kill myself, end it all, not worth living, 
       better off dead, etc.

Action: Block
Words: [extreme violence, specific methods]

Action: Require Approval  
Words: [crisis-related but context-dependent]
```

### 9.2: Create Crisis Response Bot

Use Discourse API to automatically respond to flagged posts:

```javascript
// This would run on your backend
// When post is flagged with crisis keywords:

1. Post automatic reply with crisis resources:
   "We see you're going through a difficult time. 
   If you're in crisis, please call:
   - 988 Suicide & Crisis Lifeline
   - 911 for emergencies
   - Crisis Text Line: Text HOME to 741741"

2. Notify moderators immediately
3. Optionally hide post temporarily until moderator reviews
```

### 9.3: Pin Crisis Resources

In every category, pin a topic with:
- Crisis hotline numbers
- When to call 911
- Mental health emergency resources
- How to support someone in crisis

---

## STEP 10: LAUNCH CHECKLIST

Before inviting users:

```
Infrastructure:
[ ] Discourse is running and accessible
[ ] SSL certificate is working (https://)
[ ] Backups are configured
[ ] Email notifications work

SSO:
[ ] Users can log in via SSO
[ ] Username/email sync works
[ ] Avatar sync works
[ ] Logout works on both sites

Content:
[ ] Categories are created
[ ] Welcome topics are pinned
[ ] Guidelines are posted
[ ] Crisis resources are visible

Moderation:
[ ] Moderators are assigned
[ ] Moderation guidelines created
[ ] Crisis keywords configured
[ ] Flag notifications work

Testing:
[ ] Tested with 3+ test accounts
[ ] Verified on mobile
[ ] Checked all permission levels
[ ] Tested crisis flagging
```

---

## DEPLOYMENT STEPS (In Order)

### Day 1 (2-4 hours):

1. **Set up Discourse instance**
   - Create DigitalOcean droplet OR sign up for hosted Discourse
   - Install Discourse via Docker
   - Configure DNS
   - Wait for SSL certificate

2. **Configure Discourse SSO**
   - Generate SSO secret: `openssl rand -hex 32`
   - Enable SSO in Discourse settings
   - Add provider URL

3. **Update environment variables**
   - Add to Vercel
   - Redeploy site

### Day 2 (2-4 hours):

4. **Update your code**
   - Fix SSO endpoint (use code above)
   - Update community page link
   - Test locally first

5. **Deploy and test**
   - Deploy to Vercel
   - Test registration → SSO flow
   - Fix any issues

6. **Set up categories**
   - Create forum structure
   - Write welcome posts
   - Set permissions

### Day 3 (2-3 hours):

7. **Configure moderation**
   - Assign moderators
   - Set up watched words
   - Create crisis response
   - Test flagging system

8. **Final testing**
   - Test complete user journey
   - Verify on mobile
   - Check email notifications

9. **Soft launch**
   - Invite 5-10 beta testers
   - Monitor closely
   - Iterate based on feedback

---

## TROUBLESHOOTING

### SSO Issues

**Check Logs:**
```bash
# On your Discourse server:
cd /var/discourse
./launcher logs app

# Look for SSO errors
./launcher logs app | grep -i sso
```

**Common Fixes:**
```bash
# Restart Discourse:
cd /var/discourse
./launcher restart app

# Rebuild (if settings changed):
./launcher rebuild app  # Takes 5-10 minutes
```

### Performance Issues

```bash
# Check Discourse resource usage:
docker stats

# If using too much RAM:
# Upgrade droplet to 8GB RAM

# Or enable swap:
dd if=/dev/zero of=/swapfile bs=1G count=4
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

---

## COST BREAKDOWN

### Option A: Fully Managed
```
Discourse Hosting: $50/month
Your Vercel site: $20/month
Domain: $15/year
Total Year 1: ~$855
```

### Option B: Self-Hosted
```
DigitalOcean Droplet: $24/month
Your Vercel site: $20/month  
Domain: $15/year
Total Year 1: ~$543
```

### Option C: Free Trial (Testing Only)
```
Discourse free trial: 14 days
Test everything before committing
Then choose Option A or B
```

---

## NEXT STEPS AFTER FORUM IS LIVE

1. **Seed content**
   - Create 5-10 starter topics
   - Encourage initial discussion
   - Post daily check-ins

2. **Invite beta users**
   - Start with 10-20 people
   - Get feedback on UX
   - Iterate

3. **Promote**
   - Post on r/bipolar (carefully, follow rules)
   - Share with NAMI/DBSA groups
   - Email your waitlist

4. **Monitor**
   - Check daily for first 2 weeks
   - Respond to every post initially
   - Build momentum

---

## QUESTIONS TO ANSWER

Before you start, please tell me:

1. **Do you already have a Discourse instance?**
   - Yes → What's the URL?
   - No → Option A (managed) or Option B (self-hosted)?

2. **What's your budget for forum hosting?**
   - $0-25/month → Self-host on DigitalOcean
   - $50+/month → Use official Discourse hosting

3. **Technical comfort level?**
   - Comfortable with SSH/Docker → Self-host
   - Want it to "just work" → Managed hosting

4. **Timeline?**
   - Need it this week → Managed hosting (faster)
   - Can wait → Self-host (more setup)

**Tell me your answers and I'll give you the exact commands to run.**

