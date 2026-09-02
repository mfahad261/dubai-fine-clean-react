/**
 * CustomCursor — A dot that tracks the pointer exactly plus a ring that trails behind it and swells over anything clickable.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: every page, desktop only.
 * WHAT IT DOES:     A dot that tracks the pointer exactly plus a ring that trails behind it and swells over anything clickable.
 * NOTES:            Hidden on touch devices. Flips to white over dark sections.
 */
import { useEffect, useRef } from 'react'
import './CustomCursor.css'

// A precise dot plus a ring that trails it with easing. The ring swells over
// anything interactive, and both flip to white over the dark sections so they
// never disappear against a navy background.
const HOT = 'a,button,select,input,textarea,.sCard,.svc,.dcItem,.megaCat,.deepCol,.fbtn,.faqItem,.teamShot,.vdClip,.ba'
const DARK = '.dark,.svcHero,.stats,.cta,.coverage,.footer,.pre'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const d = dot.current
    const r = ring.current
    if (!d || !r) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my, raf, frame = 0

    const onMove = (e) => { mx = e.clientX; my = e.clientY }
    const onOver = (e) => { if (e.target.closest?.(HOT)) r.classList.add('big') }
    const onOut = (e) => { if (e.target.closest?.(HOT)) r.classList.remove('big') }

    const tick = () => {
      d.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      rx += (mx - rx) * 0.17
      ry += (my - ry) * 0.17
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

      // hit-testing every frame is wasteful; every 6th is plenty
      if (++frame % 6 === 0 && typeof document.elementFromPoint === 'function') {
        const el = document.elementFromPoint(mx, my)
        const onDark = !!el?.closest?.(DARK)
        d.classList.toggle('onDark', onDark)
        r.classList.toggle('onDark', onDark)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div className="cur" ref={dot} aria-hidden="true" />
      <div className="curRing" ref={ring} aria-hidden="true" />
    </>
  )
}
