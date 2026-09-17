import { useState } from 'react'
import { getDomainColor } from '../utils/helpers'
import { exportExamDossierPdf } from '../utils/pdfGenerator'
import {
  HiOutlineBookmark, HiBookmark,
  HiOutlineOfficeBuilding, HiOutlineArrowRight,
  HiOutlineDocumentDownload, HiOutlineCheckCircle,
  HiOutlineScale, HiCheck
} from 'react-icons/hi'

export default function ExamCard({
  exam,
  isComparing = false,
  onToggleCompare,
  onViewDetails,
  isBookmarked = false,
  onToggleBookmark,
  delay = 0
}) {
  const [isExportingPdf, setIsExportingPdf] = useState(false)
  const color = getDomainColor(exam.domain)
  const isPopular = exam.popularity === 'very_high'
  const isJob = exam.exam_type === 'job'

  // Compensation / Seat allocation label
  const payLevelLabel = exam.pay_matrix_level
    ? `Level ${exam.pay_matrix_level}`
    : (isJob ? 'Group A / Gazetted' : 'Seat Allocation Track')

  const handleDownloadPdf = async (e) => {
    e.stopPropagation()
    if (isExportingPdf) return
    try {
      setIsExportingPdf(true)
      await exportExamDossierPdf(exam)
    } catch (err) {
      console.error('Failed to export PDF dossier:', err)
    } finally {
      setIsExportingPdf(false)
    }
  }

  return (
    <div
      className="dossier-card"
      style={{
        animationDelay: `${delay}s`,
        '--card-accent': color
      }}
      onClick={onViewDetails}
    >
      {/* Top Telemetry Header */}
      <div className="dossier-card-header">
        <div className="dossier-authority-chip" title={exam.conducting_body}>
          <HiOutlineOfficeBuilding className="authority-icon" />
          <span className="authority-text truncate-text">{exam.conducting_body}</span>
        </div>

        <div className="dossier-header-actions" onClick={(e) => e.stopPropagation()}>
          <span className="dossier-verified-badge" title="Verified statutory registry entry">
            <HiOutlineCheckCircle className="verified-icon" />
            <span>VERIFIED</span>
          </span>

          {onToggleBookmark && (
            <button
              type="button"
              className={`dossier-radar-btn ${isBookmarked ? 'active' : ''}`}
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Pinned to Active Radar (Click to unpin)' : 'Pin to Active Radar'}
              aria-label={isBookmarked ? 'Unpin from Active Radar' : 'Pin to Active Radar'}
            >
              {isBookmarked ? (
                <HiBookmark className="radar-icon-active" />
              ) : (
                <HiOutlineBookmark className="radar-icon" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Examination Identity */}
      <div className="dossier-title-block">
        <div className="dossier-badge-row">
          <span className="dossier-acronym-badge font-mono">{exam.acronym}</span>
          <span
            className="dossier-domain-badge"
            style={{
              background: `${color}18`,
              borderColor: `${color}40`,
              color
            }}
          >
            {exam.domain}
          </span>
          {isPopular && (
            <span className="dossier-hot-badge" title="High national volume and candidate tracking">
              🔥 TOP TIER
            </span>
          )}
        </div>

        <h3 className="dossier-name">{exam.name}</h3>
      </div>

      {/* Description */}
      <p className="dossier-desc">{exam.description}</p>

      {/* Forensic Specs Strip */}
      <div className="dossier-specs-grid">
        <div className="spec-item">
          <span className="spec-label">LEVEL // SCOPE</span>
          <span className="spec-value">
            {exam.level} · {exam.jurisdiction === 'central' ? 'Central' : (exam.state || 'State')}
          </span>
        </div>

        <div className="spec-item">
          <span className="spec-label">{isJob ? '7TH CPC CADRE' : 'ACADEMIC PATH'}</span>
          <span className="spec-value highlight-accent">
            {payLevelLabel}
          </span>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="dossier-card-footer" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`dossier-action-btn compare-btn ${isComparing ? 'active' : ''}`}
          onClick={onToggleCompare}
          title={isComparing ? 'Remove from comparison stack' : 'Add to side-by-side comparison stack'}
        >
          {isComparing ? (
            <>
              <HiCheck className="btn-icon" />
              <span>Comparing</span>
            </>
          ) : (
            <>
              <HiOutlineScale className="btn-icon" />
              <span>Compare</span>
            </>
          )}
        </button>

        <button
          type="button"
          className={`dossier-action-btn pdf-btn ${isExportingPdf ? 'loading' : ''}`}
          onClick={handleDownloadPdf}
          title="Download 4-page Vector Research Dossier PDF"
          disabled={isExportingPdf}
        >
          <HiOutlineDocumentDownload className="btn-icon" />
          <span>{isExportingPdf ? 'Compiling...' : 'Dossier PDF'}</span>
        </button>

        <button
          type="button"
          className="dossier-action-btn details-btn"
          onClick={onViewDetails}
          title="Open comprehensive examination intelligence modal"
        >
          <span>Inspect</span>
          <HiOutlineArrowRight className="btn-arrow" />
        </button>
      </div>
    </div>
  )
}
