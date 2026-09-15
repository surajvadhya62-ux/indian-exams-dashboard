import { useState, useMemo } from 'react'
import { getMonthExams, getDomainColor } from '../utils/helpers'
import { HiOutlineCalendar, HiOutlineViewGrid, HiOutlineFilter } from 'react-icons/hi'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const MONTH_SHORT = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
}

export default function CalendarView({ exams, onViewDetails }) {
  const [filterMode, setFilterMode] = useState('both') // 'exams', 'applications', 'both'
  const [selectedDomain, setSelectedDomain] = useState('All')
  const [selectedMonth, setSelectedMonth] = useState('All')

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

  const monthCounts = useMemo(() => {
    const counts = { All: 0 }
    monthData.forEach(item => {
      const showExams = filterMode === 'both' || filterMode === 'exams'
      const showApps = filterMode === 'both' || filterMode === 'applications'
      const count = (showExams ? item.exams.length : 0) + (showApps ? item.applications.length : 0)
      counts[item.month] = count
      counts.All += count
    })
    return counts
  }, [monthData, filterMode])

  const displayedMonths = useMemo(() => {
    if (selectedMonth === 'All') return monthData
    return monthData.filter(item => item.month === selectedMonth)
  }, [monthData, selectedMonth])

  return (
    <section className="calendar-section">
      <div className="section-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title">📅 Annual Exam & Registration Calendar</h2>
          <p className="section-subtitle">
            Timeline of examination dates and active application windows across all 12 months
          </p>
        </div>

        <div className="calendar-controls-group">
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

      {/* Horizontal Month Navigation Tabs */}
      <div className="calendar-month-pills" role="tablist" aria-label="Filter calendar by month">
        <button
          role="tab"
          aria-selected={selectedMonth === 'All'}
          className={`month-pill-btn ${selectedMonth === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedMonth('All')}
        >
          <HiOutlineViewGrid style={{ fontSize: '0.95rem' }} />
          <span>All Year</span>
          <span className="month-pill-count">{monthCounts.All || 0}</span>
        </button>
        {MONTH_NAMES.map(m => {
          const count = monthCounts[m] || 0
          const isActive = selectedMonth === m
          return (
            <button
              key={m}
              role="tab"
              aria-selected={isActive}
              className={`month-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedMonth(m)}
            >
              <span className="month-pill-label-desktop">{m}</span>
              <span className="month-pill-label-mobile">{MONTH_SHORT[m]}</span>
              <span className="month-pill-count">{count}</span>
            </button>
          )
        })}
      </div>

      {selectedMonth !== 'All' && (
        <div className="calendar-single-month-header">
          <div className="single-month-info">
            <span className="single-month-title">{selectedMonth}</span>
            <span className="single-month-meta">
              {monthCounts[selectedMonth] || 0} scheduled events ({filterMode === 'exams' ? 'exams only' : filterMode === 'applications' ? 'applications only' : 'exams & applications'})
            </span>
          </div>
          <button className="calendar-reset-btn" onClick={() => setSelectedMonth('All')}>
            ← Back to All 12 Months
          </button>
        </div>
      )}

      <div className={`calendar-grid ${selectedMonth !== 'All' ? 'single-month-view' : 'all-months-view'}`}>
        {displayedMonths.map((item) => {
          const showExams = filterMode === 'both' || filterMode === 'exams'
          const showApps = filterMode === 'both' || filterMode === 'applications'
          const totalEvents = (showExams ? item.exams.length : 0) + (showApps ? item.applications.length : 0)

          return (
            <div key={item.month} className="calendar-month">
              <div className="calendar-month-name">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <HiOutlineCalendar style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                  <span>{item.month}</span>
                </div>
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
                  <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    No major events scheduled for this window
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

