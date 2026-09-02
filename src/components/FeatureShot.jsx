/**
 * FeatureShot — The square photograph of a technician handling display pieces, held large with the copy beside it rather than on top.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /about, as the closing section.
 * WHAT IT DOES:     The square photograph of a technician handling display pieces, held large with the copy beside it rather than on top.
 */
import { FEATURE_PHOTO } from '../data/images.js'
import Reveal from './Reveal.jsx'
import Button from './Button.jsx'
import './FeatureShot.css'

// Closing statement for the About page: one square photograph, held large,
// with the copy set beside it rather than on top so the image is never
// fighting text for attention.
export default function FeatureShot() {
  return (
    <section className="featureShot">
      <div className="wrap fsGrid">
        <Reveal image as="div" className="fsImg">
          <div style={{ backgroundImage: `url(${FEATURE_PHOTO.src})` }} />
          <span className="fsFrame" aria-hidden="true" />
        </Reveal>
        <div className="fsCopy">
          <Reveal>
            <span className="fsMark">“</span>
            <h2 className="ed">
              The detail nobody<br />asks us to <i>do.</i>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="lede">
              {FEATURE_PHOTO.caption}. Gloves on for display pieces, sculpture and art. Nothing gets
              moved without being put back, and nothing gets cleaned with a product it shouldn't meet.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="fsBtns">
              <Button variant="b" to="/contact" magnetic>Book your first clean</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
