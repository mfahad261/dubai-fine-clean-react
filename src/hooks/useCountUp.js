/**
 * useCountUp — HOOK
 * ---------------------------------------------------------------------------
 * Counts a number up from zero when it scrolls into view.
 */
import { useEffect, useState } from 'react'
import { useReveal } from './useReveal.js'

// Animates a numeric string like "2,400" or "4.9" up from zero once it
// scrolls into view. Non-numeric strings ("On survey") pass through as-is.
export function useCountUp(value, duration = 1400) {
  const [ref, inView] = useReveal()
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const numeric = parseFloat(String(value).replace(/,/g, ''))
    if (Number.isNaN(numeric)) {
      setDisplay(value)
      return
    }
    const decimals = String(value).includes('.') ? 1 : 0
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = numeric * eased
      setDisplay(
        decimals
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString('en-US'),
      )
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return [ref, display]
}
