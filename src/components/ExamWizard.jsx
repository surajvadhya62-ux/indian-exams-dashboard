import { useState, useMemo } from 'react'
import {
  HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineLocationMarker,
  HiOutlineBriefcase, HiOutlineArrowRight, HiOutlineRefresh,
  HiOutlineCheck, HiOutlineSearch, HiOutlineFilter, HiOutlineX,
  HiOutlineFolder, HiOutlineSortDescending
} from 'react-icons/hi'
import ExamCard from './ExamCard'

const QUALIFICATIONS = [
  { id: '10th', label: '10th / Secondary Pass', desc: 'SSLC, Matriculation, Technical trades & GD posts' },
  { id: '12th', label: '10+2 / Higher Secondary', desc: 'Intermediate, Science, Arts, Commerce & NDA/Clerical' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Engineering & Technical diplomas, JE & Supervisor cadres' },
  { id: 'graduate', label: "Bachelor's / Graduate Degree", desc: 'BA, BSc, BCom, BTech, BBA, any statutory discipline' },
  { id: 'postgraduate', label: "Master's / Post-Graduate", desc: 'MA, MSc, MCom, MTech, MBA, MCA, Research & Lectureship' },
  { id: 'professional', label: 'Professional Degree', desc: 'MBBS, BDS, LLB, CA, ICWA, B.Ed, Specialized Services' },
]

export default function ExamWizard({ exams, states, onSelectExam, onToggleCompare, compareList, bookmarks, onToggleBookmark }) {
  const [step, setStep] = useState(1)
  const [qualification, setQualification] = useState('')
  const [jurisdiction, setJurisdiction] = useState('') // 'central', 'state', or 'all'
  const [selectedState, setSelectedState] = useState('')
  const [purpose, setPurpose] = useState('') // 'job', 'entrance', or 'any'
  const [wizardDomain, setWizardDomain] = useState('') // '' for all domains

  // Interactive filters on the results view
  const [filterSearch, setFilterSearch] = useState('')
  const [filterDomain, setFilterDomain] = useState('')
  const [filterMode, setFilterMode] = useState('')
  const [filterSort, setFilterSort] = useState('popularity')

  // Step 1-4 Filtered Recommendations
  const filteredExams = useMemo(() => {
    if (!qualification && !jurisdiction && !purpose) return []

    return exams.filter(exam => {
      // 1. Purpose filter
      if (purpose && purpose !== 'any') {
        if (exam.exam_type !== purpose) return false
      }

      // 2. Jurisdiction / State filter
      if (jurisdiction === 'central') {
        if (exam.jurisdiction !== 'central') return false
      } else if (jurisdiction === 'state') {
        if (exam.jurisdiction !== 'state') return false
        if (selectedState && exam.state !== selectedState && exam.state !== 'All India') return false
      }

      // 3. Domain filter from Wizard Step 4
      if (wizardDomain && exam.domain !== wizardDomain) {
        return false
      }

      // 4. Qualification filter (heuristic match against min_qualification and level)
      if (qualification) {
        const qStr = (exam.min_qualification || '').toLowerCase()
        const lvl = (exam.level || '').toLowerCase()

        if (qualification === '10th') {
          const match = qStr.includes('10th') || qStr.includes('matric') || qStr.includes('secondary') || lvl.includes('secondary')
          if (!match) return false
        } else if (qualification === '12th') {
          const match = qStr.includes('12th') || qStr.includes('10+2') || qStr.includes('intermediate') || lvl.includes('undergraduate') || lvl.includes('secondary')
          if (!match && !qStr.includes('10th')) return false
        } else if (qualification === 'diploma') {
          const match = qStr.includes('diploma') || qStr.includes('polytechnic') || qStr.includes('10+2')
          if (!match) return false
        } else if (qualification === 'graduate') {
          // Graduate qualifies for 10th, 12th, and graduate jobs
          const isPostGradOnly = qStr.includes('post graduate') || qStr.includes('master') || lvl.includes('postgraduate')
          if (isPostGradOnly && !qStr.includes('bachelor') && !qStr.includes('graduate')) return false
        } else if (qualification === 'postgraduate') {
          // PG qualifies for most
        } else if (qualification === 'professional') {
          const match = qStr.includes('mbbs') || qStr.includes('law') || qStr.includes('llb') || qStr.includes('b.tech') || qStr.includes('engineering') || qStr.includes('professional') || qStr.includes('bachelor')
          if (!match && !qStr.includes('graduate')) return false
        }
      }

      return true
    })
  }, [exams, qualification, jurisdiction, selectedState, purpose, wizardDomain])

  // Available domains within the recommendations
  const availableDomains = useMemo(() => {
    const counts = {}
    for (const e of filteredExams) {
      if (e.domain) {
        counts[e.domain] = (counts[e.domain] || 0) + 1
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [filteredExams])

  // Secondary interactive filtered exams on results screen
  const displayedExams = useMemo(() => {
    return filteredExams
      .filter(exam => {
        // Domain filter on results
        if (filterDomain && exam.domain !== filterDomain) {
          return false
        }
        // Exam mode filter
        if (filterMode) {
          const m = (exam.exam_mode || '').toLowerCase()
          if (!m.includes(filterMode.toLowerCase())) return false
        }
        // Search query
        if (filterSearch.trim()) {
          const q = filterSearch.toLowerCase().trim()
          const match =
            exam.name.toLowerCase().includes(q) ||
            exam.acronym.toLowerCase().includes(q) ||
            exam.conducting_body.toLowerCase().includes(q) ||
            (exam.domain && exam.domain.toLowerCase().includes(q)) ||
            (exam.target_role && exam.target_role.toLowerCase().includes(q))
          if (!match) return false
        }
        return true
      })
      .sort((a, b) => {
        if (filterSort === 'name_asc') {
          return a.name.localeCompare(b.name)
        } else if (filterSort === 'name_desc') {
          return b.name.localeCompare(a.name)
        } else if (filterSort === 'domain') {
          return a.domain.localeCompare(b.domain)
        }
        // Default: popularity
        const popRank = { very_high: 3, high: 2, medium: 1, low: 0 }
        return (popRank[b.popularity] || 0) - (popRank[a.popularity] || 0)
      })
  }, [filteredExams, filterDomain, filterMode, filterSearch, filterSort])

  const hasActiveSecondaryFilters = Boolean(filterDomain || filterMode || filterSearch.trim() || filterSort !== 'popularity')

  const clearSecondaryFilters = () => {
    setFilterDomain('')
    setFilterMode('')
    setFilterSearch('')
    setFilterSort('popularity')
  }

  const resetWizard = () => {
    setStep(1)
    setQualification('')
    setJurisdiction('')
    setSelectedState('')
    setPurpose('')
    setWizardDomain('')
    clearSecondaryFilters()
  }

  return (
    <div className="wizard-container slide-up">
      <div className="wizard-header">
        <div className="wizard-badge">
          <HiOutlineSparkles /> EXAM RECOMMENDATION WIZARD
        </div>
        <h2 className="wizard-title">Find Your Ideal Examination Pathway</h2>
        <p className="wizard-subtitle">
          Filter through 500+ statutory examinations across qualification, jurisdiction, career stream, and recruitment purpose.
        </p>

        {/* Progress Indicator */}
        <div className="wizard-steps-indicator">
          <div className={`wizard-step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-name">Qualification</span>
          </div>
          <div className="wizard-step-line" />
          <div className={`wizard-step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-name">Jurisdiction</span>
          </div>
          <div className="wizard-step-line" />
          <div className={`wizard-step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-name">Goal</span>
          </div>
          <div className="wizard-step-line" />
          <div className={`wizard-step-node ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
            <span className="step-num">4</span>
            <span className="step-name">Stream</span>
          </div>
          <div className="wizard-step-line" />
          <div className={`wizard-step-node ${step >= 5 ? 'active' : ''}`}>
            <span className="step-num">5</span>
            <span className="step-name">Matches</span>
          </div>
        </div>
      </div>

      {/* Step 1: Qualification */}
      {step === 1 && (
        <div className="wizard-card-step">
          <h3 className="step-prompt">
            <HiOutlineAcademicCap className="prompt-icon" /> What is your highest educational qualification?
          </h3>
          <div className="wizard-options-grid">
            {QUALIFICATIONS.map(q => (
              <button
                key={q.id}
                className={`wizard-opt-btn ${qualification === q.id ? 'selected' : ''}`}
                onClick={() => {
                  setQualification(q.id)
                  setStep(2)
                }}
              >
                <div className="opt-title">{q.label}</div>
                <div className="opt-desc">{q.desc}</div>
                {qualification === q.id && <HiOutlineCheck className="opt-check" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Jurisdiction */}
      {step === 2 && (
        <div className="wizard-card-step">
          <h3 className="step-prompt">
            <HiOutlineLocationMarker className="prompt-icon" /> What is your geographic and administrative preference?
          </h3>
          <div className="wizard-options-grid three-col">
            <button
              className={`wizard-opt-btn ${jurisdiction === 'central' ? 'selected' : ''}`}
              onClick={() => {
                setJurisdiction('central')
                setSelectedState('')
                setStep(3)
              }}
            >
              <div className="opt-emoji">🇮🇳</div>
              <div className="opt-title">Central & All-India</div>
              <div className="opt-desc">UPSC, SSC, Railways, Defence, National Entrance & Central Banks</div>
            </button>

            <button
              className={`wizard-opt-btn ${jurisdiction === 'state' ? 'selected' : ''}`}
              onClick={() => setJurisdiction('state')}
            >
              <div className="opt-emoji">🏛️</div>
              <div className="opt-title">State Government</div>
              <div className="opt-desc">State Public Service Commissions (PSCs) & Subordinate Selection Boards</div>
            </button>

            <button
              className={`wizard-opt-btn ${jurisdiction === 'all' ? 'selected' : ''}`}
              onClick={() => {
                setJurisdiction('all')
                setSelectedState('')
                setStep(3)
              }}
            >
              <div className="opt-emoji">🌐</div>
              <div className="opt-title">All Examinations</div>
              <div className="opt-desc">Include both Central statutory boards & all 28 State ecosystems</div>
            </button>
          </div>

          {jurisdiction === 'state' && (
            <div className="wizard-state-selector slide-up">
              <label htmlFor="wizard-state-select">Choose your State or Union Territory:</label>
              <select
                id="wizard-state-select"
                className="state-dropdown"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value)
                  if (e.target.value) setStep(3)
                }}
              >
                <option value="">-- Choose State / Union Territory --</option>
                {states.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <div className="wizard-nav-btns">
            <button className="wizard-back-btn" onClick={() => setStep(1)}>← Back</button>
            {jurisdiction && (jurisdiction !== 'state' || selectedState) && (
              <button className="wizard-next-btn" onClick={() => setStep(3)}>Next Step →</button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Career Goal */}
      {step === 3 && (
        <div className="wizard-card-step">
          <h3 className="step-prompt">
            <HiOutlineBriefcase className="prompt-icon" /> What is your primary examination goal?
          </h3>
          <div className="wizard-options-grid three-col">
            <button
              className={`wizard-opt-btn ${purpose === 'job' ? 'selected' : ''}`}
              onClick={() => {
                setPurpose('job')
                setStep(4)
              }}
            >
              <div className="opt-emoji">💼</div>
              <div className="opt-title">Government Job</div>
              <div className="opt-desc">Direct statutory recruitment for Gazetted, Officer, or Subordinate Cadres</div>
            </button>

            <button
              className={`wizard-opt-btn ${purpose === 'entrance' ? 'selected' : ''}`}
              onClick={() => {
                setPurpose('entrance')
                setStep(4)
              }}
            >
              <div className="opt-emoji">🎓</div>
              <div className="opt-title">Higher Education</div>
              <div className="opt-desc">Admission entrance exams (JEE, NEET, GATE, CAT, CUET, CLAT)</div>
            </button>

            <button
              className={`wizard-opt-btn ${purpose === 'any' ? 'selected' : ''}`}
              onClick={() => {
                setPurpose('any')
                setStep(4)
              }}
            >
              <div className="opt-emoji">✨</div>
              <div className="opt-title">Show All Pathways</div>
              <div className="opt-desc">Explore both job recruitment tests & academic admissions</div>
            </button>
          </div>

          <div className="wizard-nav-btns">
            <button className="wizard-back-btn" onClick={() => setStep(2)}>← Back</button>
          </div>
        </div>
      )}

      {/* Step 4: Stream / Domain Focus Filter */}
      {step === 4 && (
        <div className="wizard-card-step">
          <h3 className="step-prompt">
            <HiOutlineFolder className="prompt-icon" /> Filter by Career Domain or Discipline
          </h3>
          <p className="step-subtext" style={{ marginBottom: '1.25rem', color: 'var(--muted)', fontSize: '0.88rem' }}>
            Choose a specific stream to narrow down your pathway, or select &quot;All Career Streams&quot; to see all matching opportunities.
          </p>

          <div className="wizard-options-grid">
            <button
              className={`wizard-opt-btn ${wizardDomain === '' ? 'selected' : ''}`}
              onClick={() => {
                setWizardDomain('')
                setStep(5)
              }}
            >
              <div className="opt-title">🌐 All Career Streams ({filteredExams.length})</div>
              <div className="opt-desc">Include all qualifying disciplines without restriction</div>
              {wizardDomain === '' && <HiOutlineCheck className="opt-check" />}
            </button>

            {availableDomains.slice(0, 7).map(([dom, count]) => (
              <button
                key={dom}
                className={`wizard-opt-btn ${wizardDomain === dom ? 'selected' : ''}`}
                onClick={() => {
                  setWizardDomain(dom)
                  setStep(5)
                }}
              >
                <div className="opt-title">{dom} ({count})</div>
                <div className="opt-desc">Specialized examinations within {dom}</div>
                {wizardDomain === dom && <HiOutlineCheck className="opt-check" />}
              </button>
            ))}
          </div>

          <div className="wizard-nav-btns" style={{ marginTop: '1.5rem' }}>
            <button className="wizard-back-btn" onClick={() => setStep(3)}>← Back</button>
            <button
              className="wizard-next-btn"
              onClick={() => {
                setWizardDomain('')
                setStep(5)
              }}
            >
              Show All Matches ({filteredExams.length}) →
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Results View with Interactive Filter Toolbar */}
      {step === 5 && (
        <div className="wizard-results-section slide-up">
          <div className="wizard-results-bar">
            <div>
              <h3 className="results-count-title">
                Found <span className="highlight-amber">{filteredExams.length}</span> Curated Recommendation{filteredExams.length !== 1 ? 's' : ''}
              </h3>
              <p className="results-filters-summary">
                Profile: <strong>{QUALIFICATIONS.find(q => q.id === qualification)?.label}</strong> ·{' '}
                <strong>{jurisdiction === 'central' ? 'Central Services' : jurisdiction === 'state' ? (selectedState || 'State PSCs') : 'All Jurisdictions'}</strong> ·{' '}
                <strong>{purpose === 'job' ? 'Government Jobs' : purpose === 'entrance' ? 'Entrance Exams' : 'Jobs & Entrance'}</strong>
                {wizardDomain && <> · Stream: <strong>{wizardDomain}</strong></>}
              </p>
            </div>
            <button className="wizard-reset-btn" onClick={resetWizard}>
              <HiOutlineRefresh /> Change Answers
            </button>
          </div>

          {/* Interactive Results Filter Toolbar */}
          <div className="wizard-filter-toolbar">
            <div className="wizard-search-box">
              <HiOutlineSearch className="wizard-search-icon" />
              <input
                type="text"
                className="wizard-search-input"
                placeholder="Search within recommendations (e.g. UPSC, Inspector, Specialist)..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
              {filterSearch && (
                <button
                  className="wizard-search-clear"
                  onClick={() => setFilterSearch('')}
                  title="Clear search"
                >
                  <HiOutlineX />
                </button>
              )}
            </div>

            <div className="wizard-filter-dropdowns">
              {/* Domain Filter Dropdown */}
              <div className="wizard-select-wrapper">
                <select
                  className="wizard-filter-select"
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                >
                  <option value="">All Career Streams ({filteredExams.length})</option>
                  {availableDomains.map(([dom, count]) => (
                    <option key={dom} value={dom}>{dom} ({count})</option>
                  ))}
                </select>
              </div>

              {/* Mode Filter Dropdown */}
              <div className="wizard-select-wrapper">
                <select
                  className="wizard-filter-select"
                  value={filterMode}
                  onChange={(e) => setFilterMode(e.target.value)}
                >
                  <option value="">All Exam Modes</option>
                  <option value="Online">Online / CBT</option>
                  <option value="Offline">Offline / OMR</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="wizard-select-wrapper">
                <select
                  className="wizard-filter-select"
                  value={filterSort}
                  onChange={(e) => setFilterSort(e.target.value)}
                >
                  <option value="popularity">🔥 Highest Popularity</option>
                  <option value="name_asc">🔤 Title (A - Z)</option>
                  <option value="name_desc">🔤 Title (Z - A)</option>
                  <option value="domain">📁 Career Stream</option>
                </select>
              </div>

              {hasActiveSecondaryFilters && (
                <button className="wizard-filter-clear-btn" onClick={clearSecondaryFilters}>
                  <HiOutlineX /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Quick Domain Filter Ribbon */}
          {availableDomains.length > 1 && (
            <div className="wizard-domain-pills-row">
              <button
                className={`wizard-domain-pill ${filterDomain === '' ? 'active' : ''}`}
                onClick={() => setFilterDomain('')}
              >
                All Streams ({filteredExams.length})
              </button>
              {availableDomains.map(([dom, count]) => (
                <button
                  key={dom}
                  className={`wizard-domain-pill ${filterDomain === dom ? 'active' : ''}`}
                  onClick={() => setFilterDomain(filterDomain === dom ? '' : dom)}
                >
                  {dom} <span className="pill-badge">{count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Results Counter / Filter Indicator */}
          <div className="wizard-count-indicator">
            <span>
              Showing <strong>{displayedExams.length}</strong> of <strong>{filteredExams.length}</strong> matching examinations
            </span>
            {hasActiveSecondaryFilters && (
              <span className="filter-active-note">
                (Filtered by {filterDomain ? `Stream: ${filterDomain}` : ''}{filterMode ? ` Mode: ${filterMode}` : ''}{filterSearch ? ` Query: "${filterSearch}"` : ''})
              </span>
            )}
          </div>

          {displayedExams.length === 0 ? (
            <div className="no-results" style={{ margin: '2rem 0' }}>
              <div className="no-results-icon">🔍</div>
              <h3>No matching examinations found</h3>
              <p>No exams match the specific keywords or stream filter you selected within this recommendation set.</p>
              <button className="wizard-reset-btn" onClick={clearSecondaryFilters} style={{ margin: '1rem auto' }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="exam-grid" style={{ marginTop: '1.25rem' }}>
              {displayedExams.map((exam, i) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  isComparing={compareList.some(e => e.id === exam.id)}
                  onToggleCompare={() => onToggleCompare(exam)}
                  onViewDetails={() => onSelectExam(exam)}
                  isBookmarked={bookmarks?.includes(exam.id)}
                  onToggleBookmark={() => onToggleBookmark(exam.id)}
                  delay={Math.min(i * 0.02, 0.3)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
