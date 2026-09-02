/**
 * BenefitsGrid — Five cards explaining what professional cleaning actually changes.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, under "What you get".
 * WHAT IT DOES:     Five cards explaining what professional cleaning actually changes.
 * NOTES:            Copy comes from BENEFITS in data/content.js.
 */
import { BENEFITS } from '../data/content.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import Icon from './Icon.jsx'
import './BenefitsGrid.css'

export default function BenefitsGrid() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="secHead">
          <Reveal><Eyebrow>The benefits</Eyebrow><h2 className="ed" style={{ marginTop: 16 }}>What a proper clean actually changes</h2></Reveal>
          <Reveal delay={80}><p className="lede">Not just tidy — measurably healthier, and hours of your week back.</p></Reveal>
        </div>
        <div className="benGrid">
          {BENEFITS.map((b, i) => (
            <Reveal as="div" key={b.t} delay={i * 60} className="benCard">
              <span className="benIcon"><Icon name={b.icon} size={24} /></span>
              <h4>{b.t}</h4>
              <p>{b.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
