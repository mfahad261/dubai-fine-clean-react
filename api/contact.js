/**
 * Serverless version of POST /api/contact.
 * ---------------------------------------------------------------------------
 * Same logic as server/routes/contact.js, wrapped for a serverless host
 * (Vercel, Netlify). Use EITHER this or the Express server — not both.
 *
 * On Vercel this works with no configuration: any file in /api becomes an
 * endpoint. Set the same environment variables in the project's dashboard
 * that you have in .env locally.
 *
 * NOTE: the Express version rate-limits in memory, which serverless can't do
 * reliably (each invocation may be a fresh instance). If you deploy this way
 * and get hit by spam, add a service like Upstash Redis, or put Cloudflare
 * Turnstile in front of the form.
 */
import { validateEnquiry, safeHeader } from '../server/lib/validate.js'
import { getTransport } from '../server/lib/mailer.js'
import { businessEmail, customerEmail } from '../server/lib/templates.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})

  if (body.company) return res.status(200).json({ ok: true })   // honeypot

  const { data, errors, ok } = validateEnquiry(body)
  if (!ok) return res.status(400).json({ ok: false, errors })

  const from = process.env.MAIL_FROM || `"Dubai Fine Clean" <${process.env.SMTP_USER}>`
  const to = process.env.MAIL_TO || process.env.SMTP_USER

  try {
    const transport = getTransport()
    const mail = businessEmail(data)
    await transport.sendMail({
      from, to,
      subject: safeHeader(mail.subject),
      html: mail.html,
      text: mail.text,
      ...(data.email ? { replyTo: safeHeader(data.email) } : {}),
    })

    let confirmationSent = false
    if (data.email) {
      try {
        const c = customerEmail(data)
        await transport.sendMail({
          from, to: safeHeader(data.email),
          subject: safeHeader(c.subject), html: c.html, text: c.text,
        })
        confirmationSent = true
      } catch (err) {
        console.warn('[contact] confirmation failed:', err.message)
      }
    }
    return res.status(200).json({ ok: true, confirmationSent })
  } catch (err) {
    console.error('[contact]', err.message)
    return res.status(502).json({
      ok: false,
      error: "We couldn't send that just now. Please call or WhatsApp us on +971 56 916 9761.",
    })
  }
}
