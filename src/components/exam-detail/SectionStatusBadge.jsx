function collectConfidences(value, acc = [], seen = new WeakSet()) {
  if (!value || typeof value !== 'object') return acc
  if (seen.has(value)) return acc

  seen.add(value)
  if (value.confidence) acc.push(value.confidence)
  Object.entries(value).forEach(([key, item]) => {
    if (key.endsWith('_confidence') && item) acc.push(item)
    collectConfidences(item, acc, seen)
  })
  return acc
}

function getSectionStatus(section) {
  if (!section || typeof section !== 'object' || section.status === 'not_available') {
    return 'not_available'
  }
  if (section.status !== 'available') return 'not_available'

  const confidences = collectConfidences(section)
  return confidences.some(confidence => confidence !== 'verified') ? 'reported' : 'verified'
}

export default function SectionStatusBadge({ section }) {
  const status = getSectionStatus(section)
  const label = status === 'verified'
    ? 'Verified'
    : status === 'reported'
      ? 'Reported'
      : 'Not Available'

  return (
    <span className={`section-badge ${status}`}>
      <span className="section-badge-dot" />
      {label}
    </span>
  )
}
