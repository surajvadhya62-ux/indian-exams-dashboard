import { useState, useMemo, useCallback, useRef, useEffect, lazy, Suspense } from 'react'
import './index.css'
import examsData from './data/exams.json'
import Header from './components/Header'
import StatsOverview from './components/StatsOverview'
import SearchFilter from './components/SearchFilter'
import ExamGrid from './components/ExamGrid'
import ColdBootIntro from './components/ColdBootIntro'
import StoryGate from './components/StoryGate'
import MobileNav from './components/MobileNav'
import ErrorBoundary from './components/ErrorBoundary'
import NewsTicker from './components/NewsTicker'
import { ViewLoadingFallback } from './components/Skeletons'

// Code-split everything that isn't needed for the first paint of the
// Explore view (the landing view — see `pageReleased`/`dashboardEntered`
// below). Before this, all of these — including Analytics (pulls in
// recharts), the PDF/calendar exporters, and every secondary view — shipped
// in one ~2MB chunk that a visitor downloaded before seeing a single exam.
// Most of this audience is on a mid-range Android phone on mobile data,
// where that's a real cost, not a rounding error. Each of these now loads
// only when its view is actually opened.
const Analytics = lazy(() => import('./components/Analytics'))
const ComparisonTool = lazy(() => import('./components/ComparisonTool'))
const CalendarView = lazy(() => import('./components/CalendarView'))
const ExamDetail = lazy(() => import('./components/ExamDetail'))
const GovtGradesGuide = lazy(() => import('./components/GovtGradesGuide'))
const HowToUse = lazy(() => import('./components/HowToUse'))
const CoverageMethod = lazy(() => import('./components/CoverageMethod'))
const ExamWizard = lazy(() => import('./components/ExamWizard'))
const EligibilityScreener = lazy(() => import('./components/EligibilityScreener'))
const Feedback = lazy(() => import('./components/Feedback'))
const CommandPalette = lazy(() => import('./components/CommandPalette'))
const UpdatesFeed = lazy(() => import('./components/UpdatesFeed'))
const MyDashboard = lazy(() => import('./components/MyDashboard'))
const WalkthroughTour = lazy(() => import('./components/WalkthroughTour'))
const AuthModal = lazy(() => import('./components/AuthModal'))
// SyllabusOverlapEngine (the real overlap UI) was imported here but never
// rendered — the 'overlap' view shows an inline "under maintenance"
// placeholder instead (see below). Dropped the dead import rather than
// lazy-loading a component nothing ever mounts.

/* Session-gated intro check:
   Plays once per session, unless ?intro=1 forces it, or user has reduced motion */
function shouldSkipIntro() {
  try {
    if (new URLSearchParams(window.location.search).get('intro') === '1') return false
    if (new URLSearchParams(window.location.search).get('intro') === '0') return true
    if (typeof window !== 'undefined' && window.sessionStorage?.getItem('indiaexams_intro_seen') === 'true') {
      return true
    }
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true
    }
  } catch {
    // Fall back to playing
  }
  return false
}

function App() {
  const [activeView, setActiveView] = useState('explore')
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    domain: '',
    level: '',
    exam_mode: '',
    frequency: '',
    track: '',
    jurisdiction: '',
    state: '',
  })
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState('grid')
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [showOnlySaved, setShowOnlySaved] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [screenerFilteredIds, setScreenerFilteredIds] = useState(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K & / for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(prev => !prev)
        return
      }
      // Quick search '/' when not in input/textarea/select
      if (e.key === '/' && !isCommandPaletteOpen) {
        const tag = document.activeElement?.tagName?.toLowerCase()
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
          e.preventDefault()
          setIsCommandPaletteOpen(true)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCommandPaletteOpen])

  // Theme state: only 'dark' and 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const urlTheme = new URLSearchParams(window.location.search).get('theme')
      if (urlTheme === 'light' || urlTheme === 'dark') return urlTheme
      const saved = localStorage.getItem('indiaexams_theme')
      if (saved === 'light' || saved === 'dark') return saved
      if (saved === 'gazette') return 'light'
      return 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('indiaexams_theme', theme)
    } catch {}
  }, [theme])

  // Bookmarks (Saved Exams) stored in localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('indiaexams_bookmarks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const toggleBookmark = useCallback((examId) => {
    setBookmarks(prev => {
      const updated = prev.includes(examId)
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
      try {
        localStorage.setItem('indiaexams_bookmarks', JSON.stringify(updated))
      } catch (err) {
        console.error('Failed to save bookmark:', err)
      }
      return updated
    })
  }, [])

  const [compareList, setCompareList] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [overlapPrimaryId, setOverlapPrimaryId] = useState('upsc-cse')
  const [overlapSecondaryId, setOverlapSecondaryId] = useState('uppsc-pcs')

  // Aspirant Auth & Vault State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      if (new URLSearchParams(window.location.search).get('demoUser') === '1') {
        return {
          id: 'usr_lead',
          name: 'Aspirant',
          email: 'aspirant@indiaexams.gov.in',
          targetExam: 'UPSC Civil Services (CSE)',
          targetYear: '2025-2026',
          joinedAt: new Date().toISOString()
        }
      }
      const saved = localStorage.getItem('indiaexams_auth_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('auth') === '1'
    } catch {
      return false
    }
  })
  const [isTourOpen, setIsTourOpen] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('tour') === '1'
    } catch {
      return false
    }
  })

  // Daily Aspirant Study Tasks (Shared across Radar, Auth Vault)
  const [todoList, setTodoList] = useState(() => {
    try {
      const saved = localStorage.getItem('indiaexams_daily_todos')
      if (saved) return JSON.parse(saved)
    } catch (e) {}
    return [
      {
        id: 'td_1',
        text: 'Daily Editorial & National Current Affairs Analysis',
        examId: 'general',
        examName: 'Daily General Studies',
        priority: 'high',
        duration: '45m',
        completed: true,
        date: new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString()
      },
      {
        id: 'td_2',
        text: 'Previous Year Questions (PYQ) Topic Drill — 40 Questions',
        examId: 'upsc-cse',
        examName: 'UPSC CSE',
        priority: 'high',
        duration: '90m',
        completed: false,
        date: new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString()
      },
      {
        id: 'td_3',
        text: 'CSAT / Aptitude Speed Reasoning Practice',
        examId: 'ssc-cgl',
        examName: 'SSC CGL',
        priority: 'medium',
        duration: '60m',
        completed: false,
        date: new Date().toISOString().slice(0, 10),
        createdAt: new Date().toISOString()
      }
    ]
  })

  const handleLogin = useCallback((user) => {
    setCurrentUser(user)
    try {
      localStorage.setItem('indiaexams_auth_user', JSON.stringify(user))
    } catch (e) {}
  }, [])

  const handleLogout = useCallback(() => {
    setCurrentUser(null)
    try {
      localStorage.removeItem('indiaexams_auth_user')
    } catch (e) {}
  }, [])

  const [introMounted, setIntroMounted] = useState(() => !shouldSkipIntro())
  const [pageReleased, setPageReleased] = useState(() => shouldSkipIntro())
  const [dashboardEntered, setDashboardEntered] = useState(() => shouldSkipIntro())

  const introKeyRef = useRef(0)
  const [introKey, setIntroKey] = useState(0)

  const markIntroSeen = useCallback(() => {
    try {
      sessionStorage.setItem('indiaexams_intro_seen', 'true')
    } catch {}
  }, [])

  const handleIntroRelease = useCallback(() => {
    setPageReleased(true)
    markIntroSeen()
  }, [markIntroSeen])

  const handleIntroComplete = useCallback(() => {
    setIntroMounted(false)
    markIntroSeen()
  }, [markIntroSeen])

  const handleDashboardEnter = useCallback(() => {
    setDashboardEntered(true)
    markIntroSeen()
  }, [markIntroSeen])

  // URL Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '')
      if (!hash) return

      if (hash.startsWith('exam/')) {
        const examId = hash.replace('exam/', '')
        const found = examsData.find(e => e.id === examId)
        if (found) {
          setSelectedExam(found)
          setDashboardEntered(true)
          setPageReleased(true)
          setIntroMounted(false)
        }
        return
      }

      if (hash === 'saved' || hash === 'my-exams') {
        setActiveView('my-exams')
        setShowOnlySaved(false)
        setDashboardEntered(true)
        return
      }

      if (hash.startsWith('overlap')) {
        setActiveView('overlap')
        setShowOnlySaved(false)
        setDashboardEntered(true)
        setPageReleased(true)
        setIntroMounted(false)
        try {
          const queryPart = hash.includes('?') ? hash.split('?')[1] : ''
          if (queryPart) {
            const params = new URLSearchParams(queryPart)
            if (params.get('primary')) setOverlapPrimaryId(params.get('primary'))
            if (params.get('secondary')) setOverlapSecondaryId(params.get('secondary'))
          }
        } catch (e) {}
        return
      }

      const validViews = ['explore', 'updates', 'my-exams', 'overlap', 'wizard', 'screener', 'analytics', 'cadres', 'compare', 'calendar', 'guide', 'coverage', 'feedback']
      if (validViews.includes(hash)) {
        setActiveView(hash)
        setShowOnlySaved(false)
        setDashboardEntered(true)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const goToView = useCallback((id) => {
    handleDashboardEnter()
    if (id === 'saved' || id === 'my-exams') {
      setActiveView('my-exams')
      setShowOnlySaved(false)
      window.location.hash = '#my-exams'
      return
    }
    setShowOnlySaved(false)
    setActiveView(id)
    window.location.hash = `#${id}`
  }, [handleDashboardEnter])

  const openSyllabusOverlap = useCallback((examOrId, comparatorId) => {
    const pId = typeof examOrId === 'string' ? examOrId : examOrId?.id
    if (pId) setOverlapPrimaryId(pId)
    if (comparatorId) setOverlapSecondaryId(comparatorId)
    setSelectedExam(null)
    goToView('overlap')
  }, [goToView])

  const openExamDetail = useCallback((exam) => {
    setSelectedExam(exam)
    if (exam?.id) {
      window.location.hash = `#exam/${exam.id}`
    }
  }, [])

  const closeExamDetail = useCallback(() => {
    setSelectedExam(null)
    window.location.hash = `#${activeView}`
  }, [activeView])

  const handleLogoClick = useCallback(() => {
    introKeyRef.current += 1
    setIntroKey(introKeyRef.current)
    setIntroMounted(true)
    setPageReleased(false)
    setDashboardEntered(false)
    setActiveView('explore')
    window.location.hash = '#explore'
    window.scrollTo(0, 0)
  }, [])

  // Memoized Filter Options
  const domains = useMemo(() => [...new Set(examsData.map(e => e.domain))].sort(), [])
  const levels = useMemo(() => [...new Set(examsData.map(e => e.level))].sort(), [])
  const frequencies = useMemo(() => [...new Set(examsData.map(e => e.frequency))].sort(), [])
  const states = useMemo(() => {
    const s = new Set(
      examsData
        .filter(e => e.jurisdiction === 'state' && e.state && e.state !== 'All India')
        .map(e => e.state)
    )
    return [...s].sort()
  }, [])

  const centralCount = useMemo(() => examsData.filter(e => e.jurisdiction === 'central').length, [])
  const stateCount = useMemo(() => examsData.filter(e => e.jurisdiction === 'state').length, [])
  // Was hardcoded "342" in ~8 places across the UI (Header, StatsOverview,
  // this file's own subtitle, WalkthroughTour, Feedback, UpdatesFeed) —
  // a one-time snapshot that silently went stale the moment an added exam
  // introduced a conducting body the snapshot had never seen. Computed
  // live here, same as totalExams, and threaded down as a prop. See
  // scripts/automation/derive-authorities.mjs, which keeps the fuller
  // src/data/authorities.json (used by UpdatesFeed's authority filter)
  // in sync with the same source data.
  const totalAuthorities = useMemo(() => new Set(examsData.map(e => e.conducting_body)).size, [])

  // Filtered & Sorted Exams
  const filteredExams = useMemo(() => {
    const result = examsData.filter(exam => {
      if (showOnlySaved && !bookmarks.includes(exam.id)) return false
      if (screenerFilteredIds && !screenerFilteredIds.includes(exam.id)) return false

      const q = searchQuery.toLowerCase().trim()
      const matchSearch = !q ||
        exam.name.toLowerCase().includes(q) ||
        exam.acronym.toLowerCase().includes(q) ||
        exam.description.toLowerCase().includes(q) ||
        exam.domain.toLowerCase().includes(q) ||
        exam.conducting_body.toLowerCase().includes(q) ||
        (exam.state && exam.state.toLowerCase().includes(q)) ||
        (exam.field && exam.field.some(f => f.toLowerCase().includes(q)))

      const matchDomain = !filters.domain || (
        filters.domain === 'Finance'
          ? (exam.domain === 'Finance' || exam.domain === 'Banking')
          : exam.domain === filters.domain
      )

      let matchLevel = true
      if (filters.level) {
        const sel = filters.level.toLowerCase()
        const combined = `${(exam.level || '').toLowerCase()} ${(exam.min_qualification || '').toLowerCase()}`
        if (sel === '10th') {
          matchLevel = combined.includes('10th') || combined.includes('matric') || combined.includes('secondary')
        } else if (sel === '12th') {
          matchLevel = combined.includes('12th') || combined.includes('intermediate') || combined.includes('undergraduate') || combined.includes('higher secondary')
        } else if (sel === 'diploma') {
          matchLevel = combined.includes('diploma') || combined.includes('iti') || combined.includes('polytechnic')
        } else if (sel === 'graduate') {
          matchLevel = combined.includes('graduate') || combined.includes('bachelor') || combined.includes('degree') || combined.includes('professional') || combined.includes('b.tech') || combined.includes('mbbs') || combined.includes('llb')
        } else if (sel === 'postgraduate') {
          matchLevel = combined.includes('postgraduate') || combined.includes('post graduate') || combined.includes('master') || combined.includes('pg') || combined.includes('m.tech') || combined.includes('md') || combined.includes('ms')
        } else if (sel === 'doctoral') {
          matchLevel = combined.includes('doctoral') || combined.includes('ph.d') || combined.includes('phd') || combined.includes('fellowship')
        } else {
          matchLevel = (exam.level || '').toLowerCase().includes(sel)
        }
      }
      const matchMode = !filters.exam_mode || exam.exam_mode.toLowerCase().includes(filters.exam_mode.toLowerCase())
      const matchFreq = !filters.frequency || exam.frequency === filters.frequency
      const matchType = !filters.track || exam.track === filters.track
      const matchJurisdiction = !filters.jurisdiction || exam.jurisdiction === filters.jurisdiction
      const matchState = !filters.state || exam.state === filters.state

      return matchSearch && matchDomain && matchLevel && matchMode && matchFreq && matchType && matchJurisdiction && matchState
    })

    // Sort result
    if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === 'domain') {
      result.sort((a, b) => a.domain.localeCompare(b.domain))
    } else if (sortBy === 'state') {
      result.sort((a, b) => (a.state || '').localeCompare(b.state || ''))
    } else {
      // Popularity default
      const popRank = { very_high: 3, high: 2, medium: 1, low: 0 }
      result.sort((a, b) => (popRank[b.popularity] || 0) - (popRank[a.popularity] || 0))
    }

    return result
  }, [searchQuery, filters, sortBy, showOnlySaved, bookmarks, screenerFilteredIds])

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredExams.slice(start, start + itemsPerPage)
  }, [filteredExams, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage)

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      domain: '',
      level: '',
      exam_mode: '',
      frequency: '',
      track: '',
      jurisdiction: '',
      state: '',
    })
    setScreenerFilteredIds(null)
    setSearchQuery('')
    setShowOnlySaved(false)
    setCurrentPage(1)
  }

  const handleApplyAnalyticsFilter = (key, value) => {
    if (key === 'conducting_body') {
      setSearchQuery(value)
    } else if (key === 'state') {
      setFilters(prev => ({ ...prev, jurisdiction: 'state', state: value }))
    } else if (key === 'jurisdiction') {
      setFilters(prev => ({ ...prev, jurisdiction: value, state: '' }))
    } else {
      setFilters(prev => ({ ...prev, [key]: value }))
    }
    setCurrentPage(1)
    goToView('explore')
  }

  const toggleCompare = (exam) => {
    setCompareList(prev => {
      if (prev.find(e => e.id === exam.id)) {
        return prev.filter(e => e.id !== exam.id)
      }
      if (prev.length >= 4) return prev
      return [...prev, exam]
    })
  }

  const removeFromCompare = (examId) => {
    setCompareList(prev => prev.filter(e => e.id !== examId))
  }

  const activeFilters = Object.entries(filters).filter(([, v]) => v)

  return (
    <ErrorBoundary>
      {introMounted && (
        <ColdBootIntro
          key={introKey}
          onRelease={handleIntroRelease}
          onComplete={handleIntroComplete}
        />
      )}

      <Header
        activeView={activeView}
        setActiveView={goToView}
        totalExams={examsData.length}
        totalAuthorities={totalAuthorities}
        compareCount={compareList.length}
        bookmarkCount={bookmarks.length}
        onLogoClick={handleLogoClick}
        theme={theme}
        setTheme={setTheme}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* M-Terminal Live Gazette Ticker Strip */}
      <NewsTicker setActiveView={goToView} />

      <main className={`main-content${pageReleased ? '' : ' app-waiting'}`}>
        {!dashboardEntered ? (
          <StoryGate exams={examsData} onEnter={handleDashboardEnter} />
        ) : (
          <Suspense fallback={<ViewLoadingFallback />}>
            {/* Tab 1: Statutory Gazette & Examination Wire */}
            {activeView === 'updates' && (
              <div className="fade-in">
                <UpdatesFeed
                  exams={examsData}
                  onViewDetails={openExamDetail}
                />
              </div>
            )}

            {/* Tab 2: Candidate Command Center & Active Radar */}
            {(activeView === 'my-exams' || activeView === 'saved') && (
              <div className="fade-in">
                <MyDashboard
                  exams={examsData}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                  onViewDetails={openExamDetail}
                  onToggleCompare={toggleCompare}
                  compareList={compareList}
                  setActiveView={goToView}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  currentUser={currentUser}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                />
              </div>
            )}

            {/* Syllabus Overlap Engine - Under Scheduled Maintenance */}
            {activeView === 'overlap' && (
              <div className="workstation-container fade-in" style={{ padding: '4.5rem 1.5rem', textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#f59e0b',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  letterSpacing: '0.08em'
                }}>
                  <span className="live-signal-dot" style={{ background: '#f59e0b', boxShadow: '0 0 8px #f59e0b' }} />
                  MODULE UNDER SCHEDULED MAINTENANCE &amp; CALIBRATION
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--fg)' }}>
                  Syllabus Overlap Engine Under Refinement
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                  We are currently upgrading the cross-exam syllabus ontology, micro-topic crosswalks, and paper-by-paper stage calibration across all {examsData.length} Central and State examinations. This module is undergoing comprehensive enhancement and will return in an upcoming release.
                </p>
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={() => goToView('explore')} style={{ padding: '10px 22px' }}>
                    Return to Examination Registry
                  </button>
                  <button className="btn-secondary" onClick={() => goToView('my-exams')} style={{ padding: '10px 22px' }}>
                    Go to Candidate Radar
                  </button>
                </div>
              </div>
            )}

            {/* Recommendation Wizard */}
            {activeView === 'wizard' && (
              <div className="fade-in">
                <ExamWizard
                  exams={examsData}
                  states={states}
                  onSelectExam={openExamDetail}
                  onToggleCompare={toggleCompare}
                  compareList={compareList}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                />
              </div>
            )}

            {/* Eligibility Screener */}
            {activeView === 'screener' && (
              <div className="fade-in">
                <EligibilityScreener
                  exams={examsData}
                  onViewDetails={openExamDetail}
                  onApplyFilter={(eligibleIds) => {
                    setScreenerFilteredIds(eligibleIds)
                    goToView('explore')
                  }}
                />
              </div>
            )}

            {/* Explore View (Cards / List / Search / Filters) */}
            {activeView === 'explore' && (
              <div className="fade-in">
                <div className="workstation-header">
                  <div className="workstation-kicker">
                    <span className="live-pulse-dot" />
                    <span>CENTRAL & STATE STATUTORY RECRUITMENT REGISTRY</span>
                  </div>
                  <h1 className="workstation-title">{examsData.length} Indian Government Exams</h1>
                  <p className="workstation-subtitle">
                    Official statutory repository across {totalAuthorities} commissions, verified gazette cycles, 7th CPC cadres, and downloadable vector dossiers.
                  </p>
                </div>
                <StatsOverview exams={examsData} countUp={pageReleased} />
                <SearchFilter
                  searchQuery={searchQuery}
                  setSearchQuery={(q) => { setSearchQuery(q); setCurrentPage(1) }}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  clearFilters={clearFilters}
                  activeFilters={activeFilters}
                  domains={domains}
                  levels={levels}
                  frequencies={frequencies}
                  states={states}
                  centralCount={centralCount}
                  stateCount={stateCount}
                  resultCount={filteredExams.length}
                  totalCount={examsData.length}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  showOnlySaved={showOnlySaved}
                  setShowOnlySaved={setShowOnlySaved}
                  savedCount={bookmarks.length}
                  allExams={examsData}
                  onSelectExam={openExamDetail}
                  screenerActive={!!screenerFilteredIds}
                  onClearScreener={() => setScreenerFilteredIds(null)}
                />
                <ExamGrid
                  exams={paginatedExams}
                  compareList={compareList}
                  toggleCompare={toggleCompare}
                  onViewDetails={openExamDetail}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  viewMode={viewMode}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  bookmarks={bookmarks}
                  onToggleBookmark={toggleBookmark}
                />
              </div>
            )}

            {/* Analytics Dashboard */}
            {(activeView === 'analytics' || activeView === 'dashboard') && (
              <div className="fade-in">
                <StatsOverview exams={examsData} countUp={pageReleased} />
                <Analytics exams={examsData} onApplyFilter={handleApplyAnalyticsFilter} />
              </div>
            )}

            {/* Govt Grades Guide */}
            {activeView === 'cadres' && (
              <div className="fade-in">
                <GovtGradesGuide
                  setActiveView={goToView}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            )}

            {/* Comparison Tool */}
            {activeView === 'compare' && (
              <div className="fade-in">
                <ComparisonTool
                  compareList={compareList}
                  removeFromCompare={removeFromCompare}
                />
              </div>
            )}

            {/* Annual Calendar */}
            {activeView === 'calendar' && (
              <div className="fade-in">
                <CalendarView exams={examsData} onViewDetails={openExamDetail} />
              </div>
            )}

            {/* How to Use Full Page */}
            {activeView === 'guide' && (
              <div className="fade-in">
                <HowToUse
                  setActiveView={goToView}
                  setFilters={setFilters}
                  setSearchQuery={setSearchQuery}
                  totalExams={examsData.length}
                />
              </div>
            )}

            {/* Coverage & Method */}
            {activeView === 'coverage' && (
              <div className="fade-in">
                <CoverageMethod exams={examsData} setActiveView={goToView} />
              </div>
            )}

            {/* Feedback & Support Desk */}
            {activeView === 'feedback' && (
              <div className="fade-in">
                <Feedback
                  exams={examsData}
                  onBackToExplore={() => goToView('explore')}
                />
              </div>
            )}
          </Suspense>
        )}
      </main>

      {/* Guide Modal when opened from header 'Guide' button */}
      {isGuideOpen && (
        <Suspense fallback={null}>
          <div className="modal-overlay" onClick={() => setIsGuideOpen(false)}>
            <div className="modal-content guide-modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsGuideOpen(false)} aria-label="Close guide">✕</button>
              <HowToUse
                setActiveView={(v) => { setIsGuideOpen(false); goToView(v) }}
                setFilters={setFilters}
                setSearchQuery={setSearchQuery}
                totalExams={examsData.length}
              />
            </div>
          </div>
        </Suspense>
      )}

      {/* Exam Detail Modal */}
      {selectedExam && (
        <Suspense fallback={null}>
          <ExamDetail
            exam={selectedExam}
            allExams={examsData}
            onSelectExam={openExamDetail}
            onClose={closeExamDetail}
          />
        </Suspense>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={showOnlySaved ? 'saved' : activeView}
        setActiveView={goToView}
        compareCount={compareList.length}
        bookmarkCount={bookmarks.length}
      />

      {/* Command Palette (Ctrl+K / ⌘K) — mounted only while open. The
          Cmd+K keyboard listener lives in this file (see the effect near
          the top), not inside CommandPalette itself, so it still opens
          on the shortcut even though the component isn't in the tree
          until then. */}
      {isCommandPaletteOpen && (
        <Suspense fallback={null}>
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            allExams={examsData}
            onSelectExam={openExamDetail}
            setActiveView={goToView}
            theme={theme}
            setTheme={setTheme}
            clearFilters={clearFilters}
            onOpenOverlap={openSyllabusOverlap}
          />
        </Suspense>
      )}

      {/* Interactive Feature Walkthrough Tour Overlay */}
      {isTourOpen && (
        <Suspense fallback={null}>
          <WalkthroughTour
            isOpen={isTourOpen}
            onClose={() => setIsTourOpen(false)}
            activeView={activeView}
            setActiveView={goToView}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            totalExams={examsData.length}
            totalAuthorities={totalAuthorities}
            centralCount={centralCount}
            stateCount={stateCount}
          />
        </Suspense>
      )}

      {/* Site-Wide Aspirant Account & Vault Modal */}
      {isAuthModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            bookmarks={bookmarks}
            todoList={todoList}
            exams={examsData}
          />
        </Suspense>
      )}
    </ErrorBoundary>
  )
}

export default App
