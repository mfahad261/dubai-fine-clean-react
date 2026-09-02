/**
 * DeepMenu — the "Deep Cleaning" dropdown.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: from the header, on hover or focus of "Deep Cleaning".
 * WHAT IT DOES:     Shows the five deep-clean groups and their headline
 *                   services. Deliberately dark where the Services panel is
 *                   light, because the client runs these as separate divisions
 *                   and the two menus should never be mistaken for each other.
 * ANIMATION:        Unclips downward with the columns staggering in on --i.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEEP_FEATURED, DEEP_GROUPS, deepServiceCount } from '../data/deepCleaning.js'
import Icon from './Icon.jsx'
import './DeepMenu.css'

// Dropdown for the Deep Cleaning division. Styled darker than the Services
// panel so the two menus never read as the same thing.
export default function DeepMenu({ open, onClose }) {
  const [active, setActive] = useState(DEEP_GROUPS[0])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div className={`megaScrim ${open ? 'on' : ''}`} onClick={onClose} />
      <div className={`deepMenu ${open ? 'on' : ''}`}>
        <div className="deepFeatured">
          {DEEP_FEATURED.map((f, i) => (
            <Link
              key={f.id}
              to={f.to}
              onClick={onClose}
              className="deepFeatCard"
              style={{ '--acc': f.acc, '--i': i }}
            >
              <span className="deepFeatImg" style={{ backgroundImage: `url(${f.img})` }} />
              <span className="deepFeatScrim" />
              <span className="deepFeatTag">Most booked</span>
              <span className="deepFeatBody">
                <h4>{f.name}</h4>
                <span className="deepFeatGo">Explore<Icon name="arrowRight" size={13} /></span>
              </span>
            </Link>
          ))}
        </div>

        <div className="deepGrid">
          <div className="deepCols">
            {DEEP_GROUPS.map((g, i) => (
              <div
                key={g.id}
                className={`deepCol ${active.id === g.id ? 'on' : ''}`}
                style={{ '--i': i }}
                onMouseEnter={() => setActive(g)}
              >
                <Link to="/deep-cleaning" onClick={onClose} className="deepColHead">
                  <span className="n" style={{ color: g.acc }}>{g.no}</span>
                  <h4>{g.name}</h4>
                </Link>
                <ul>
                  {g.items.slice(0, 4).map((it) => (
                    <li key={it.n}>
                      <Link to="/deep-cleaning" onClick={onClose}>{it.n}</Link>
                    </li>
                  ))}
                  {g.items.length > 4 && (
                    <li className="more">+{g.items.length - 4} more</li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="deepSide">
            <div className="deepImg">
              {DEEP_GROUPS.map((g) => (
                <div
                  key={g.id}
                  className={`ph ${active.id === g.id ? 'on' : ''}`}
                  style={{ backgroundImage: `url(${g.items[0].img})` }}
                />
              ))}
            </div>
            <div className="t">{active.name}</div>
            <div className="s">{active.lede}</div>
            <Link to="/deep-cleaning" className="allLink" onClick={onClose}>
              All {deepServiceCount} deep-clean services →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
