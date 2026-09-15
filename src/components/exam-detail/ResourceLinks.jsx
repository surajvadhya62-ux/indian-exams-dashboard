import { HiOutlineExternalLink } from 'react-icons/hi'
import DataUnavailable from './DataUnavailable'

const TYPE_LABELS = {
  notification: 'Notification',
  syllabus: 'Syllabus',
  pyq: 'Previous Year Questions',
  answer_key: 'Answer Key',
  other: 'Resource',
}

export default function ResourceLinks({ section, detailStatus, fallbackUrl }) {
  if (detailStatus === 'loading') {
    return <DataUnavailable title="Loading…" tone="not_found" />
  }
  if (detailStatus === 'error') {
    return <DataUnavailable tone="error" />
  }

  const links = section && section.status !== 'not_available' ? section.links || [] : []

  // This tab is never fully empty when there's at least a base official
  // website on file — even with no dossier yet, that's still useful.
  if (links.length === 0) {
    return (
      <div>
        {fallbackUrl && fallbackUrl !== '#' ? (
          <a href={fallbackUrl} target="_blank" rel="noopener noreferrer" className="modal-website-btn">
            <HiOutlineExternalLink />
            Visit Official Website
          </a>
        ) : (
          <DataUnavailable tone="not_found" note="No official link on file for this exam." />
        )}
        <p className="dossier-resource-caption">
          Extended resources (syllabus, previous-year questions, notification archive) aren't
          yet indexed for this exam.
        </p>
      </div>
    )
  }

  return (
    <div className="resource-link-list">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-item"
        >
          <span className="resource-link-type">{TYPE_LABELS[link.type] || 'Resource'}</span>
          <span className="resource-link-label">{link.label}</span>
          {link.cycle_label && <span className="resource-link-cycle">{link.cycle_label}</span>}
          <HiOutlineExternalLink className="resource-link-icon" />
        </a>
      ))}
    </div>
  )
}
