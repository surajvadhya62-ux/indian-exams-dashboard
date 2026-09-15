/**
 * The calm empty state for a dossier tab with nothing to show — either
 * because the exam has no detail file yet, or because a section was
 * researched and genuinely has no public data. `tone` distinguishes the
 * two so the copy doesn't read as an error either way.
 */
export default function DataUnavailable({ title, note, tone = 'not_found' }) {
  const heading =
    title || (tone === 'not_applicable'
      ? 'Not applicable for this exam'
      : tone === 'error'
        ? "Couldn't load extended details"
        : 'Not yet compiled')

  return (
    <div className="dossier-empty-state">
      <div className="dossier-empty-icon">·</div>
      <h4>{heading}</h4>
      {note && <p>{note}</p>}
    </div>
  )
}
