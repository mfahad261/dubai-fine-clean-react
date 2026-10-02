/**
 * ScrollProgressBar — The hairline across the very top showing how far down the page you are.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: every page.
 * WHAT IT DOES:     The hairline across the very top showing how far down the page you are.
 * NOTES:            Scales on the compositor (transform) and only updates when the
 *                   page scrolls or resizes — animating `width` on a permanent
 *                   rAF loop cost a layout pass on every frame.
 */
import { useEffect, useRef } from 'react'
import './ScrollProgressBar.css'

// Hairline across the very top showing how far down the page you are.
export default function ScrollProgressBar() {
  const bar = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  return <div className="pbarWrap" aria-hidden="true"><div className="pbar" ref={bar} /></div>
}
