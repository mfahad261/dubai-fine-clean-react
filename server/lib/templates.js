/**
 * templates — the two emails sent for every enquiry.
 * ---------------------------------------------------------------------------
 *   1. TO THE BUSINESS  — the enquiry itself, laid out to be read fast on a
 *                         phone, with the customer's number tappable and
 *                         Reply-To set so hitting reply reaches them directly.
 *   2. TO THE CUSTOMER  — confirmation that it arrived, what happens next.
 *
 * Every email client renders HTML differently and many block CSS entirely, so
 * these use tables and inline styles rather than modern layout, and each one
 * ships a plain-text version for clients that refuse HTML altogether.
 */
import { escapeHtml } from './validate.js'

const BRAND = {
  name: 'Dubai Fine Clean',
  navy: '#0E1B2E',
  green: '#22B457',
  blue: '#0B63D8',
  slate: '#54677F',
  line: '#E3E9F1',
  phone: '+971 56 916 9761',
  phoneHref: 'tel:+971569169761',
  whatsapp: 'https://wa.me/971569169761',
  address: 'Empire Heights A — 16F-A-04, Business Bay, Dubai',
}

const row = (label, value) => value
  ? `<tr>
       <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.slate};font-size:12px;text-transform:uppercase;letter-spacing:.08em;width:150px;vertical-align:top">${escapeHtml(label)}</td>
       <td style="padding:10px 0;border-bottom:1px solid ${BRAND.line};color:${BRAND.navy};font-size:15px;vertical-align:top">${value}</td>
     </tr>`
  : ''

const shell = (heading, bodyHtml) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#F4F7FB;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FB;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;border-radius:6px;overflow:hidden;border:1px solid ${BRAND.line};">
        <tr><td style="background:${BRAND.navy};padding:24px 28px;">
          <div style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:-.3px;">
            <span style="color:${BRAND.green};">Dubai</span> Fine Clean
          </div>
          <div style="color:rgba(255,255,255,.6);font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;margin-top:6px;">
            ${escapeHtml(heading)}
          </div>
        </td></tr>
        <tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;">${bodyHtml}</td></tr>
        <tr><td style="background:#F4F7FB;padding:18px 28px;border-top:1px solid ${BRAND.line};font-family:Arial,Helvetica,sans-serif;color:${BRAND.slate};font-size:12px;line-height:1.6;">
          ${escapeHtml(BRAND.address)}<br>
          <a href="${BRAND.phoneHref}" style="color:${BRAND.blue};text-decoration:none;">${escapeHtml(BRAND.phone)}</a>
          &nbsp;·&nbsp;
          <a href="${BRAND.whatsapp}" style="color:${BRAND.blue};text-decoration:none;">WhatsApp</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

/* ---------------------------------------------------------------- business */
export function businessEmail(d) {
  const services = d.services.length
    ? d.services.map((s) => `<span style="display:inline-block;background:#E9F1FD;color:${BRAND.blue};font-size:12px;padding:5px 10px;border-radius:99px;margin:0 5px 5px 0;">${escapeHtml(s)}</span>`).join('')
    : '<span style="color:' + BRAND.slate + ';font-size:14px;">Not specified</span>'

  const html = shell('New enquiry', `
    <p style="margin:0 0 4px;font-size:19px;color:${BRAND.navy};font-weight:bold;">${escapeHtml(d.name)}</p>
    <p style="margin:0 0 22px;font-size:13px;color:${BRAND.slate};">wants a quote. Reply to this email to answer them directly.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row('Mobile', `<a href="tel:${escapeHtml(d.mobile.replace(/[^\d+]/g, ''))}" style="color:${BRAND.blue};text-decoration:none;font-weight:bold;">${escapeHtml(d.mobile)}</a>`)}
      ${row('Email', d.email ? `<a href="mailto:${escapeHtml(d.email)}" style="color:${BRAND.blue};text-decoration:none;">${escapeHtml(d.email)}</a>` : '')}
      ${row('Community', escapeHtml(d.community))}
      ${row('Property', escapeHtml(d.type))}
      ${row('Size', escapeHtml(d.size))}
      ${row('Services', services)}
      ${row('Notes', d.notes ? escapeHtml(d.notes).replace(/\n/g, '<br>') : '')}
    </table>
    <p style="margin:24px 0 0;font-size:12px;color:${BRAND.slate};">
      Received ${escapeHtml(new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dubai', dateStyle: 'full', timeStyle: 'short' }))} (Dubai time)
    </p>`)

  const text = [
    `NEW ENQUIRY — ${d.name}`,
    ``,
    `Mobile:    ${d.mobile}`,
    d.email ? `Email:     ${d.email}` : null,
    d.community ? `Community: ${d.community}` : null,
    d.type ? `Property:  ${d.type}` : null,
    d.size ? `Size:      ${d.size}` : null,
    d.services.length ? `Services:  ${d.services.join(', ')}` : null,
    d.notes ? `\nNotes:\n${d.notes}` : null,
    ``,
    `Received ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dubai' })} Dubai time`,
  ].filter(Boolean).join('\n')

  return { subject: `New enquiry — ${d.name}${d.community ? ` (${d.community})` : ''}`, html, text }
}

/* ---------------------------------------------------------------- customer */
export function customerEmail(d) {
  const first = d.name.split(' ')[0] || 'there'

  const html = shell('Enquiry received', `
    <p style="margin:0 0 4px;font-size:19px;color:${BRAND.navy};font-weight:bold;">Thanks, ${escapeHtml(first)}.</p>
    <p style="margin:0 0 20px;font-size:15px;color:${BRAND.slate};line-height:1.7;">
      We've got your enquiry. A member of the team will call or WhatsApp you shortly to confirm
      the details and arrange a time. If it's urgent, call us directly on
      <a href="${BRAND.phoneHref}" style="color:${BRAND.blue};text-decoration:none;font-weight:bold;">${escapeHtml(BRAND.phone)}</a>.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F7FB;border-radius:6px;">
      <tr><td style="padding:18px 20px;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:${BRAND.slate};margin-bottom:10px;">What you sent us</div>
        ${d.type || d.size ? `<div style="font-size:14px;color:${BRAND.navy};margin-bottom:6px;">${escapeHtml([d.type, d.size].filter(Boolean).join(' · '))}</div>` : ''}
        ${d.community ? `<div style="font-size:14px;color:${BRAND.navy};margin-bottom:6px;">${escapeHtml(d.community)}</div>` : ''}
        ${d.services.length ? `<div style="font-size:14px;color:${BRAND.navy};">${escapeHtml(d.services.join(', '))}</div>` : ''}
        ${d.notes ? `<div style="font-size:14px;color:${BRAND.slate};margin-top:10px;font-style:italic;">"${escapeHtml(d.notes)}"</div>` : ''}
      </td></tr>
    </table>
    <p style="margin:22px 0 0;font-size:13px;color:${BRAND.slate};line-height:1.7;">
      Your quote is confirmed in writing before any work starts, and it doesn't change once the
      team is on site.
    </p>
    <p style="margin:20px 0 0;">
      <a href="${BRAND.whatsapp}" style="display:inline-block;background:${BRAND.green};color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 22px;border-radius:99px;">Message us on WhatsApp</a>
    </p>`)

  const text = [
    `Thanks, ${first}.`,
    ``,
    `We've got your enquiry. A member of the team will call or WhatsApp you shortly`,
    `to confirm the details and arrange a time.`,
    ``,
    `If it's urgent, call ${BRAND.phone}.`,
    ``,
    `What you sent us:`,
    [d.type, d.size].filter(Boolean).join(' · ') || null,
    d.community || null,
    d.services.length ? d.services.join(', ') : null,
    d.notes ? `"${d.notes}"` : null,
    ``,
    `Your quote is confirmed in writing before any work starts.`,
    ``,
    `${BRAND.name} — ${BRAND.address}`,
  ].filter(Boolean).join('\n')

  return { subject: `We've got your enquiry — ${BRAND.name}`, html, text }
}
