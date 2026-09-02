/**
 * FAQSection — The FAQ accordion.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home, /about and /contact.
 * WHAT IT DOES:     The FAQ accordion.
 * NOTES:            Questions come from FAQS in data/content.js.
 */
import { FAQS } from '../data/content.js'
import FAQItem from './FAQItem.jsx'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import './FAQSection.css'

export default function FAQSection() {
  return (
    <section className="sec">
      <div className="wrap faqWrap">
        <Reveal as="div" className="faqHead">
          <Eyebrow tone="green">FAQ</Eyebrow>
          <h2 className="ed" style={{ marginTop: 16 }}>Questions, answered</h2>
          <p className="lede" style={{ marginTop: 14 }}>For a real enquiry, call or WhatsApp our team directly.</p>
        </Reveal>
        <div className="faqList">
          {FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}
