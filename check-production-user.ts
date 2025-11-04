/**
 * Check if user exists in production database
 */

import { sql } from '@vercel/postgres'

async function checkUser() {
  try {
    const email = 'charlie@commandapplications.com'
    
    console.log(`Checking for user: ${email}`)
    
    const result = await sql`
      SELECT id, email, email_verified, created_at 
      FROM users 
      WHERE email = ${email}
    `
    
    if (result.rows.length > 0) {
      console.log('\n✅ User found in database:')
      console.log(result.rows[0])
    } else {
      console.log('\n❌ User NOT found in database')
      console.log('This means the registration did not complete')
    }
    
  } catch (error) {
    console.error('❌ Error checking user:', error)
  }
}

checkUser()

