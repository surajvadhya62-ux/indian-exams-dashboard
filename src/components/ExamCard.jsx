import { getDomainColor } from '../utils/helpers'
import { HiOutlineClock, HiOutlineDesktopComputer, HiOutlineOfficeBuilding } from 'react-icons/hi'

export default function ExamCard({ exam, isComparing, onToggleCompare, onViewDetails, delay }) {
  const color = getDomainColor(exam.domain)

  return (
    <div
      className="exam-card panel slide-up"
      style={{ animationDelay: `${delay}s`, '--domain-color': color }}
      onClick={onViewDetails}
    >
      <div className="card-domain-indicator" style={{ background: color }} />

      <div className="exam-card-header">
        <h3 className="exam-card-title">{exam.name}</h3>
        <span className="exam-card-acronym mono-badge">
          {exam.acronym}
        </span>
      </div>

      <p className="exam-card-desc">{exam.description}</p>

      <div className="exam-card-tags">
        <span className="exam-tag domain-tag" style={{ background: `${color}18`, borderColor: `${color}44`, color }}>
          {exam.domain}
        </span>
        <span className="exam-tag">{exam.level}</span>
        <span className="exam-tag">{exam.exam_type === 'entrance' ? '🎓 Entrance' : '💼 Job'}</span>
        <span className="exam-tag">
          {exam.jurisdiction === 'central' ? '🇮🇳 Central' : `🏛️ ${exam.state}`}
        </span>
      </div>

      <div className="exam-card-meta">
        <span className="exam-meta-item">
          <HiOutlineOfficeBuilding className="exam-meta-icon" />
          <span className="meta-val">{exam.conducting_body}</span>
        </span>
        <span className="exam-meta-item">
          <HiOutlineClock className="exam-meta-icon" />
          <span className="meta-val">{exam.frequency}</span>
        </span>
        <span className="exam-meta-item">
          <HiOutlineDesktopComputer className="exam-meta-icon" />
          <span className="meta-val">{exam.exam_mode}</span>
        </span>
      </div>

      <div className="exam-card-footer">
        <button className="exam-action-btn details" onClick={(e) => { e.stopPropagation(); onViewDetails() }}>
          Details →
        </button>
        <span className="exam-action-divider">·</span>
        <button
          className={`exam-action-btn compare ${isComparing ? 'selected' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleCompare() }}
        >
          {isComparing ? '✓ Comparing' : '⇔ Compare'}
        </button>
        {exam.official_website && exam.official_website !== '#' && (
          <>
            <span className="exam-action-divider">·</span>
            <a
              href={exam.official_website}
              target="_blank"
              rel="noopener noreferrer"
              className="exam-action-btn website"
              onClick={(e) => e.stopPropagation()}
              title="Official Portal"
            >
              🌐 Website
            </a>
          </>
        )}
      </div>
    </div>
  )
}
