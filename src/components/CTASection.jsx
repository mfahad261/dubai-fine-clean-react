/**
 * CTASection — The closing call to action — WhatsApp and quote buttons on a dark panel.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: bottom of every page except Contact.
 * WHAT IT DOES:     The closing call to action — WhatsApp and quote buttons on a dark panel.
 */
import { BUSINESS } from '../data/content.js'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import './CTASection.css'

export default function CTASection() {
  return (
    <section className="sec">
      <div className="wrap">
        <Reveal as="div" className="cta dark">
          <div className="ctaInner">
            <span className="eyebrow">Ready when you are</span>
            <h2 className="ed">Book your first clean this week</h2>
            <p className="lede">We take bookings seven days a week. Your fixed written quote is confirmed before anything starts.</p>
            <div className="ctaBtns">
              <Button variant="g" href={BUSINESS.whatsapp} arrow={false} icon="whatsapp">WhatsApp us</Button>
              <Button variant="w" to="/contact">Get a quote</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
