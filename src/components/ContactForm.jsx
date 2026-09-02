/**
 * ContactForm — the enquiry form on /contact.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /contact.
 * WHAT IT DOES:     Collects the enquiry and posts it to /api/contact, which
 *                   emails the business AND sends the customer a confirmation.
 *
 * STATES: idle → sending → sent, or → error with the reason and the phone
 * number, so a failure never leaves someone with no way to reach the company.
 *
 * SPAM: the `company` field is a honeypot — hidden from people, filled in by
 * most bots. The server discards anything that arrives with it set.
 *
 * BACKEND: server/routes/contact.js (or api/contact.js if deployed serverless).
 * Nothing works until .env exists — see SETUP-EMAIL.md.
 */
import { useState } from 'react'
import { CHIPS, BUSINESS } from '../data/content.js'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import './ContactForm.css'

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Townhouse', 'Office', 'Retail unit', 'Warehouse', 'Restaurant', 'Salon or spa']
const SIZES = ['Studio', '1 bedroom', '2 bedrooms', '3 bedrooms', '4 bedrooms', '5+ bedrooms', 'Commercial — under 200 m²', 'Commercial — 200 m²+']

const initial = {
  name: '', mobile: '', email: '', community: '',
  type: PROPERTY_TYPES[0], size: SIZES[2], notes: '',
  company: '', // honeypot — must stay empty
}

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [picked, setPicked] = useState([])
  const [status, setStatus] = useState('idle')     // idle | sending | sent | error
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (fieldErrors[key]) setFieldErrors((p) => ({ ...p, [key]: undefined }))
  }
  const toggleChip = (c) =>
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]))

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setMessage('')
    setFieldErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, services: picked }),
      })

      // A non-JSON reply means the API isn't running or something proxied
      // wrongly — say so plainly rather than throwing a parse error.
      const payload = await res.json().catch(() => null)
      if (!payload) throw new Error('The enquiry service is not responding.')

      if (!res.ok || !payload.ok) {
        if (payload.errors) {
          setFieldErrors(payload.errors)
          setStatus('error')
          setMessage('Please check the highlighted fields.')
          return
        }
        throw new Error(payload.error || 'That did not go through.')
      }

      setConfirmed(Boolean(payload.confirmationSent))
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'That did not go through.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="formCard sent">
        <span className="sentTick"><Icon name="check" size={26} strokeWidth={2.4} /></span>
        <h3>Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''} — request received.</h3>
        <p className="lede">
          A member of the team will call or WhatsApp you shortly to confirm the details and
          arrange a time.
          {confirmed && ' We have also emailed you a copy.'}
        </p>
        <Button
          variant="o"
          arrow={false}
          onClick={() => { setForm(initial); setPicked([]); setStatus('idle'); setConfirmed(false) }}
        >
          Send another request
        </Button>
      </div>
    )
  }

  const busy = status === 'sending'

  return (
    <div className="formCard">
      <form onSubmit={submit} noValidate>
        <div className="fieldRow">
          <div className="field">
            <label htmlFor="cf-name">Your name</label>
            <input id="cf-name" type="text" required placeholder="Full name"
              value={form.name} onChange={update('name')} disabled={busy}
              aria-invalid={!!fieldErrors.name} />
            {fieldErrors.name && <span className="fieldErr">{fieldErrors.name}</span>}
          </div>
          <div className="field">
            <label htmlFor="cf-mobile">Mobile / WhatsApp</label>
            <input id="cf-mobile" type="tel" required placeholder="+971 5X XXX XXXX"
              value={form.mobile} onChange={update('mobile')} disabled={busy}
              aria-invalid={!!fieldErrors.mobile} />
            {fieldErrors.mobile && <span className="fieldErr">{fieldErrors.mobile}</span>}
          </div>
        </div>

        <div className="fieldRow">
          <div className="field">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" type="email" placeholder="you@email.com"
              value={form.email} onChange={update('email')} disabled={busy}
              aria-invalid={!!fieldErrors.email} />
            {fieldErrors.email
              ? <span className="fieldErr">{fieldErrors.email}</span>
              : <span className="fieldHint">We'll email you a copy of your request.</span>}
          </div>
          <div className="field">
            <label htmlFor="cf-community">Community</label>
            <input id="cf-community" type="text" placeholder="e.g. Business Bay"
              value={form.community} onChange={update('community')} disabled={busy} />
          </div>
        </div>

        <div className="fieldRow">
          <div className="field">
            <label htmlFor="cf-type">Property type</label>
            <select id="cf-type" value={form.type} onChange={update('type')} disabled={busy}>
              {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cf-size">Size</label>
            <select id="cf-size" value={form.size} onChange={update('size')} disabled={busy}>
              {SIZES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label>What do you need? (select any)</label>
          <div className="chips">
            {CHIPS.map((c) => (
              <button type="button" key={c} disabled={busy}
                className={`chip ${picked.includes(c) ? 'on' : ''}`}
                onClick={() => toggleChip(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="cf-notes">Anything else</label>
          <textarea id="cf-notes" rows={4} disabled={busy}
            placeholder="Access notes, preferred date, condition of the property…"
            value={form.notes} onChange={update('notes')} />
          {fieldErrors.notes && <span className="fieldErr">{fieldErrors.notes}</span>}
        </div>

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <div className="hpField" aria-hidden="true">
          <label htmlFor="cf-company">Company (leave this empty)</label>
          <input id="cf-company" type="text" tabIndex={-1} autoComplete="off"
            value={form.company} onChange={update('company')} />
        </div>

        <Button variant="b" type="submit" className="fullWidth" arrow={!busy} disabled={busy}>
          {busy ? 'Sending…' : 'Send request'}
        </Button>

        {status === 'error' && (
          <div className="formError" role="alert">
            {message}{' '}
            <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
          </div>
        )}

        <div className="formNote">
          We reply during working hours. You can also reach us on{' '}
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">{BUSINESS.phone}</a>.
        </div>
      </form>
    </div>
  )
}
