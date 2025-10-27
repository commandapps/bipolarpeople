# BipolarPeople.com Authentication Setup Guide

This guide will help you set up the complete authentication system and Discourse SSO integration for BipolarPeople.com.

## Prerequisites

- Next.js 15.5.3+ project
- Vercel account (for Postgres database)
- Resend account (for email service)
- Discourse instance (https://bipolarpeople.discourse.group/)

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Authentication
AUTH_SECRET=your-auth-secret-here
AUTH_URL=https://bipolarpeople.com

# Database
DATABASE_URL=your-vercel-postgres-connection-string

# Discourse SSO
DISCOURSE_URL=https://bipolarpeople.discourse.group
DISCOURSE_SSO_SECRET=your-discourse-sso-secret-here

# Email Service
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@bipolarpeople.com
```

### Generating Secrets

```bash
# Generate AUTH_SECRET
openssl rand -base64 32

# Generate DISCOURSE_SSO_SECRET
openssl rand -base64 32
```

## 2. Database Setup

### Vercel Postgres

1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Create a new Postgres database
4. Copy the connection string to `DATABASE_URL`

### Database Schema

Run the SQL script in `setup-database.sql` in your Vercel Postgres database:

1. Go to Vercel Dashboard → Storage → Your Database → Query
2. Copy and paste the contents of `setup-database.sql`
3. Execute the script

## 3. Email Service Setup

### Resend

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (bipolarpeople.com)
3. Create an API key
4. Add the API key to `RESEND_API_KEY`

## 4. Discourse SSO Configuration

### Discourse Admin Settings

In your Discourse admin panel (https://bipolarpeople.discourse.group/admin), configure:

1. **Enable Discourse Connect:**
   - Go to Settings → Login
   - Set `enable_discourse_connect` to `true`

2. **SSO URL:**
   - Set `discourse_connect_url` to `https://bipolarpeople.com/api/discourse/sso`

3. **SSO Secret:**
   - Set `discourse_connect_secret` to the same value as your `DISCOURSE_SSO_SECRET`

4. **Logout Redirect:**
   - Set `logout_redirect` to `https://bipolarpeople.com`

## 5. Vercel Deployment

### Environment Variables in Vercel

Add all environment variables to your Vercel project:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable from your `.env.local` file
3. Make sure to set them for Production, Preview, and Development

### Deploy

```bash
# Deploy to Vercel
vercel --prod
```

## 6. Testing the Setup

### 1. Test Registration
1. Visit `/register`
2. Create a new account
3. Check email for verification link
4. Click verification link
5. Verify account is created

### 2. Test Login
1. Visit `/login`
2. Sign in with created account
3. Verify you're redirected to the home page
4. Check that user menu appears in navigation

### 3. Test Profile
1. Visit `/profile`
2. Verify user data is displayed
3. Test updating display name
4. Test logout

### 4. Test Community Access
1. Visit `/community`
2. Verify "Enter Forum" button appears when logged in
3. Click "Enter Forum" to test SSO
4. Verify you're logged into Discourse

### 5. Test Password Reset
1. Visit `/forgot-password`
2. Enter email address
3. Check email for reset link
4. Test resetting password

## 7. Security Checklist

- [ ] All environment variables are set
- [ ] Database is properly configured
- [ ] Email service is working
- [ ] Discourse SSO is configured
- [ ] HTTPS is enforced in production
- [ ] Password requirements are enforced
- [ ] Email verification is required
- [ ] Rate limiting is in place
- [ ] CSRF protection is enabled

## 8. Monitoring

### Error Tracking
Consider setting up error tracking with:
- Sentry
- LogRocket
- Bugsnag

### Analytics
Consider adding:
- Google Analytics
- Mixpanel
- PostHog

## 9. Maintenance

### Database Cleanup
Set up a cron job to run the cleanup function:

```sql
SELECT cleanup_expired_tokens();
```

### Email Monitoring
Monitor email delivery rates and bounce rates in Resend dashboard.

### Discourse Monitoring
Monitor SSO success rates and user activity in Discourse admin.

## Troubleshooting

### Common Issues

1. **"Invalid SSO signature"**
   - Check that `DISCOURSE_SSO_SECRET` matches in both systems
   - Verify the secret is properly URL-encoded

2. **"Email verification failed"**
   - Check Resend API key and domain verification
   - Verify `EMAIL_FROM` domain is verified

3. **"Database connection failed"**
   - Check `DATABASE_URL` format
   - Verify Vercel Postgres is active

4. **"User not found"**
   - Check database schema is properly created
   - Verify user exists in database

### Debug Mode

Enable debug logging by adding to `.env.local`:

```bash
NEXTAUTH_DEBUG=true
```

## Support

For issues with this implementation:
1. Check the console logs
2. Verify all environment variables
3. Test each component individually
4. Check Discourse and Resend dashboards for errors

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets
- Regularly rotate API keys
- Monitor for suspicious activity
- Keep dependencies updated
