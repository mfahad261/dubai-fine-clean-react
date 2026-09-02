/**
 * useHeroParticles — HOOK
 * ---------------------------------------------------------------------------
 * The dust and sparkle canvas inside the hero frame.
 */
import { useEffect, useRef } from 'react'

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
// smoothstep — eases the sweep in and out instead of moving linearly
const S = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1)
  return t * t * (3 - 2 * t)
}

// Dust motes drift on the dirty side and get blown away as the clean edge
// passes over them; sparkles twinkle in the cleaned area behind it.
export function useHeroParticles(progressRef) {
  const canvasRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    const card = cardRef.current
    if (!cv || !card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0, dust = [], spark = [], raf, last = performance.now()

    const size = () => {
      W = cv.width = Math.max(1, card.clientWidth * dpr)
      H = cv.height = Math.max(1, card.clientHeight * dpr)
      cv.style.width = '100%'
      cv.style.height = '100%'
      dust = Array.from({ length: Math.round((W * H) / 12000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.24,
        a: Math.random() * 0.42 + 0.18, ph: Math.random() * 6.28, fl: 0,
      }))
      spark = Array.from({ length: Math.round((W * H) / 26000) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.5 + 0.5,
        ph: Math.random() * 6.28, sp: 0.6 + Math.random() * 1.6,
      }))
    }
    size()
    window.addEventListener('resize', size)

    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      const p = progressRef.current || 0
      const sweep = S(0.06, 0.86, p)
      const px = sweep * 128 - 14
      const lineX = (px / 100) * W

      ctx.clearRect(0, 0, W, H)

      for (const d of dust) {
        if (d.x <= lineX) d.fl = Math.min(1, d.fl + dt * 2.8)
        d.x += d.vx + d.fl * (2.8 + Math.sin(d.ph) * 1.5)
        d.y += d.vy - d.fl * 1.7
        if (d.x > W + 10 || d.y < -10) {
          d.x = Math.random() * Math.max(1, lineX)
          d.y = Math.random() * H
          d.fl = 0
        }
        const al = d.a * (1 - d.fl * 0.86)
        if (al <= 0.01) continue
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * dpr, 0, 6.283)
        ctx.fillStyle = `rgba(205,190,165,${al})`
        ctx.fill()
      }

      for (const s of spark) {
        if (s.x > lineX) continue
        const tw = Math.max(0, Math.sin(t * 0.002 * s.sp + s.ph))
        const al = tw * 0.8 * S(0.04, 0.28, sweep)
        if (al <= 0.02) continue
        const R = s.r * dpr * (1 + tw)
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(t * 0.0004 + s.ph)
        ctx.fillStyle = `rgba(255,255,255,${al})`
        ctx.beginPath()
        ctx.moveTo(0, -R * 3); ctx.lineTo(R * 0.7, -R * 0.7)
        ctx.lineTo(R * 3, 0); ctx.lineTo(R * 0.7, R * 0.7)
        ctx.lineTo(0, R * 3); ctx.lineTo(-R * 0.7, R * 0.7)
        ctx.lineTo(-R * 3, 0); ctx.lineTo(-R * 0.7, -R * 0.7)
        ctx.closePath(); ctx.fill(); ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
    }
  }, [progressRef])

  return { canvasRef, cardRef }
}

export { S as smoothstep }
