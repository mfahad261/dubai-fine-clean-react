/**
 * Navbar — the site header, present on every page.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: fixed to the top of every route.
 * WHAT IT DOES:     Brand, primary navigation, phone + WhatsApp actions, and
 *                   the two dropdown panels (Our Services, Deep Cleaning).
 * NOTES:            The header and its dropdowns share one wrapper so that
 *                   moving the pointer between them never counts as leaving —
 *                   that was the cause of the menu refusing to close earlier.
 *                   It also inverts to dark glass over dark sections; see
 *                   hooks/useNavTheme.js.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { usePinnedNav } from '../hooks/usePinnedNav.js'
import { useNavTheme } from '../hooks/useNavTheme.js'
import { BUSINESS } from '../data/content.js'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import MegaMenu from './MegaMenu.jsx'
import DeepMenu from './DeepMenu.jsx'
import MobileMenu from './MobileMenu.jsx'
import './Navbar.css'

export default function Navbar() {
  const { pinned, hidden } = usePinnedNav()
  const onDark = useNavTheme()
  const [openMenu, setOpenMenu] = useState(null) // 'services' | 'deep' | null
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)
  const { pathname } = useLocation()

  const open = useCallback((which) => {
    clearTimeout(closeTimer.current)
    setOpenMenu(which)
  }, [])

  // Short delay so travelling from the trigger down into the panel — which
  // briefly leaves both — doesn't dismiss it.
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160)
  }, [])

  const closeNow = useCallback(() => {
    clearTimeout(closeTimer.current)
    setOpenMenu(null)
  }, [])

  // Always dismiss on navigation, and on scroll — otherwise it can be left
  // hanging open if the pointer exits somewhere unexpected.
  useEffect(() => { closeNow() }, [pathname, closeNow])
  useEffect(() => {
    if (!openMenu) return
    const onScroll = () => closeNow()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [openMenu, closeNow])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  return (
    <>
      {/* nav and panel share a wrapper: mouseleave counts descendants, so
          moving between the two never registers as leaving */}
      <div className="navShell" onMouseLeave={scheduleClose}>
        <nav className={`nav ${pinned ? 'pinned' : ''} ${hidden && !openMenu ? 'hide' : ''} ${onDark ? 'onDark' : ''}`}>
          <Link to="/" className="brand" onClick={() => { setMobileOpen(false); closeNow() }}>
            <svg className="brandMark" viewBox="0 0 64 64" width="40" height="40">
              <circle cx="32" cy="32" r="30" fill="var(--blue)" />
              <path d="M32 14C24 26 16 36 16 44a16 16 0 0 0 32 0c0-8-8-18-16-30z" fill="#fff" />
            </svg>
            <span className="brandTx">
              <span className="n1"><b>Dubai</b> Fine Clean</span>
              <span className="n2">Business Bay · since 2016</span>
            </span>
          </Link>

          <div className="menu">
            <NavLink to="/" className="mItem-link" end onMouseEnter={closeNow}>Home</NavLink>

            <div className={`mItem ${openMenu === 'services' ? 'open' : ''}`} onMouseEnter={() => open('services')}>
              <Link to="/services" className={`mItem-link ${openMenu === 'services' ? 'on' : ''}`} onClick={closeNow}>
                Our Services
                <Icon name="chevron" size={11} className="caret" />
              </Link>
            </div>

            {/* the client runs Deep Cleaning as a separate division, so it
                gets its own top-level entry rather than living under Services */}
            <div className={`mItem ${openMenu === 'deep' ? 'open' : ''}`} onMouseEnter={() => open('deep')}>
              <Link to="/deep-cleaning" className={`mItem-link ${openMenu === 'deep' ? 'on' : ''}`} onClick={closeNow}>
                Deep Cleaning
                <Icon name="chevron" size={11} className="caret" />
              </Link>
            </div>

            <NavLink to="/about" className="mItem-link" onMouseEnter={closeNow}>About Us</NavLink>
            <NavLink to="/contact" className="mItem-link" onMouseEnter={closeNow}>Contact Us</NavLink>
          </div>

          <div className="navRight" onMouseEnter={closeNow}>
            <a id="navPhone" href={BUSINESS.phoneHref}>
              <span className="ic"><Icon name="phone" size={16} filled /></span>
              <span className="txt">
                <span className="k">Call us 7 days</span>
                <span className="v">{BUSINESS.phone}</span>
              </span>
            </a>
            <span className="navDiv" />
            <Button variant="wa" href={BUSINESS.whatsapp} arrow={false} icon="whatsapp" className="hideSmall" magnetic>
              WhatsApp
            </Button>
            <button
              className={`burger ${mobileOpen ? 'x' : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              <i /><i />
            </button>
          </div>
        </nav>

        <MegaMenu open={openMenu === 'services'} onClose={closeNow} />
        <DeepMenu open={openMenu === 'deep'} onClose={closeNow} />
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
