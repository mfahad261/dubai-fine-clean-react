/**
 * PictogramIcon — The line-art symbol for a service category, drawn from path data in data/services.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: category headers and menus.
 * WHAT IT DOES:     The line-art symbol for a service category, drawn from path data in data/services.js.
 * NOTES:            On the Services page these draw themselves stroke by stroke when scrolled into view.
 */
import { PICT } from '../data/services.js'
import './PictogramIcon.css'

// Renders a category's line-art pictogram from its raw SVG path data.
export default function PictogramIcon({ categoryId, size = 40, className = '' }) {
  const d = PICT[categoryId]
  if (!d) return null
  return (
    <svg
      className={`pictogram ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}
