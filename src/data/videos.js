/**
 * videos — DATA
 * ---------------------------------------------------------------------------
 * Every clip on the site, in one place.
 *
 * TWO SOURCES, USED FOR DIFFERENT JOBS:
 *   OWN    Dubai Fine Clean's own footage. Real crews on real jobs. Used
 *          wherever a person from the company appears, because that is the
 *          honest material and it is what the "no stock footage" section on
 *          the home page is claiming.
 *   STOCK  Licensed footage (Pexels, free for commercial use). Used only for
 *          the specialist work the client has no footage of, and for wide
 *          establishing shots.
 *
 * THE RULE THAT MATTERS: a clip must show what the words beside it say. An
 * earlier build matched clips to slots by filename and ended up with a
 * bathroom vanity on the AC Duct card and on "Kitchen deep clean". Every clip
 * below has been watched, and the comment says what is actually on screen —
 * not what the file is called.
 *
 * Each is muted (browsers block autoplay otherwise), trimmed to a few seconds,
 * and ships a poster frame so nothing flashes empty while it decodes.
 */

// --- the client's own footage ---
import floorPolish from '../assets/videos/floor-polish.mp4'
import floorPolishPoster from '../assets/videos/floor-polish.jpg'
import vanityDetail from '../assets/videos/kitchen-team.mp4'
import vanityDetailPoster from '../assets/videos/kitchen-team.jpg'
import carpetLift from '../assets/videos/upholstery.mp4'
import carpetLiftPoster from '../assets/videos/upholstery.jpg'

// --- licensed footage ---
import villaInterior from '../assets/videos/villa-interior.mp4'
import villaInteriorPoster from '../assets/videos/villa-interior.jpg'
import ropeAccess from '../assets/videos/rope-access.mp4'
import ropeAccessPoster from '../assets/videos/rope-access.jpg'
import openPlan from '../assets/videos/open-plan.mp4'
import openPlanPoster from '../assets/videos/open-plan.jpg'
import hallwayPan from '../assets/videos/hallway-pan.mp4'
import hallwayPanPoster from '../assets/videos/hallway-pan.jpg'
import glassDetail from '../assets/videos/glass-detail.mp4'
import glassDetailPoster from '../assets/videos/glass-detail.jpg'
import vacuumLiving from '../assets/videos/vacuum-living.mp4'
import vacuumLivingPoster from '../assets/videos/vacuum-living.jpg'
import officeSanitise from '../assets/videos/office-sanitise.mp4'
import officeSanitisePoster from '../assets/videos/office-sanitise.jpg'
import siteFogging from '../assets/videos/site-fogging.mp4'
import siteFoggingPoster from '../assets/videos/site-fogging.jpg'
import carpetTreat from '../assets/videos/carpet-treat.mp4'
import carpetTreatPoster from '../assets/videos/carpet-treat.jpg'
import ppeTechnician from '../assets/videos/ppe-technician.mp4'
import ppeTechnicianPoster from '../assets/videos/ppe-technician.jpg'
import roomFogging from '../assets/videos/room-fogging.mp4'
import roomFoggingPoster from '../assets/videos/room-fogging.jpg'

const clip = (src, poster, shows) => ({ src, poster, shows })

export const VIDEOS = {
  // ---- the client's own ----
  floorPolish:   clip(floorPolish,   floorPolishPoster,   'A rotary floor polisher running on carpet'),
  vanityDetail:  clip(vanityDetail,  vanityDetailPoster,  'Two of the crew preparing products at a bathroom vanity'),
  carpetLift:    clip(carpetLift,    carpetLiftPoster,    'A technician lifting a carpet to clean beneath it'),

  // ---- licensed ----
  villaInterior: clip(villaInterior, villaInteriorPoster, 'A slow move through a bright villa interior'),
  ropeAccess:    clip(ropeAccess,    ropeAccessPoster,    'A rope technician cleaning glass on a tower'),
  openPlan:      clip(openPlan,      openPlanPoster,      'An open-plan living room'),
  hallwayPan:    clip(hallwayPan,    hallwayPanPoster,    'An empty finished interior, hallway and stairs'),
  glassDetail:   clip(glassDetail,   glassDetailPoster,   'A gloved hand cleaning a glass panel'),
  vacuumLiving:  clip(vacuumLiving,  vacuumLivingPoster,  'A cleaner vacuuming a living room'),
  officeSanitise:clip(officeSanitise,officeSanitisePoster,'A technician in PPE treating an office, desks and monitor visible'),
  siteFogging:   clip(siteFogging,   siteFoggingPoster,   'A technician in PPE fogging a floor and stairs'),
  carpetTreat:   clip(carpetTreat,   carpetTreatPoster,   'Treatment being applied across a carpet'),
  ppeTechnician: clip(ppeTechnician, ppeTechnicianPoster, 'A technician in full protective equipment at work'),
  roomFogging:   clip(roomFogging,   roomFoggingPoster,   'A technician in PPE fogging a whole room'),
}

/**
 * Which clip sits on which service card. Cards show a still until hovered,
 * then cut to footage — see components/BentoServices.jsx.
 *
 * Each line says what the viewer will actually see, so a wrong pairing is
 * obvious when reading this file rather than only in the browser.
 */
export const CATEGORY_VIDEO = {
  residential:  VIDEOS.vacuumLiving,    // vacuuming a living room
  commercial:   VIDEOS.officeSanitise,  // an office, with desks
  construction: VIDEOS.siteFogging,     // PPE, floor treatment
  surfaces:     VIDEOS.carpetTreat,     // carpet treatment
  air:          VIDEOS.ppeTechnician,   // specialist in protective equipment
  sanitis:      VIDEOS.roomFogging,     // fogging a room
}
