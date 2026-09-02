/**
 * ScrollProgressBar — The hairline across the very top showing how far down the page you are.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: every page.
 * WHAT IT DOES:     The hairline across the very top showing how far down the page you are.
 */
import { useEffect, useRef } from 'react'
import './ScrollProgressBar.css'

// Hairline across the very top showing how far down the page you are.
export default function ScrollProgressBar() {
  const bar = useRef(null)
  useEffect(() => {
    let raf
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      if (bar.current) bar.current.style.width = `${pct}%`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <div className="pbarWrap" aria-hidden="true"><div className="pbar" ref={bar} /></div>
}
