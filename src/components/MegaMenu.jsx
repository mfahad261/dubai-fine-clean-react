/**
 * MegaMenu — the "Our Services" dropdown.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: from the header, on hover or focus of "Our Services".
 * WHAT IT DOES:     Lists the six service categories with a preview image that
 *                   swaps as you move between them.
 * ANIMATION:        The panel unclips downward, then each column lifts in on a
 *                   stagger driven by --i, so it assembles rather than appears.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATS } from '../data/services.js'
import PictogramIcon from './PictogramIcon.jsx'
import './MegaMenu.css'

export default function MegaMenu({ open, onClose }) {
  const [active, setActive] = useState(CATS[0])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <div className={`megaScrim ${open ? 'on' : ''}`} onClick={onClose} />
      <div className={`mega ${open ? 'on' : ''}`}>
        <div className="megaGrid">
          <div className="megaCols">
            {CATS.map((c, i) => (
              <Link
                to={`/services/${c.id}`}
                key={c.id}
                className="megaCat"
                style={{ '--i': i }}
                onMouseEnter={() => setActive(c)}
                onClick={onClose}
              >
                <div className="h">
                  <span className="dot" style={{ background: c.acc }}>{c.no}</span>
                  <h4>{c.name}</h4>
                </div>
                <ul>
                  {c.items.slice(0, 3).map((it) => <li key={it.n}>{it.n}</li>)}
                </ul>
                <span className="more">{c.items.length} services →</span>
              </Link>
            ))}
          </div>
          <div className="megaSide">
            <div className="megaImg">
              {CATS.map((c, i) => (
                <div
                  key={c.id}
                  className={`ph ${active.id === c.id ? 'on' : ''}`}
                  style={{ backgroundImage: `url(${c.img})` }}
                />
              ))}
              <div className="megaIcon"><PictogramIcon categoryId={active.id} size={30} /></div>
            </div>
            <div className="t">{active.name}</div>
            <div className="s">{active.lede}</div>
            <Link to="/services" className="allLink" onClick={onClose}>View all services →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
