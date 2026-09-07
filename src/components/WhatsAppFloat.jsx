/**
 * WhatsAppFloat — the floating contact dock.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: fixed over every page, bottom-right by default.
 * WHAT IT DOES:     One-tap WhatsApp and phone, always within reach.
 * INTERACTION:      Grab the handle and drag it anywhere — it snaps to the
 *                   nearer edge on release and remembers where you left it.
 *                   Each button tilts in 3D toward the cursor and presses in
 *                   when clicked, so it reads as a physical object rather
 *                   than a flat circle.
 * SEE ALSO:         hooks/useDraggable.js (position + snapping)
 *                   hooks/useTilt3D.js   (the perspective tilt)
 */
import { useCallback, useEffect, useState } from 'react'
import { BUSINESS } from '../data/content.js'
import { useDraggable } from '../hooks/useDraggable.js'
import { useTilt3D } from '../hooks/useTilt3D.js'
import { useCookieConsent } from '../context/CookieConsentContext.jsx'
import Icon from './Icon.jsx'
import './WhatsAppFloat.css'

function DockButton({ variant, href, external, label, icon, onGuard, children }) {
  const tilt = useTilt3D({ max: 16 })
  return (
    <a
      ref={tilt}
      className={`dockBtn ${variant}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={onGuard}
      aria-label={label}
    >
      {/* stacked layers give the button its depth */}
      <span className="dockFace">
        <span className="dockGloss" aria-hidden="true" />
        <span className="dockIco"><Icon name={icon} filled size={variant === 'wa' ? 25 : 21} /></span>
        <span className="dockLabel">{children}</span>
      </span>
      <span className="dockEdge" aria-hidden="true" />
    </a>
  )
}

// 22px of breathing room reads fine on desktop but leaves a visible gap
// from the corner on a phone-width screen — tighten it up under 640px.
// Declared outside the component so useDraggable's effects see the same
// function reference on every render, instead of re-firing every time.
const dockMargin = () => (window.innerWidth <= 640 ? 12 : 22)

export default function WhatsAppFloat() {
  const { ref, pos, dragging, didDrag, handlers } = useDraggable({
    storageKey: 'dfc:dock',
    margin: dockMargin,
  })
  const { consent } = useCookieConsent()
  const [bannerHeight, setBannerHeight] = useState(0)

  // a drag that happens to finish over a link would otherwise navigate
  const guard = useCallback((e) => { if (didDrag()) e.preventDefault() }, [didDrag])

  // The stacked cookie banner on phones runs tall enough to fully cover the
  // dock's default bottom-right spot — not just overlap it, hide it. Measure
  // its real rendered height (it reflows differently across phone widths)
  // rather than guessing a fixed number, and nudge the dock clear of it.
  useEffect(() => {
    if (consent || window.innerWidth > 640) { setBannerHeight(0); return }
    const el = document.querySelector('.cookieBanner')
    if (!el) return
    const measure = () => setBannerHeight(el.getBoundingClientRect().height)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [consent])

  // While actively dragging, track the pointer with left/top — pixel-exact
  // and no risk of the toolbar changing mid-gesture. Once it's parked, the
  // resting position (pos.side/pos.bottom) is applied as a plain CSS
  // right-or-left plus bottom margin — see useDraggable.js for why that's
  // deliberately not derived from window.innerWidth arithmetic. `bottom`
  // as a raw CSS value is re-resolved against the real viewport edge on
  // every paint, so the dock stays put as a mobile browser's address bar
  // collapses or expands.
  const style = !pos
    ? undefined
    : dragging
      ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
      : {
          left: 'auto',
          top: 'auto',
          right: 'auto',
          [pos.side]: dockMargin(),
          bottom: pos.bottom + (bannerHeight ? bannerHeight + 16 : 0),
          transition: 'bottom .4s var(--eo)',
        }

  return (
    <div
      ref={ref}
      className={`dock ${dragging ? 'dragging' : ''} ${pos ? 'ready' : ''}`}
      style={style}
    >
      <span className="dockHandle" title="Drag me anywhere" {...handlers}>
        <i /><i /><i />
      </span>

      <DockButton variant="wa" href={BUSINESS.whatsapp} external icon="whatsapp" label="WhatsApp us" onGuard={guard}>
        WhatsApp us
      </DockButton>

      <DockButton variant="call" href={BUSINESS.phoneHref} icon="phone" label="Call us" onGuard={guard}>
        {BUSINESS.phone}
      </DockButton>
    </div>
  )
}
