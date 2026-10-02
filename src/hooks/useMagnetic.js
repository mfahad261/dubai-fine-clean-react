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

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

    // Runs only while the button is drifting; once it has settled the loop
    // parks, so an idle button costs nothing per frame.
    const tick = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05) {
        cx = tx; cy = ty
        el.style.transform = cx || cy ? `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)` : ''
        raf = 0
        return
      }
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      tx = (e.clientX - (r.left + r.width / 2)) * strengthX
      ty = (e.clientY - (r.top + r.height / 2)) * strengthY
      kick()
    }
    const onLeave = () => { tx = 0; ty = 0; kick() }

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
