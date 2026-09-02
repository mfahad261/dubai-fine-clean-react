/**
 * useNavTheme — decides whether the header should invert to its dark glass.
 * ---------------------------------------------------------------------------
 * The header is translucent, so over a dark hero or a navy band its default
 * dark-on-light styling disappears. This samples whatever sits directly behind
 * the header a few times a second and reports back, so the nav can flip.
 * Sampling beats hard-coding a scroll offset, which breaks the moment a
 * section's height changes.
 */
import { useEffect, useState } from 'react'

const DARK = '.heroScroll,.dark,.svcHero,.dcHero,.stats,.cta,.coverage,.footer,.vBand,.dcPromo,.deepMenu'

export function useNavTheme() {
  const [onDark, setOnDark] = useState(false)

  useEffect(() => {
    if (typeof document.elementFromPoint !== 'function') return
    let alive = true

    const sample = () => {
      if (!alive) return
      // probe just under the header, at two x positions so a narrow element
      // in the middle can't fool it
      const y = 58
      const hits = [window.innerWidth * 0.2, window.innerWidth * 0.8]
        .map((x) => document.elementFromPoint(x, y))
        .filter(Boolean)
      const dark = hits.some((el) => el.closest?.(DARK))
      setOnDark((prev) => (prev !== dark ? dark : prev))
    }

    sample()
    const id = setInterval(sample, 160)
    window.addEventListener('scroll', sample, { passive: true })
    return () => {
      alive = false
      clearInterval(id)
      window.removeEventListener('scroll', sample)
    }
  }, [])

  return onDark
}
