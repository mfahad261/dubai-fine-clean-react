// ---------------------------------------------------------------------------
// DEEP CLEANING
// The client treats this as its own division, with a separate top-level menu
// on dubaifineclean.com — not a sub-category of "Our Services". This file
// mirrors that: every deep-clean service they list, grouped by what the
// customer is actually trying to get cleaned.
// ---------------------------------------------------------------------------

import { IMG } from './images.js'
import { CATS } from './services.js'

// The client's three headline categories — Residential, Office & Commercial
// and Post-Construction — are technically part of "Our Services", but he
// wants them called out again here as the flagship entry point into Deep
// Cleaning, ahead of the five groups below. They link through to their full
// listing on the Services side rather than duplicating it.
const FEATURED_IDS = ['residential', 'commercial', 'construction']
export const DEEP_FEATURED = FEATURED_IDS.map((id) => {
  const c = CATS.find((cat) => cat.id === id)
  return { id: c.id, name: c.name, acc: c.acc, lede: c.lede, img: c.img, to: `/services/${c.id}` }
})

export const DEEP_GROUPS = [
  {
    id: 'homes',
    no: '01',
    name: 'Homes & Villas',
    acc: '#0B63D8',
    lede: 'Whole-property cleans for villas and apartments — the full checklist, top to bottom, inside every cupboard.',
    items: [
      { n: 'Villa Deep Cleaning', d: 'Every floor, stairwell, majlis, maid\'s room, terrace and garage in one visit.', m: ['8–12 hrs', '4–6 staff'], img: IMG.residential },
      { n: 'Apartment Deep Cleaning', d: 'Kitchen degrease, bathroom descale, interior glass, skirting and inside all wardrobes.', m: ['5–8 hrs', '2–3 staff'], img: IMG.team005 },
      { n: 'Move In Deep Cleaning', d: 'Sanitised handover before you unpack — joinery, appliances and A/C grilles included.', m: ['6–10 hrs', '3–4 staff'], img: IMG.bedroom },
      { n: 'Move Out Deep Cleaning', d: 'Landlord and agency standard, aimed squarely at getting your full deposit back.', m: ['6–10 hrs', '3–4 staff'], img: IMG.team007 },
      { n: 'Balcony Deep Cleaning', d: 'Pressure rinse where permitted, railings, glass balustrades and drain clearing.', m: ['2–4 hrs', '2 staff'], img: IMG.team003 },
      { n: 'Garage Deep Cleaning', d: 'Oil stain treatment, floor scrubbing, shelving and shutter tracks.', m: ['3–5 hrs', '2 staff'], img: IMG.postConstruction },
    ],
  },
  {
    id: 'rooms',
    no: '02',
    name: 'Rooms & Fixtures',
    acc: '#0F7538',
    lede: 'Single-room work when the rest of the property is fine — usually the kitchen or the bathrooms.',
    items: [
      { n: 'Kitchen Deep Cleaning', d: 'Hood, splashback, cabinet faces and interiors, oven, hob and fridge degreased.', m: ['3–5 hrs', '2 staff'], img: IMG.kitchenMarble },
      { n: 'Bathroom Deep Cleaning', d: 'Limescale and grout treatment, glass restoration, sanitary ware and extract grilles.', m: ['2–3 hrs', '1–2 staff'], img: IMG.team002 },
      { n: 'Floor Deep Cleaning', d: 'Scrubbing, extraction and finish restoration across tile, stone, vinyl and wood.', m: ['3–6 hrs', '2 staff'], img: IMG.bathroomLuxury },
      { n: 'Oven & BBQ Deep Cleaning', d: 'Dip-tank degreasing of racks and trays, plus door glass and cavity.', m: ['2–3 hrs', '1–2 staff'], img: IMG.kitchenMarble },
      { n: 'Steam Deep Cleaning', d: 'High-temperature steam for grout, sealed stone and sanitary areas — no chemicals.', m: ['3–5 hrs', '2 staff'], img: IMG.cleaningSupplies },
    ],
  },
  {
    id: 'fabric',
    no: '03',
    name: 'Furnishings & Fabric',
    acc: '#E08A72',
    lede: 'Hot-water extraction and steam for upholstery, carpet and mattresses. Fibres are always tested first.',
    items: [
      { n: 'Sofa Deep Cleaning', d: 'Extraction with fabric-appropriate solution, deodorised and fast-dried.', m: ['1–3 hrs', '2 staff'], img: IMG.surfaces },
      { n: 'Carpet Shampoo Service', d: 'Pre-spray, agitation and deep extraction lifting embedded soil and odour.', m: ['2–4 hrs', '2 staff'], img: IMG.team007 },
      { n: 'Mattress Deep Cleaning', d: 'Extraction and UV sanitisation targeting dust mites and allergens.', m: ['1–2 hrs', '1–2 staff'], img: IMG.bedroom },
    ],
  },
  {
    id: 'business',
    no: '04',
    name: 'Business & Sites',
    acc: '#0E1B2E',
    lede: 'Scheduled outside your trading hours, so nothing stops while we work.',
    items: [
      { n: 'Office Deep Cleaning', d: 'Workstations, meeting rooms, pantry, washrooms, partition glass and floors.', m: ['Overnight', '4–8 staff'], img: IMG.commercial },
      { n: 'Commercial Deep Cleaning', d: 'Whole-premises clean for mixed-use and multi-floor commercial units.', m: ['1–2 days', '6+ staff'], img: IMG.commercial },
      { n: 'Restaurant Deep Cleaning', d: 'Commercial kitchen degrease, extract canopy, floors and dining areas to HACCP standards.', m: ['Overnight', '4–6 staff'], img: IMG.kitchenMarble },
      { n: 'Warehouse Deep Cleaning', d: 'High-level dusting, racking, ride-on floor scrubbing and loading bays.', m: ['1–3 days', '6+ staff'], img: IMG.postConstruction },
      { n: 'Shop & Salon Deep Cleaning', d: 'Display glass, treatment rooms, basins, fitting rooms and back-of-house.', m: ['3–6 hrs', '2–4 staff'], img: IMG.team004 },
      { n: 'Post Construction Deep Cleaning', d: 'Debris removal, HEPA fine-dust extraction, then a full detail clean.', m: ['1–3 days', '6+ staff'], img: IMG.postConstruction },
    ],
  },
  {
    id: 'exterior',
    no: '05',
    name: 'Glass & Exterior',
    acc: '#0E8A8A',
    lede: 'Interior glass, pole systems for low-rise, and full rope access for towers. Permits arranged for you.',
    items: [
      { n: 'Window Cleaning', d: 'Glass, frames, tracks and sills throughout, finished streak-free.', m: ['2–4 hrs', '2 staff'], img: IMG.team003 },
      { n: 'Facade Cleaning', d: 'Certified rope-access technicians for tower glass and cladding. RAMS handled.', m: ['Multi-day', '4+ staff'], img: IMG.team008 },
      { n: 'Pergola & Outdoor Cleaning', d: 'Shade structures, outdoor furniture, decking and garden hard-surfaces.', m: ['3–5 hrs', '2 staff'], img: IMG.exterior },
      { n: 'High-Pressure Washing', d: 'Driveways, car parks, terraces and boundary walls with commercial jetting.', m: ['3–6 hrs', '2–3 staff'], img: IMG.dubaiAerial },
    ],
  },
]

export const deepServiceCount = DEEP_GROUPS.reduce((n, g) => n + g.items.length, 0)
export const getDeepGroup = (id) => DEEP_GROUPS.find((g) => g.id === id)
