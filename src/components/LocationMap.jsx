/**
 * LocationMap — A stylised map card marking the Business Bay office.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: /contact.
 * WHAT IT DOES:     A stylised map card marking the Business Bay office.
 */
import { IMG } from '../data/images.js'
import { BUSINESS } from '../data/content.js'
import Icon from './Icon.jsx'
import './LocationMap.css'

export default function LocationMap() {
  return (
    <div className="locMap" style={{ backgroundImage: `linear-gradient(180deg, rgba(14,27,46,.15), rgba(14,27,46,.85)), url(${IMG.dubaiAerial})` }}>
      <div className="locPin"><Icon name="pin" filled size={20} /></div>
      <div className="locCard">
        <div className="locName">Dubai Fine Clean HQ</div>
        <div className="locAddr">{BUSINESS.addressLine1}<br />{BUSINESS.addressLine2}</div>
      </div>
    </div>
  )
}
