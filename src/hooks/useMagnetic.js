/**
 * useMagnetic — HOOK
 * ---------------------------------------------------------------------------
 * Pulls a button gently toward the cursor while hovered.
 */
import { useEffect, useRef } from 'react'

// Pulls an element gently toward the cursor while hovering, then releases.
export function useMagnetic({ strengthX = 0.24, strengthY = 0.34 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let tx = 0, ty = 0, cx = 0, cy = 0, raf

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = (e.clientX - (r.left + r.width / 2)) * strengthX
      ty = (e.clientY - (r.top + r.height / 2)) * strengthY
    }
    const onLeave = () => { tx = 0; ty = 0 }

    const tick = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strengthX, strengthY])

  return ref
}
