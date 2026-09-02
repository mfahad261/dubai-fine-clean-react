/**
 * useDraggable — HOOK
 * ---------------------------------------------------------------------------
 * Drag-anywhere behaviour with edge snapping and a remembered position. Used by the contact dock.
 */
import { useCallback, useEffect, useRef, useState } from 'react'

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

// Drag-anywhere behaviour with edge snapping. A short movement threshold
// separates a drag from a click, so the buttons still work as buttons.
export function useDraggable({ storageKey, margin = 22, snap = true } = {}) {
  const ref = useRef(null)
  const [pos, setPos] = useState(null)          // {x, y} once positioned
  const [dragging, setDragging] = useState(false)
  const state = useRef({ ox: 0, oy: 0, moved: false, active: false })

  const bounds = useCallback(() => {
    const el = ref.current
    const w = el?.offsetWidth ?? 60
    const h = el?.offsetHeight ?? 120
    const m = typeof margin === 'function' ? margin() : margin
    return {
      minX: m,
      maxX: window.innerWidth - w - m,
      minY: m,
      maxY: window.innerHeight - h - m,
    }
  }, [margin])

  // restore last position, defaulting to bottom-right
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const b = bounds()
    let start = { x: b.maxX, y: b.maxY }
    if (storageKey) {
      try {
        const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null')
        if (saved && typeof saved.x === 'number') {
          start = { x: clamp(saved.x, b.minX, b.maxX), y: clamp(saved.y, b.minY, b.maxY) }
        }
      } catch { /* storage can throw in private modes — the default is fine */ }
    }
    setPos(start)
  }, [bounds, storageKey])

  // keep it on screen when the window resizes
  useEffect(() => {
    const onResize = () => {
      setPos((p) => {
        if (!p) return p
        const b = bounds()
        return { x: clamp(p.x, b.minX, b.maxX), y: clamp(p.y, b.minY, b.maxY) }
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [bounds])

  const onPointerDown = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    state.current = { ox: e.clientX - r.left, oy: e.clientY - r.top, moved: false, active: true }
    el.setPointerCapture?.(e.pointerId)
    setDragging(true)
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!state.current.active) return
    const b = bounds()
    const x = clamp(e.clientX - state.current.ox, b.minX, b.maxX)
    const y = clamp(e.clientY - state.current.oy, b.minY, b.maxY)
    if (!state.current.moved) {
      const el = ref.current
      const r = el.getBoundingClientRect()
      if (Math.abs(x - r.left) > 4 || Math.abs(y - r.top) > 4) state.current.moved = true
    }
    setPos({ x, y })
  }, [bounds])

  const onPointerUp = useCallback((e) => {
    if (!state.current.active) return
    state.current.active = false
    ref.current?.releasePointerCapture?.(e.pointerId)
    setDragging(false)
    setPos((p) => {
      if (!p) return p
      const b = bounds()
      // snap to whichever side it's closest to, so it always parks tidily
      const next = snap
        ? { x: p.x + (ref.current?.offsetWidth ?? 60) / 2 < window.innerWidth / 2 ? b.minX : b.maxX, y: p.y }
        : p
      if (storageKey) {
        try { sessionStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* ignore */ }
      }
      return next
    })
  }, [bounds, snap, storageKey])

  // true only if the pointer actually travelled — lets callers suppress
  // the click that follows a drag
  const didDrag = useCallback(() => state.current.moved, [])

  return { ref, pos, dragging, didDrag, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp } }
}
