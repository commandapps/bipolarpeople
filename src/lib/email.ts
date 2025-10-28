import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.AUTH_URL || 'http://localhost:3004'}/verify-email?token=${token}`
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@bipolarpeople.com',
      to: email,
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
    })
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw new Error('Failed to send verification email')
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.AUTH_URL || 'http://localhost:3004'}/reset-password?token=${token}`
  
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@bipolarpeople.com',
      to: email,
      subject: 'Reset your password - Bipolar People',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Password Reset Request</h1>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
            Reset Password
          </a>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The Bipolar People Team</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    throw new Error('Failed to send password reset email')
  }
}
