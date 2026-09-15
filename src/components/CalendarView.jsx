import { useState, useMemo } from 'react'
import { getMonthExams, getDomainColor } from '../utils/helpers'
import { HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi'

export default function CalendarView({ exams, onViewDetails }) {
  const [filterMode, setFilterMode] = useState('both') // 'exams', 'applications', 'both'
  const [selectedDomain, setSelectedDomain] = useState('All')

  const domains = useMemo(() => {
    return ['All', ...new Set(exams.map(e => e.domain))].sort()
  }, [exams])

  const filteredExams = useMemo(() => {
    if (selectedDomain === 'All') return exams
    return exams.filter(e => e.domain === selectedDomain)
  }, [exams, selectedDomain])

  const monthData = useMemo(() => {
    return getMonthExams(filteredExams)
  }, [filteredExams])

  return (
    <section className="calendar-section">
      <div className="section-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title">📅 Annual Exam & Registration Calendar</h2>
          <p className="section-subtitle">
            Timeline of examination dates and active application windows across all 12 months
          </p>
        </div>

        <div className="calendar-controls-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Domain dropdown filter */}
          <select
            className="calendar-domain-select"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              padding: '6px 14px',
              fontSize: '0.82rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {domains.map(d => (
              <option key={d} value={d} style={{ background: '#111827', color: '#f1f5f9' }}>
                {d === 'All' ? 'All Domains' : d}
              </option>
            ))}
          </select>

          {/* Toggle between Exam / Application view */}
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${filterMode === 'both' ? 'active' : ''}`}
              onClick={() => setFilterMode('both')}
            >
              All Events
            </button>
            <button
              className={`view-toggle-btn ${filterMode === 'exams' ? 'active' : ''}`}
              onClick={() => setFilterMode('exams')}
            >
              Exams Held
            </button>
            <button
              className={`view-toggle-btn ${filterMode === 'applications' ? 'active' : ''}`}
              onClick={() => setFilterMode('applications')}
            >
              Applications Open
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-grid">
        {monthData.map((item) => {
          const showExams = filterMode === 'both' || filterMode === 'exams'
          const showApps = filterMode === 'both' || filterMode === 'applications'
          const totalEvents = (showExams ? item.exams.length : 0) + (showApps ? item.applications.length : 0)

          return (
            <div key={item.month} className="calendar-month">
              <div className="calendar-month-name">
                <HiOutlineCalendar style={{ color: 'var(--accent-blue)' }} />
                <span>{item.month}</span>
                <span className="calendar-month-count">{totalEvents} events</span>
              </div>

              <div className="calendar-events-list">
                {/* Exams scheduled in this month */}
                {showExams && item.exams.map((exam) => {
                  const color = getDomainColor(exam.domain)
                  return (
                    <div
                      key={`exam-${exam.id}`}
                      className="calendar-event"
                      style={{ borderLeftColor: color }}
                      onClick={() => onViewDetails(exam)}
                      title={`${exam.name} (${exam.domain}) - Click to view details`}
                    >
                      <div className="calendar-event-header">
                        <span className="calendar-event-title">
                          {exam.acronym || exam.name}
                        </span>
                        <span className="calendar-event-type type-exam">Exam</span>
                      </div>
                      <div className="calendar-event-sub">
                        {exam.name}
                      </div>
                    </div>
                  )
                })}

                {/* Applications active in this month */}
                {showApps && item.applications.map((exam) => {
                  return (
                    <div
                      key={`app-${exam.id}`}
                      className="calendar-event"
                      style={{ borderLeftColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.04)' }}
                      onClick={() => onViewDetails(exam)}
                      title={`${exam.name} (Application window: ${exam.application_period}) - Click to view details`}
                    >
                      <div className="calendar-event-header">
                        <span className="calendar-event-title" style={{ color: '#fbbf24' }}>
                          {exam.acronym || exam.name}
                        </span>
                        <span className="calendar-event-type type-apply">Apply</span>
                      </div>
                      <div className="calendar-event-sub">
                        Window: {exam.application_period}
                      </div>
                    </div>
                  )
                })}

                {totalEvents === 0 && (
                  <div style={{ padding: '16px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    No major events noted
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
