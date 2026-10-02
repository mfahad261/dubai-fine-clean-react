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
    let rx = mx, ry = my, raf = 0, frame = 0, scrollTimer

    const checkDark = () => {
      if (typeof document.elementFromPoint !== 'function') return
      const el = document.elementFromPoint(mx, my)
      const onDark = !!el?.closest?.(DARK)
      d.classList.toggle('onDark', onDark)
      r.classList.toggle('onDark', onDark)
    }

    // The loop only runs while the ring is still catching up with the
    // pointer, then parks itself — no per-frame work while idle or while the
    // page scrolls under a still mouse.
    const tick = () => {
      d.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      rx += (mx - rx) * 0.17
      ry += (my - ry) * 0.17
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

      // hit-testing every frame is wasteful; every 6th is plenty
      if (++frame % 6 === 0) checkDark()

      if (Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1) {
        raf = 0
        checkDark()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const onMove = (e) => { mx = e.clientX; my = e.clientY; kick() }
    const onOver = (e) => { if (e.target.closest?.(HOT)) r.classList.add('big') }
    const onOut = (e) => { if (e.target.closest?.(HOT)) r.classList.remove('big') }
    // what's under a still cursor changes as the page scrolls — recheck once
    // scrolling pauses rather than on every scroll frame
    const onScroll = () => {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(checkDark, 120)
    }

    kick()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(scrollTimer)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
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
