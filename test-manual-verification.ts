import { config } from 'dotenv';

// Load environment variables FIRST
config({ path: '.env.local' });

// Then import the email function
import { sendVerificationEmail } from './src/lib/email';

async function testManualVerification() {
  try {
    console.log('🧪 Testing manual verification email...');
    console.log('AUTH_URL:', process.env.AUTH_URL);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');
    
    // Send verification email for the user that was just created
    await sendVerificationEmail(
      'charles.d.eadie@gmail.com',
      'a824e27f40529565a8aaeb2c2020540a8229f4b50e87e48bd2006a825a5718e0'
    );
    
    console.log('✅ Verification email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
  }
}

testManualVerification();
