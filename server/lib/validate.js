/**
 * validate — checks a contact-form submission before we act on it.
 * ---------------------------------------------------------------------------
 * Never trust what arrives from a browser. Anyone can post anything to this
 * endpoint with a single curl command, so everything is checked server-side
 * regardless of what the form already validated.
 */

const MAX = { name: 80, mobile: 32, email: 120, community: 80, type: 60, size: 60, notes: 2000 }

// Deliberately loose. Strict email regexes reject valid addresses far more
// often than they catch bad ones, and the confirmation email is the real test.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const str = (v) => (typeof v === 'string' ? v.trim() : '')

export function validateEnquiry(body = {}) {
  const errors = {}

  const data = {
    name: str(body.name),
    mobile: str(body.mobile),
    email: str(body.email),
    community: str(body.community),
    type: str(body.type),
    size: str(body.size),
    notes: str(body.notes),
    services: Array.isArray(body.services)
      ? body.services.filter((s) => typeof s === 'string').slice(0, 20).map((s) => s.slice(0, 60))
      : [],
  }

  if (data.name.length < 2) errors.name = 'Please tell us your name.'
  if (data.mobile.length < 6) errors.mobile = 'Please give us a number we can reach you on.'

  // Email is optional on the form — but if we don't have one, we can't send a
  // confirmation. Handled by the caller, not treated as an error here.
  if (data.email && !EMAIL.test(data.email)) errors.email = "That email address doesn't look right."

  for (const [field, limit] of Object.entries(MAX)) {
    if (data[field] && data[field].length > limit) {
      errors[field] = `That's longer than we can accept (${limit} characters).`
    }
  }

  // Bots love pasting links. A human enquiry about cleaning rarely contains
  // three URLs, so treat that as spam rather than a genuine message.
  const links = (data.notes.match(/https?:\/\//gi) || []).length
  if (links >= 3) errors.notes = 'Please remove the links from your message.'

  return { data, errors, ok: Object.keys(errors).length === 0 }
}

/**
 * Escapes text before it goes into an HTML email. Without this, a name like
 * `<img onerror=...>` would render as live markup in the recipient's inbox.
 */
export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Strips anything that could inject extra headers into an email. A newline in
 * a subject line is how header-injection attacks start.
 */
export function safeHeader(value = '') {
  return String(value).replace(/[\r\n]+/g, ' ').trim().slice(0, 160)
}
