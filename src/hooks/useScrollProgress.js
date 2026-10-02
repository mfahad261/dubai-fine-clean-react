/**
 * useScrollProgress — HOOK
 * ---------------------------------------------------------------------------
 * Reports how far through a tall element you've scrolled, 0 to 1. Drives the hero.
 */
import { useEffect, useRef } from 'react'

// Reports how far a tall element has been scrolled through, 0 → 1, by calling
// `onProgress` — never through React state. Setting state here re-rendered the
// whole hero on every animation frame while scrolling, which was the main
// source of scroll jank on the home page. It also only measures when the page
// actually scrolls or resizes, rather than polling on a permanent rAF loop.
export function useScrollProgress(onProgress) {
  const ref = useRef(null)
  const cb = useRef(onProgress)
  cb.current = onProgress

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let last = -1

    const measure = () => {
      raf = 0
      const travel = el.offsetHeight - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / travel)) : 0
      if (Math.abs(last - p) > 0.0005) {
        last = p
        cb.current?.(p)
      }
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure) }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return ref
}
