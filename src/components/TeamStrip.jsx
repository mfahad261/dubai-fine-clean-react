/**
 * TeamStrip — The client's own photographs of their crews.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /about.
 * WHAT IT DOES:     The client's own photographs of their crews.
 * NOTES:            Shots range from 2:1 landscape to 1:2 portrait, so they flow in columns at their true aspect ratio — nothing is cropped, and nobody loses their head to a grid cell.
 */
import { TEAM_PHOTOS } from '../data/images.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import SplitText from './SplitText.jsx'
import './TeamStrip.css'

// The client's own photographs. These are candid site shots in wildly
// different shapes — 2:1 landscape through to 1:2 portrait — so the layout
// flows them in columns at their true aspect ratio rather than forcing them
// into equal tiles. Nothing is cropped, so nobody loses their head to a
// grid cell.
export default function TeamStrip() {
  return (
    <section className="sec teamSec">
      <div className="wrap">
        <div className="secHead">
          <div>
            <Reveal><Eyebrow tone="green">The people</Eyebrow></Reveal>
            <SplitText as="h2" className="ed teamTitle" lines={['The team who', <>actually <i>turn up.</i></>]} />
          </div>
          <Reveal delay={80}>
            <p className="lede">
              Forty-plus trained staff working in supervised teams of two to six. Contract clients
              keep the same crew each visit, so nobody has to explain their home twice.
            </p>
          </Reveal>
        </div>

        <div className="teamFlow">
          {TEAM_PHOTOS.map((p, i) => (
            <Reveal as="figure" key={p.caption} delay={(i % 3) * 80} className="teamShot">
              <img
                src={p.src}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                alt={p.caption}
              />
              <figcaption>
                <span className="tIdx">{String(i + 1).padStart(2, '0')}</span>
                {p.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
