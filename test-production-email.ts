import { Resend } from 'resend';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

async function testProductionEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    console.log('🧪 Testing production email sending...');
    console.log('API Key:', process.env.RESEND_API_KEY ? '✅ Found' : '❌ Missing');
    
    // Test sending a verification email using production URL
    const verificationUrl = `https://bipolarpeople-1zf5sj958-charlie-eadies-projects.vercel.app/verify-email?token=a824e27f40529565a8aaeb2c2020540a8229f4b50e87e48bd2006a825a5718e0`;
    
    const { data, error } = await resend.emails.send({
      from: 'Bipolar People <noreply@bipolarpeople.com>',
      to: ['charles.d.eadie@gmail.com'],
      subject: 'Test Email Verification - Bipolar People',
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

testProductionEmail();
