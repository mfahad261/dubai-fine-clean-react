/**
 * NonNegotiables — Six operating rules the business runs on.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /about.
 * WHAT IT DOES:     Six operating rules the business runs on.
 */
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import SplitText from './SplitText.jsx'
import './NonNegotiables.css'

const ITEMS = [
  { t: 'Experienced professionals', d: 'Skilled, trained staff who understand the needs of homes, offices and commercial spaces. Uniformed, ID-carried, background checked.', p: 'M12 2l8 3.5v6c0 5.4-3.5 8.8-8 10-4.5-1.2-8-4.6-8-10v-6zM8.5 12l2.5 2.5L16 9.5' },
  { t: 'Eco-friendly products', d: 'Non-toxic, low-residue chemistry that is safe for children, pets and the environment. Colour-coded cloths prevent cross-contamination.', p: 'M12 21c4.2 0 7-3 7-6.6C19 9.6 12 3 12 3S5 9.6 5 14.4C5 18 7.8 21 12 21z' },
  { t: 'Comprehensive services', d: 'From a weekly maintenance visit to AC duct work and façade access — every requirement met under one roof, by one accountable team.', p: 'M4 3h16v18H4zM8 8h8M8 12h8M8 16h5' },
  { t: 'Flexible scheduling', d: 'We work around your schedule, seven days a week including Fridays and public holidays, and agree a time that suits the property.', p: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2' },
  { t: 'Affordable rates', d: 'Competitive pricing without cutting standards. A fixed written quote before we begin, and no additions once the team is on site.', p: 'M12 3v18M16.5 7H10a2.8 2.8 0 0 0 0 5.6h4a2.8 2.8 0 0 1 0 5.6H7' },
  { t: 'Satisfaction guaranteed', d: 'Unhappy with any area within 24 hours of handover? We return and re-clean it at no cost. No debate, no invoice.', p: 'M4 13l5 5 11-12' },
]

export default function NonNegotiables() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="secHead">
          <div>
            <Reveal><Eyebrow>Non-negotiables</Eyebrow></Reveal>
            <SplitText as="h2" className="ed" lines={['Six things we', <>never <i>compromise.</i></>]} />
          </div>
          <Reveal delay={80}>
            <p className="lede">
              These are the operating rules the business is built on — and the reason we occasionally
              lose a quote on price, then keep the client for years.
            </p>
          </Reveal>
        </div>
        <div className="checkGrid">
          {ITEMS.map((it, i) => (
            <Reveal as="div" key={it.t} delay={i * 60} className="chk">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={it.p} />
                </svg>
              </div>
              <h4>{it.t}</h4>
              <p>{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
