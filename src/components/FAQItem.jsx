/**
 * FAQItem — One expandable question.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: inside FAQSection.
 * WHAT IT DOES:     One expandable question.
 */
import { useState } from 'react'
import Icon from './Icon.jsx'
import './FAQItem.css'

export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faqItem ${open ? 'on' : ''}`}>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        <span>{q}</span>
        <Icon name="chevron" size={16} className="faqCaret" />
      </button>
      {open && <p>{a}</p>}
    </div>
  )
}
