/**
 * DeepCleanIndex — The row catalogue for a deep-clean group.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /deep-cleaning, one per group.
 * WHAT IT DOES:     The row catalogue for a deep-clean group. Hovering a row slides it right, runs a coloured bar down its edge and slides the photo in from the right.
 * NOTES:            Same reading rhythm as the Services page but a different mechanic, so the two pages don't feel identical.
 */
import { useState } from 'react'
import Reveal from './Reveal.jsx'
import PictogramIcon from './PictogramIcon.jsx'
import Icon from './Icon.jsx'
import './DeepCleanIndex.css'

// Row catalogue, like the Services page — but where Services keeps its
// photography in a cursor-following thumbnail, here the image slides in
// from the right edge of the row itself and the row opens to make space.
// Same reading rhythm, different mechanic.
export default function DeepCleanIndex({ group }) {
  const [open, setOpen] = useState(null)

  return (
    <section className="dcGroup" style={{ '--acc': group.acc }} id={group.id}>
      <div className="wrap">
        <Reveal as="header" className="dcGroupHead">
          <div className="dcGroupMark">
            <span className="dcGroupNo">{group.no}</span>
            <span className="dcGroupIcon"><PictogramIcon categoryId="residential" size={20} /></span>
          </div>
          <div>
            <h2 className="ed">{group.name}</h2>
            <p className="lede">{group.lede}</p>
          </div>
          <span className="dcGroupCount">
            <b>{group.items.length}</b>
            services
          </span>
        </Reveal>

        <div className="dcRows">
          {group.items.map((it, i) => (
            <Reveal
              as="article"
              key={it.n}
              delay={Math.min(i * 45, 260)}
              className={`dcItem ${open === i ? 'open' : ''}`}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(i)}
              onBlur={() => setOpen(null)}
              tabIndex={0}
            >
              <span className="dcItemIdx">{String(i + 1).padStart(2, '0')}</span>

              <div className="dcItemBody">
                <h3>{it.n}</h3>
                <p>{it.d}</p>
                <div className="dcItemMeta">
                  {it.m.map((m) => <span key={m}>{m}</span>)}
                </div>
              </div>

              <div className="dcItemPrice">
                <span className="quote">Get a quote</span>
              </div>

              {/* slides in from the right as the row opens */}
              <div className="dcItemShot" style={{ backgroundImage: `url(${it.img})` }} />

              <span className="dcItemGo"><Icon name="arrowRight" size={15} /></span>
              <span className="dcItemBar" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
