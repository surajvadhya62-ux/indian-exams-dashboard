import { useState, useMemo, useEffect } from 'react'
import {
  HiOutlineBookmark, HiOutlineCheckCircle, HiOutlineClock,
  HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineDocumentText,
  HiOutlineScale, HiOutlineExternalLink, HiOutlineTrash,
  HiOutlinePlus, HiOutlineTrendingUp, HiOutlineCalendar,
  HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineDownload,
  HiOutlineClipboardList, HiOutlineCheck, HiOutlineFire,
  HiOutlineLightningBolt, HiOutlineTag, HiOutlineFilter
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
  setActiveView,
  todoList = [],
  setTodoList,
  currentUser,
  onOpenAuth
}) {
  const [selectedAddExamId, setSelectedAddExamId] = useState('')
  const [targetFilter, setTargetFilter] = useState('all') // 'all' | 'primary' | 'watchlist'
  const [todoFilter, setTodoFilter] = useState('all') // 'all' | 'pending' | 'completed'

  // New task form state
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskExamId, setNewTaskExamId] = useState('general')
  const [newTaskPriority, setNewTaskPriority] = useState('high') // 'high' | 'medium' | 'low'
  const [newTaskDuration, setNewTaskDuration] = useState('60m')

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

  // Combined Vacancy Pool & Application Windows across Target Pipeline
  const targetTelemetry = useMemo(() => {
    if (bookmarkedExams.length === 0) {
      return { totalVacancies: 0, vacancyFormatted: '0', openWindows: 0 }
    }

    let totalVacancies = 0
    let openWindows = 0
    const currentMonthNum = new Date().getMonth()
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    bookmarkedExams.forEach(e => {
      const seats = parseInt(String(e.total_seats || '').replace(/[^0-9]/g, ''), 10)
      if (!isNaN(seats) && seats > 0) {
        totalVacancies += seats
      } else {
        totalVacancies += 850
      }

      const appPeriod = (e.application_period || '').toLowerCase()
      const currentMonthName = monthNames[currentMonthNum]
      if (appPeriod.includes(currentMonthName) || appPeriod.includes('ongoing') || appPeriod.includes('active')) {
        openWindows += 1
      }
    })

    const vacancyFormatted = totalVacancies.toLocaleString('en-IN')
    return { totalVacancies, vacancyFormatted, openWindows }
  }, [bookmarkedExams])

  // To-Do Actions
  const handleAddTodo = (e) => {
    if (e) e.preventDefault()
    if (!newTaskText.trim()) return

    const examObj = bookmarkedExams.find(ex => ex.id === newTaskExamId)
    const examName = newTaskExamId === 'general' ? 'General Foundation' : (examObj?.acronym || examObj?.name || 'Target Exam')

    const newTodo = {
      id: `td_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      text: newTaskText.trim(),
      examId: newTaskExamId,
      examName,
      priority: newTaskPriority,
      duration: newTaskDuration,
      completed: false,
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString()
    }

    const updated = [newTodo, ...todoList]
    setTodoList(updated)
    try {
      localStorage.setItem('indiaexams_daily_todos', JSON.stringify(updated))
    } catch (err) {}
    setNewTaskText('')
  }

  const handleToggleTodo = (id) => {
    const updated = todoList.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
      }
      return t
    })
    setTodoList(updated)
    try {
      localStorage.setItem('indiaexams_daily_todos', JSON.stringify(updated))
    } catch (err) {}
  }

  const handleDeleteTodo = (id) => {
    const updated = todoList.filter(t => t.id !== id)
    setTodoList(updated)
    try {
      localStorage.setItem('indiaexams_daily_todos', JSON.stringify(updated))
    } catch (err) {}
  }

  const handleClearCompleted = () => {
    const updated = todoList.filter(t => !t.completed)
    setTodoList(updated)
    try {
      localStorage.setItem('indiaexams_daily_todos', JSON.stringify(updated))
    } catch (err) {}
  }

  // Quick Preset Add
  const handleAddPreset = (text, duration, priority, examId = 'general') => {
    const examObj = bookmarkedExams.find(ex => ex.id === examId)
    const examName = examId === 'general' ? 'General Foundation' : (examObj?.acronym || examObj?.name || 'Target Exam')

    const newTodo = {
      id: `td_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      text,
      examId,
      examName,
      priority,
      duration,
      completed: false,
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString()
    }

    const updated = [newTodo, ...todoList]
    setTodoList(updated)
    try {
      localStorage.setItem('indiaexams_daily_todos', JSON.stringify(updated))
    } catch (err) {}
  }

  // Quick add from card level
  const handleAddCardTask = (examId, taskDescription) => {
    if (!taskDescription.trim()) return
    const examObj = bookmarkedExams.find(ex => ex.id === examId)
    const examName = examObj?.acronym || examObj?.name || 'Target Exam'

    const newTodo = {
      id: `td_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      text: taskDescription.trim(),
      examId,
      examName,
      priority: 'high',
      duration: '60m',
      completed: false,
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString()
    }

    const updated = [newTodo, ...todoList]
    setTodoList(updated)
    try {
      localStorage.setItem('indiaexams_daily_todos', JSON.stringify(updated))
    } catch (err) {}
  }

  // To-Do Statistics
  const completedCount = todoList.filter(t => t.completed).length
  const totalCount = todoList.length
  const completionPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const filteredTodos = useMemo(() => {
    if (todoFilter === 'pending') return todoList.filter(t => !t.completed)
    if (todoFilter === 'completed') return todoList.filter(t => t.completed)
    return todoList
  }, [todoList, todoFilter])

  // Format today's date
  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }, [])

  return (
    <div className="workstation-container fade-in">
      {/* Workstation Command Header */}
      <div className="workstation-header">
        <div className="workstation-header-main">
          <div className="workstation-title-group">
            <div className="workstation-kicker">
              <span className="live-signal-dot" />
              <span>CANDIDATE COMMAND CENTER // ACTIVE RADAR</span>
            </div>
            <h1 className="workstation-title">Target Pipeline & Daily Study Planner</h1>
            <p className="workstation-subtitle">
              Forensic tracking of your pinned examinations, aggregate vacancy pool, and custom daily study schedule.
            </p>
          </div>

          <div className="workstation-quick-add">
            {currentUser ? (
              <div className="radar-user-badge" onClick={onOpenAuth}>
                <span className="radar-user-dot" />
                <span>Vault Active: <strong>{currentUser.name}</strong></span>
              </div>
            ) : (
              <button className="btn-secondary radar-signin-btn" onClick={onOpenAuth}>
                <HiOutlineBookmark /> Save Progress in Vault
              </button>
            )}

            <div className="quick-add-wrap">
              <select
                className="workstation-select"
                value={selectedAddExamId}
                onChange={(e) => {
                  if (e.target.value) {
                    onToggleBookmark(e.target.value)
                    setSelectedAddExamId('')
                  }
                }}
              >
                <option value="">+ Pin Examination to Radar...</option>
                {exams
                  .filter(e => !bookmarks.includes(e.id))
                  .slice(0, 100)
                  .map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.conducting_body})
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* 4-Card Forensic Telemetry Strip */}
        <div className="workstation-telemetry-grid">
          {/* Metric 1: Pinned Targets */}
          <div className="telemetry-card panel">
            <div className="telemetry-card-top">
              <span className="telemetry-index">TARGETS // 01</span>
              <HiOutlineBookmark className="telemetry-icon text-amber" />
            </div>
            <div className="telemetry-value-row">
              <span className="telemetry-main-val">{bookmarkedExams.length}</span>
              <span className="telemetry-sub-badge">ACTIVE RADAR</span>
            </div>
            <p className="telemetry-footer-text">
              {bookmarkedExams.length === 0
                ? 'No examinations pinned yet'
                : `${bookmarkedExams.filter(e => e.jurisdiction === 'central').length} Central · ${bookmarkedExams.filter(e => e.jurisdiction === 'state').length} State`}
            </p>
          </div>

          {/* Metric 2: Nearest Examination Window */}
          <div className="telemetry-card panel">
            <div className="telemetry-card-top">
              <span className="telemetry-index">COUNTDOWN // 02</span>
              <HiOutlineClock className="telemetry-icon text-rose" />
            </div>
            <div className="telemetry-value-row">
              <span className="telemetry-main-val">
                {nearestExam ? `~${nearestExam.days}d` : '--'}
              </span>
              <span className="telemetry-sub-badge text-rose">
                {nearestExam ? nearestExam.exam.acronym || 'NEXT WINDOW' : 'NO TARGETS'}
              </span>
            </div>
            <p className="telemetry-footer-text truncate-text">
              {nearestExam
                ? `${nearestExam.exam.name} (${nearestExam.exam.exam_month || 'TBD'})`
                : 'Pin an exam to track timeline'}
            </p>
          </div>

          {/* Metric 3: Highest Target Cadre */}
          <div className="telemetry-card panel">
            <div className="telemetry-card-top">
              <span className="telemetry-index">MAX CADRE // 03</span>
              <HiOutlineShieldCheck className="telemetry-icon text-blue" />
            </div>
            <div className="telemetry-value-row">
              <span className="telemetry-main-val truncate-text" style={{ fontSize: '1.25rem' }}>
                {highestCadre}
              </span>
            </div>
            <p className="telemetry-footer-text">
              {bookmarkedExams.some(e => /gazetted/i.test(e.cadre || ''))
                ? 'Constitutional Gazetted Authority'
                : 'Executive / Technical Hierarchy'}
            </p>
          </div>

          {/* Metric 4: Combined Vacancy Pool */}
          <div className="telemetry-card panel">
            <div className="telemetry-card-top">
              <span className="telemetry-index">VACANCY POOL // 04</span>
              <HiOutlineBriefcase className="telemetry-icon text-emerald" />
            </div>
            <div className="telemetry-value-row">
              <span className="telemetry-main-val text-emerald">
                {targetTelemetry.vacancyFormatted}
              </span>
              <span className="telemetry-sub-badge text-emerald">
                {targetTelemetry.openWindows > 0 ? `${targetTelemetry.openWindows} OPEN NOW` : 'ANNUAL POOL'}
              </span>
            </div>
            <p className="telemetry-footer-text">
              {targetTelemetry.openWindows > 0
                ? `${targetTelemetry.openWindows} active application window(s) right now`
                : 'Aggregate recruitment seats across pinned targets'}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🗓️ DAILY ASPIRANT ACTION BOARD & TO-DO LIST DESIGNER     */}
      {/* ========================================================= */}
      <div className="daily-todo-board panel">
        <div className="todo-board-header">
          <div className="todo-header-left">
            <div className="todo-kicker">
              <HiOutlineFire className="todo-fire-icon text-amber" />
              <span>DAILY STUDY PLANNER & ACTION BOARD // {todayFormatted}</span>
            </div>
            <h3 className="todo-board-title">Design Your Daily Preparation Schedule</h3>
          </div>

          {/* Progress Gauge */}
          <div className="todo-progress-gauge">
            <div className="todo-progress-stats">
              <span className="todo-pct-num">{completionPct}%</span>
              <span className="todo-count-label">{completedCount} of {totalCount} Cleared</span>
            </div>
            <div className="todo-progress-bar-track">
              <div
                className="todo-progress-bar-fill"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 1-Click Study Presets */}
        <div className="todo-presets-strip">
          <span className="presets-label">
            <HiOutlineLightningBolt /> Quick Add Tasks:
          </span>
          <div className="presets-chips">
            <button
              type="button"
              className="preset-chip"
              onClick={() => handleAddPreset('Daily Editorial & Current Affairs Analysis', '45m', 'high')}
            >
              + Current Affairs (45m)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => handleAddPreset('50 Previous Year Questions (PYQ) Sectional Drill', '90m', 'high')}
            >
              + 50 PYQs Practice (90m)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => handleAddPreset('Full-Length Timed Mock Test Simulation', '120m', 'high')}
            >
              + Full Mock Test (120m)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => handleAddPreset('CSAT / Quantitative Aptitude Practice Drill', '60m', 'medium')}
            >
              + CSAT / Quant (60m)
            </button>
            <button
              type="button"
              className="preset-chip"
              onClick={() => handleAddPreset('Core Static Syllabus Chapter Revision & Notes', '60m', 'medium')}
            >
              + Static Revision (60m)
            </button>
          </div>
        </div>

        {/* Task Creation Form */}
        <form onSubmit={handleAddTodo} className="todo-create-form">
          <div className="todo-input-wrap">
            <input
              type="text"
              className="todo-text-input"
              placeholder="e.g., Revise Laxmikanth Polity Chapters 5-8, Solve 40 Math questions..."
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
            />
          </div>

          <div className="todo-meta-controls">
            {/* Target Exam Dropdown */}
            <select
              className="todo-select"
              value={newTaskExamId}
              onChange={e => setNewTaskExamId(e.target.value)}
              title="Link task to specific examination"
            >
              <option value="general">🌐 General Foundation / All Exams</option>
              {bookmarkedExams.map(ex => (
                <option key={ex.id} value={ex.id}>
                  📌 {ex.acronym || ex.name}
                </option>
              ))}
            </select>

            {/* Priority Selector */}
            <select
              className="todo-select"
              value={newTaskPriority}
              onChange={e => setNewTaskPriority(e.target.value)}
              title="Set task priority"
            >
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Standard / Low</option>
            </select>

            {/* Duration Selector */}
            <select
              className="todo-select"
              value={newTaskDuration}
              onChange={e => setNewTaskDuration(e.target.value)}
              title="Estimated duration"
            >
              <option value="30m">⏱️ 30 Mins</option>
              <option value="45m">⏱️ 45 Mins</option>
              <option value="60m">⏱️ 1 Hour</option>
              <option value="90m">⏱️ 1.5 Hours</option>
              <option value="120m">⏱️ 2 Hours</option>
              <option value="180m">⏱️ 3+ Hours</option>
            </select>

            <button type="submit" className="todo-submit-btn">
              <HiOutlinePlus /> Add Task
            </button>
          </div>
        </form>

        {/* Filter and Task Listing */}
        <div className="todo-list-section">
          <div className="todo-filter-bar">
            <div className="todo-filter-chips">
              <button
                className={`todo-filter-btn ${todoFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTodoFilter('all')}
              >
                All Tasks ({totalCount})
              </button>
              <button
                className={`todo-filter-btn ${todoFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setTodoFilter('pending')}
              >
                Pending ({totalCount - completedCount})
              </button>
              <button
                className={`todo-filter-btn ${todoFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setTodoFilter('completed')}
              >
                Completed ({completedCount})
              </button>
            </div>

            {completedCount > 0 && (
              <button className="todo-clear-btn" onClick={handleClearCompleted}>
                <HiOutlineTrash /> Clear Completed ({completedCount})
              </button>
            )}
          </div>

          {filteredTodos.length === 0 ? (
            <div className="todo-empty-box">
              <HiOutlineClipboardList className="todo-empty-icon" />
              <p>No {todoFilter === 'all' ? '' : todoFilter} tasks found for today.</p>
              <span className="todo-empty-hint">
                Use the presets above or type a study goal to schedule your day!
              </span>
            </div>
          ) : (
            <div className="todo-items-grid">
              {filteredTodos.map(task => {
                const priorityClass = `priority-${task.priority || 'medium'}`
                return (
                  <div
                    key={task.id}
                    className={`todo-item-card ${task.completed ? 'is-completed' : ''} ${priorityClass}`}
                  >
                    <button
                      type="button"
                      className={`todo-check-btn ${task.completed ? 'checked' : ''}`}
                      onClick={() => handleToggleTodo(task.id)}
                      title={task.completed ? 'Mark as pending' : 'Mark as completed'}
                      aria-label="Toggle task completion"
                    >
                      {task.completed && <HiOutlineCheck />}
                    </button>

                    <div className="todo-item-content">
                      <span className={`todo-item-text ${task.completed ? 'strike' : ''}`}>
                        {task.text}
                      </span>
                      <div className="todo-item-tags">
                        <span className="todo-exam-tag">
                          {task.examName || 'General'}
                        </span>
                        <span className={`todo-priority-tag tag-${task.priority}`}>
                          {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
                        </span>
                        <span className="todo-duration-tag">
                          <HiOutlineClock /> {task.duration || '60m'}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="todo-delete-btn"
                      onClick={() => handleDeleteTodo(task.id)}
                      title="Delete task"
                      aria-label="Delete task"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Radar Examination Pipeline */}
      <div className="workstation-body">
        {bookmarkedExams.length === 0 ? (
          /* Zero-State Obsidian Billboard */
          <div className="workstation-empty-state panel">
            <div className="empty-state-visual">
              <HiOutlineBookmark className="empty-radar-icon" />
              <div className="empty-radar-ping" />
            </div>
            <h3 className="empty-state-title">No Examinations Added to Active Radar</h3>
            <p className="empty-state-desc">
              Your radar lets you track deadlines, monitor combined vacancies, and manage exam-specific study tasks.
              Pin high-priority examinations directly from the catalog.
            </p>
            <div className="empty-state-actions">
              <button
                className="mterminal-action-btn primary-action"
                onClick={() => setActiveView && setActiveView('explore')}
              >
                <HiOutlineSparkles className="mterminal-btn-icon" />
                <span>EXPLORE 500 EXAMINATIONS</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Examination Dossier Cards */
          <div className="workstation-dossier-list">
            {bookmarkedExams.map((exam) => {
              const estimatedDays = calculateEstimatedDays(exam.exam_month)
              const examTasks = todoList.filter(t => t.examId === exam.id)
              const examCompletedTasks = examTasks.filter(t => t.completed).length
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

                  {/* 3-Column Telemetry & Study Action Plan */}
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

                    {/* Col 3: Daily Action Plan for this Exam */}
                    <div className="matrix-col milestone-col">
                      <div className="matrix-heading flex-between">
                        <span>DAILY ACTION PLAN ({exam.acronym || 'EXAM'})</span>
                        <span className="milestone-counter-tag">
                          {examCompletedTasks}/{examTasks.length} DONE
                        </span>
                      </div>

                      {/* Exam Tasks List */}
                      <div className="exam-card-todos">
                        {examTasks.length === 0 ? (
                          <div className="exam-card-todo-empty">
                            <span>No tasks assigned to {exam.acronym || 'this exam'} yet.</span>
                          </div>
                        ) : (
                          <div className="exam-card-todo-items">
                            {examTasks.slice(0, 4).map(t => (
                              <div
                                key={t.id}
                                className={`exam-todo-mini-row ${t.completed ? 'completed' : ''}`}
                                onClick={() => handleToggleTodo(t.id)}
                              >
                                <span className={`mini-check ${t.completed ? 'checked' : ''}`}>
                                  {t.completed && '✓'}
                                </span>
                                <span className="mini-todo-text">{t.text}</span>
                                <span className="mini-todo-time">{t.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Inline Task Add for this Exam */}
                        <div className="exam-inline-add-row">
                          <input
                            type="text"
                            className="exam-inline-input"
                            placeholder={`+ Add study goal for ${exam.acronym || exam.name}...`}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddCardTask(exam.id, e.target.value)
                                e.target.value = ''
                              }
                            }}
                          />
                        </div>
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

                    <button
                      className="mterminal-action-btn remove-action"
                      onClick={() => onToggleBookmark && onToggleBookmark(exam.id)}
                      title="Unpin examination from Active Radar"
                    >
                      <HiOutlineTrash className="mterminal-btn-icon" />
                      <span>UNPIN TARGET</span>
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
