/**
 * ChapterSeparator — A numbered rule that breaks the page into chapters so it reads as a sequence rather than a scroll of blocks.
 * ---------------------------------------------------------------------------
 * WHERE IT APPEARS: home page, between major sections.
 * WHAT IT DOES:     A numbered rule that breaks the page into chapters so it reads as a sequence rather than a scroll of blocks.
 */
import Reveal from './Reveal.jsx'
import './ChapterSeparator.css'

export default function ChapterSeparator({ no, label }) {
  return (
    <Reveal as="div" className="chapter">
      <span className="chapNo">{no}</span>
      <span className="chapLine" />
      <span className="chapLabel">{label}</span>
    </Reveal>
  )
}
