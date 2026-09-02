/**
 * SplitText — A headline where each line sits in its own strip and slides up into place, one shortly after the other.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: headlines across the site.
 * WHAT IT DOES:     A headline where each line sits in its own strip and slides up into place, one shortly after the other.
 * NOTES:            Pass `lines` as an array — each entry can be a string or JSX.
 */
import { useReveal } from '../hooks/useReveal.js'
import './SplitText.css'

// Headline where each line sits in its own overflow-hidden strip and slides
// up into place, one shortly after the other.
export default function SplitText({ lines = [], as: Tag = 'h2', className = '', delay = 0 }) {
  const [ref, inView] = useReveal({ threshold: 0.2 })
  return (
    <Tag ref={ref} className={`splitText ${inView ? 'in' : ''} ${className}`}>
      {lines.map((line, i) => (
        <span className="ln" key={i}>
          <span className="li" style={{ transitionDelay: `${delay + i * 90}ms` }}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
