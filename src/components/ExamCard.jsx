import { getDomainColor } from '../utils/helpers'
import { HiOutlineClock, HiOutlineDesktopComputer, HiOutlineOfficeBuilding } from 'react-icons/hi'

export default function ExamCard({ exam, isComparing, onToggleCompare, onViewDetails, delay }) {
  const color = getDomainColor(exam.domain)

  return (
    <div
      className="exam-card slide-up"
      style={{ animationDelay: `${delay}s`, '--domain-color': color }}
      onClick={onViewDetails}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 4, height: '100%',
        background: color, borderRadius: '16px 0 0 16px'
      }} />

      <div className="exam-card-header">
        <h3 className="exam-card-title">{exam.name}</h3>
        <span className="exam-card-acronym" style={{
          background: `${color}20`,
          border: `1px solid ${color}40`,
          color: color
        }}>
          {exam.acronym}
        </span>
      </div>

      <p className="exam-card-desc">{exam.description}</p>

      <div className="exam-card-tags">
        <span className="exam-tag" style={{ background: `${color}15`, borderColor: `${color}30`, color }}>
          {exam.domain}
        </span>
        <span className="exam-tag">{exam.level}</span>
        <span className="exam-tag">{exam.exam_type === 'entrance' ? '🎓 Entrance' : '💼 Job'}</span>
        <span
          className="exam-tag"
          style={{
            background: exam.jurisdiction === 'central' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(168, 85, 247, 0.12)',
            borderColor: exam.jurisdiction === 'central' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(168, 85, 247, 0.3)',
            color: exam.jurisdiction === 'central' ? '#60a5fa' : '#c084fc',
            fontWeight: 500
          }}
        >
          {exam.jurisdiction === 'central' ? '🇮🇳 Central' : `🏛️ ${exam.state}`}
        </span>
      </div>

      <div className="exam-card-meta">
        <span className="exam-meta-item">
          <HiOutlineOfficeBuilding className="exam-meta-icon" />
          {exam.conducting_body}
        </span>
        <span className="exam-meta-item">
          <HiOutlineClock className="exam-meta-icon" />
          {exam.frequency}
        </span>
        <span className="exam-meta-item">
          <HiOutlineDesktopComputer className="exam-meta-icon" />
          {exam.exam_mode}
        </span>
      </div>

      <div className="exam-card-footer">
        <div className="exam-card-actions">
          <button
            className={`exam-action-btn compare ${isComparing ? 'selected' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleCompare() }}
          >
            {isComparing ? '✓ Comparing' : '⇔ Compare'}
          </button>
          <button className="exam-action-btn details" onClick={(e) => { e.stopPropagation(); onViewDetails() }}>
            Details →
          </button>
        </div>
        {exam.official_website && exam.official_website !== '#' && (
          <a
            href={exam.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="exam-action-btn website"
            onClick={(e) => e.stopPropagation()}
          >
            🌐 Website
          </a>
        )}
      </div>
    </div>
  )
}
