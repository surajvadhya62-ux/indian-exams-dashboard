import { useState, useMemo, useEffect } from 'react'
import {
  HiOutlineBookmark, HiOutlineCheckCircle, HiOutlineClock,
  HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineDocumentText,
  HiOutlineScale, HiOutlineExternalLink, HiOutlineTrash,
  HiOutlinePlus, HiOutlineTrendingUp, HiOutlineCalendar,
  HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineDownload
} from 'react-icons/hi'
import { exportExamDossierPdf } from '../utils/pdfGenerator'

// Helper to calculate approximate countdown days from exam_month
function calculateEstimatedDays(examMonthStr = '') {
  if (!examMonthStr) return 90
  const monthMap = {
    january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
    may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
    sep: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11
  }

  const lower = examMonthStr.toLowerCase()
  let targetMonth = -1
  for (const [mName, mIdx] of Object.entries(monthMap)) {
    if (lower.includes(mName)) {
      targetMonth = mIdx
      break
    }
  }

  if (targetMonth === -1) return 120

  const now = new Date()
  let targetYear = now.getFullYear()
  if (targetMonth < now.getMonth() || (targetMonth === now.getMonth() && now.getDate() > 15)) {
    targetYear += 1
  }

  const targetDate = new Date(targetYear, targetMonth, 15)
  const diffTime = targetDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(diffDays, 14)
}

export default function MyDashboard({
  exams = [],
  bookmarks = [],
  onToggleBookmark,
  onViewDetails,
  onToggleCompare,
  compareList = [],
  setActiveView
}) {
  const [selectedAddExamId, setSelectedAddExamId] = useState('')
  const [targetFilter, setTargetFilter] = useState('all') // 'all' | 'primary' | 'watchlist'
  const [examMilestones, setExamMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('indiaexams_candidate_milestones')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Persist milestone checkpoints
  const toggleMilestone = (examId, stepIndex) => {
    setExamMilestones(prev => {
      const current = prev[examId] || [false, false, false, false]
      const updatedExamSteps = [...current]
      updatedExamSteps[stepIndex] = !updatedExamSteps[stepIndex]
      const nextState = { ...prev, [examId]: updatedExamSteps }
      try {
        localStorage.setItem('indiaexams_candidate_milestones', JSON.stringify(nextState))
      } catch (e) {
        console.error('Failed to save milestones', e)
      }
      return nextState
    })
  }

  // Filtered list of bookmarked exam objects
  const bookmarkedExams = useMemo(() => {
    return exams.filter(e => bookmarks.includes(e.id))
  }, [exams, bookmarks])

  // Nearest exam calculation
  const nearestExam = useMemo(() => {
    if (bookmarkedExams.length === 0) return null
    let closest = null
    let minDays = Infinity
    bookmarkedExams.forEach(e => {
      const days = calculateEstimatedDays(e.exam_month)
      if (days < minDays) {
        minDays = days
        closest = { exam: e, days }
      }
    })
    return closest
  }, [bookmarkedExams])

  // Highest Cadre Calculation
  const highestCadre = useMemo(() => {
    if (bookmarkedExams.length === 0) return 'None Selected'
    const gazetted = bookmarkedExams.find(e => /gazetted|group a/i.test(e.cadre || ''))
    if (gazetted) return 'Group A (Gazetted)'
    const groupB = bookmarkedExams.find(e => /group b/i.test(e.cadre || ''))
    if (groupB) return 'Group B (Gazetted/Non-Gaz)'
    const officer = bookmarkedExams.find(e => /officer|executive/i.test(e.cadre || e.target_role || ''))
    if (officer) return 'Executive / Officer Cadre'
    return bookmarkedExams[0]?.cadre || 'Standard National Cadre'
  }, [bookmarkedExams])

  // Overall Syllabus Velocity Calculation
  const overallVelocity = useMemo(() => {
    if (bookmarkedExams.length === 0) return { percent: 0, cleared: 0, total: 0 }
    let totalSteps = bookmarkedExams.length * 4
    let clearedSteps = 0
    bookmarkedExams.forEach(e => {
      const steps = examMilestones[e.id] || [false, false, false, false]
      clearedSteps += steps.filter(Boolean).length
    })
    const percent = Math.round((clearedSteps / totalSteps) * 100)
    return { percent, cleared: clearedSteps, total: totalSteps }
  }, [bookmarkedExams, examMilestones])

  // Quick Add Action
  const handleEnlistExam = (e) => {
    e.preventDefault()
    if (!selectedAddExamId) return
    if (!bookmarks.includes(selectedAddExamId)) {
      onToggleBookmark(selectedAddExamId)
    }
    setSelectedAddExamId('')
  }

  return (
    <div className="candidate-workstation-wrapper fade-in">
      {/* Top Header Control Strip */}
      <div className="workstation-top-strip">
        <div className="workstation-title-group">
          <span className="mterminal-amber-label">CANDIDATE COMMAND CENTER & ACTIVE RADAR</span>
          <span className="workstation-status-badge">
            <span className="mterminal-pulse-dot" />
            <span>{bookmarkedExams.length} TARGETS MONITORED</span>
          </span>
        </div>

        {/* Quick Enlist Dropdown */}
        <form onSubmit={handleEnlistExam} className="workstation-quick-enlist-form">
          <div className="workstation-select-wrapper">
            <select
              className="mterminal-select workstation-exam-select"
              value={selectedAddExamId}
              onChange={(e) => setSelectedAddExamId(e.target.value)}
              aria-label="Enlist exam to radar"
            >
              <option value="">+ Enlist Examination to Radar...</option>
              {exams.map(e => (
                <option key={e.id} value={e.id} disabled={bookmarks.includes(e.id)}>
                  {e.name} ({e.acronym}) {bookmarks.includes(e.id) ? '— [ENLISTED]' : ''}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mterminal-fetch-btn"
            disabled={!selectedAddExamId}
            title="Pin this examination to your active candidate radar"
          >
            <HiOutlinePlus />
            <span>PIN TO RADAR</span>
          </button>
        </form>
      </div>

      {/* 4 Telemetry Metric Cards */}
      <div className="workstation-telemetry-grid">
        {/* Metric 1: Active Targets */}
        <div className="workstation-telemetry-card">
          <div className="telemetry-card-top">
            <span className="telemetry-k">ACTIVE TARGETS</span>
            <HiOutlineBookmark className="telemetry-icon text-amber" />
          </div>
          <div className="telemetry-card-main">
            <span className="telemetry-big-num">{bookmarkedExams.length}</span>
            <span className="telemetry-unit">Enlisted</span>
          </div>
          <div className="telemetry-card-sub">
            High-Stakes Examination Radar
          </div>
        </div>

        {/* Metric 2: Nearest Milestone */}
        <div className="workstation-telemetry-card">
          <div className="telemetry-card-top">
            <span className="telemetry-k">NEAREST MILESTONE</span>
            <HiOutlineClock className="telemetry-icon text-sky" />
          </div>
          <div className="telemetry-card-main">
            {nearestExam ? (
              <>
                <span className="telemetry-big-num text-sky">~{nearestExam.days}d</span>
                <span className="telemetry-unit">Remaining</span>
              </>
            ) : (
              <span className="telemetry-big-num text-muted">--</span>
            )}
          </div>
          <div className="telemetry-card-sub">
            {nearestExam ? (
              <span className="truncate-text" title={nearestExam.exam.name}>
                {nearestExam.exam.acronym}: {nearestExam.exam.exam_month || 'Upcoming Window'}
              </span>
            ) : (
              'Enlist an exam to track countdown'
            )}
          </div>
        </div>

        {/* Metric 3: Highest Cadre */}
        <div className="workstation-telemetry-card">
          <div className="telemetry-card-top">
            <span className="telemetry-k">TARGETED CADRE</span>
            <HiOutlineShieldCheck className="telemetry-icon text-emerald" />
          </div>
          <div className="telemetry-card-main">
            <span className="telemetry-cadre-val text-emerald">{highestCadre}</span>
          </div>
          <div className="telemetry-card-sub">
            7th Central Pay Commission Benchmark
          </div>
        </div>

        {/* Metric 4: Preparation Velocity */}
        <div className="workstation-telemetry-card">
          <div className="telemetry-card-top">
            <span className="telemetry-k">READINESS VELOCITY</span>
            <HiOutlineTrendingUp className="telemetry-icon text-purple" />
          </div>
          <div className="telemetry-card-main">
            <span className="telemetry-big-num">{overallVelocity.percent}%</span>
            <span className="telemetry-unit">Ready</span>
          </div>
          <div className="telemetry-card-progress">
            <div
              className="telemetry-progress-fill"
              style={{ width: `${overallVelocity.percent}%` }}
            />
          </div>
          <div className="telemetry-card-sub">
            {overallVelocity.cleared} of {overallVelocity.total} Milestones Cleared
          </div>
        </div>
      </div>

      {/* Main Workstation Section */}
      <div className="workstation-content-card">
        <div className="workstation-section-header">
          <div className="workstation-header-left">
            <span className="mterminal-amber-label">ACTIVE CANDIDATE PIPELINE</span>
            <span className="workstation-count-pill">{bookmarkedExams.length} EXAMINATIONS</span>
          </div>

          <div className="workstation-tabs">
            <button
              className={`workstation-tab-btn ${targetFilter === 'all' ? 'active' : ''}`}
              onClick={() => setTargetFilter('all')}
            >
              All Targets ({bookmarkedExams.length})
            </button>
          </div>
        </div>

        {/* Empty State if 0 Bookmarks */}
        {bookmarkedExams.length === 0 ? (
          <div className="workstation-empty-state">
            <div className="empty-state-icon-box">🎯</div>
            <h3 className="empty-state-title">CANDIDATE RADAR STANDBY</h3>
            <p className="empty-state-desc">
              You currently have no target examinations enlisted in your active preparation workstation.
              Enlist your target examinations to unlock live countdowns, 7th CPC pay telemetry, and syllabus milestone tracking.
            </p>

            <div className="empty-state-presets">
              <span className="preset-label">QUICK ENLIST HIGH-STAKES TARGETS:</span>
              <div className="preset-chips">
                <button
                  className="preset-chip"
                  onClick={() => onToggleBookmark('upsc-cse')}
                >
                  + Enlist UPSC CSE
                </button>
                <button
                  className="preset-chip"
                  onClick={() => onToggleBookmark('ssc-cgl')}
                >
                  + Enlist SSC CGL
                </button>
                <button
                  className="preset-chip"
                  onClick={() => onToggleBookmark('jee-main')}
                >
                  + Enlist JEE Main
                </button>
                <button
                  className="preset-chip"
                  onClick={() => onToggleBookmark('ibps-po')}
                >
                  + Enlist IBPS PO
                </button>
              </div>
            </div>

            <button
              className="mterminal-action-btn primary-action empty-browse-btn"
              onClick={() => setActiveView && setActiveView('explore')}
            >
              <HiOutlineAcademicCap className="mterminal-btn-icon" />
              <span>EXPLORE ALL 500 VERIFIED EXAMS</span>
            </button>
          </div>
        ) : (
          /* Enlisted Exams Workstation Grid */
          <div className="workstation-dossier-list">
            {bookmarkedExams.map((exam) => {
              const estimatedDays = calculateEstimatedDays(exam.exam_month)
              const steps = examMilestones[exam.id] || [false, false, false, false]
              const completedCount = steps.filter(Boolean).length
              const progressPct = Math.round((completedCount / 4) * 100)
              const isCompared = compareList.includes(exam.id)

              return (
                <div key={exam.id} className="workstation-dossier-card">
                  {/* Card Header Row */}
                  <div className="dossier-card-header">
                    <div className="dossier-header-left">
                      <span className="dossier-domain-pill">{exam.domain}</span>
                      <span className="dossier-cadre-pill">{exam.cadre || 'National Cadre'}</span>
                      <h4
                        className="dossier-exam-title"
                        onClick={() => onViewDetails && onViewDetails(exam)}
                        title="Open full examination research dossier"
                      >
                        {exam.name}
                        {exam.acronym && <span className="dossier-acronym">({exam.acronym})</span>}
                      </h4>
                      <span className="dossier-authority">
                        {exam.conducting_body} · {exam.jurisdiction === 'central' ? 'Central / All India' : exam.state || 'State'}
                      </span>
                    </div>

                    <div className="dossier-header-right">
                      <div className="dossier-countdown-pill" title="Estimated time to tentative examination window">
                        <HiOutlineCalendar className="countdown-icon" />
                        <span className="countdown-days">~{estimatedDays}d to Exam Window</span>
                        <span className="countdown-month">({exam.exam_month || 'TBD'})</span>
                      </div>
                    </div>
                  </div>

                  {/* 3-Column Telemetry & Milestone Matrix */}
                  <div className="dossier-matrix-grid">
                    {/* Col 1: Statutory & Competition Profile */}
                    <div className="matrix-col">
                      <div className="matrix-heading">STATUTORY PROFILE</div>
                      <div className="matrix-data-list">
                        <div className="matrix-data-row">
                          <span className="data-k">Application Window:</span>
                          <span className="data-v">{exam.application_period || 'Notified on Portal'}</span>
                        </div>
                        <div className="matrix-data-row">
                          <span className="data-k">Examination Window:</span>
                          <span className="data-v">{exam.exam_month || 'Annual'}</span>
                        </div>
                        <div className="matrix-data-row">
                          <span className="data-k">Min Qualification:</span>
                          <span className="data-v truncate-text" title={exam.min_qualification}>
                            {exam.min_qualification || 'Graduate / 10+2'}
                          </span>
                        </div>
                        <div className="matrix-data-row">
                          <span className="data-k">Age Limit:</span>
                          <span className="data-v">{exam.age_limit || 'As per commission rules'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Col 2: Cadre & Target Scope */}
                    <div className="matrix-col">
                      <div className="matrix-heading">CAREER & CADRE SCOPE</div>
                      <div className="matrix-data-list">
                        <div className="matrix-data-row">
                          <span className="data-k">Targeted Role:</span>
                          <span className="data-v truncate-text" title={exam.target_role}>
                            {exam.target_role || 'Administrative / Executive'}
                          </span>
                        </div>
                        <div className="matrix-data-row">
                          <span className="data-k">Exam Mode:</span>
                          <span className="data-v">{exam.exam_mode || 'CBT / Pen-Paper'}</span>
                        </div>
                        <div className="matrix-data-row">
                          <span className="data-k">Exam Level:</span>
                          <span className="data-v">{exam.level || 'National'}</span>
                        </div>
                        <div className="matrix-data-row">
                          <span className="data-k">Official Portal:</span>
                          <a
                            href={exam.official_website || 'https://www.india.gov.in'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="data-link"
                          >
                            <span>Commission Portal</span>
                            <HiOutlineExternalLink className="link-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Col 3: Preparation Milestone Checkpoints */}
                    <div className="matrix-col milestone-col">
                      <div className="matrix-heading flex-between">
                        <span>PREPARATION VELOCITY</span>
                        <span className="milestone-counter-tag">{completedCount}/4 CLEARED ({progressPct}%)</span>
                      </div>

                      {/* Micro Progress Bar */}
                      <div className="milestone-progress-bar">
                        <div
                          className="milestone-progress-fill"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      {/* 4 Interactive Checkpoints */}
                      <div className="milestone-checklist">
                        <label className="milestone-check-item">
                          <input
                            type="checkbox"
                            checked={steps[0]}
                            onChange={() => toggleMilestone(exam.id, 0)}
                          />
                          <span className="check-custom" />
                          <span className="check-text">1. Syllabus & PYQ Audit (2018-2025)</span>
                        </label>
                        <label className="milestone-check-item">
                          <input
                            type="checkbox"
                            checked={steps[1]}
                            onChange={() => toggleMilestone(exam.id, 1)}
                          />
                          <span className="check-custom" />
                          <span className="check-text">2. Core Standard Reference Materials</span>
                        </label>
                        <label className="milestone-check-item">
                          <input
                            type="checkbox"
                            checked={steps[2]}
                            onChange={() => toggleMilestone(exam.id, 2)}
                          />
                          <span className="check-custom" />
                          <span className="check-text">3. Sectional Timed Practice & Error Log</span>
                        </label>
                        <label className="milestone-check-item">
                          <input
                            type="checkbox"
                            checked={steps[3]}
                            onChange={() => toggleMilestone(exam.id, 3)}
                          />
                          <span className="check-custom" />
                          <span className="check-text">4. Full-Length Comprehensive Simulation</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Cluster */}
                  <div className="dossier-card-actions">
                    <button
                      className="mterminal-action-btn primary-action"
                      onClick={() => exportExamDossierPdf(exam)}
                      title={`Download complete 4-page official research dossier (PDF) for ${exam.name}`}
                    >
                      <HiOutlineDownload className="mterminal-btn-icon" />
                      <span>PDF DOSSIER</span>
                    </button>

                    <button
                      className="mterminal-action-btn secondary-action"
                      onClick={() => onViewDetails && onViewDetails(exam)}
                      title={`Open full research dossier for ${exam.name}`}
                    >
                      <HiOutlineDocumentText className="mterminal-btn-icon" />
                      <span>OPEN DOSSIER</span>
                    </button>

                    <button
                      className={`mterminal-action-btn secondary-action ${isCompared ? 'active-compare' : ''}`}
                      onClick={() => onToggleCompare && onToggleCompare(exam.id)}
                      title="Add or remove from multi-column comparison matrix"
                    >
                      <HiOutlineScale className="mterminal-btn-icon" />
                      <span>{isCompared ? 'REMOVE FROM COMPARE' : 'ADD TO COMPARE'}</span>
                    </button>

                    <a
                      href={exam.official_website || 'https://www.india.gov.in'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mterminal-action-btn tertiary-action"
                      title="Open conducting authority portal in new tab"
                    >
                      <HiOutlineExternalLink className="mterminal-btn-icon" />
                      <span>COMMISSION PORTAL</span>
                    </a>

                    <button
                      className="mterminal-action-btn danger-action"
                      onClick={() => onToggleBookmark(exam.id)}
                      title="Remove this examination from active candidate radar"
                    >
                      <HiOutlineTrash className="mterminal-btn-icon" />
                      <span>REMOVE</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
