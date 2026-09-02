/**
 * TopBar — The announcement ticker.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: above the header, every page.
 * WHAT IT DOES:     The announcement ticker.
 * NOTES:            Messages come from TOPBAR_MESSAGES in data/content.js.
 */
import { usePinnedNav } from '../hooks/usePinnedNav.js'
import { TOPBAR_MESSAGES } from '../data/content.js'
import './TopBar.css'

export default function TopBar() {
  const { topbarHidden } = usePinnedNav()
  const loop = [...TOPBAR_MESSAGES, ...TOPBAR_MESSAGES]
  return (
    <div className={`topbar ${topbarHidden ? 'up' : ''}`}>
      <div className="tbTrack">
        {loop.map((m, i) => <span key={i}>{m}</span>)}
      </div>
    </div>
  )
}
