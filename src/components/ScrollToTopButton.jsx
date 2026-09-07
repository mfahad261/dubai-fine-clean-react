/**
 * ScrollToTopButton — Appears after 900px of scrolling and returns you to the top.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: every page.
 * WHAT IT DOES:     Appears after 900px of scrolling and returns you to the top.
 */
import { useEffect, useState } from 'react'
import { scrollToTop } from '../hooks/useSmoothScroll.js'
import Icon from './Icon.jsx'
import './ScrollToTopButton.css'

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <button className="scrollTop" onClick={() => scrollToTop(false)} aria-label="Back to top">
      <Icon name="chevron" size={18} className="up" />
    </button>
  )
}
