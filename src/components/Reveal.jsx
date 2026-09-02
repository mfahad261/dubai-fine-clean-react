/**
 * Reveal — The scroll-reveal wrapper.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: everywhere.
 * WHAT IT DOES:     The scroll-reveal wrapper.
 * NOTES:            Content is VISIBLE BY DEFAULT and only hides once JavaScript confirms it can animate — see style/globals.css. This matters: an earlier build hid content unconditionally and whole sections vanished on browsers that couldn't animate them.
 */
import { forwardRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((r) => {
      if (!r) return
      if (typeof r === 'function') r(node)
      else r.current = node
    })
  }
}

// Generic scroll-reveal wrapper. `as` picks the wrapper element,
// `image` switches to the clip-path reveal used for photography.
// Accepts a forwarded ref (e.g. for drag-tracking containers) and merges
// it with the internal IntersectionObserver ref.
const Reveal = forwardRef(function Reveal(
  { children, as: Tag = 'div', image = false, delay = 0, className = '', style = {}, ...rest },
  externalRef,
) {
  const [ref, inView] = useReveal()
  return (
    <Tag
      ref={mergeRefs(ref, externalRef)}
      className={`${image ? 'reveal-img' : 'reveal'} ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms', ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Reveal
