/**
 * mailer — the SMTP transport.
 * ---------------------------------------------------------------------------
 * Configured for Gmail by default, but every value comes from the environment,
 * so switching provider later (Resend, Brevo, SendGrid, the client's own mail
 * server) is a change to .env and nothing else. No provider name is hard-coded
 * anywhere in this file.
 *
 * GMAIL NEEDS AN APP PASSWORD, not the account password. See SETUP-EMAIL.md.
 */
import nodemailer from 'nodemailer'

let cached = null

export function getTransport() {
  if (cached) return cached

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'Email is not configured. Copy .env.example to .env and fill in SMTP_USER ' +
      'and SMTP_PASS. See SETUP-EMAIL.md for how to get a Gmail app password.',
    )
  }

  const port = Number(SMTP_PORT || 465)

  cached = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,            // 465 = implicit TLS, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    // Don't let a hung SMTP connection hold the request open forever.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  return cached
}

/** Confirms the credentials actually work — used by `npm run mail:check`. */
export async function verifyTransport() {
  const t = getTransport()
  await t.verify()
  return true
}
