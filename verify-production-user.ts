/**
 * Manually verify a user in production database
 * Run this if you didn't receive the verification email
 */

import { db } from './src/lib/db'

async function verifyUser() {
  try {
    const email = 'charlie@commandapplications.com'
    
    console.log(`Verifying user: ${email}`)
    
    // Check if user exists
    const user = await db.getUserByEmail(email)
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    console.log('✅ User found:', {
      id: user.id,
      email: user.email,
      email_verified: user.email_verified
    })
    
    if (user.email_verified) {
      console.log('✅ Email already verified!')
      return
    }
    
    // Verify the email
    await db.verifyUserEmail(email)
    console.log('✅ Email verified successfully!')
    console.log('You can now login at bipolarpeople.com')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

verifyUser()

