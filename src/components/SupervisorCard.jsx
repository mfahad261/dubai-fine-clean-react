/**
 * SupervisorCard — the senior supervisor, near the top of the About page.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /about, directly under the page heading.
 * WHAT IT DOES:     Puts a real face and a name to the standard. A photograph
 *                   of the person who actually runs the crews does more for
 *                   trust than another paragraph claiming to be reliable.
 * DATA:             SUPERVISOR in data/images.js. His name is blank there
 *                   until the client supplies it — add it and it appears here
 *                   automatically, no change needed in this file.
 */
import { SUPERVISOR } from '../data/images.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import './SupervisorCard.css'

export default function SupervisorCard() {
  return (
    <section className="sec supSec">
      <div className="wrap supGrid">
        <Reveal image as="figure" className="supPhoto">
          <img
            src={SUPERVISOR.src}
            width="1050"
            height="1400"
            loading="lazy"
            decoding="async"
            alt={SUPERVISOR.name
              ? `${SUPERVISOR.name}, ${SUPERVISOR.role} at Dubai Fine Clean`
              : `${SUPERVISOR.role} at Dubai Fine Clean`}
          />
          <figcaption>
            <span className="supRole">{SUPERVISOR.role}</span>
            {SUPERVISOR.name && <span className="supName">{SUPERVISOR.name}</span>}
          </figcaption>
        </Reveal>

        <div className="supCopy">
          <Reveal><Eyebrow tone="green">Who runs the work</Eyebrow></Reveal>
          <Reveal delay={70}>
            <h2 className="ed supTitle">
              Every job answers<br />to one <i>person.</i>
            </h2>
          </Reveal>
          <Reveal delay={130}>
            <p className="lede">
              Our senior supervisor allocates the crews, walks the property before and after,
              and signs off the checklist. When something needs putting right, it goes to him
              — not to a call centre.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="supList">
              <li><span>01</span>Assigns the crew and the equipment to each property</li>
              <li><span>02</span>Walks the space at the start and again at handover</li>
              <li><span>03</span>Signs the room-by-room checklist before the team leaves</li>
              <li><span>04</span>Handles anything you are not happy with, personally</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
