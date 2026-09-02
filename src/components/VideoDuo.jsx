/**
 * VideoDuo — Two clips that stay still until hovered, then play.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, under "Caught on the job".
 * WHAT IT DOES:     Two clips that stay still until hovered, then play.
 * NOTES:            Makes the point that nothing on this site is stock footage.
 */
import { useEffect, useRef, useState } from 'react'
import { VIDEOS } from '../data/videos.js'
import Reveal from './Reveal.jsx'
import Eyebrow from './Eyebrow.jsx'
import Icon from './Icon.jsx'
import './VideoDuo.css'

// These two are the client's own footage. The captions describe exactly what
// is on screen — they previously claimed a kitchen and a mattress, and showed
// a bathroom vanity and a carpet.
const CLIPS = [
  {
    key: 'vanity',
    v: VIDEOS.vanityDetail,
    label: 'Bathroom & vanity detail',
    note: 'Mixing products before starting on the vanity and mirrors.',
  },
  {
    key: 'carpet',
    v: VIDEOS.carpetLift,
    label: 'Carpet lifting & extraction',
    note: 'Lifted by hand to reach underneath, then laid back as it was.',
  },
]

function Clip({ clip, index }) {
  const ref = useRef(null)
  const figRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Hold to play: the clip only runs while you're actually looking at it,
  // which makes the section feel responsive instead of noisy.
  const start = () => {
    ref.current?.play().then(() => setPlaying(true)).catch(() => {})
  }
  const stop = () => {
    const v = ref.current
    if (!v) return
    v.pause()
    v.currentTime = 0
    setPlaying(false)
  }

  // no hover on touch — play the clip once it's scrolled to the middle
  // of the screen instead, same as the home page's service cards.
  useEffect(() => {
    const el = figRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const mq = window.matchMedia('(hover: none), (max-width: 760px)')
    if (!mq.matches) return

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.55, rootMargin: '-15% 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Reveal
      ref={figRef}
      as="figure"
      delay={index * 90}
      className={`vdClip ${playing ? 'playing' : ''}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      tabIndex={0}
    >
      <div className="vdFrame">
        <video
          ref={ref}
          src={clip.v.src}
          poster={clip.v.poster}
          muted
          loop
          playsInline
          preload="none"
        />
        <span className="vdPlay">
          <Icon name={playing ? 'check' : 'arrowRight'} size={16} />
          {playing ? 'Playing' : 'Hover to play'}
        </span>
      </div>
      <figcaption>
        <span className="vdIdx">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3>{clip.label}</h3>
          <p>{clip.note}</p>
        </div>
      </figcaption>
    </Reveal>
  )
}

export default function VideoDuo() {
  return (
    <section className="sec vDuo">
      <div className="wrap">
        <div className="secHead">
          <div>
            <Reveal><Eyebrow>Caught on the job</Eyebrow></Reveal>
            <Reveal delay={70}>
              <h2 className="ed vDuoTitle">No stock footage.<br />Just our <i>crews.</i></h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="lede">
              Every clip and photograph on this site was taken on a real Dubai Fine Clean job.
              Nothing here is bought in.
            </p>
          </Reveal>
        </div>
        <div className="vDuoGrid">
          {CLIPS.map((c, i) => <Clip clip={c} index={i} key={c.key} />)}
        </div>
      </div>
    </section>
  )
}
