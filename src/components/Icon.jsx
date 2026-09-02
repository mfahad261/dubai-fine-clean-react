/**
 * Icon — A small hand-picked icon set, so the project doesn't pull in a whole icon library for a dozen glyphs.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: everywhere.
 * WHAT IT DOES:     A small hand-picked icon set, so the project doesn't pull in a whole icon library for a dozen glyphs.
 * NOTES:            Add new glyphs to the PATHS object.
 */
// A tiny hand-picked icon set (outline style, matches the brand's line-art
// language) so we don't pull in an icon library for a dozen glyphs.
const PATHS = {
  shield: 'M12 2l8 3.5v6c0 5.4-3.5 8.8-8 10-4.5-1.2-8-4.6-8-10v-6z',
  shieldCheck: 'M12 2l8 3.5v6c0 5.4-3.5 8.8-8 10-4.5-1.2-8-4.6-8-10v-6zM8.5 12l2.5 2.5L16 9.5',
  check: 'M4 13l5 5 11-12',
  leaf: 'M12 21c4.2 0 7-3 7-6.6C19 9.6 12 3 12 3S5 9.6 5 14.4C5 18 7.8 21 12 21z',
  checkCircle: 'M12 22a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2',
  heart: 'M12 20c-4.2-2.4-7.8-5.4-7.8-9.6A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.8 2.4c0 4.2-3.6 7.2-7.8 9.6z',
  tool: 'M4 19h16M7 19V11l5-5 5 5v8',
  sliders: 'M3 7h18M3 12h18M3 17h18',
  star: 'M12 2l3 6.6 7 .8-5.2 4.8 1.5 7L12 17.8 5.7 21.2l1.5-7L2 9.4l7-.8z',
  arrowRight: 'M5 12h14M13 5l7 7-7 7',
  phone: 'M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 1-2z',
  // The official WhatsApp mark — handset in a speech bubble with the tail at
  // lower-left. Filled, not stroked: `filled` must be true wherever it is used.
  whatsapp: 'M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.19 8.19 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.28-.25-.12-1.44-.72-1.67-.8-.22-.08-.38-.12-.55.12-.16.25-.62.79-.76.95-.14.17-.28.19-.52.06-.25-.12-1.03-.38-1.97-1.21-.73-.65-1.22-1.45-1.36-1.7-.14-.24-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.53-1.32-.75-1.81-.19-.44-.39-.44-.54-.45h-.46z',
  pin: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 6l9 7 9-7',
  chevron: 'M6 9l6 6 6-6',
}

// These marks only read correctly as solid shapes. Whatever the caller passes,
// they are always rendered filled.
const ALWAYS_FILLED = new Set(['whatsapp', 'star'])

export default function Icon({ name, size = 18, strokeWidth = 1.8, filled = false, className = '' }) {
  const d = PATHS[name]
  if (!d) return null
  const solid = filled || ALWAYS_FILLED.has(name)
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  )
}
