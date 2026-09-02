/**
 * useReveal — HOOK
 * ---------------------------------------------------------------------------
 * Reveals an element once it scrolls into view. Content is visible by default and only hides once we've confirmed the browser can animate it.
 */
import { useEffect, useRef, useState } from 'react'

// Scroll-reveal via IntersectionObserver. Elements are visible by default
// (see globals.css — the hidden state only applies once <html> carries
// .reveal-ready, set in App.jsx after confirming the browser supports it).
// This mirrors a hard lesson from an earlier build: content must never be
// hidden unless we're certain the reveal mechanism can actually run.
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px', ...options },
    )
    io.observe(el)

    // failsafe: if for any reason the observer never fires (e.g. element
    // starts on-screen before layout settles), reveal anyway after 2.2s
    const fallback = setTimeout(() => setInView(true), 2200)
    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return [ref, inView]
}
