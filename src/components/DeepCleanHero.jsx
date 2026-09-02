/**
 * DeepCleanHero — The banner for the Deep Cleaning division, with jump links to each group.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /deep-cleaning, at the top.
 * WHAT IT DOES:     The banner for the Deep Cleaning division, with jump links to each group.
 */
import { Link } from 'react-router-dom'
import { VIDEOS } from '../data/videos.js'
import { DEEP_FEATURED, DEEP_GROUPS, deepServiceCount } from '../data/deepCleaning.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
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
        <Reveal delay={220}>
          <div className="dcFeatured">
            {DEEP_FEATURED.map((f) => (
              <Link key={f.id} to={f.to} className="dcFeatCard" style={{ '--acc': f.acc }}>
                <span className="dcFeatImg" style={{ backgroundImage: `url(${f.img})` }} />
                <span className="dcFeatScrim" />
                <span className="dcFeatTag">Most booked</span>
                <span className="dcFeatBody">
                  <h3>{f.name}</h3>
                  <span className="dcFeatGo">Explore<Icon name="arrowRight" size={14} /></span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
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
