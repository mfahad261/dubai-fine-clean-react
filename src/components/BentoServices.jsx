/**
 * BentoServices — the services card grid on the home page.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, under "Every service, one place".
 * WHAT IT DOES:     Six cards, one per Our Services category, each showing its
 *                   photography, number, name, blurb, tags and service count.
 * THE DETAIL:       Two things happen on hover. A soft light in the category's
 *                   own colour follows the cursor — the card writes the pointer
 *                   position to CSS variables and paints a radial highlight
 *                   there. And the still photograph cuts to footage of that
 *                   service actually being carried out.
 * LAYOUT:            Every card is the same size on purpose. An earlier version
 *                   made two of them span wider, which left rows ragged and
 *                   images at different heights — it read as broken rather than
 *                   as rhythm.
 * LOADING:           Card videos are preload="none" — they only fetch when
 *                   someone actually hovers, so six clips don't get pulled
 *                   down on page load.
 * MOBILE:           Collapses to one column; the spotlight is skipped since
 *                   there's no cursor to follow.
 */
import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CATS } from '../data/services.js'
import { CATEGORY_VIDEO } from '../data/videos.js'
import Reveal from './Reveal.jsx'
import PictogramIcon from './PictogramIcon.jsx'
import Icon from './Icon.jsx'
import './BentoServices.css'

function ServiceCard({ cat, index }) {
  const ref = useRef(null)
  const vid = useRef(null)
  const clip = CATEGORY_VIDEO[cat.id]

  // write the pointer position onto the card so CSS can place the highlight
  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }, [])

  const play = () => vid.current?.play?.().catch(() => {})
  const stop = () => {
    const v = vid.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  // no cursor to hover with on touch — activate the card (and its video)
  // as it crosses the middle of the viewport while scrolling instead.
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const mq = window.matchMedia('(hover: none), (max-width: 680px)')
    if (!mq.matches) return

    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle('inView', entry.isIntersecting)
        if (entry.isIntersecting) play()
        else stop()
      },
      { threshold: 0.55, rootMargin: '-15% 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Reveal
      as="article"
      delay={index * 70}
      className="sCard"
      style={{ '--acc': cat.acc }}
    >
      <Link
        to={`/services/${cat.id}`}
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={play}
        onMouseLeave={stop}
        onFocus={play}
        onBlur={stop}
        className="sCardIn"
      >
        <span className="sSpot" aria-hidden="true" />

        <div className="sMedia">
          <div className="sImg" style={{ backgroundImage: `url(${cat.img})` }} />
          {clip && (
            <video
              ref={vid}
              className="sVid"
              src={clip.src}
              poster={clip.poster}
              muted loop playsInline preload="none" aria-hidden="true"
            />
          )}
          <span className="sScrim" />
          <span className="sNo">{cat.no}</span>
          <span className="sIcon"><PictogramIcon categoryId={cat.id} size={20} /></span>
        </div>

        <div className="sBody">
          <h3>{cat.name}</h3>
          <p>{cat.lede}</p>

          <div className="sTags">
            {cat.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
          </div>

          <div className="sFoot">
            <span className="sCount">{cat.items.length} services</span>
            <span className="sGo">Explore<Icon name="arrowRight" size={14} /></span>
          </div>
        </div>

        <span className="sEdge" aria-hidden="true" />
      </Link>
    </Reveal>
  )
}

export default function BentoServices() {
  return (
    <div className="sGrid">
      {CATS.map((c, i) => <ServiceCard cat={c} index={i} key={c.id} />)}
    </div>
  )
}
