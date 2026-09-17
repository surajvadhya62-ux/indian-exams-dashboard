import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import './index.css'
import examsData from './data/exams.json'
import Header from './components/Header'
import StatsOverview from './components/StatsOverview'
import SearchFilter from './components/SearchFilter'
import ExamGrid from './components/ExamGrid'
import Analytics from './components/Analytics'
import ComparisonTool from './components/ComparisonTool'
import CalendarView from './components/CalendarView'
import ExamDetail from './components/ExamDetail'
import GovtGradesGuide from './components/GovtGradesGuide'
import HowToUse from './components/HowToUse'
import ColdBootIntro from './components/ColdBootIntro'
import StoryGate from './components/StoryGate'
import ExamWizard from './components/ExamWizard'
import MobileNav from './components/MobileNav'
import ErrorBoundary from './components/ErrorBoundary'

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
    exam_type: '',
    jurisdiction: '',
    state: '',
  })
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState('grid')
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [showOnlySaved, setShowOnlySaved] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)

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

      if (hash === 'saved') {
        setActiveView('explore')
        setShowOnlySaved(true)
        setDashboardEntered(true)
        return
      }

      const validViews = ['explore', 'wizard', 'analytics', 'cadres', 'compare', 'calendar', 'guide']
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
    if (id === 'saved') {
      setActiveView('explore')
      setShowOnlySaved(true)
      window.location.hash = '#saved'
      return
    }
    setShowOnlySaved(false)
    setActiveView(id)
    window.location.hash = `#${id}`
  }, [handleDashboardEnter])

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

  // Filtered & Sorted Exams
  const filteredExams = useMemo(() => {
    const result = examsData.filter(exam => {
      if (showOnlySaved && !bookmarks.includes(exam.id)) return false

      const q = searchQuery.toLowerCase().trim()
      const matchSearch = !q ||
        exam.name.toLowerCase().includes(q) ||
        exam.acronym.toLowerCase().includes(q) ||
        exam.description.toLowerCase().includes(q) ||
        exam.domain.toLowerCase().includes(q) ||
        exam.conducting_body.toLowerCase().includes(q) ||
        (exam.state && exam.state.toLowerCase().includes(q)) ||
        (exam.field && exam.field.some(f => f.toLowerCase().includes(q)))

      const matchDomain = !filters.domain || exam.domain === filters.domain
      const matchLevel = !filters.level || exam.level === filters.level
      const matchMode = !filters.exam_mode || exam.exam_mode.toLowerCase().includes(filters.exam_mode.toLowerCase())
      const matchFreq = !filters.frequency || exam.frequency === filters.frequency
      const matchType = !filters.exam_type || exam.exam_type === filters.exam_type
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
  }, [searchQuery, filters, sortBy, showOnlySaved, bookmarks])

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
    setFilters({ domain: '', level: '', exam_mode: '', frequency: '', exam_type: '', jurisdiction: '', state: '' })
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
        compareCount={compareList.length}
        bookmarkCount={bookmarks.length}
        onLogoClick={handleLogoClick}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className={`main-content${pageReleased ? '' : ' app-waiting'}`}>
        {!dashboardEntered ? (
          <StoryGate exams={examsData} onEnter={handleDashboardEnter} />
        ) : (
          <>
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

            {/* Explore View (Cards / List / Search / Filters) */}
            {activeView === 'explore' && (
              <div className="fade-in">
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
          </>
        )}
      </main>

      {/* Guide Modal when opened from header 'Guide' button */}
      {isGuideOpen && (
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
      )}

      {/* Exam Detail Modal */}
      {selectedExam && (
        <ExamDetail
          exam={selectedExam}
          allExams={examsData}
          onSelectExam={openExamDetail}
          onClose={closeExamDetail}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeView={showOnlySaved ? 'saved' : activeView}
        setActiveView={goToView}
        compareCount={compareList.length}
        bookmarkCount={bookmarks.length}
      />
    </ErrorBoundary>
  )
}

export default App
