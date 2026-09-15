import { useState, useMemo } from 'react'
import { getMonthExams, getDomainColor } from '../utils/helpers'
import { HiOutlineCalendar, HiOutlineViewGrid, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineArrowRight } from 'react-icons/hi'

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
  
  // Default to January for immediate readability on mobile, or user can toggle to any month or All Year
  const [selectedMonth, setSelectedMonth] = useState('January')

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
      counts[item.month] = {
        total: count,
        exams: item.exams.length,
        applications: item.applications.length
      }
      counts.All += count
    })
    return counts
  }, [monthData, filterMode])

  const navigateMonth = (direction) => {
    const currentIdx = MONTH_NAMES.indexOf(selectedMonth)
    if (currentIdx === -1) {
      setSelectedMonth(direction > 0 ? 'January' : 'December')
      return
    }
    const nextIdx = (currentIdx + direction + 12) % 12
    setSelectedMonth(MONTH_NAMES[nextIdx])
  }

  const currentMonthData = useMemo(() => {
    return monthData.find(item => item.month === selectedMonth) || monthData[0]
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
          const count = monthCounts[m]?.total || 0
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

      {/* SINGLE MONTH FOCUSED VIEW (Default, fully readable & spacious) */}
      {selectedMonth !== 'All' ? (
        <div className="calendar-single-month-container">
          <div className="calendar-month-stepper">
            <button
              className="stepper-nav-btn"
              onClick={() => navigateMonth(-1)}
              title="Previous Month"
            >
              <HiOutlineChevronLeft />
              <span className="stepper-nav-label">
                {MONTH_SHORT[MONTH_NAMES[(MONTH_NAMES.indexOf(selectedMonth) - 1 + 12) % 12]]}
              </span>
            </button>

            <div className="stepper-center">
              <div className="stepper-month-heading">
                <HiOutlineCalendar className="stepper-cal-icon" />
                <span className="stepper-month-name">{selectedMonth}</span>
                <span className="stepper-event-badge">{monthCounts[selectedMonth]?.total || 0} events</span>
              </div>
              <div className="stepper-meta-breakdown">
                <span className="meta-subitem">
                  <strong style={{ color: '#38bdf8' }}>{monthCounts[selectedMonth]?.exams || 0}</strong> exams scheduled
                </span>
                <span className="meta-divider">·</span>
                <span className="meta-subitem">
                  <strong style={{ color: '#fbbf24' }}>{monthCounts[selectedMonth]?.applications || 0}</strong> registration windows
                </span>
              </div>
            </div>

            <button
              className="stepper-nav-btn"
              onClick={() => navigateMonth(1)}
              title="Next Month"
            >
              <span className="stepper-nav-label">
                {MONTH_SHORT[MONTH_NAMES[(MONTH_NAMES.indexOf(selectedMonth) + 1) % 12]]}
              </span>
              <HiOutlineChevronRight />
            </button>
          </div>

          {/* Detailed Event Cards List */}
          <div className="calendar-detailed-events-list">
            {/* Scheduled Exams */}
            {(filterMode === 'both' || filterMode === 'exams') &&
              currentMonthData.exams.map((exam) => {
                const color = getDomainColor(exam.domain)
                return (
                  <div
                    key={`exam-${exam.id}`}
                    className="calendar-detailed-card card-exam-type"
                    style={{ borderLeftColor: color }}
                    onClick={() => onViewDetails(exam)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-top-row">
                      <div className="card-title-block">
                        <span className="card-primary-title">
                          {exam.acronym || exam.name}
                        </span>
                        {exam.acronym && exam.acronym !== exam.name && (
                          <span className="card-secondary-title">{exam.name}</span>
                        )}
                      </div>
                      <span className="calendar-event-type type-exam">Exam</span>
                    </div>

                    <div className="card-meta-row">
                      <span className="card-meta-pill authority-pill">{exam.conducting_body}</span>
                      <span className="card-meta-pill domain-pill" style={{ color }}>{exam.domain}</span>
                      <span className="card-meta-date">📅 {exam.exam_month}</span>
                    </div>
                  </div>
                )
              })}

            {/* Application Windows */}
            {(filterMode === 'both' || filterMode === 'applications') &&
              currentMonthData.applications.map((exam) => {
                return (
                  <div
                    key={`app-${exam.id}`}
                    className="calendar-detailed-card card-apply-type"
                    style={{ borderLeftColor: '#f59e0b' }}
                    onClick={() => onViewDetails(exam)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="card-top-row">
                      <div className="card-title-block">
                        <span className="card-primary-title" style={{ color: '#fbbf24' }}>
                          {exam.acronym || exam.name}
                        </span>
                        {exam.acronym && exam.acronym !== exam.name && (
                          <span className="card-secondary-title">{exam.name}</span>
                        )}
                      </div>
                      <span className="calendar-event-type type-apply">Apply</span>
                    </div>

                    <div className="card-meta-row">
                      <span className="card-meta-pill authority-pill">{exam.conducting_body}</span>
                      <span className="card-meta-pill domain-pill" style={{ color: getDomainColor(exam.domain) }}>{exam.domain}</span>
                      <span className="card-meta-date" style={{ color: '#fef08a' }}>📝 Window: {exam.application_period}</span>
                    </div>
                  </div>
                )
              })}

            {(monthCounts[selectedMonth]?.total || 0) === 0 && (
              <div className="calendar-empty-state">
                <p>No exams or active registration windows found for {selectedMonth} with current filters.</p>
                <button
                  className="calendar-reset-btn"
                  onClick={() => {
                    setSelectedDomain('All')
                    setFilterMode('both')
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ALL YEAR OVERVIEW VIEW */
        <div className="calendar-grid all-months-overview">
          {monthData.map((item) => {
            const countInfo = monthCounts[item.month] || { total: 0, exams: 0, applications: 0 }
            const topExams = [...item.exams, ...item.applications].slice(0, 3)

            return (
              <div
                key={item.month}
                className="calendar-month-overview-card"
                onClick={() => setSelectedMonth(item.month)}
              >
                <div className="month-overview-header">
                  <div className="month-overview-title-group">
                    <HiOutlineCalendar style={{ color: 'var(--accent-blue)', fontSize: '1.1rem' }} />
                    <span className="month-overview-name">{item.month}</span>
                  </div>
                  <span className="month-overview-count-badge">
                    {countInfo.total} events
                  </span>
                </div>

                <div className="month-overview-metrics">
                  <span className="overview-metric-tag" style={{ color: '#38bdf8' }}>
                    {countInfo.exams} Exams
                  </span>
                  <span className="overview-metric-divider">·</span>
                  <span className="overview-metric-tag" style={{ color: '#fbbf24' }}>
                    {countInfo.applications} Opens
                  </span>
                </div>

                {/* Highlights preview */}
                <div className="month-overview-highlights">
                  {topExams.map((e, idx) => (
                    <div key={`${e.id}-${idx}`} className="month-highlight-chip">
                      <span
                        className="highlight-chip-dot"
                        style={{ backgroundColor: getDomainColor(e.domain) }}
                      />
                      <span className="highlight-chip-name">{e.acronym || e.name}</span>
                    </div>
                  ))}
                  {countInfo.total > 3 && (
                    <div className="month-highlight-more">
                      +{countInfo.total - 3} more scheduled
                    </div>
                  )}
                </div>

                <button
                  className="month-overview-view-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedMonth(item.month)
                  }}
                >
                  <span>Explore {item.month}</span>
                  <HiOutlineArrowRight />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}


