/**
 * ReviewsSection — Three client reviews.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page.
 * WHAT IT DOES:     Three client reviews.
 * NOTES:            Copy comes from REVIEWS in data/content.js.
 */
import { REVIEWS } from '../data/content.js'
import ReviewCard from './ReviewCard.jsx'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import './ReviewsSection.css'

export default function ReviewsSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="secHead sh-center">
          <Reveal><Eyebrow>Client reviews</Eyebrow><h2 className="ed" style={{ marginTop: 16 }}>What Dubai says about us</h2></Reveal>
        </div>
        <div className="reviews">
          {REVIEWS.map((r, i) => (
            <Reveal as="div" key={r.n} delay={i * 80}><ReviewCard review={r} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
