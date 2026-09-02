/**
 * useSmoothScroll — HOOK
 * ---------------------------------------------------------------------------
 * Weighted, eased scrolling via Lenis. Falls back to native scrolling if unavailable — the site must never fail to render over a nicety.
 */
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Weighted, eased scrolling — the page glides to a stop rather than halting
// dead. Lenis drives the real scroll position rather than faking it with a
// transform, so sticky elements (the hero, the services filter bar) still work.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return // native feel is better on touch
    // Lenis depends on ResizeObserver. If it's unavailable we simply keep
    // native scrolling — the site must never fail to render over a nicety.
    if (typeof ResizeObserver === 'undefined') return

    let lenis
    try {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
    } catch {
      return
    }

    let raf
    const tick = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
