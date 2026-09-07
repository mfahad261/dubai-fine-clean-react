/**
 * CookieConsentBanner — the bottom-fixed cookie notice.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: every page, once, until a choice is saved to
 *                   localStorage — see CookieConsentContext.
 * WHAT IT DOES:     Slides and fades in on first visit (never an abrupt
 *                   pop-in) and offers Accept All, Reject Non-Essential, and
 *                   a link into the full preferences modal. Renders nothing
 *                   once a choice already exists.
 */
import { useCookieConsent } from '../context/CookieConsentContext.jsx'
import Icon from './Icon.jsx'
import Button from './Button.jsx'
import './CookieConsent.css'

export default function CookieConsentBanner() {
  const { consent, bannerVisible, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent()

  if (consent) return null

  return (
    <div
      className={`cookieBanner ${bannerVisible ? 'show' : ''}`}
      role="region"
      aria-label="Cookie consent"
    >
      <span className="cIcon" aria-hidden="true"><Icon name="shieldCheck" size={22} /></span>

      <div className="cBody">
        <p>
          We use cookies to keep this site running smoothly and, with your permission, to understand
          how it's used and show relevant offers. Choose what you're comfortable with.
        </p>
      </div>

      <div className="cActions">
        <button type="button" className="cookieLink" onClick={openPreferences}>Manage Preferences</button>
        <Button variant="o" arrow={false} onClick={rejectNonEssential}>Reject Non-Essential</Button>
        <Button variant="b" arrow={false} onClick={acceptAll}>Accept All</Button>
      </div>
    </div>
  )
}
