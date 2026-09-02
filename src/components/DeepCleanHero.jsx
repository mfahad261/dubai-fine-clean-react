/**
 * DeepCleanHero — The banner for the Deep Cleaning division, with jump links to each group.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /deep-cleaning, at the top.
 * WHAT IT DOES:     The banner for the Deep Cleaning division, with jump links to each group.
 */
import { VIDEOS } from '../data/videos.js'
import { DEEP_GROUPS, deepServiceCount } from '../data/deepCleaning.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import Button from './Button.jsx'
import './DeepCleanHero.css'

export default function DeepCleanHero() {
  return (
    <section className="dcHero">
      <video
        className="dcHeroBg"
        src={VIDEOS.floorPolish.src}
        poster={VIDEOS.floorPolish.poster}
        muted loop autoPlay playsInline preload="metadata" aria-hidden="true"
      />
      <div className="wrap dcHeroInner">
        <Reveal><Eyebrow tone="green">Deep cleaning division</Eyebrow></Reveal>
        <Reveal delay={70}>
          <h1 className="ed">
            The clean you book<br />once a <i>year.</i>
          </h1>
        </Reveal>
        <Reveal delay={130}>
          <p className="lede">
            Not a tidy-up. Every surface reachable without dismantling the property — inside
            cupboards, behind appliances, up at the grilles, down at the skirting. Booked as a
            one-off, priced in writing before we start.
          </p>
        </Reveal>
        <Reveal delay={190}>
          <div className="dcHeroBtns">
            <Button variant="g" to="/contact" magnetic>Book a deep clean</Button>
            <Button variant="o" href="#groups" arrow={false} className="onDarkBtn">
              {deepServiceCount} services below
            </Button>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <ul className="dcJump">
            {DEEP_GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`}>
                  <span style={{ color: g.acc }}>{g.no}</span>
                  {g.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
