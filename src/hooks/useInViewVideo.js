/**
 * useInViewVideo — HOOK
 * ---------------------------------------------------------------------------
 * Plays a muted video only while it's on screen, and pauses it otherwise.
 */
import { useEffect, useRef } from 'react'

// Plays a muted video only while it's on screen, and pauses it the moment
// it isn't — three clips looping off-screen is wasted battery and bandwidth.
export function useInViewVideo({ playWhenVisible = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (!playWhenVisible) return
    if (!('IntersectionObserver' in window)) {
      v.play?.().catch(() => {})
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play?.().catch(() => {})
        else v.pause?.()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [playWhenVisible])

  return ref
}
