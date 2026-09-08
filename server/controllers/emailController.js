/**
 * emailController — what happens when someone submits the contact form.
 * ---------------------------------------------------------------------------
 * On a valid submission it sends TWO emails:
 *   1. the enquiry to the business inbox (Reply-To set to the customer, so
 *      hitting reply in the inbox answers them directly)
 *   2. a confirmation to the customer
 *
 * THE BUSINESS EMAIL IS THE ONE THAT MATTERS. If the confirmation fails — a
 * typo'd address, their mail server rejects it — we still report success,
 * because the enquiry did reach the business and telling the customer it
 * failed would only make them send it again.
 */
const { transporter } = require('../config/emailConfig');
const { validateEnquiry, safeHeader } = require('../utils/validate');
const { businessEmail, customerEmail } = require('../utils/templates');
const { checkRate, rateLimitMessage } = require('../utils/rateLimit');

const FALLBACK_ERROR =
  "We couldn't send that just now. Please call or WhatsApp us on +971 56 916 9761.";

exports.sendContactEmail = async (req, res) => {
  // Honeypot: a field hidden from people but filled in by most bots. Answer
  // 200 so the bot believes it worked and doesn't retry another way.
  if (req.body && req.body.company) {
    console.warn('🕷️  honeypot triggered — silently discarded');
    return res.json({ ok: true, success: true });
  }

  const { data, errors, ok } = validateEnquiry(req.body);
  if (!ok) {
    return res.status(400).json({ ok: false, success: false, errors });
  }

  // Throttle AFTER validating, not before. What needs protecting is the
  // mailbox's hourly send allowance, and a rejected submission sends nothing —
  // counting it would only punish a customer who mistyped their email twice
  // and now can't correct it. Anything reaching here is about to send.
  const gate = checkRate(req.ip || req.headers['x-forwarded-for']);
  if (!gate.allowed) {
    return res.status(429).json({
      ok: false,
      success: false,
      error: rateLimitMessage(gate.waitMinutes),
    });
  }

  const from = `"Dubai Fine Clean" <${process.env.EMAIL_USER}>`;
  const to = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

  // 1. the enquiry — this one must succeed
  try {
    const mail = businessEmail(data);
    await transporter.sendMail({
      from,
      to,
      replyTo: safeHeader(data.email),
      subject: safeHeader(mail.subject),
      html: mail.html,
      text: mail.text,
    });
  } catch (err) {
    console.error('❌ failed to send enquiry:', err.message);
    return res.status(502).json({ ok: false, success: false, error: FALLBACK_ERROR });
  }

  // 2. the confirmation — best effort, never blocks a successful reply
  let confirmationSent = false;
  try {
    const mail = customerEmail(data);
    await transporter.sendMail({
      from,
      to: safeHeader(data.email),
      subject: safeHeader(mail.subject),
      html: mail.html,
      text: mail.text,
    });
    confirmationSent = true;
  } catch (err) {
    console.warn('⚠️  confirmation to customer failed:', err.message);
  }

  console.log(
    `✅ enquiry from ${data.name} <${data.email}> — confirmation ${confirmationSent ? 'sent' : 'NOT sent'}`,
  );

  res.json({ ok: true, success: true, confirmationSent });
};
