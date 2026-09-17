import { getDomainColor } from '../utils/helpers'
import {
  HiOutlineBookmark, HiBookmark,
  HiOutlineOfficeBuilding, HiOutlineArrowRight
} from 'react-icons/hi'

export default function ExamCard({
  exam,
  isComparing,
  onToggleCompare,
  onViewDetails,
  isBookmarked,
  onToggleBookmark,
  delay
}) {
  const color = getDomainColor(exam.domain)
  const isPopular = exam.popularity === 'very_high'

  const jurisdictionLabel = exam.jurisdiction === 'central' ? 'Central' : (exam.state || 'State')
  const typeLabel = exam.exam_type === 'entrance' ? 'Entrance' : 'Job'

  return (
    <div
      className="exam-card panel slide-up"
      style={{
        animationDelay: `${delay}s`,
        '--domain-color': color,
        borderLeft: `3.5px solid ${color}`
      }}
      onClick={onViewDetails}
    >
      <div className="exam-card-header">
        <div className="exam-card-title-group">
          <h3 className="exam-card-title">{exam.name}</h3>
          <div className="exam-card-badges-row">
            <span className="exam-card-acronym mono-badge">
              {exam.acronym}
            </span>
            {isPopular && (
              <span className="exam-card-pop-badge" title="High National Volume & Interest">
                🔥 Popular
              </span>
            )}
          </div>
        </div>

        {onToggleBookmark && (
          <button
            className={`exam-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark()
            }}
            title={isBookmarked ? 'Remove from Saved' : 'Save Exam'}
            aria-label={isBookmarked ? 'Remove from Saved' : 'Save Exam'}
          >
            {isBookmarked ? <HiBookmark className="bookmark-icon active" /> : <HiOutlineBookmark className="bookmark-icon" />}
          </button>
        )}
      </div>

      <p className="exam-card-desc">{exam.description}</p>

      {/* Primary Domain Tag + Ghost Metadata Line */}
      <div className="exam-card-meta-line">
        <span
          className="exam-tag domain-tag primary-domain-tag"
          style={{ background: `${color}18`, borderColor: `${color}44`, color }}
        >
          {exam.domain}
        </span>
        <span className="ghost-meta-string">
          <span>{exam.level}</span>
          <span className="ghost-dot">·</span>
          <span>{typeLabel}</span>
          <span className="ghost-dot">·</span>
          <span>{jurisdictionLabel}</span>
        </span>
      </div>

      <div className="exam-card-secondary-meta">
        <span className="exam-meta-item conducting-body-pill" title={exam.conducting_body}>
          <HiOutlineOfficeBuilding className="exam-meta-icon" />
          <span className="meta-val truncate-text">{exam.conducting_body}</span>
        </span>
        {exam.frequency && (
          <span className="meta-sub-pill">{exam.frequency}</span>
        )}
      </div>

      <div className="exam-card-footer">
        <button
          className={`exam-action-btn compare ${isComparing ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleCompare()
          }}
        >
          {isComparing ? '✓ Comparing' : '⇔ Compare'}
        </button>

        <button
          className="exam-action-btn details"
          onClick={(e) => {
            e.stopPropagation()
            onViewDetails()
          }}
        >
          Details <HiOutlineArrowRight className="btn-arrow" />
        </button>
      </div>
    </div>
  )
}
