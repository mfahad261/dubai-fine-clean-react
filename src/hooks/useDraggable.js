/**
 * useDraggable — HOOK
 * ---------------------------------------------------------------------------
 * Drag-anywhere behaviour with edge snapping and a remembered position. Used by the contact dock.
 * ---------------------------------------------------------------------------
 * The RESTING position (once a drag ends, or by default) is stored as a
 * distance from an edge — { side: 'left'|'right', bottom } — never as a
 * top-left pixel derived by subtracting the element's width from
 * window.innerWidth. That subtraction used to run on every render using
 * ref.current.offsetWidth; in at least one in-app WebView that read came
 * back wrong at the wrong moment, and the dock rendered stranded mid-screen
 * instead of pinned to a corner. A margin distance from an edge needs no
 * such arithmetic: it's applied directly as CSS right/left + bottom, which
 * the browser resolves against the real, current viewport on every paint —
 * no JS measurement involved at all for the default, untouched state.
 * While actively dragging, position is still tracked live as pixel {x, y} —
 * that's a transient, visually-driven state where pixel-exact tracking is
 * exactly what's wanted, and the element is guaranteed to be fully laid out
 * by the time a real drag gesture is happening.
 */
import { useCallback, useEffect, useRef, useState } from 'react'

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

// Drag-anywhere behaviour with edge snapping. A short movement threshold
// separates a drag from a click, so the buttons still work as buttons.
export function useDraggable({ storageKey, margin = 22, snap = true } = {}) {
  const ref = useRef(null)
  // { side: 'left'|'right', bottom } at rest, or { x, y } while dragging
  const [pos, setPos] = useState(null)
  const [dragging, setDragging] = useState(false)
  const state = useRef({ ox: 0, oy: 0, moved: false, active: false })

  const m = useCallback(() => (typeof margin === 'function' ? margin() : margin), [margin])

  // restore last position, defaulting to bottom-right — both pure margin
  // constants, not a calculation against the element's own measured size
  useEffect(() => {
    let start = { side: 'right', bottom: m() }
    if (storageKey) {
      try {
        const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null')
        if (saved && (saved.side === 'left' || saved.side === 'right') && typeof saved.bottom === 'number') {
          start = saved
        }
      } catch { /* storage can throw in private modes — the default is fine */ }
    }
    setPos(start)
  }, [storageKey, m])

  const onPointerDown = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    state.current = { ox: e.clientX - r.left, oy: e.clientY - r.top, moved: false, active: true }
    el.setPointerCapture?.(e.pointerId)
    setDragging(true)
    // seed live pixel tracking from wherever it's actually sitting right now
    setPos({ x: r.left, y: r.top })
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!state.current.active) return
    const el = ref.current
    const w = el?.offsetWidth ?? 60
    const h = el?.offsetHeight ?? 120
    const mm = m()
    const x = clamp(e.clientX - state.current.ox, mm, window.innerWidth - w - mm)
    const y = clamp(e.clientY - state.current.oy, mm, window.innerHeight - h - mm)
    if (!state.current.moved) {
      const r = el.getBoundingClientRect()
      if (Math.abs(x - r.left) > 4 || Math.abs(y - r.top) > 4) state.current.moved = true
    }
    setPos({ x, y })
  }, [m])

  const onPointerUp = useCallback((e) => {
    if (!state.current.active) return
    state.current.active = false
    ref.current?.releasePointerCapture?.(e.pointerId)
    setDragging(false)

    // measured live, at the exact moment the drag ends — the one point
    // where reading the element's real box is guaranteed accurate
    const r = ref.current?.getBoundingClientRect()
    if (r) {
      const goLeft = snap ? r.left + r.width / 2 < window.innerWidth / 2 : r.left < window.innerWidth / 2
      const next = { side: goLeft ? 'left' : 'right', bottom: Math.max(m(), window.innerHeight - r.bottom) }
      setPos(next)
      if (storageKey) {
        try { sessionStorage.setItem(storageKey, JSON.stringify(next)) } catch { /* ignore */ }
      }
    }
  }, [m, snap, storageKey])

  // true only if the pointer actually travelled — lets callers suppress
  // the click that follows a drag
  const didDrag = useCallback(() => state.current.moved, [])

  return { ref, pos, dragging, didDrag, handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp } }
}
