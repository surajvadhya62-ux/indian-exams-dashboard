/**
 * Signals a fact's confidence tier. Three distinct states, not two —
 * conflating "I read this myself in a primary document" with "this is a
 * specific real figure attributed to an official source I couldn't
 * personally re-open" was itself a bug: both are real facts, neither is
 * a guess, and calling the second one "Estimated" wrongly implied it was
 * a computed approximation like the salary ranges actually are.
 *
 *   verified  - read directly by the dossier's author in a primary source
 *   reported  - a specific, non-computed figure attributed to a named
 *               official source, not independently re-opened this session
 *   estimate  - a genuinely computed/derived approximation, no single source
 */
export default function SourceBadge({ confidence, asOf, sourceUrl, sourceLabel }) {
  if (!confidence) return null

  if (confidence === 'verified' || confidence === 'reported') {
    const text = confidence === 'verified' ? 'Verified' : 'Reported'
    const label = asOf ? `${text} · ${asOf}` : text
    const content = (
      <span className={`source-badge ${confidence}`}>
        <span className="source-badge-dot" />
        {label}
      </span>
    )
    if (sourceUrl) {
      return (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="source-badge-link"
          title={sourceLabel || sourceUrl}
        >
          {content}
        </a>
      )
    }
    return content
  }

  if (confidence === 'estimate') {
    return (
      <span className="source-badge estimate">
        <span className="source-badge-dot" />
        Estimated
      </span>
    )
  }

  return null
}
