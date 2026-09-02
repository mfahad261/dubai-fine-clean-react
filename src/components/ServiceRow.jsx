/**
 * ServiceRow — one line of the Services page catalogue.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /services, inside every category block.
 * WHAT IT DOES:     Shows a single service — index, name, description and the
 *                   scope we commit to (hours on site, crew size). No price:
 *                   the client quotes in writing after a survey.
 * HOW IT CONNECTS:  data-peek-* opts the row into the cursor-following image
 *                   preview rendered globally by <HoverPeek />.
 */
import Icon from './Icon.jsx'
import './ServiceRow.css'

export default function ServiceRow({ item, index }) {
  return (
    <div className="svc" data-peek-img={item.img} data-peek-label={item.n}>
      <div className="idx">{String(index + 1).padStart(2, '0')}</div>

      <div>
        <div className="nm">{item.n}</div>
        <div className="ds">{item.d}</div>
      </div>

      <div className="mt">
        {item.m.map((x) => <i key={x}>{x}</i>)}
      </div>

      <div className="pr">
        <span className="quote">Get a quote<Icon name="arrowRight" size={13} /></span>
      </div>
    </div>
  )
}
