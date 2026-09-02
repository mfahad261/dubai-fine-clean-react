/**
 * OurStory — The timeline from founding to today.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /about.
 * WHAT IT DOES:     The timeline from founding to today.
 */
import { BUSINESS } from '../data/content.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import './OurStory.css'

const MILESTONES = [
  { y: '2016', t: 'Founded in Business Bay', d: 'Started with a two-person residential team and a handful of Downtown apartments.' },
  { y: '2019', t: 'Commercial contracts begin', d: 'First nightly office contracts, followed by retail and restaurant clients across the city.' },
  { y: '2022', t: 'Specialist division launched', d: 'AC duct, marble restoration and façade access added as dedicated crews with certified equipment.' },
  { y: 'Today', t: `${BUSINESS.since}–now`, d: '2,400+ cleans completed, 40+ trained staff, and a 4.9 average client rating.' },
]

export default function OurStory() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="secHead">
          <Reveal><Eyebrow>Our story</Eyebrow><h2 className="ed" style={{ marginTop: 16 }}>Nine years, one standard</h2></Reveal>
          <Reveal delay={80}><p className="lede">From a two-person team to a full specialist operation, the checklist has never changed.</p></Reveal>
        </div>
        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <Reveal as="div" key={m.y} delay={i * 80} className="tItem">
              <span className="tYear">{m.y}</span>
              <span className="tDot" />
              <div className="tBody">
                <h4>{m.t}</h4>
                <p>{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
