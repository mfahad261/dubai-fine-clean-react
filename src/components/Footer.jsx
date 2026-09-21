/**
 * Footer — Site footer: brand, service links, company links and contact details.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: bottom of every page.
 * WHAT IT DOES:     Site footer: brand, service links, company links and contact details.
 */
import { Link } from 'react-router-dom'
import { CATS } from '../data/services.js'
import { BUSINESS } from '../data/content.js'
import { useCookieConsent } from '../context/CookieConsentContext.jsx'
import Icon from './Icon.jsx'
// The knockout (all-white) lockup from the brand kit. The full-colour logo
// puts #084e8d text on a #0E1B2E footer, which is very nearly invisible.
import logo from '../assets/logo/logo-white.svg'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { openPreferences } = useCookieConsent()
  return (
    <footer className="footer dark">
      <div className="wrap footerGrid">
        <div className="fCol fBrand">
          {/* 678 x 641 is the artwork's real cropped aspect ratio — stating it
              lets the browser reserve the box before the SVG lands, so the
              footer text doesn't jump. */}
          <Link to="/" className="fLogoLink" aria-label="Dubai Fine Clean — home">
            <img className="fLogo" src={logo} alt="Dubai Fine Clean" width="678" height="641" loading="lazy" decoding="async" />
          </Link>
          <p className="lede">Premium residential, commercial and specialist cleaning across Dubai, trading since {BUSINESS.since}.</p>
          <div className="fSocial">
            <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" filled size={17} /></a>
            <a href={BUSINESS.phoneHref} aria-label="Call"><Icon name="phone" filled size={16} /></a>
          </div>
        </div>

        <div className="fCol">
          <h5>Services</h5>
          {CATS.slice(0, 6).map((c) => <Link key={c.id} to={`/services/${c.id}`}>{c.name}</Link>)}
        </div>

        <div className="fCol">
          <h5>Company</h5>
          <Link to="/deep-cleaning">Deep Cleaning</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">All Services</Link>
          <Link to="/contact">Contact</Link>
          <button type="button" onClick={openPreferences}>Cookie settings</button>
        </div>

        <div className="fCol">
          <h5>Get in touch</h5>
          <a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a>
          <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <div className="fAddr">{BUSINESS.addressLine1}<br />{BUSINESS.addressLine2}</div>
        </div>
      </div>
      <div className="wrap fBottom">
        <span>© {year} Dubai Fine Clean. All rights reserved.</span>
        <span>Business Bay, Dubai, UAE</span>
      </div>
    </footer>
  )
}
