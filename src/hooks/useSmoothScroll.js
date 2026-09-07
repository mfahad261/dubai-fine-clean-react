/**
 * useSmoothScroll — HOOK
 * ---------------------------------------------------------------------------
 * Weighted, eased scrolling via Lenis. Falls back to native scrolling if unavailable — the site must never fail to render over a nicety.
 * ---------------------------------------------------------------------------
 * Lenis keeps its own internal scroll target rather than just reading
 * window.scrollY, so a raw `window.scrollTo(0, 0)` elsewhere in the app (the
 * page-transition reset, "back to top") moves the native scrollbar but not
 * Lenis's idea of where it's scrolled to — on its next animation frame it
 * eases back toward its own stale target, leaving a residual offset instead
 * of a clean reset. `scrollToTop` below goes through the same instance
 * everything else drives scrolling through, so the two never disagree.
 */
import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let activeLenis = null

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
    activeLenis = lenis

    let raf
    const tick = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      activeLenis = null
      lenis.destroy()
    }
  }, [])
}

// Reset scroll to the top — through Lenis when it's driving the page, so its
// internal target and the native scroll position never fall out of sync.
// `immediate` skips the ease (used right as the page-transition curtain
// closes, where any visible animation would be wasted).
export function scrollToTop(immediate = true) {
  if (!activeLenis) {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
    return
  }
  activeLenis.scrollTo(0, { immediate })
}

// Scroll a specific element into view, offset from the top — used by the
// Services page when a filter tab changes. Same reasoning as scrollToTop.
export function scrollToElement(el, offset = 0) {
  if (!el) return
  if (activeLenis) {
    activeLenis.scrollTo(el, { offset })
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
  }
}
