import { useState, useEffect } from 'react'
import ExamCard from './ExamCard'
import {
  HiChevronLeft, HiChevronRight, HiOutlineArrowUp,
  HiOutlineBookmark, HiBookmark, HiOutlineOfficeBuilding,
  HiOutlineCheckCircle, HiOutlineDocumentDownload,
  HiOutlineScale, HiCheck, HiOutlineArrowRight
} from 'react-icons/hi'
import { getDomainColor } from '../utils/helpers'
import { exportExamDossierPdf } from '../utils/pdfGenerator'
import { SkeletonGrid } from './Skeletons'

export default function ExamGrid({
  exams = [],
  compareList = [],
  toggleCompare,
  onViewDetails,
  currentPage = 1,
  totalPages = 1,
  setCurrentPage,
  viewMode = 'grid',
  itemsPerPage = 12,
  setItemsPerPage,
  bookmarks = [],
  onToggleBookmark,
  isLoading = false
}) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(max-width: 600px)').matches
  })

  const [showBackToTop, setShowBackToTop] = useState(false)
  const [exportingPdfId, setExportingPdfId] = useState(null)

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(max-width: 600px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRowPdf = async (e, exam) => {
    e.stopPropagation()
    if (exportingPdfId) return
    try {
      setExportingPdfId(exam.id)
      await exportExamDossierPdf(exam)
    } catch (err) {
      console.error('Failed to export row PDF:', err)
    } finally {
      setExportingPdfId(null)
    }
  }

  if (isLoading) {
    return <SkeletonGrid count={itemsPerPage || 12} />
  }

  if (exams.length === 0) {
    return (
      <div className="terminal-no-results">
        <div className="no-results-glyph">🔍</div>
        <h3 className="no-results-title">No Examinations Matched Query</h3>
        <p className="no-results-desc">
          Try clearing active discipline filters, adjusting keywords, or switching scopes.
        </p>
      </div>
    )
  }

  const pageNumbers = []
  const maxVisible = isMobile ? 3 : 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) pageNumbers.push(i)

  const isTableView = viewMode === 'table' || viewMode === 'list'

  return (
    <div className="terminal-workstation-content">
      {/* 1. Dossier Grid View */}
      {!isTableView ? (
        <div className="dossier-grid">
          {exams.map((exam, i) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              isComparing={compareList.some(e => e.id === exam.id)}
              onToggleCompare={() => toggleCompare(exam)}
              onViewDetails={() => onViewDetails(exam)}
              isBookmarked={bookmarks.includes(exam.id)}
              onToggleBookmark={() => onToggleBookmark(exam.id)}
              delay={Math.min(0.2, i * 0.02)}
            />
          ))}
        </div>
      ) : (
        /* 2. High-Density Institutional Data Matrix Table (Bloomberg / M-Terminal Style) */
        <div className="matrix-table-card">
          <div className="matrix-table-responsive">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="th-code">CODE</th>
                  <th className="th-target">EXAMINATION TARGET & COMMISSION</th>
                  <th className="th-domain">DISCIPLINE</th>
                  <th className="th-scope">LEVEL // SCOPE</th>
                  <th className="th-cadre">CADRE / SEATS</th>
                  <th className="th-status">INTEGRITY</th>
                  <th className="th-actions">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => {
                  const color = getDomainColor(exam.domain)
                  const isComparing = compareList.some(e => e.id === exam.id)
                  const isBookmarked = bookmarks.includes(exam.id)
                  const isPopular = exam.popularity === 'very_high'
                  const isJob = exam.exam_type === 'job'
                  const payLabel = exam.pay_matrix_level
                    ? `Level ${exam.pay_matrix_level}`
                    : (isJob ? 'Group A / Gazetted' : 'Seat Allocation Track')

                  return (
                    <tr
                      key={exam.id}
                      className="matrix-row"
                      onClick={() => onViewDetails(exam)}
                    >
                      {/* Code / Acronym */}
                      <td className="td-code">
                        <span className="matrix-acronym-badge font-mono">{exam.acronym}</span>
                        {isPopular && <span className="matrix-pop-icon" title="Popular National Target">🔥</span>}
                      </td>

                      {/* Examination Name & Body */}
                      <td className="td-target">
                        <div className="matrix-target-name">{exam.name}</div>
                        <div className="matrix-target-body">
                          <HiOutlineOfficeBuilding className="body-icon" />
                          <span>{exam.conducting_body}</span>
                        </div>
                      </td>

                      {/* Domain */}
                      <td className="td-domain">
                        <span
                          className="matrix-domain-pill"
                          style={{
                            background: `${color}18`,
                            borderColor: `${color}40`,
                            color
                          }}
                        >
                          {exam.domain}
                        </span>
                      </td>

                      {/* Level & Scope */}
                      <td className="td-scope">
                        <div className="scope-level">{exam.level}</div>
                        <div className="scope-jurisdiction">
                          {exam.jurisdiction === 'central' ? 'Central Government' : (exam.state || 'State Commission')}
                        </div>
                      </td>

                      {/* Cadre / Admissions */}
                      <td className="td-cadre">
                        <span className="matrix-cadre-tag">
                          {payLabel}
                        </span>
                      </td>

                      {/* Evidentiary Integrity */}
                      <td className="td-status">
                        <span className="matrix-status-badge">
                          <HiOutlineCheckCircle className="status-icon text-emerald" />
                          <span>Tier 1</span>
                        </span>
                      </td>

                      {/* Quick Action Buttons */}
                      <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                        <div className="matrix-actions-group">
                          {/* Pin to Radar */}
                          <button
                            type="button"
                            className={`matrix-icon-btn ${isBookmarked ? 'active' : ''}`}
                            onClick={() => onToggleBookmark(exam.id)}
                            title={isBookmarked ? 'Pinned on Active Radar' : 'Pin to Active Radar'}
                          >
                            {isBookmarked ? <HiBookmark className="icon-gold" /> : <HiOutlineBookmark />}
                          </button>

                          {/* Compare */}
                          <button
                            type="button"
                            className={`matrix-icon-btn ${isComparing ? 'active' : ''}`}
                            onClick={() => toggleCompare(exam)}
                            title={isComparing ? 'In comparison stack' : 'Add to compare'}
                          >
                            {isComparing ? <HiCheck className="icon-emerald" /> : <HiOutlineScale />}
                          </button>

                          {/* PDF Dossier */}
                          <button
                            type="button"
                            className={`matrix-icon-btn pdf-icon-btn ${exportingPdfId === exam.id ? 'loading' : ''}`}
                            onClick={(e) => handleRowPdf(e, exam)}
                            title="Download Vector Research Dossier PDF"
                            disabled={exportingPdfId === exam.id}
                          >
                            <HiOutlineDocumentDownload />
                          </button>

                          {/* Inspect Details */}
                          <button
                            type="button"
                            className="matrix-inspect-btn"
                            onClick={() => onViewDetails(exam)}
                            title="Inspect full details"
                          >
                            <span>Inspect</span>
                            <HiOutlineArrowRight />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="terminal-pagination-strip">
        {setItemsPerPage && (
          <div className="matrix-page-size">
            <span className="page-size-kicker">PAGE DENSITY:</span>
            {[12, 24, 48].map(size => (
              <button
                key={size}
                type="button"
                className={`density-pill ${itemsPerPage === size ? 'active' : ''}`}
                onClick={() => {
                  setItemsPerPage(size)
                  setCurrentPage(1)
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="matrix-pagination-controls">
            <button
              type="button"
              className="matrix-page-arrow"
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1))
                scrollToTop()
              }}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <HiChevronLeft />
            </button>

            {start > 1 && (
              <>
                <button
                  type="button"
                  className="matrix-page-num"
                  onClick={() => { setCurrentPage(1); scrollToTop() }}
                >
                  1
                </button>
                {start > 2 && <span className="matrix-page-ellipsis">…</span>}
              </>
            )}

            {pageNumbers.map(n => (
              <button
                key={n}
                type="button"
                className={`matrix-page-num ${currentPage === n ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPage(n)
                  scrollToTop()
                }}
              >
                {n}
              </button>
            ))}

            {end < totalPages && (
              <>
                {end < totalPages - 1 && <span className="matrix-page-ellipsis">…</span>}
                <button
                  type="button"
                  className="matrix-page-num"
                  onClick={() => { setCurrentPage(totalPages); scrollToTop() }}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              className="matrix-page-arrow"
              onClick={() => {
                setCurrentPage(p => Math.min(totalPages, p + 1))
                scrollToTop()
              }}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <HiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          className="matrix-back-to-top-btn"
          onClick={scrollToTop}
          title="Return to top"
          aria-label="Return to top"
        >
          <HiOutlineArrowUp />
        </button>
      )}
    </div>
  )
}
