/**
 * useTilt3D — tips an element in perspective toward the cursor.
 * ---------------------------------------------------------------------------
 * Used by the floating contact dock. The element rotates a few degrees on both
 * axes following the pointer and lifts slightly, which is what sells it as a
 * solid object with a top surface rather than a flat disc.
 * Disabled on touch (no hover) and when reduced motion is requested.
 */
import { useEffect, useRef } from 'react'

export function useTilt3D({ max = 14, lift = 6 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf, tx = 0, ty = 0, cx = 0, cy = 0, active = false

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      // -1 → 1 across each axis, measured from the element's centre
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      tx = -ny * max          // pushing the cursor up tips the top away
      ty = nx * max
      active = true
    }
    const onLeave = () => { tx = 0; ty = 0; active = false }

    const tick = () => {
      cx += (tx - cx) * 0.16
      cy += (ty - cy) * 0.16
      const settled = Math.abs(cx) < 0.02 && Math.abs(cy) < 0.02 && !active
      el.style.transform = settled
        ? ''
        : `perspective(520px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg) translateZ(${(active ? lift : 0)}px)`
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
  }, [max, lift])

  return ref
}
