/**
 * MissionVision — the client's mission and vision statements.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /about.
 * WHAT IT DOES:     The client's mission and vision, in paired panels with oversized background glyphs.
 */
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import './MissionVision.css'

export default function MissionVision() {
  return (
    <section className="sec">
      <div className="wrap mv">
        <Reveal as="div" className="mvBox">
          <svg className="glyph" viewBox="0 0 100 100" fill="none" stroke="var(--blue)" strokeWidth="2">
            <circle cx="50" cy="50" r="34" /><circle cx="50" cy="50" r="21" /><circle cx="50" cy="50" r="8" />
            <path d="M50 4v14M50 82v14M4 50h14M82 50h14" />
          </svg>
          <Eyebrow>Our mission</Eyebrow>
          <h3 className="ed">Safe, sparkling, healthy spaces.</h3>
          <p>
            To provide top-notch cleaning that creates safe, sparkling and healthy spaces for every
            client. We combine professional expertise, modern technique and eco-friendly products to
            deliver results that genuinely make a difference — whatever the size of the space.
          </p>
        </Reveal>

        <Reveal as="div" className="mvBox dk" delay={100}>
          <svg className="glyph" viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M6 50s16-26 44-26 44 26 44 26-16 26-44 26S6 50 6 50z" /><circle cx="50" cy="50" r="13" />
          </svg>
          <Eyebrow>Our vision</Eyebrow>
          <h3 className="ed">The most trusted name in Dubai.</h3>
          <p>
            To become the most trusted and preferred cleaning service provider in Dubai — recognised
            for quality, reliability and customer satisfaction. We aim to set new standards in the
            industry by constantly refining our methods and never lowering the bar to win a job on price.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
