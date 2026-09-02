/**
 * useScrollProgress — HOOK
 * ---------------------------------------------------------------------------
 * Reports how far through a tall element you've scrolled, 0 to 1. Drives the hero.
 */
import { useEffect, useRef, useState } from 'react'

// Reports how far a tall element has been scrolled through, 0 → 1.
// Drives the hero's clean sweep.
export function useScrollProgress() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const tick = () => {
      const r = el.getBoundingClientRect()
      const travel = el.offsetHeight - window.innerHeight
      if (travel > 0) {
        const p = Math.min(1, Math.max(0, -r.top / travel))
        setProgress((prev) => (Math.abs(prev - p) > 0.001 ? p : prev))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return [ref, progress]
}
