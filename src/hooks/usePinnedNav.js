/**
 * usePinnedNav — HOOK
 * ---------------------------------------------------------------------------
 * Tells the header when to condense into its pill, and when to tuck away on a fast scroll.
 */
import { useEffect, useState } from 'react'

// Drives the floating-pill nav. It condenses once you leave the top of the
// page, and tucks away entirely when you scroll down quickly — then comes
// straight back the moment you scroll up.
export function usePinnedNav() {
  const [pinned, setPinned] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const velocity = y - lastY
        setPinned(y > 50)
        setHidden(velocity > 8 && y > window.innerHeight * 0.9)
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { pinned, hidden, topbarHidden: pinned }
}
