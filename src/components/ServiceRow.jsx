/**
 * ServiceRow — one line of the Services page catalogue.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /services, inside every category block.
 * WHAT IT DOES:     Shows a single service — index, name, description and the
 *                   scope we commit to (hours on site, crew size). No price:
 *                   the client quotes in writing after a survey.
 * HOW IT CONNECTS:  data-peek-* opts the row into the cursor-following image
 *                   preview rendered globally by <HoverPeek />.
 * MOBILE:           No cursor to hover with on touch, so the row's hover
 *                   state (lift, highlighted index, "Get a quote" colour)
 *                   instead activates as it crosses the middle of the screen
 *                   while scrolling — same trick as the home page cards.
 */
import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import './ServiceRow.css'

export default function ServiceRow({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const mq = window.matchMedia('(hover: none), (max-width: 900px)')
    if (!mq.matches) return

    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('active', entry.isIntersecting),
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="svc" ref={ref} data-peek-img={item.img} data-peek-label={item.n}>
      <div className="idx">{String(index + 1).padStart(2, '0')}</div>

      <div>
        <div className="nm">{item.n}</div>
        <div className="ds">{item.d}</div>
      </div>

      <div className="mt">
        {item.m.map((x) => <i key={x}>{x}</i>)}
      </div>

      <div className="pr">
        <span className="quote">Get a quote<Icon name="arrowRight" size={13} /></span>
      </div>
    </div>
  )
}
