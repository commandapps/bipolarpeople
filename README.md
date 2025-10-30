# Bipolar People Community Platform

A supportive community platform for people affected by bipolar disorder, featuring personal stories, practical tools, and crisis resources.

## Features

- 👥 **Community Stories** - Share and read real experiences from the bipolar community
- 📊 **Tools for Management**:
  - Mood Tracker
  - Personal Journal
  - Medication Logs
  - Episode Planner (Safety Plans)
- 🔐 **Secure Authentication** - Email verification and password reset
- 💬 **Discourse Forum Integration** - SSO-enabled community forum
- 📧 **Email Notifications** - Verification and password reset emails
- 🎯 **Crisis Resources** - Emergency contacts and support information

## Tech Stack

- **Framework**: Next.js 15.5 (App Router)
- **Language**: TypeScript
- **Database**: Vercel Postgres (PostgreSQL)
- **Authentication**: NextAuth.js v5
- **Email**: Resend
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel with GitHub Actions CI/CD

## Getting Started

### Prerequisites

- Node.js 20.x
- npm or yarn
- Vercel account (for deployment)
- Resend account (for emails)
- PostgreSQL database (Vercel Postgres recommended)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bipolarpeople.git
cd bipolarpeople
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
# Database
DATABASE_URL=your_database_url

# Auth
AUTH_SECRET=generate_with_openssl_rand_base64_32
AUTH_URL=http://localhost:3000

# Email
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com

# Optional: Discourse
DISCOURSE_URL=your_forum_url
DISCOURSE_SSO_SECRET=your_sso_secret
```

4. Set up the database:
```bash
# Run the schema to create all tables
psql $DATABASE_URL < schema.sql

# Verify tables exist
npm run db:check
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Available Scripts

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Database
npm run db:check     # Check database tables

# Vercel deployment
npm run vercel:whoami   # Check/login to Vercel
npm run vercel:link     # Link project to Vercel
npm run vercel:ids      # Display Vercel IDs for GitHub secrets
npm run vercel:env      # List environment variables
npm run vercel:deploy   # Deploy to production
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push to GitHub
2. Set up Vercel secrets in GitHub repository settings
3. Configure environment variables in Vercel
4. Run database schema (`schema.sql`)
5. Push to `main` branch triggers automatic deployment

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── mood/          # Mood tracking
│   │   ├── journal/       # Journal entries
│   │   ├── medications/   # Medication logs
│   │   └── episodes/      # Episode plans
│   ├── tools/             # Tool pages
│   ├── stories/           # Community stories
│   └── profile/           # User profile
├── components/            # React components
└── lib/                   # Utilities
    ├── auth.ts           # NextAuth configuration
    ├── db.ts             # Database operations
    ├── email.ts          # Email functions
    └── discourse-sso.ts  # Discourse SSO logic
```

## Database Schema

The application uses 9 main tables:
- `users` - User accounts and profiles
- `verification_tokens` - Email verification
- `password_reset_tokens` - Password resets
- `sessions` - Active user sessions
- `mood_entries` - Mood tracking data
- `medications` - Medication records
- `medication_logs` - Medication intake logs
- `journal_entries` - Personal journal entries
- `episode_plans` - Episode/safety plans

See `schema.sql` for complete schema.

## License

Private - All rights reserved

## Support

For technical issues, check:
- [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Vercel deployment logs
- GitHub Actions logs
