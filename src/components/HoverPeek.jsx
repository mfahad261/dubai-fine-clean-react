/**
 * HoverPeek — The thumbnail that follows the cursor while hovering a service row.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: mounted globally in App.jsx.
 * WHAT IT DOES:     The thumbnail that follows the cursor while hovering a service row.
 * NOTES:            Rows opt in by carrying data-peek-img and data-peek-label, so this stays one global listener rather than state threaded through every row.
 */
import { useEffect, useRef } from 'react'
import './HoverPeek.css'

// Floating thumbnail that follows the cursor while hovering a service row.
// Rows opt in by carrying data-peek-img and data-peek-label, so this stays
// a single global listener instead of state threaded through every row.
export default function HoverPeek() {
  const box = useRef(null)
  const img = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = box.current
    if (!el) return

    let tx = 0, ty = 0, px = 0, py = 0, on = false, raf

    const onOver = (e) => {
      const row = e.target.closest?.('[data-peek-img]')
      if (!row) return
      img.current.style.backgroundImage = `url(${row.dataset.peekImg})`
      label.current.textContent = row.dataset.peekLabel || 'Preview'
      el.classList.add('on')
      on = true
    }

    const onOut = (e) => {
      const row = e.target.closest?.('[data-peek-img]')
      if (!row) return
      const next = e.relatedTarget
      if (next?.closest?.('[data-peek-img]')) return
      el.classList.remove('on')
      on = false
    }

    const onMove = (e) => { tx = e.clientX + 150; ty = e.clientY }

    const tick = () => {
      if (on) {
        px += (tx - px) * 0.13
        py += (ty - py) * 0.13
        el.style.left = `${px}px`
        el.style.top = `${py}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="peek" ref={box} aria-hidden="true">
      <div className="ph" ref={img} />
      <div className="lb" ref={label}>Preview</div>
    </div>
  )
}
