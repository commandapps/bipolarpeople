import { Resend } from 'resend';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function testLatestVerification() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    console.log('🧪 Testing latest verification email...');
    console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');
    
    // Use the latest token from the database
    const verificationUrl = `https://www.bipolarpeople.com/verify-email?token=acdcba2f32cb883c080aa2b2440848368d635298face5ea50803b42215270ba9`;
    
    const { data, error } = await resend.emails.send({
      from: 'Bipolar People <noreply@bipolarpeople.com>',
      to: ['charlie@cmdcapital.co'],
      subject: 'Verify your email address - Bipolar People',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Bipolar People</h1>
          <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Verify Email Address
          </a>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The Bipolar People Team</p>
        </div>
      `,
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

testLatestVerification();
