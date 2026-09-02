/**
 * CategoryChapter — The raised slab introducing each category: oversized ghost number, pictogram that draws itself, and a scroll-linked tilt.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /services, one per category.
 * WHAT IT DOES:     The raised slab introducing each category: oversized ghost number, pictogram that draws itself, and a scroll-linked tilt.
 * NOTES:            Tilt from hooks/useScrollTilt.js; reveal from hooks/useReveal.js.
 */
import { useReveal } from '../hooks/useReveal.js'
import { useScrollTilt } from '../hooks/useScrollTilt.js'
import PictogramIcon from './PictogramIcon.jsx'
import './CategoryChapter.css'

// The raised slab that introduces each category: oversized ghost number,
// pictogram that draws itself stroke-by-stroke on reveal, and a scroll-linked
// tilt so it reads as a physical card rather than a flat divider.
export default function CategoryChapter({ cat }) {
  const [revealRef, inView] = useReveal({ threshold: 0.12 })
  const tiltRef = useScrollTilt()

  return (
    <div
      ref={(node) => { revealRef.current = node; tiltRef.current = node }}
      className={`chapter ${cat.dark ? 'dk' : ''} ${inView ? 'in' : ''}`}
    >
      <div className="bgno">{cat.no}</div>
      <div className="inner">
        <div className="pict"><PictogramIcon categoryId={cat.id} size={56} /></div>
        <div>
          <span className="no2">Category {cat.no} · {cat.items.length} services</span>
          <h2 className="ed">{cat.name}</h2>
          <p className="lede">{cat.lede}</p>
          <div className="tags">
            {cat.tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}
