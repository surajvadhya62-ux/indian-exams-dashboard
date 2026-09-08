import ExamCard from './ExamCard'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

export default function ExamGrid({ exams, compareList, toggleCompare, onViewDetails, currentPage, totalPages, setCurrentPage }) {
  if (exams.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No exams found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    )
  }

  const pageNumbers = []
  const maxVisible = 5
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
  for (let i = start; i <= end; i++) pageNumbers.push(i)

  return (
    <>
      <div className="exam-grid">
        {exams.map((exam, i) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            isComparing={compareList.some(e => e.id === exam.id)}
            onToggleCompare={() => toggleCompare(exam)}
            onViewDetails={() => onViewDetails(exam)}
            delay={i * 0.03}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <HiChevronLeft />
          </button>
          {start > 1 && (
            <>
              <button className="page-btn" onClick={() => setCurrentPage(1)}>1</button>
              {start > 2 && <span style={{ color: 'var(--text-muted)' }}>…</span>}
            </>
          )}
          {pageNumbers.map(n => (
            <button
              key={n}
              className={`page-btn ${currentPage === n ? 'active' : ''}`}
              onClick={() => setCurrentPage(n)}
            >
              {n}
            </button>
          ))}
          {end < totalPages && (
            <>
              {end < totalPages - 1 && <span style={{ color: 'var(--text-muted)' }}>…</span>}
              <button className="page-btn" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
            </>
          )}
          <button
            className="page-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </>
  )
}
