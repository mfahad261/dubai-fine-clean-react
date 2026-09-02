/**
 * ServiceFilters — The filter bar.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /services, sticky under the header.
 * WHAT IT DOES:     The filter bar. Selecting a category narrows the catalogue and updates the URL, so a filtered view can be shared or bookmarked.
 */
import { CATS, totalServiceCount } from '../data/services.js'
import './ServiceFilters.css'

export default function ServiceFilters({ active, onChange }) {
  return (
    <div className="filters">
      <div className="filterRow">
        <button
          type="button"
          className={`fbtn ${active === 'all' ? 'on' : ''}`}
          onClick={() => onChange('all')}
        >
          All services<span className="ct">{totalServiceCount}</span>
        </button>
        {CATS.map((c) => (
          <button
            key={c.id}
            type="button"
            style={{ '--acc': c.acc }}
            className={`fbtn ${active === c.id ? 'on' : ''}`}
            onClick={() => onChange(c.id)}
          >
            {c.name}<span className="ct">{c.items.length}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
