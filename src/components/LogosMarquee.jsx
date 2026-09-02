/**
 * LogosMarquee — The scrolling strip of credentials — licences, guarantees, ratings.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, under the hero.
 * WHAT IT DOES:     The scrolling strip of credentials — licences, guarantees, ratings.
 */
import { CREDENTIALS } from '../data/content.js'
import Icon from './Icon.jsx'
import './LogosMarquee.css'

export default function LogosMarquee() {
  const loop = [...CREDENTIALS, ...CREDENTIALS]
  return (
    <div className="logos">
      <div className="logoTrack">
        {loop.map((c, i) => (
          <div className="lg" key={i}>
            <Icon name={c.icon} filled={c.icon === 'star'} size={20} />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  )
}
