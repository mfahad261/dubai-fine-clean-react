/**
 * Preloader — The loading screen.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: first paint, every visit.
 * WHAT IT DOES:     The loading screen.
 * NOTES:            It ramps on a timer and always reaches 100 — an earlier version could mathematically never finish and froze just short of the end.
 */
import { useEffect, useState } from 'react'
import './Preloader.css'

const WORDS = ['Preparing', 'Residential', 'Commercial', 'Specialist', 'Ready']

// Ramps on a timer and always reaches 100 — an earlier version of this could
// mathematically never finish, which left it frozen just short of the end.
export default function Preloader() {
  const [pct, setPct] = useState(0)
  const [word, setWord] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const DURATION = 1100
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      setPct(Math.round(t * 100))
      setWord(Math.min(WORDS.length - 1, Math.floor(t * WORDS.length)))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDone(true)
    }
    raf = requestAnimationFrame(tick)
    const deadline = setTimeout(() => { setPct(100); setDone(true) }, 2200)
    return () => { cancelAnimationFrame(raf); clearTimeout(deadline) }
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setHidden(true), 460)
    return () => clearTimeout(t)
  }, [done])

  if (hidden) return null

  return (
    <div className={`pre ${done ? 'wipe' : ''}`} aria-hidden="true">
      <div className="preBlob" />
      <div className="preInner">
        <svg className="preDrop" viewBox="0 0 64 64">
          <path d="M32 6C24 20 14 32 14 42a18 18 0 0 0 36 0c0-10-10-22-18-36z" />
        </svg>
        <div className="preMark"><span>Dubai</span><span>Fine</span><span>Clean</span></div>
        <div className="preWords">
          <div className="preWordsInner" style={{ transform: `translateY(${-word * 17}px)` }}>
            {WORDS.map((w) => <p key={w}>{w}</p>)}
          </div>
        </div>
        <div className="preBarWrap"><div className="preBar" style={{ transform: `scaleX(${pct / 100})` }} /></div>
        <div className="preNum">{pct}%</div>
      </div>
    </div>
  )
}
