/**
 * images — DATA
 * ---------------------------------------------------------------------------
 * Every image import in one place. To swap in the client's own photography, drop files into src/assets and repoint the path here — nothing else changes.
 */
// Every image import lives here. Swap in the client's real photography by
// dropping files into src/assets/... and repointing the path below —
// nothing else in the app needs to change.

import heroImg from '../assets/banners/hero.jpg'
import dubaiSkyline from '../assets/banners/dubai-skyline.jpg'
import dubaiAerial from '../assets/banners/dubai-aerial.jpg'

import residential from '../assets/services/residential.jpg'
import commercial from '../assets/services/commercial.jpg'
import postConstruction from '../assets/services/post-construction.jpg'
import surfaces from '../assets/services/surfaces.jpg'
import acSystems from '../assets/services/ac-systems.jpg'
import exterior from '../assets/services/exterior.jpg'
import sanitisation from '../assets/services/sanitisation.jpg'

import residentialTeam from '../assets/team/residential-team.jpg'

// The client's own team photography — supplied by Dubai Fine Clean.
// These are real staff on real jobs, so they take priority over stock
// wherever a human being appears on the page.
import team001 from '../assets/team/Team001.jpg'
import team002 from '../assets/team/Team002.jpg'
import team003 from '../assets/team/Team003.jpg'
import team004 from '../assets/team/Team004.jpg'
import team005 from '../assets/team/Team005.jpg'
import team006 from '../assets/team/Team006.jpg'
import team007 from '../assets/team/Team007.jpg'
import team008 from '../assets/team/Team008.jpg'
import supervisor from '../assets/team/supervisor.jpg'
import glassFacade from '../assets/team/glass-facade.jpg'
import detailFinishing from '../assets/team/detail-finishing.jpg'

import kitchenMarble from '../assets/gallery/kitchen-marble.jpg'
import bathroomLuxury from '../assets/gallery/bathroom-luxury.jpg'
import bedroom from '../assets/gallery/bedroom.jpg'
import cleaningSupplies from '../assets/gallery/cleaning-supplies.jpg'

export const IMG = {
  hero: heroImg,
  dubaiSkyline,
  dubaiAerial,
  residential,
  commercial,
  postConstruction,
  surfaces,
  acSystems,
  exterior,
  sanitisation,
  residentialTeam,
  glassFacade,
  detailFinishing,
  kitchenMarble,
  bathroomLuxury,
  bedroom,
  cleaningSupplies,
  team001, team002, team003, team004, team005, team006, team007, team008,
  supervisor,
}

/**
 * The senior supervisor who runs the crews day to day. Shown at the top of
 * the About page — a real face carries more weight than any claim about
 * standards.
 *
 * TO ADD HIS NAME: fill in `name` below and it appears automatically. Left
 * blank deliberately rather than invented.
 */
export const SUPERVISOR = {
  src: supervisor,
  name: '',
  role: 'Senior Supervisor',
  since: 2016,
}

// Ordered for the About page grid. `tall` marks portrait shots so the
// mosaic can span them across two rows.
export const TEAM_PHOTOS = [
  { src: team006, w: 1200, h: 1600, caption: 'A/C grilles and vents, wiped down by hand' },
  { src: team003, w: 757,  h: 1600, caption: 'Full-height villa glazing, inside and out' },
  { src: team002, w: 1599, h: 758,  caption: 'Bathroom fixtures and sanitary ware' },
  { src: team005, w: 757,  h: 1600, caption: 'Living room consoles and electronics' },
  { src: team008, w: 1200, h: 1600, caption: 'Ladder access for exterior glass' },
  { src: team004, w: 757,  h: 1600, caption: 'Framed art and mirrors, detail dusted' },
  { src: team007, w: 899,  h: 1599, caption: 'Mattress and carpet extraction' },
]

// The closing image — kept separate because it anchors its own section.
export const FEATURE_PHOTO = {
  src: team001,
  caption: 'Décor and display pieces handled with gloves, every visit',
}

// per-category cover image used across the bento grid, mega menu and
// services page
export const CATEGORY_IMG = {
  residential,
  commercial,
  construction: postConstruction,
  surfaces,
  air: acSystems,
  exterior,
  sanitis: sanitisation,
}
