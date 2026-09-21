/**
 * Preloader — The loading screen.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: first paint, every visit.
 * WHAT IT DOES:     Plays the logo animation once, then lifts.
 * NOTES:            No progress bar and no percentage any more. Both were
 *                   theatre — they counted a timer, not the actual load — and
 *                   the clip already says "we're getting ready" on its own.
 *
 *                   The clip is 16:9 on a flat white ground, so the screen
 *                   behind it is white too: any other colour would show the
 *                   video as a hard-edged rectangle. See Preloader.css.
 */
import { useEffect, useRef, useState } from 'react'
import intro from '../assets/logoanimation.mp4'
// Shown instead of the clip when the visitor has asked for reduced motion.
import logo from '../assets/logo/logo-full.svg'
import './Preloader.css'

/**
 * Hard cap. The clip runs ~2.7s, but it's a 3 MB download: on a slow
 * connection, a browser that won't decode it, or one that refuses to autoplay
 * it, `ended` may never fire. Without this the visitor sits behind a blank
 * white screen indefinitely — the one failure a preloader must not have.
 */
const MAX_MS = 6000

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [reduced, setReduced] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      const t = setTimeout(() => setDone(true), 650)
      return () => clearTimeout(t)
    }

    const cap = setTimeout(() => setDone(true), MAX_MS)

    // React doesn't reliably reflect the `muted` JSX prop onto the element,
    // and an unmuted video is refused autoplay everywhere — so set it here,
    // before asking it to play.
    const v = videoRef.current
    if (v) {
      v.muted = true
      // play() rejects when autoplay is blocked. Don't strand the visitor.
      Promise.resolve(v.play()).catch(() => setDone(true))
    }

    return () => clearTimeout(cap)
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setHidden(true), 620)
    return () => clearTimeout(t)
  }, [done])

  if (hidden) return null

  return (
    <div className={`pre ${done ? 'wipe' : ''}`} aria-hidden="true">
      {reduced ? (
        <img className="preStill" src={logo} alt="" width="678" height="641" />
      ) : (
        <video
          ref={videoRef}
          className="preVid"
          src={intro}
          width="500"
          height="500"
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={() => setDone(true)}
          onError={() => setDone(true)}
        />
      )}
    </div>
  )
}
