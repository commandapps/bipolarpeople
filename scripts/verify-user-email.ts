import { sql } from '@vercel/postgres'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

async function verifyUserEmail(email: string) {
  try {
    console.log(`🔍 Looking up user: ${email}\n`)

    // Find the user
    const userResult = await sql`
      SELECT id, email, username, email_verified 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `

    if (userResult.rows.length === 0) {
      console.log(`❌ No user found with email: ${email}`)
      return
    }

    const user = userResult.rows[0]
    console.log(`Found user:`)
    console.log(`  - ID: ${user.id}`)
    console.log(`  - Email: ${user.email}`)
    console.log(`  - Username: ${user.username}`)
    console.log(`  - Email Verified: ${user.email_verified}\n`)

    if (user.email_verified) {
      console.log('✅ Email is already verified!')
      return
    }

    // Get verification token
    const tokenResult = await sql`
      SELECT token, expires_at 
      FROM verification_tokens 
      WHERE user_id = ${user.id} AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `

    if (tokenResult.rows.length === 0) {
      console.log('⚠️  No valid verification token found. Creating new one...')
      
      // Generate new token
      const crypto = await import('crypto')
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      
      await sql`
        INSERT INTO verification_tokens (user_id, token, expires_at)
        VALUES (${user.id}, ${token}, ${expiresAt.toISOString()})
      `
      
      console.log(`✅ Created new verification token`)
      console.log(`\nVerification URL:`)
      console.log(`http://localhost:3000/verify-email?token=${token}`)
      console.log(`\nOr manually verify by running:`)
      console.log(`npm run db:verify -- ${token}`)
    } else {
      const token = tokenResult.rows[0].token
      console.log(`✅ Found valid verification token`)
      console.log(`\nVerification URL:`)
      console.log(`http://localhost:3000/verify-email?token=${token}`)
      console.log(`\nOr manually verify below...`)
    }

    // Manually verify the email
    console.log(`\n🔧 Manually verifying email...`)
    await sql`
      UPDATE users 
      SET email_verified = true 
      WHERE id = ${user.id}
    `
    console.log(`✅ Email verified successfully!`)
    console.log(`\nYou can now log in with:`)
    console.log(`  Email: ${user.email}`)
    console.log(`  Username: ${user.username}`)

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Get email from command line args
const email = process.argv[2]

if (!email) {
  console.log('Usage: npx tsx scripts/verify-user-email.ts <email>')
  console.log('\nExample:')
  console.log('  npx tsx scripts/verify-user-email.ts charlie.eadie@thedemexgroup.com')
  process.exit(1)
}

verifyUserEmail(email)

