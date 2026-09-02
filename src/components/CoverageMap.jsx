/**
 * CoverageMap — The service zone: all 41 communities the client covers, with a search box because a list that long is only useful if you can find your own area.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page and /contact.
 * WHAT IT DOES:     The service zone: all 41 communities the client covers, with a search box because a list that long is only useful if you can find your own area.
 */
import { useState } from 'react'
import { IMG } from '../data/images.js'
import { COVERAGE_AREAS, BUSINESS } from '../data/content.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import Icon from './Icon.jsx'
import './CoverageMap.css'

// The client's full service zone — 41 communities. Searchable, because a
// list this long is only useful if you can find your own area in it.
export default function CoverageMap() {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const matches = term
    ? COVERAGE_AREAS.filter((a) => a.toLowerCase().includes(term))
    : COVERAGE_AREAS

  return (
    <section className="coverage">
      <div className="covBg" style={{ backgroundImage: `url(${IMG.dubaiSkyline})` }} />
      <div className="wrap covInner">
        <div className="covHead">
          <Reveal><Eyebrow tone="green">Service zone</Eyebrow></Reveal>
          <Reveal delay={70}>
            <h2 className="ed">Areas we serve<br />in Dubai &amp; the <i>UAE.</i></h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="lede">
              Crews dispatch from {BUSINESS.addressLine1.replace(' — 16F-A-04', '')}, covering
              {' '}{COVERAGE_AREAS.length} communities across the Emirate. We schedule around your week,
              including Fridays and public holidays.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <label className="covSearch">
              <Icon name="pin" size={16} />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find your community…"
                aria-label="Search service areas"
              />
              {term && <span className="covCount">{matches.length}</span>}
            </label>
          </Reveal>
        </div>

        <Reveal as="div" className="covList" delay={90}>
          {matches.length === 0 ? (
            <p className="covNone">
              We may still cover it — call {BUSINESS.phone} and ask.
            </p>
          ) : (
            <ul>
              {matches.map((a, i) => (
                <li key={a} style={{ transitionDelay: `${Math.min(i * 14, 340)}ms` }}>
                  <Icon name="pin" size={13} />
                  {a}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  )
}
