import { sql } from '@vercel/postgres'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

async function clearAllUsers() {
  try {
    console.log('🗑️  Clearing all user registrations and related data...\n')

    // First, let's see what we're deleting
    const userCount = await sql`SELECT COUNT(*) FROM users`
    console.log(`Found ${userCount.rows[0].count} users to delete\n`)

    // Clear user-related data tables first (due to foreign key constraints)
    // These should cascade, but we'll be explicit
    
    console.log('Clearing user-related data...')
    
    // Clear user content data
    await sql`DELETE FROM mood_entries`
    console.log('✓ Cleared mood_entries')
    
    await sql`DELETE FROM medication_logs`
    console.log('✓ Cleared medication_logs')
    
    await sql`DELETE FROM medications`
    console.log('✓ Cleared medications')
    
    await sql`DELETE FROM journal_entries`
    console.log('✓ Cleared journal_entries')
    
    await sql`DELETE FROM episode_timeline`
    console.log('✓ Cleared episode_timeline')
    
    await sql`DELETE FROM episode_plans`
    console.log('✓ Cleared episode_plans')
    
    await sql`DELETE FROM user_settings`
    console.log('✓ Cleared user_settings')
    
    // Clear authentication tokens
    await sql`DELETE FROM verification_tokens`
    console.log('✓ Cleared verification_tokens')
    
    await sql`DELETE FROM password_reset_tokens`
    console.log('✓ Cleared password_reset_tokens')
    
    await sql`DELETE FROM sessions`
    console.log('✓ Cleared sessions')
    
    // Finally, delete all users
    const deleteResult = await sql`DELETE FROM users`
    console.log(`✓ Cleared users (${deleteResult.count || 0} rows deleted)`)
    
    // Verify cleanup
    const remainingUsers = await sql`SELECT COUNT(*) FROM users`
    const remainingTokens = await sql`SELECT COUNT(*) FROM verification_tokens`
    const remainingSessions = await sql`SELECT COUNT(*) FROM sessions`
    
    console.log('\n✅ Cleanup complete!')
    console.log('\nVerification:')
    console.log(`  - Users remaining: ${remainingUsers.rows[0].count}`)
    console.log(`  - Verification tokens remaining: ${remainingTokens.rows[0].count}`)
    console.log(`  - Sessions remaining: ${remainingSessions.rows[0].count}`)
    
    if (remainingUsers.rows[0].count === '0' && 
        remainingTokens.rows[0].count === '0' && 
        remainingSessions.rows[0].count === '0') {
      console.log('\n✨ All user data has been successfully cleared!')
      console.log('   You can now register new test accounts.')
    }

  } catch (error: any) {
    console.error('\n❌ Error clearing users:', error.message)
    console.error('\nPossible issues:')
    console.error('1. DATABASE_URL environment variable not set')
    console.error('2. Database connection failed')
    console.error('3. Check the error message above for details')
    process.exit(1)
  }
}

clearAllUsers()

