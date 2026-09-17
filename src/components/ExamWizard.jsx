import { useState, useMemo } from 'react'
import {
  HiOutlineSparkles, HiOutlineAcademicCap, HiOutlineLocationMarker,
  HiOutlineBriefcase, HiOutlineArrowRight, HiOutlineRefresh,
  HiOutlineCheck
} from 'react-icons/hi'
import ExamCard from './ExamCard'

const QUALIFICATIONS = [
  { id: '10th', label: '10th / Secondary Pass', desc: 'SSLC, Matriculation, Technical trades' },
  { id: '12th', label: '10+2 / Higher Secondary', desc: 'Intermediate, Science, Arts, Commerce' },
  { id: 'diploma', label: 'Diploma / Polytechnic', desc: 'Engineering & Technical diplomas' },
  { id: 'graduate', label: "Bachelor's / Graduate Degree", desc: 'BA, BSc, BCom, BTech, BBA, any discipline' },
  { id: 'postgraduate', label: "Master's / Post-Graduate", desc: 'MA, MSc, MCom, MTech, MBA, MCA' },
  { id: 'professional', label: 'Professional Degree', desc: 'MBBS, BDS, LLB, CA, ICWA, B.Ed' },
]

export default function ExamWizard({ exams, states, onSelectExam, onToggleCompare, compareList, bookmarks, onToggleBookmark }) {
  const [step, setStep] = useState(1)
  const [qualification, setQualification] = useState('')
  const [jurisdiction, setJurisdiction] = useState('') // 'central', 'state', or 'all'
  const [selectedState, setSelectedState] = useState('')
  const [purpose, setPurpose] = useState('') // 'job', 'entrance', or 'any'

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

      // 3. Qualification filter (heuristic match against min_qualification and level)
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
    }).sort((a, b) => {
      // Sort very high popularity first
      const popRank = { very_high: 3, high: 2, medium: 1, low: 0 }
      return (popRank[b.popularity] || 0) - (popRank[a.popularity] || 0)
    })
  }, [exams, qualification, jurisdiction, selectedState, purpose])

  const resetWizard = () => {
    setStep(1)
    setQualification('')
    setJurisdiction('')
    setSelectedState('')
    setPurpose('')
  }

  return (
    <div className="wizard-container slide-up">
      <div className="wizard-header">
        <div className="wizard-badge">
          <HiOutlineSparkles /> EXAM RECOMMENDATION WIZARD
        </div>
        <h2 className="wizard-title">Find Your Ideal Examination Pathway</h2>
        <p className="wizard-subtitle">
          Answer 3 quick questions about your educational background and career goals to discover matching exams.
        </p>

        {/* Progress Bar */}
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
            <span className="step-name">Career Goal</span>
          </div>
        </div>
      </div>

      {/* Step 1: Qualification */}
      {step === 1 && (
        <div className="wizard-card-step">
          <h3 className="step-prompt">
            <HiOutlineAcademicCap className="prompt-icon" /> What is your highest qualification?
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
            <HiOutlineLocationMarker className="prompt-icon" /> Where do you prefer to apply?
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
              <div className="opt-title">Central / All-India</div>
              <div className="opt-desc">UPSC, SSC, Railways, Defence, National Entrance</div>
            </button>

            <button
              className={`wizard-opt-btn ${jurisdiction === 'state' ? 'selected' : ''}`}
              onClick={() => setJurisdiction('state')}
            >
              <div className="opt-emoji">🏛️</div>
              <div className="opt-title">State Government</div>
              <div className="opt-desc">State Public Service Commissions & Subordinate Boards</div>
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
              <div className="opt-desc">Include both Central & State opportunities</div>
            </button>
          </div>

          {jurisdiction === 'state' && (
            <div className="wizard-state-selector slide-up">
              <label htmlFor="wizard-state-select">Select your preferred State / UT:</label>
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
              <div className="opt-desc">Direct recruitment for Gazetted, Officer, or Subordinate Cadres</div>
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
              <div className="opt-desc">Admission entrance exams (JEE, NEET, GATE, CAT, CUET)</div>
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
              <div className="opt-desc">Explore both job recruitment & academic admissions</div>
            </button>
          </div>

          <div className="wizard-nav-btns">
            <button className="wizard-back-btn" onClick={() => setStep(2)}>← Back</button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="wizard-results-section slide-up">
          <div className="wizard-results-bar">
            <div>
              <h3 className="results-count-title">
                Found <span className="highlight-amber">{filteredExams.length}</span> Curated Match{filteredExams.length !== 1 ? 'es' : ''}
              </h3>
              <p className="results-filters-summary">
                Filtering for: <strong>{QUALIFICATIONS.find(q => q.id === qualification)?.label}</strong> ·{' '}
                <strong>{jurisdiction === 'central' ? 'Central Services' : jurisdiction === 'state' ? (selectedState || 'State PSCs') : 'All Jurisdictions'}</strong> ·{' '}
                <strong>{purpose === 'job' ? 'Government Jobs' : purpose === 'entrance' ? 'Entrance Exams' : 'Jobs & Entrance'}</strong>
              </p>
            </div>
            <button className="wizard-reset-btn" onClick={resetWizard}>
              <HiOutlineRefresh /> Reset Wizard
            </button>
          </div>

          {filteredExams.length === 0 ? (
            <div className="no-results" style={{ margin: '2rem 0' }}>
              <div className="no-results-icon">🔍</div>
              <h3>No specific matches found for this combination</h3>
              <p>Try broadening your criteria or reset the wizard.</p>
              <button className="wizard-reset-btn" onClick={resetWizard} style={{ margin: '1rem auto' }}>
                Reset Wizard
              </button>
            </div>
          ) : (
            <div className="exam-grid" style={{ marginTop: '1.5rem' }}>
              {filteredExams.map((exam, i) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  isComparing={compareList.some(e => e.id === exam.id)}
                  onToggleCompare={() => onToggleCompare(exam)}
                  onViewDetails={() => onSelectExam(exam)}
                  isBookmarked={bookmarks?.includes(exam.id)}
                  onToggleBookmark={() => onToggleBookmark(exam.id)}
                  delay={i * 0.02}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
