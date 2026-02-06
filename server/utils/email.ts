import { Resend } from 'resend'
import { randomBytes } from 'crypto'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    const config = useRuntimeConfig()
    _resend = new Resend(config.resendApiKey)
  }
  return _resend
}

export function generateVerifyToken(): string {
  return randomBytes(32).toString('hex')
}

export function getVerifyTokenExpiration(): Date {
  // Token expires in 24 hours
  return new Date(Date.now() + 24 * 60 * 60 * 1000)
}

export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string
): Promise<void> {
  const config = useRuntimeConfig()
  const appUrl = config.appUrl || 'http://localhost:3000'
  const verifyUrl = `${appUrl}/verify-email?token=${token}`
  const from = config.emailFrom || 'Mittere <onboarding@resend.dev>'

  await getResend().emails.send({
    from,
    to: email,
    subject: 'Verify your email - Mittere',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
          <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; margin: 0 0 24px; font-size: 24px;">Welcome to Mittere!</h1>
            <p style="color: #4a4a4a; line-height: 1.6; margin: 0 0 16px;">
              Hi <strong>${username}</strong>,
            </p>
            <p style="color: #4a4a4a; line-height: 1.6; margin: 0 0 24px;">
              Thanks for signing up! Please verify your email address by clicking the button below.
            </p>
            <a href="${verifyUrl}" style="display: inline-block; background: #3b82f6; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600;">
              Verify Email
            </a>
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 24px 0 0;">
              This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Can't click the button? Copy and paste this link into your browser:<br>
              <a href="${verifyUrl}" style="color: #3b82f6; word-break: break-all;">${verifyUrl}</a>
            </p>
          </div>
        </body>
      </html>
    `,
  })
}
