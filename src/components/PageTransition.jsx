/**
 * PageTransition — The curtain wipe between pages: five bars sweep up, the route swaps behind them, then they sweep off the top.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: wraps the routes in App.jsx.
 * WHAT IT DOES:     The curtain wipe between pages: five bars sweep up, the route swaps behind them, then they sweep off the top.
 * NOTES:            The outgoing page stays mounted until it's fully covered, so you never see a blank flash.
 */
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

// Five vertical bars sweep up to cover the screen, the route swaps behind
// them, then they sweep off the top. The outgoing page stays mounted until
// it's fully hidden, so you never see a blank flash mid-swap.
export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayed, setDisplayed] = useState(location)
  const [phase, setPhase] = useState('idle') // 'in' | 'out' | 'idle'
  const timers = useRef([])

  useEffect(() => {
    if (location.pathname === displayed.pathname) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplayed(location)
      window.scrollTo(0, 0)
      return
    }

    setPhase('in')
    const t1 = setTimeout(() => {
      setDisplayed(location)
      window.scrollTo(0, 0)
      setPhase('out')
      const t2 = setTimeout(() => setPhase('idle'), 760)
      timers.current.push(t2)
    }, 620)
    timers.current.push(t1)

    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [location, displayed])

  return (
    <>
      <div className={`curtain ${phase}`} aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      {typeof children === 'function' ? children(displayed) : children}
    </>
  )
}
