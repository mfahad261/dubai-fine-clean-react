/**
 * content — DATA
 * ---------------------------------------------------------------------------
 * Everything that isn't a service: business details, stats, benefits, reviews, FAQs, coverage areas and the scope estimator's numbers.
 */
// Everything that isn't the service catalogue: business identity, pricing
// engine, social proof, FAQs. Edit here, not in components.

export const BUSINESS = {
  name: 'Dubai Fine Clean',
  phone: '+971 56 916 9761',
  phoneHref: 'tel:+971569169761',
  whatsapp: 'https://wa.me/971569169761',
  addressLine1: 'Empire Heights A — 16F-A-04',
  addressLine2: 'Business Bay, Dubai, UAE',
  since: 2016,
}

export const TOPBAR_MESSAGES = [
  'Professional cleaning across Dubai — 7 days a week',
  'Free site survey for villas & commercial units',
  'Fully insured · Eco-certified products',
  '24-hour re-clean guarantee',
  'Call +971 56 916 9761',
]

export const CREDENTIALS = [
  { label: 'Dubai Municipality compliant', icon: 'shield' },
  { label: 'Fully insured teams', icon: 'check' },
  { label: 'Eco-certified products', icon: 'leaf' },
  { label: '4.9★ average rating', icon: 'star' },
  { label: '2,400+ cleans completed', icon: 'checkCircle' },
  { label: 'Seven days a week', icon: 'clock' },
]

export const STATS = [
  { n: '2,400', suffix: '+', l: 'Cleans completed since 2016' },
  { n: '40', suffix: '+', l: 'Trained staff on the road' },
  { n: '4.9', suffix: '', l: 'Average client rating' },
  { n: '7', suffix: ' days', l: 'A week, including public holidays' },
]

export const BENEFITS = [
  { t: 'Healthier environment', d: 'Fewer allergens, less dust and fewer germs. A properly cleaned space measurably improves wellbeing.', icon: 'heart' },
  { t: 'Time saved', d: 'Focus on work, family or rest while we handle it. We finish in hours what would take you days.', icon: 'clock' },
  { t: 'Professional equipment', d: 'Extraction machines, rotary polishers and negative-air units that domestic tools cannot match.', icon: 'tool' },
  { t: 'Customised service', d: 'Every space is different. Plans built around your size, condition, schedule and budget.', icon: 'sliders' },
  { t: 'Peace of mind', d: 'Insured, checklist-verified and guaranteed. A clean space without the stress of doing it yourself.', icon: 'shieldCheck' },
]

export const REVIEWS = [
  { n: 'Layla H.', m: 'Apartment deep clean · Downtown', c: '#0B6FE8', t: 'They moved every piece of furniture without being asked. The apartment smelled of nothing at all — which is exactly what I wanted.' },
  { n: 'Omar A.', m: 'Post-construction · Al Barsha', c: '#2FBF57', t: "We handed over a villa after renovation and they cleared construction dust I didn't know was still there. The glass was flawless." },
  { n: 'R. Menon', m: 'Office contract · Business Bay', c: '#E8907C', t: 'Our office is cleaned nightly and I have never once had to send a follow-up email. Invoicing is just as straightforward.' },
]

export const FAQS = [
  { q: 'How do I book a team?', a: 'Call, WhatsApp or send the enquiry form and we will talk through the property and what it needs. Once the scope is agreed we book a time that suits you, seven days a week. Larger villas, commercial units and anything requiring height access are surveyed first so the quote is accurate.' },
  { q: 'Do I need to be at home during the clean?', a: 'No. Many clients hand over keys or arrange access through building security or their concierge. A supervisor walks the space at the start and end, and you receive the completed checklist either way.' },
  { q: 'Are the products safe for children and pets?', a: 'Yes. We use eco-certified, non-toxic and low-residue products as standard, with colour-coded cloths to prevent cross-contamination between bathrooms, kitchens and living areas. If anyone has a specific sensitivity, tell us and we adjust the chemistry.' },
  { q: 'What is actually included in a deep clean?', a: 'Every surface reachable without dismantling: kitchen degrease inside and out, bathroom descale and grout treatment, interior glass, skirting, door frames, switch plates, A/C grilles, high-level dusting, inside wardrobes, and floors finished last. You receive the room-by-room checklist so nothing is ambiguous.' },
  { q: 'How is the price calculated?', a: 'By property size, condition and the scope you choose — not by guesswork on the day. You receive a fixed written quote before we start, and it does not change once the team is on site unless you add work yourself.' },
  { q: "What if I'm not happy with something?", a: 'Tell us within twenty-four hours of handover and we return to re-clean the area at no cost. No debate and no additional invoice.' },
  { q: 'Do you handle AC ducts and water tanks?', a: 'Yes, both. Duct work uses negative-air extraction machinery with before and after camera footage, and water tank cleaning is completed to Dubai Municipality requirements with a compliance certificate issued on completion.' },
  { q: 'Can you work outside business hours?', a: 'Offices, restaurants and retail units are usually cleaned overnight or before opening so trading is never interrupted. Out-of-hours residential work is available by arrangement.' },
]

export const CHIPS = [
  'Apartment deep clean', 'Villa deep clean', 'Move in / out', 'Regular maintenance',
  'Office / commercial', 'Post-construction', 'Sofa & carpet', 'Marble polishing',
  'AC duct & coil', 'Water tank', 'Windows & façade', 'Sanitisation',
]

export const COVERAGE_AREAS = [
  'Dubai Sports City', 'Motor City', 'Dubai Marina', 'Jumeirah',
  'Palm Jumeirah', 'MBR', 'Downtown', 'Pearl Jumeirah',
  'Emirates Hills', 'Damac Hills', 'Falconcity of Wonders', 'Al Khawaneej',
  "Za'abeel", 'Business Bay', 'Emaar Beach Front', 'Blue Water Islands',
  'JBR', 'Al Barari', 'Arabian Ranches', 'Al Jadaf',
  'Dubai South', 'Nad Al Sheba', 'Jumeirah Park', 'Al Sufouh',
  'Al Mizhar', 'Dubai Production City', 'Academic City', 'Al Wasl',
  'Dubai Creek Harbour', 'Golf City', 'The Villa', 'Meydan',
  'Mudon', 'Al Barsha', 'Dubai Hills', 'Jebel Ali Village',
  'Jumeirah Village Circle', 'Al Safa', 'Umm Suqeim', 'Al Twar',
  'Mirdif',
]

// shorter list used by the quote widget's community dropdown
export const QUOTE_AREAS = [
  'Business Bay', 'Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah',
  'Jumeirah', 'Al Barsha', 'Dubai Hills', 'Arabian Ranches', 'Other',
]

// ---- scope estimator -------------------------------------------------
// Deliberately estimates TIME AND CREW, never money. The client prices each
// job in writing after a survey, so a published figure would only ever be
// wrong. Base hours describe a 2-bedroom property (size multiplier 1.9) and
// the calculator scales from there.
export const QUOTE_SERVICES = {
  deep: { hrs: [5, 8], crew: [2, 3], label: 'Deep cleaning' },
  regular: { hrs: [3, 4], crew: [1, 2], label: 'Regular maintenance' },
  move: { hrs: [6, 10], crew: [3, 4], label: 'Move in / move out' },
  post: { hrs: [8, 16], crew: [4, 6], label: 'Post-construction' },
  sofa: { hrs: [1, 3], crew: [2, 2], label: 'Sofa & carpet' },
  ac: { hrs: [3, 6], crew: [2, 3], label: 'AC duct & coil' },
}

export const QUOTE_PROPERTY_TYPES = {
  apt: { label: 'Apartment', mult: 1 },
  villa: { label: 'Villa', mult: 1.22 },
  office: { label: 'Office', mult: 1.1 },
}

export const QUOTE_SIZES = [
  { value: 1, label: 'Studio' },
  { value: 1.4, label: '1 bedroom' },
  { value: 1.9, label: '2 bedrooms' },
  { value: 2.5, label: '3 bedrooms' },
  { value: 3.2, label: '4 bedrooms' },
  { value: 4, label: '5+ bedrooms' },
]
