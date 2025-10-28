import { Resend } from 'resend';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    console.log('🧪 Testing Resend API key...');
    console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');
    
    // Test sending a simple email using verified domain
    const { data, error } = await resend.emails.send({
      from: 'Bipolar People <noreply@bipolarpeople.com>',
      to: ['charlie.eadie@thedemexgroup.com'],
      subject: 'Test Email from Bipolar People App',
      html: '<p>This is a test email to verify the Resend API key is working correctly!</p>',
    });

    if (error) {
      console.error('❌ Error sending email:', error);
    } else {
      console.log('✅ Email sent successfully!');
      console.log('Email ID:', data?.id);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testEmail();
