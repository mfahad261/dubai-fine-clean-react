/**
 * Button — The single button used site-wide.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: everywhere.
 * WHAT IT DOES:     The single button used site-wide. Renders as a router Link, an anchor or a real <button> depending on the props given.
 * NOTES:            Pass `magnetic` to make it drift toward the cursor (hooks/useMagnetic.js). Colours live in style/globals.css so every button matches.
 */
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useMagnetic } from '../hooks/useMagnetic.js'
import './Button.css'

// variant: 'wa' | 'b' (blue) | 'g' (green) | 'o' (outline) | 'w' (white)
// magnetic: the button drifts toward the cursor while hovered
export default function Button({
  variant = 'b', to, href, arrow = true, icon, magnetic = false,
  children, className = '', ...rest
}) {
  const magRef = useMagnetic()
  const ref = magnetic ? magRef : undefined

  const content = (
    <>
      {icon && <Icon name={icon} size={16} filled={icon === 'whatsapp'} />}
      <span className="tx">{children}</span>
      {arrow && <Icon name="arrowRight" size={15} className="ar" />}
    </>
  )
  const cls = `btn btn-${variant} ${className}`.trim()

  if (to) return <Link ref={ref} to={to} className={cls} {...rest}>{content}</Link>
  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        ref={ref}
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }
  return <button ref={ref} className={cls} {...rest}>{content}</button>
}
