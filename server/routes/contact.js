/**
 * POST /api/contact — the contact form endpoint.
 * ---------------------------------------------------------------------------
 * On a valid submission it sends TWO emails:
 *   1. the enquiry to the business inbox (Reply-To set to the customer)
 *   2. a confirmation to the customer, if they gave an email address
 *
 * The business email is the one that matters. If the confirmation fails —
 * typo'd address, their mail server rejects it — we still report success,
 * because the enquiry did reach the business and telling the customer it
 * failed would make them send it again.
 */
import { Router } from 'express'
import { validateEnquiry, safeHeader } from '../lib/validate.js'
import { getTransport } from '../lib/mailer.js'
import { businessEmail, customerEmail } from '../lib/templates.js'
import { rateLimit } from '../lib/rateLimit.js'

const router = Router()

router.post('/contact', rateLimit({ windowMs: 10 * 60_000, max: 5 }), async (req, res) => {
  // Honeypot: a field hidden from people but filled in by most bots. Answer
  // 200 so the bot believes it worked and doesn't retry with another approach.
  if (req.body?.company) {
    console.warn('[contact] honeypot triggered — silently discarded')
    return res.json({ ok: true })
  }

  const { data, errors, ok } = validateEnquiry(req.body)
  if (!ok) return res.status(400).json({ ok: false, errors })

  const from = process.env.MAIL_FROM || `"Dubai Fine Clean" <${process.env.SMTP_USER}>`
  const to = process.env.MAIL_TO || process.env.SMTP_USER

  let transport
  try {
    transport = getTransport()
  } catch (err) {
    console.error('[contact] transport not configured:', err.message)
    return res.status(500).json({
      ok: false,
      error: "We couldn't send that just now. Please call or WhatsApp us on +971 56 916 9761.",
    })
  }

  // 1. the enquiry — this one must succeed
  try {
    const mail = businessEmail(data)
    await transport.sendMail({
      from,
      to,
      subject: safeHeader(mail.subject),
      html: mail.html,
      text: mail.text,
      ...(data.email ? { replyTo: safeHeader(data.email) } : {}),
    })
  } catch (err) {
    console.error('[contact] failed to send enquiry:', err.message)
    return res.status(502).json({
      ok: false,
      error: "We couldn't send that just now. Please call or WhatsApp us on +971 56 916 9761.",
    })
  }

  // 2. the confirmation — best effort, never blocks a successful reply
  let confirmationSent = false
  if (data.email) {
    try {
      const mail = customerEmail(data)
      await transport.sendMail({
        from,
        to: safeHeader(data.email),
        subject: safeHeader(mail.subject),
        html: mail.html,
        text: mail.text,
      })
      confirmationSent = true
    } catch (err) {
      console.warn('[contact] confirmation to customer failed:', err.message)
    }
  }

  console.log(`[contact] enquiry from ${data.name} <${data.email || 'no email'}> — confirmation ${confirmationSent ? 'sent' : 'not sent'}`)
  res.json({ ok: true, confirmationSent })
})

export default router
