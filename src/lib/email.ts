import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// Base email template with crisis resources footer
const getBaseTemplate = (content: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bipolar People</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2563eb, #9333ea); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
    .footer { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
    .crisis { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 6px; margin-top: 20px; }
    .crisis h3 { color: #dc2626; margin: 0 0 10px 0; }
    .crisis p { color: #991b1b; margin: 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">Bipolar People</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">A supportive community for your journey</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <div class="crisis">
        <h3>In Crisis? Get Immediate Help</h3>
        <p><strong>Call 988</strong> - Suicide & Crisis Lifeline (24/7)</p>
        <p><strong>Call 911</strong> - Emergency Services</p>
        <p>Our community is for peer support. If you're in crisis, please contact professional services.</p>
      </div>
      <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px;">
        © 2024 Bipolar People. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`

export async function sendVerificationEmail(email: string, token: string, name: string): Promise<void> {
  const verificationUrl = `${process.env.AUTH_URL}/verify-email?token=${token}`
  
  const content = `
    <h2>Welcome to Bipolar People, ${name}!</h2>
    <p>Thank you for joining our supportive community. To complete your registration and access our forum, please verify your email address.</p>
    <p style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" class="button">Verify Email Address</a>
    </p>
    <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #6b7280;">${verificationUrl}</p>
    <p><strong>This link will expire in 24 hours.</strong></p>
    <p>Once verified, you'll be able to access our private community forum and connect with others who understand your journey.</p>
  `

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: 'Verify your email - Bipolar People',
    html: getBaseTemplate(content),
    text: `Welcome to Bipolar People, ${name}!\n\nPlease verify your email by visiting: ${verificationUrl}\n\nThis link expires in 24 hours.\n\nOnce verified, you'll be able to access our private community forum.`
  })
}

export async function sendPasswordResetEmail(email: string, token: string, name: string): Promise<void> {
  const resetUrl = `${process.env.AUTH_URL}/reset-password?token=${token}`
  
  const content = `
    <h2>Password Reset Request</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password for your Bipolar People account.</p>
    <p style="text-align: center; margin: 30px 0;">
      <a href="${resetUrl}" class="button">Reset Password</a>
    </p>
    <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #6b7280;">${resetUrl}</p>
    <p><strong>This link will expire in 1 hour.</strong></p>
    <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
  `

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: 'Reset your password - Bipolar People',
    html: getBaseTemplate(content),
    text: `Password Reset Request\n\nHi ${name},\n\nReset your password: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.`
  })
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const forumUrl = `${process.env.AUTH_URL}/community`
  
  const content = `
    <h2>Welcome to the Community!</h2>
    <p>Hi ${name},</p>
    <p>Your email has been verified and you're now a member of our supportive community!</p>
    <p>You can now:</p>
    <ul>
      <li>Access our private community forum</li>
      <li>Connect with others who understand your journey</li>
      <li>Share your experiences in a safe, moderated space</li>
      <li>Find peer support and validation</li>
    </ul>
    <p style="text-align: center; margin: 30px 0;">
      <a href="${forumUrl}" class="button">Enter Community Forum</a>
    </p>
    <p>Remember, our community is actively moderated by mental health professionals and trained peer supporters. Anonymous participation is always welcome.</p>
    <p>We're here to support you every step of the way.</p>
  `

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: 'Welcome to the Bipolar People Community!',
    html: getBaseTemplate(content),
    text: `Welcome to the Community!\n\nHi ${name},\n\nYour email has been verified! You can now access our private community forum at: ${forumUrl}\n\nOur community is here to support you every step of the way.`
  })
}

export async function sendPasswordChangedEmail(email: string, name: string): Promise<void> {
  const content = `
    <h2>Password Changed Successfully</h2>
    <p>Hi ${name},</p>
    <p>Your password has been successfully changed for your Bipolar People account.</p>
    <p>If you didn't make this change, please contact our support team immediately.</p>
    <p>For security reasons, you may need to log in again on all your devices.</p>
  `

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject: 'Password changed - Bipolar People',
    html: getBaseTemplate(content),
    text: `Password Changed Successfully\n\nHi ${name},\n\nYour password has been changed. If you didn't make this change, please contact support.`
  })
}
