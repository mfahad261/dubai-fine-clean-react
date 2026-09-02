/**
 * services — DATA
 * ---------------------------------------------------------------------------
 * "Our Services" — the six categories, their descriptions and every individual service.
 */
// Pricing is deliberately absent site-wide: the client quotes in writing
// after a survey, so publishing "from" figures only invites arguments.
// Each service carries its scope (`m`) instead — hours and crew size.
//
// "Our Services" — the six categories the client lists under that menu on
// dubaifineclean.com. Deep Cleaning is deliberately NOT here: the client
// treats it as a separate division with its own top-level menu, so it lives
// in deepCleaning.js.

import { CATEGORY_IMG, IMG } from './images.js'

// simple line-art pictogram per category, drawn as inline SVG path data —
// rendered by <PictogramIcon /> so no extra image requests are needed
export const PICT = {
  residential: 'M6 28L32 8l26 20M12 26v28h40V26M26 54V38h12v16',
  commercial: 'M10 10h20v44H10zM34 24h20v30H34zM16 20h8M16 30h8M16 40h8M40 34h8M40 44h8',
  construction: 'M8 54h48M14 54V30l18-14 18 14v24M24 54V40h16v14',
  surfaces: 'M8 20h48v28H8zM8 34h48M20 20v28M40 20v28M16 14c4-4 8-4 12 0s8 4 12 0 8-4 12 0',
  air: 'M10 14h44v22H10zM18 20v10M26 20v10M34 20v10M42 20v10M16 44c6 0 6 8 12 8s6-8 12-8 6 8 12 8',
  exterior: 'M12 8h40v48H12zM32 8v48M12 24h40M12 40h40',
  sanitis: 'M26 8h12v8H26zM22 16h20l4 12v28H18V28zM26 34h12M26 42h12',
}

const rotate = (imgs) => (i) => imgs[i % imgs.length]

export const CATS = [
  {
    id: 'residential', no: '01', acc: '#0B6FE8', dark: false,
    name: 'Residential Cleaning', img: CATEGORY_IMG.residential,
    tags: ['Villas', 'Apartments', 'Move in / out', 'Weekly'],
    lede: "Homes cleaned to a written checklist — whether that's a weekly two-hour visit or a full villa deep clean from top to bottom.",
    items: (() => { const img = rotate([IMG.residential, IMG.bedroom, IMG.kitchenMarble, IMG.bathroomLuxury])
    return [
      { n: 'Apartment Deep Clean', d: 'Full property: kitchen degrease, bathroom descale, interior glass, skirting, high-level dusting, inside wardrobes.', m: ['5–8 hrs', '2–3 staff'], img: img(0) },
      { n: 'Villa Deep Clean', d: "Whole villa across all floors including stairwells, majlis, maid's room, terraces and garage.", m: ['8–12 hrs', '4–6 staff'], img: img(1) },
      { n: 'Regular Maintenance', d: 'Scheduled weekly, fortnightly or monthly visits with the same assigned cleaner each time.', m: ['Min 3 hrs', '1–2 staff'], img: img(2) },
      { n: 'Move-In Deep Clean', d: 'Sanitised handover before you unpack — every surface, inside all joinery, appliances and A/C grilles.', m: ['6–10 hrs', '3–4 staff'], img: img(1) },
      { n: 'Move-Out Deep Clean', d: 'Landlord and agency standard aimed at full deposit return. Includes oven, fridge and balcony.', m: ['6–10 hrs', '3–4 staff'], img: img(0) },
      { n: 'Kitchen Deep Clean', d: 'Degreasing of hood, splashback, cabinet faces and interiors, oven, hob and fridge.', m: ['3–5 hrs', '2 staff'], img: img(2) },
      { n: 'Bathroom Deep Clean', d: 'Limescale and grout treatment, glass restoration, sanitary ware and extract grilles.', m: ['2–3 hrs', '1–2 staff'], img: img(3) },
      { n: 'Balcony & Terrace', d: 'Pressure rinse where permitted, railing and glass balustrade clean, drain clear.', m: ['2–4 hrs', '2 staff'], img: img(0) },
    ]})(),
  },
  {
    id: 'commercial', no: '02', acc: '#1B2A41', dark: true,
    name: 'Office & Commercial', img: CATEGORY_IMG.commercial,
    tags: ['Offices', 'Retail', 'Restaurants', 'Warehouse'],
    lede: 'Contract and one-off cleaning for offices, shops, restaurants and warehouses — scheduled outside your trading hours so nothing is interrupted.',
    items: (() => { const img = rotate([IMG.commercial, IMG.acSystems, IMG.sanitisation, IMG.kitchenMarble])
    return [
      { n: 'Office Deep Clean', d: 'Workstations, meeting rooms, pantry, washrooms, partition glass and floor treatment.', m: ['Overnight', '4–8 staff'], img: img(0) },
      { n: 'Nightly Office Contract', d: 'Recurring after-hours service with a fixed assigned team and consumables managed.', m: ['Nightly', '2–4 staff'], img: img(0) },
      { n: 'Shop & Retail Clean', d: 'Display glass, flooring, fitting rooms and back-of-house, before or after trading hours.', m: ['3–6 hrs', '2–4 staff'], img: img(1) },
      { n: 'Restaurant & Kitchen', d: 'Commercial kitchen degrease, extract canopy, floors and dining areas to HACCP expectations.', m: ['Overnight', '4–6 staff'], img: img(3) },
      { n: 'Warehouse & Industrial', d: 'High-level dusting, racking, floor scrubbing with ride-on machines and loading bays.', m: ['1–3 days', '6+ staff'], img: img(0) },
      { n: 'Salon & Spa Clean', d: 'Treatment rooms, basins, mirrors and floors with sanitisation between shifts.', m: ['3–5 hrs', '2–3 staff'], img: img(2) },
      { n: 'Post-Event Clean', d: 'Full clean-down after functions and exhibitions, including waste clearance.', m: ['4–8 hrs', '4–8 staff'], img: img(0) },
    ]})(),
  },
  {
    id: 'construction', no: '03', acc: '#E8907C', dark: false,
    name: 'Post-Construction', img: CATEGORY_IMG.construction,
    tags: ['Fine dust', 'Handover', 'Renovation', 'Debris'],
    lede: 'Fine construction dust travels everywhere and ordinary cleaning simply moves it around. This is a different process with different machinery.',
    items: (() => { const img = rotate([IMG.postConstruction, IMG.glassFacade, IMG.residential])
    return [
      { n: 'Post-Construction Deep Clean', d: 'Three stages: debris removal, fine dust extraction with HEPA units, then full detail clean.', m: ['1–3 days', '6+ staff'], img: img(0) },
      { n: 'Post-Renovation Clean', d: 'Targeted to renovated rooms with protection of untouched areas and finished surfaces.', m: ['6–12 hrs', '3–5 staff'], img: img(0) },
      { n: 'Paint & Adhesive Removal', d: 'Careful removal of overspray, grout haze, silicone and sticker residue from glass and tile.', m: ['4–8 hrs', '2–3 staff'], img: img(1) },
      { n: 'Debris & Waste Clearance', d: 'Sorted removal and licensed disposal of construction waste from site.', m: ['Half day', '3–4 staff'], img: img(0) },
      { n: 'Handover Detail Clean', d: 'Final snag-standard clean before developer or landlord inspection.', m: ['6–10 hrs', '4 staff'], img: img(2) },
    ]})(),
  },
  {
    id: 'surfaces', no: '04', acc: '#2FBF57', dark: true,
    name: 'Carpet, Upholstery & Stone', img: CATEGORY_IMG.surfaces,
    tags: ['Sofa', 'Carpet', 'Mattress', 'Marble'],
    lede: 'Hot-water extraction for fabric, rotary and diamond systems for stone. Fibre and finish are always tested before any product is applied.',
    items: (() => { const img = rotate([IMG.surfaces, IMG.kitchenMarble, IMG.bedroom, IMG.commercial, IMG.bathroomLuxury])
    return [
      { n: 'Sofa Shampoo', d: 'Hot-water extraction with fabric-appropriate solution, deodorised and fast-dried.', m: ['1–3 hrs', '2 staff'], img: img(0) },
      { n: 'Home Carpet Shampoo', d: 'Pre-spray, agitation and deep extraction lifting embedded soil and odour.', m: ['2–4 hrs', '2 staff'], img: img(0) },
      { n: 'Office Carpet Shampoo', d: 'Low-moisture encapsulation for commercial carpet tiles, dry and usable by morning.', m: ['Overnight', '2–3 staff'], img: img(3) },
      { n: 'Rug & Cotton Steaming', d: 'Delicate handling for wool, cotton, silk-blend and hand-knotted rugs, on or off site.', m: ['2–4 hrs', '2 staff'], img: img(0) },
      { n: 'Mattress Shampooing', d: 'Extraction and UV sanitisation targeting dust mites and allergens.', m: ['1–2 hrs', '1–2 staff'], img: img(2) },
      { n: 'Curtain Cleaning', d: 'On-rail steam treatment, or take-down, launder and re-hang service.', m: ['2–5 hrs', '2 staff'], img: img(0) },
      { n: 'Chair & Bed Head Shampoo', d: 'Dining chairs, office seating, bed heads, bed frames and ottomans, per unit.', m: ['1–2 hrs', '1–2 staff'], img: img(0) },
      { n: 'Marble Polishing', d: 'Diamond honing and crystallisation restoring depth and gloss to natural stone.', m: ['1–2 days', '3 staff'], img: img(1) },
      { n: 'Grout Restoration', d: 'Deep extraction of tile grout lines with optional colour seal afterwards.', m: ['3–6 hrs', '2 staff'], img: img(4) },
    ]})(),
  },
  {
    id: 'air', no: '05', acc: '#0A4FB5', dark: false,
    name: 'AC Duct, Coil & Water', img: CATEGORY_IMG.air,
    tags: ['Ducts', 'Coils', 'Water tank', 'Air quality'],
    lede: "In Dubai's climate, duct and coil condition drives both your air quality and your cooling bill. Cleaned with negative-air machinery, not brushes.",
    items: (() => { const img = rotate([IMG.acSystems, IMG.residential, IMG.postConstruction, IMG.kitchenMarble])
    return [
      { n: 'AC Duct Cleaning', d: 'Negative-air extraction of supply and return ducting with before/after camera footage.', m: ['3–6 hrs', '2–3 staff'], img: img(0) },
      { n: 'Coil & Filter Clean', d: 'Evaporator and condenser coil wash, filter replacement, drain pan sanitisation.', m: ['2–4 hrs', '2 staff'], img: img(0) },
      { n: 'Full AC Service Pack', d: 'Ducts, coils, filters, grilles and drainage across the whole property.', m: ['1 day', '3–4 staff'], img: img(1) },
      { n: 'Water Tank Cleaning', d: 'Drain, scrub, disinfect and refill with a DM-compliant certificate issued.', m: ['3–5 hrs', '2–3 staff'], img: img(2) },
      { n: 'Kitchen Exhaust Duct', d: 'Commercial canopy and duct degreasing to fire-safety standard, certificate issued.', m: ['Overnight', '3–4 staff'], img: img(3) },
      { n: 'Air Quality Check', d: 'Particulate and humidity readings before and after treatment with a written report.', m: ['1 hr', '1 staff'], img: img(0) },
    ]})(),
  },
  {
    id: 'sanitis', no: '06', acc: '#E9A23B', dark: false,
    name: 'Sanitisation & Disinfection', img: CATEGORY_IMG.sanitis,
    tags: ['High-touch', 'Anti-viral', 'Fogging', 'Custom plans'],
    lede: 'Targeted treatment plans that keep homes, offices and public spaces safer — used on their own or as a finishing stage after a deep clean.',
    items: (() => { const img = rotate([IMG.sanitisation, IMG.cleaningSupplies, IMG.commercial])
    return [
      { n: 'High-Touch Disinfection', d: 'Handles, switches, rails, lift buttons and shared equipment treated on a scheduled round.', m: ['1–2 hrs', '2 staff'], img: img(0) },
      { n: 'Anti-Bacterial Fogging', d: 'ULV fogging of whole floors with certified, food-safe agents. Short re-entry time.', m: ['1–3 hrs', '2 staff'], img: img(0) },
      { n: 'Anti-Viral Treatment', d: 'Hospital-grade surface treatment with a residual protective film, certificate issued.', m: ['2–4 hrs', '2–3 staff'], img: img(1) },
      { n: 'Tailored Sanitisation Plan', d: 'A recurring programme built around your footfall, shifts and risk areas.', m: ['Scheduled', '2+ staff'], img: img(2) },
    ]})(),
  },
]

export const getCategory = (id) => CATS.find((c) => c.id === id)
export const totalServiceCount = CATS.reduce((n, c) => n + c.items.length, 0)
