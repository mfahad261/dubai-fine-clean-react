/**
 * Eyebrow — The small uppercase label that sits above a heading.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: everywhere, above headings.
 * WHAT IT DOES:     The small uppercase label that sits above a heading.
 */
export default function Eyebrow({ children, tone = 'blue' }) {
  return (
    <span className={`eyebrow ${tone === 'green' ? 'gr' : ''}`}>
      <i />
      {children}
    </span>
  )
}
