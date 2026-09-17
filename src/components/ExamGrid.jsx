import { useState, useEffect } from 'react'
import ExamCard from './ExamCard'
import {
  HiChevronLeft, HiChevronRight, HiOutlineArrowUp,
  HiOutlineBookmark, HiBookmark, HiOutlineOfficeBuilding
} from 'react-icons/hi'
import { getDomainColor } from '../utils/helpers'

export default function ExamGrid({
  exams,
  compareList,
  toggleCompare,
  onViewDetails,
  currentPage,
  totalPages,
  setCurrentPage,
  viewMode = 'grid',
  itemsPerPage,
  setItemsPerPage,
  bookmarks = [],
  onToggleBookmark
}) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(max-width: 600px)').matches
  })

  const [showBackToTop, setShowBackToTop] = useState(false)

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

  if (exams.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No examinations matched</h3>
        <p>Try resetting filters or adjusting search keywords</p>
      </div>
    )
  }

  const pageNumbers = []
  const maxVisible = isMobile ? 3 : 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) pageNumbers.push(i)

  return (
    <>
      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="exam-grid">
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
        /* Dense List View */
        <div className="exam-list-container">
          <div className="exam-list-header">
            <span className="col-exam">EXAMINATION</span>
            <span className="col-domain">DOMAIN</span>
            <span className="col-level">LEVEL</span>
            <span className="col-scope">SCOPE</span>
            <span className="col-actions">ACTIONS</span>
          </div>

          <div className="exam-list-rows">
            {exams.map((exam) => {
              const color = getDomainColor(exam.domain)
              const isComparing = compareList.some(e => e.id === exam.id)
              const isBookmarked = bookmarks.includes(exam.id)
              const isPopular = exam.popularity === 'very_high'

              return (
                <div
                  key={exam.id}
                  className="exam-list-row"
                  style={{ borderLeft: `3px solid ${color}` }}
                  onClick={() => onViewDetails(exam)}
                >
                  <div className="col-exam">
                    <div className="list-title-row">
                      <span className="list-exam-title">{exam.name}</span>
                      <span className="list-exam-acronym">{exam.acronym}</span>
                      {isPopular && <span className="list-pop-pill">🔥</span>}
                    </div>
                    <div className="list-exam-sub">
                      <HiOutlineOfficeBuilding className="list-meta-icon" />
                      <span>{exam.conducting_body}</span>
                    </div>
                  </div>

                  <div className="col-domain">
                    <span
                      className="list-domain-pill"
                      style={{ background: `${color}18`, color, borderColor: `${color}44` }}
                    >
                      {exam.domain}
                    </span>
                  </div>

                  <div className="col-level">
                    <span className="list-text-muted">{exam.level}</span>
                  </div>

                  <div className="col-scope">
                    <span className="list-scope-pill">
                      {exam.jurisdiction === 'central' ? '🇮🇳 Central' : `🏛️ ${exam.state || 'State'}`}
                    </span>
                  </div>

                  <div className="col-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className={`list-action-btn bookmark ${isBookmarked ? 'active' : ''}`}
                      onClick={() => onToggleBookmark(exam.id)}
                      title={isBookmarked ? 'Remove' : 'Save'}
                    >
                      {isBookmarked ? <HiBookmark /> : <HiOutlineBookmark />}
                    </button>
                    <button
                      className={`list-action-btn compare ${isComparing ? 'active' : ''}`}
                      onClick={() => toggleCompare(exam)}
                      title={isComparing ? 'In compare tray' : 'Compare'}
                    >
                      {isComparing ? '✓' : '⇔'}
                    </button>
                    <button
                      className="list-action-btn view"
                      onClick={() => onViewDetails(exam)}
                    >
                      View →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pagination & Page Size Control Bar */}
      <div className="pagination-bar">
        {setItemsPerPage && (
          <div className="page-size-selector">
            <span className="page-size-label">Per page:</span>
            {[12, 24, 48].map(size => (
              <button
                key={size}
                className={`page-size-btn ${itemsPerPage === size ? 'active' : ''}`}
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
          <div className="pagination">
            <button
              className="page-btn"
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
                <button className="page-btn" onClick={() => { setCurrentPage(1); scrollToTop() }}>1</button>
                {start > 2 && <span className="page-ellipsis">…</span>}
              </>
            )}
            {pageNumbers.map(n => (
              <button
                key={n}
                className={`page-btn ${currentPage === n ? 'active' : ''}`}
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
                {end < totalPages - 1 && <span className="page-ellipsis">…</span>}
                <button className="page-btn" onClick={() => { setCurrentPage(totalPages); scrollToTop() }}>{totalPages}</button>
              </>
            )}
            <button
              className="page-btn"
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
          className="back-to-top-btn slide-up"
          onClick={scrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
        >
          <HiOutlineArrowUp />
        </button>
      )}
    </>
  )
}
