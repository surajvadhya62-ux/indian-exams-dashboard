import { useState, useMemo } from 'react'
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
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        totalExams={examsData.length}
        compareCount={compareList.length}
      />

      <main className="main-content">
        {activeView === 'dashboard' && (
          <div className="fade-in">
            <StatsOverview exams={examsData} />
            <Analytics exams={examsData} />
          </div>
        )}

        {activeView === 'explore' && (
          <div className="fade-in">
            <StatsOverview exams={examsData} />
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

        {activeView === 'analytics' && (
          <div className="fade-in">
            <Analytics exams={examsData} fullView />
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
