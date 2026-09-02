/**
 * ContactInfoCard — Phone, WhatsApp, address and opening hours as tappable rows.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /contact, beside the form.
 * WHAT IT DOES:     Phone, WhatsApp, address and opening hours as tappable rows.
 * NOTES:            Details come from BUSINESS in data/content.js — change them once, there.
 */
import { BUSINESS } from '../data/content.js'
import Icon from './Icon.jsx'
import './ContactInfoCard.css'

const ROWS = [
  { icon: 'phone', label: 'Call us, 7 days a week', value: BUSINESS.phone, href: BUSINESS.phoneHref },
  { icon: 'whatsapp', label: 'WhatsApp', value: BUSINESS.phone, href: BUSINESS.whatsapp },
  { icon: 'pin', label: 'Visit us', value: `${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}` },
  { icon: 'clock', label: 'Hours', value: '7 days a week, 8am – 10pm' },
]

export default function ContactInfoCard() {
  return (
    <div className="contactInfo">
      {ROWS.map((r) => {
        const body = (
          <>
            <span className="ciIcon"><Icon name={r.icon} filled={r.icon === 'whatsapp'} size={18} /></span>
            <div>
              <div className="ciLabel">{r.label}</div>
              <div className="ciValue">{r.value}</div>
            </div>
          </>
        )
        return r.href
          ? <a className="ciRow" key={r.label} href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{body}</a>
          : <div className="ciRow" key={r.label}>{body}</div>
      })}
    </div>
  )
}
