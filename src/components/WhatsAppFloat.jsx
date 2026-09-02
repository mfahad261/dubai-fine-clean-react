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
import { useCallback } from 'react'
import { BUSINESS } from '../data/content.js'
import { useDraggable } from '../hooks/useDraggable.js'
import { useTilt3D } from '../hooks/useTilt3D.js'
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

  // a drag that happens to finish over a link would otherwise navigate
  const guard = useCallback((e) => { if (didDrag()) e.preventDefault() }, [didDrag])

  // While actively dragging, track the pointer with left/top — pixel-exact
  // and no risk of the toolbar changing mid-gesture. Once it's parked,
  // switch to right/bottom instead: mobile browsers collapse their address
  // bar as you scroll, which changes window.innerHeight after the fact, and
  // an anchor pinned with `top` drifted upward — appearing to float toward
  // the middle of the screen — because that pixel value never got to hear
  // about it. `bottom` is re-resolved against the real viewport edge on
  // every paint, so the dock stays put.
  const style = pos
    ? dragging
      ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
      : {
          left: 'auto',
          top: 'auto',
          right: window.innerWidth - pos.x - (ref.current?.offsetWidth ?? 60),
          bottom: window.innerHeight - pos.y - (ref.current?.offsetHeight ?? 120),
        }
    : undefined

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
