/**
 * MobileMenu — The full-screen navigation drawer for phones and tablets.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: header, below 1080px.
 * WHAT IT DOES:     The full-screen navigation drawer for phones and tablets.
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CATS } from '../data/services.js'
import { BUSINESS } from '../data/content.js'
import Icon from './Icon.jsx'
import './MobileMenu.css'

export default function MobileMenu({ open, onClose }) {
  const [subOpen, setSubOpen] = useState(false)

  return (
    <div className={`mobileMenu ${open ? 'on' : ''}`}>
      <Link to="/" onClick={onClose}>Home</Link>
      <button type="button" onClick={() => setSubOpen((v) => !v)} className="withCaret">
        Our Services <Icon name="chevron" size={14} className={subOpen ? 'rot' : ''} />
      </button>
      {subOpen && (
        <div className="mmSub">
          {CATS.map((c) => (
            <Link key={c.id} to={`/services/${c.id}`} onClick={onClose}>{c.name}</Link>
          ))}
          <Link to="/services" onClick={onClose}>View all services</Link>
        </div>
      )}
      <Link to="/deep-cleaning" onClick={onClose}>Deep Cleaning</Link>
      <Link to="/about" onClick={onClose}>About Us</Link>
      <Link to="/contact" onClick={onClose}>Contact Us</Link>
      <div className="mmContact">
        <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
        <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
        <div>{BUSINESS.addressLine1}<br />{BUSINESS.addressLine2}</div>
      </div>
    </div>
  )
}
