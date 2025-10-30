import { sql } from '@vercel/postgres'

async function checkDatabase() {
  try {
    console.log('Checking database tables...\n')

    const tables = [
      'users',
      'verification_tokens',
      'password_reset_tokens',
      'sessions',
      'mood_entries',
      'medications',
      'medication_logs',
      'journal_entries',
      'episode_plans',
    ]

    for (const table of tables) {
      try {
        const result = await sql.query(
          `SELECT COUNT(*) FROM ${table}`
        )
        console.log(`✓ ${table}: ${result.rows[0].count} rows`)
      } catch (error: any) {
        console.error(`✗ ${table}: ${error.message}`)
      }
    }

    console.log('\n✅ Database check complete!')

  } catch (error) {
    console.error('❌ Database connection failed:', error)
    console.error('\nMake sure:')
    console.error('1. DATABASE_URL environment variable is set')
    console.error('2. Database is accessible')
    console.error('3. Schema has been run (see schema.sql)')
  }
}

checkDatabase()
