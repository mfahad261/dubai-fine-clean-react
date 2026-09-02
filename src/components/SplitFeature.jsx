/**
 * SplitFeature — the two oversized division headings.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, between the reel and the closing sections.
 *
 * WHAT IT DOES: two enormous stacked headings — OUR / SERVICES and DEEP /
 * CLEANING. Pointing at one dims the other, plays footage behind the letters,
 * and slides the supporting copy in. It gives the page a moment of real scale
 * and turns the site's two divisions into a genuine fork in the road.
 *
 * THE TYPE TRICK: the video sits behind the words and is clipped to the
 * letterforms with background-clip:text where the browser supports it. If it
 * doesn't, the words simply stay solid — nothing disappears.
 */
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { VIDEOS } from '../data/videos.js'
import { totalServiceCount } from '../data/services.js'
import { deepServiceCount } from '../data/deepCleaning.js'
import Icon from './Icon.jsx'
import './SplitFeature.css'

const PANELS = [
  {
    id: 'services',
    to: '/services',
    top: 'Our',
    bottom: 'Services',
    v: VIDEOS.openPlan,
    blurb: 'Residential, commercial, post-construction, surfaces, air and sanitisation — six categories, run by dedicated crews.',
    countLabel: 'services',
  },
  {
    id: 'deep',
    to: '/deep-cleaning',
    top: 'Deep',
    bottom: 'Cleaning',
    v: VIDEOS.hallwayPan,
    blurb: 'A separate division with its own machinery: villas, kitchens, mattresses, façades and post-construction sites.',
    countLabel: 'deep-clean services',
  },
]

export default function SplitFeature() {
  const [active, setActive] = useState(null)
  const refs = useRef({})

  const counts = { services: totalServiceCount, deep: deepServiceCount }

  const enter = (id) => {
    setActive(id)
    refs.current[id]?.play?.().catch(() => {})
  }
  const leave = (id) => {
    setActive(null)
    const v = refs.current[id]
    if (v) { v.pause(); v.currentTime = 0 }
  }

  return (
    <section className={`splitFeat ${active ? 'engaged' : ''}`}>
      {PANELS.map((panel) => (
        <Link
          key={panel.id}
          to={panel.to}
          className={`sfPanel ${active === panel.id ? 'on' : ''} ${active && active !== panel.id ? 'off' : ''}`}
          onMouseEnter={() => enter(panel.id)}
          onMouseLeave={() => leave(panel.id)}
          onFocus={() => enter(panel.id)}
          onBlur={() => leave(panel.id)}
        >
          <video
            ref={(n) => { refs.current[panel.id] = n }}
            className="sfVideo"
            src={panel.v.src}
            poster={panel.v.poster}
            muted loop playsInline preload="none" aria-hidden="true"
          />
          <span className="sfVeil" aria-hidden="true" />

          <div className="sfInner">
            <h2 className="sfTitle ed">
              <span>{panel.top}</span>
              <span>{panel.bottom}</span>
            </h2>
            <div className="sfMeta">
              <p>{panel.blurb}</p>
              <span className="sfCount">
                <b>{counts[panel.id]}</b> {panel.countLabel}
              </span>
              <span className="sfGo">Explore<Icon name="arrowRight" size={15} /></span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}
