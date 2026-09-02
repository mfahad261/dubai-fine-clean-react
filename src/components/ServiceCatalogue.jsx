/**
 * ServiceCatalogue — Wraps every category into chapter + rows.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /services.
 * WHAT IT DOES:     Wraps every category into chapter + rows.
 */
import CategoryChapter from './CategoryChapter.jsx'
import ServiceRow from './ServiceRow.jsx'
import './ServiceCatalogue.css'

export default function ServiceCatalogue({ categories }) {
  return (
    <div className="catalogue">
      {categories.map((c) => (
        <section className="cat" key={c.id} style={{ '--acc': c.acc }}>
          <CategoryChapter cat={c} />
          <div className="catBody">
            <div className="svcList">
              {c.items.map((item, i) => <ServiceRow key={item.n} item={item} index={i} />)}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
