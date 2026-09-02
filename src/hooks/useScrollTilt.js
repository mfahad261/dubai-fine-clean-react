/**
 * useScrollTilt — HOOK
 * ---------------------------------------------------------------------------
 * Scroll-linked 3D tilt, used by the category slabs on the Services page.
 */
import { useEffect, useRef } from 'react'

// Scroll-linked 3D tilt: the element starts pitched back and settles flat
// as it rises through the viewport, which is what gives the category slabs
// their sense of physical depth.
export function useScrollTilt({ maxTilt = 6, maxLift = 22 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf
    const tick = () => {
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      if (r.bottom > -120 && r.top < vh + 120) {
        const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.8)))
        el.style.transform =
          `perspective(1400px) rotateX(${((1 - t) * maxTilt).toFixed(2)}deg) ` +
          `translate3d(0, ${((1 - t) * maxLift).toFixed(1)}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [maxTilt, maxLift])

  return ref
}
