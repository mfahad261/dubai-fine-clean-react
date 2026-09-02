/**
 * ReviewCard — A single client review.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: inside ReviewsSection.
 * WHAT IT DOES:     A single client review.
 */
import './ReviewCard.css'

export default function ReviewCard({ review }) {
  return (
    <div className="reviewCard">
      <div className="stars">★★★★★</div>
      <p className="quote">"{review.t}"</p>
      <div className="who">
        <span className="avatar" style={{ background: review.c }}>{review.n[0]}</span>
        <div>
          <div className="n">{review.n}</div>
          <div className="m">{review.m}</div>
        </div>
      </div>
    </div>
  )
}
