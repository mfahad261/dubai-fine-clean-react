/**
 * Footer — Site footer: brand, service links, company links and contact details.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: bottom of every page.
 * WHAT IT DOES:     Site footer: brand, service links, company links and contact details.
 */
import { Link } from 'react-router-dom'
import { CATS } from '../data/services.js'
import { BUSINESS } from '../data/content.js'
import Icon from './Icon.jsx'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer dark">
      <div className="wrap footerGrid">
        <div className="fCol fBrand">
          <span className="brandTx">
            <span className="n1"><b style={{ color: 'var(--green)' }}>Dubai</b> Fine Clean</span>
          </span>
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
