/**
 * WhyUs — The editorial section arguing the case for the company.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page.
 * WHAT IT DOES:     The editorial section arguing the case for the company.
 */
import { IMG } from '../data/images.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import './WhyUs.css'

const POINTS = [
  'Trained, background-checked staff in branded uniform',
  'Written checklist for every job, signed off on completion',
  'Same assigned team for recurring contracts',
]

export default function WhyUs() {
  return (
    <section className="sec">
      <div className="wrap whyGrid">
        <div className="whyStack">
          <Reveal image as="div" className="whyBig">
            <div style={{ backgroundImage: `url(${IMG.residentialTeam})` }} />
          </Reveal>
          <Reveal image as="div" className="whySm" delay={140}>
            <div style={{ backgroundImage: `url(${IMG.detailFinishing})` }} />
          </Reveal>
          <span className="tag">Since 2016</span>
        </div>
        <div>
          <Reveal><Eyebrow tone="green">Why Dubai Fine Clean</Eyebrow></Reveal>
          <Reveal delay={80}><h2 className="ed" style={{ marginTop: 16, fontSize: 'clamp(28px,3.6vw,46px)' }}>A team that treats your space like their own</h2></Reveal>
          <Reveal delay={140}><p className="lede" style={{ marginTop: 16 }}>Every job runs against a written checklist, not a guess. Supervisors walk the space before and after, and the same crew returns for recurring visits so nobody has to explain the property twice.</p></Reveal>
          <ul className="whyList">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p} delay={180 + i * 60}><Icon name="check" size={17} />{p}</Reveal>
            ))}
          </ul>
          <Reveal delay={360}><Button variant="b" to="/about" style={{ marginTop: 28 }}>More about us</Button></Reveal>
        </div>
      </div>
    </section>
  )
}
