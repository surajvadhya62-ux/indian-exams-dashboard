import { useState, useMemo, useCallback, useRef } from 'react'
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

/* The opening sequence plays on every load, except for visitors who
   have asked for reduced motion — ?intro=1 forces it to play even
   then, so it stays reviewable. matchMedia can throw in odd
   environments, so the check is guarded. */
function shouldSkipIntro() {
  try {
    if (new URLSearchParams(window.location.search).get('intro') === '1') return false
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true
    }
  } catch {
    /* matchMedia blocked — fall through and play the intro */
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
  const [compareList, setCompareList] = useState([])
  const [selectedExam, setSelectedExam] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  /* introMounted keeps the overlay alive through its own exit;
     pageReleased is flipped earlier, so the page rises while the
     iris is still closing instead of after it. dashboardEntered
     gates the story gate vs. the real dashboard content — it's only
     ever pre-set true for reduced-motion visitors, who skip both. */
  const [introMounted, setIntroMounted] = useState(() => !shouldSkipIntro())
  const [pageReleased, setPageReleased] = useState(() => shouldSkipIntro())
  const [dashboardEntered, setDashboardEntered] = useState(() => shouldSkipIntro())

  /* Used to give ColdBootIntro a fresh key so React fully remounts it on replay */
  const introKeyRef = useRef(0)
  const [introKey, setIntroKey] = useState(0)

  const handleIntroRelease = useCallback(() => {
    setPageReleased(true)
  }, [])

  const handleIntroComplete = useCallback(() => setIntroMounted(false), [])

  const handleDashboardEnter = useCallback(() => {
    setDashboardEntered(true)
  }, [])

  /* All views dismiss the StoryGate and enter the requested dashboard view */
  const DASHBOARD_VIEWS = ['explore', 'analytics', 'dashboard', 'guide', 'cadres', 'compare', 'calendar']

  const goToView = useCallback((id) => {
    /* If the StoryGate is still showing, dismiss it for any view navigation */
    if (DASHBOARD_VIEWS.includes(id)) {
      handleDashboardEnter()
    }
    setActiveView(id)
  }, [handleDashboardEnter])

  /* Clicking the IndiaExams logo replays the cold-boot intro and re-shows StoryGate */
  const handleLogoClick = useCallback(() => {
    introKeyRef.current += 1
    setIntroKey(introKeyRef.current)
    setIntroMounted(true)
    setPageReleased(false)
    setDashboardEntered(false)
    setActiveView('explore')
    window.scrollTo(0, 0)
  }, [])

  const filteredExams = useMemo(() => {
    return examsData.filter(exam => {
      const q = searchQuery.toLowerCase()
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
  }, [searchQuery, filters])

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredExams.slice(start, start + itemsPerPage)
  }, [filteredExams, currentPage])

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage)

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({ domain: '', level: '', exam_mode: '', frequency: '', exam_type: '', jurisdiction: '', state: '' })
    setSearchQuery('')
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
    setActiveView('explore')
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

  const getDomains = () => [...new Set(examsData.map(e => e.domain))].sort()
  const getLevels = () => [...new Set(examsData.map(e => e.level))].sort()
  const getFrequencies = () => [...new Set(examsData.map(e => e.frequency))].sort()
  const getStates = () => {
    const s = new Set(
      examsData
        .filter(e => e.jurisdiction === 'state' && e.state && e.state !== 'All India')
        .map(e => e.state)
    )
    return [...s].sort()
  }

  const centralCount = useMemo(() => examsData.filter(e => e.jurisdiction === 'central').length, [])
  const stateCount = useMemo(() => examsData.filter(e => e.jurisdiction === 'state').length, [])

  const activeFilters = Object.entries(filters).filter(([, v]) => v)

  return (
    <>
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
        onLogoClick={handleLogoClick}
      />

      <main className={`main-content${pageReleased ? '' : ' app-waiting'}`}>
        {!dashboardEntered ? (
          <StoryGate exams={examsData} onEnter={handleDashboardEnter} />
        ) : (
        <>
        {activeView === 'guide' && (
          <div className="fade-in">
            <HowToUse
              setActiveView={setActiveView}
              setFilters={setFilters}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

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
              domains={getDomains()}
              levels={getLevels()}
              frequencies={getFrequencies()}
              states={getStates()}
              centralCount={centralCount}
              stateCount={stateCount}
              resultCount={filteredExams.length}
              totalCount={examsData.length}
            />
            <ExamGrid
              exams={paginatedExams}
              compareList={compareList}
              toggleCompare={toggleCompare}
              onViewDetails={setSelectedExam}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}

        {(activeView === 'analytics' || activeView === 'dashboard') && (
          <div className="fade-in">
            <StatsOverview exams={examsData} countUp={pageReleased} />
            <Analytics exams={examsData} onApplyFilter={handleApplyAnalyticsFilter} />
          </div>
        )}

        {activeView === 'cadres' && (
          <div className="fade-in">
            <GovtGradesGuide
              setActiveView={setActiveView}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {activeView === 'compare' && (
          <div className="fade-in">
            <ComparisonTool
              compareList={compareList}
              removeFromCompare={removeFromCompare}
            />
          </div>
        )}

        {activeView === 'calendar' && (
          <div className="fade-in">
            <CalendarView exams={examsData} onViewDetails={setSelectedExam} />
          </div>
        )}
        </>
        )}
      </main>

      {selectedExam && (
        <ExamDetail
          exam={selectedExam}
          onClose={() => setSelectedExam(null)}
        />
      )}
    </>
  )
}

export default App
