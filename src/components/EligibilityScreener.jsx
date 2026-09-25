import React, { useState, useMemo, useEffect } from 'react'
import {
  HiOutlineUser, HiOutlineAcademicCap, HiOutlineLocationMarker,
  HiOutlineClock, HiOutlineCheckCircle,
  HiOutlineArrowRight, HiOutlineFilter,
  HiOutlineShieldCheck
} from 'react-icons/hi'
import { getDomainColor } from '../utils/helpers'
import useIsMobile from '../hooks/useIsMobile'

const CATEGORIES = [
  { id: 'gen', label: 'General / Unreserved', relaxation: 0, desc: 'Standard upper age limits' },
  { id: 'obc', label: 'OBC (Non-Creamy Layer)', relaxation: 3, desc: '+3 Years Upper Age Relaxation' },
  { id: 'sc_st', label: 'SC / ST', relaxation: 5, desc: '+5 Years Upper Age Relaxation' },
  { id: 'ews', label: 'EWS (Economically Weaker)', relaxation: 0, desc: 'Income criteria, standard age limits' },
  { id: 'pwbd', label: 'PwBD / Differently Abled', relaxation: 10, desc: '+10 Years Upper Age Relaxation' },
]

// `credential` marks a professional qualification. An exam that *requires* one
// (see requiredCredential) is open only to candidates holding it; an exam that
// merely *accepts* one as an alternative route is open to them as well.
const QUALIFICATIONS = [
  { id: '10th', label: '10th / Matriculation', levelRank: 1 },
  { id: '12th', label: '12th / Intermediate (10+2)', levelRank: 2 },
  { id: 'diploma', label: 'Polytechnic Diploma', levelRank: 3 },
  { id: 'graduate', label: "Bachelor's Degree (Any Discipline)", levelRank: 4 },
  { id: 'engineering', label: 'B.Tech / B.E. / Technical Degree', levelRank: 4 },
  { id: 'post_graduate', label: "Master's Degree / Post Graduate", levelRank: 5 },
  // Rank 5: CA, CS and CMA are treated as equivalent to a Master's (UGC recognition, 2021)
  { id: 'ca_cs_cma', label: 'CA / CS / CMA (qualified)', levelRank: 5, credential: 'accounting', professional: true },
  { id: 'law', label: 'LLB / Law Degree', levelRank: 4, credential: 'law', professional: true },
  { id: 'teaching_bed', label: 'Graduate + B.Ed (Teaching)', levelRank: 4, credential: 'teaching', professional: true },
  { id: 'teaching_deled', label: '12th + D.El.Ed / D.Ed (Teaching)', levelRank: 2, credential: 'teaching', professional: true },
  { id: 'medical', label: 'MBBS / BDS (Medical / Dental)', levelRank: 4, credential: 'medical', professional: true },
]

// Professional credentials, as they're written in exams.json's min_qualification
const CREDENTIAL_PATTERNS = {
  law: /\bLL\.?\s?B\b|bachelor of laws|degree in law|law degree|law graduate|graduate in law|(^|[\/,]\s*)Law\b/i,
  // "CS" alone is left out on purpose: in engineering requirements it means Computer Science
  accounting: /\bCA\b|chartered accountant|\bCMA\b|cost accountant|\bICWAI?\b|company secretar/i,
  // case-sensitive, so "50-bed hospital" isn't read as B.Ed
  teaching: /\bB\.?\s?Ed\b|D\.?\s?El\.?\s?Ed|D\.?\s?T\.?\s?Ed|\bD\.?\s?Ed\b|\bTTC\b|\bPTC\b|\bBTC\b/,
  medical: /\bMBBS\b|\bBDS\b/i,
}

// A plain degree offered as another route in, which makes a listed credential optional
// ("Postgraduate / Law / Engineering / CA"). "Graduation with B.Ed" is not an alternative.
const GENERAL_DEGREE_ROUTE = /bachelor'?s degree(?!\s+in\s+law)|graduation(?!\s*(\+|with)\s*(b\.?\s?ed|d\.?\s?el))|graduate in (any|commerce)|any (stream|discipline)|master'?s|post ?graduate|\bMBA\b|\bCFA\b|engineering|b\.?\s?tech|m\.?\s?com/i

function mentionedCredentials(exam) {
  const q = exam.min_qualification || ''
  return Object.keys(CREDENTIAL_PATTERNS).filter(key => CREDENTIAL_PATTERNS[key].test(q))
}

// The credential an exam cannot be sat without, or null. Checked by hand against
// all 509 exams on 2026-09-25: 25 need an LLB, 34 a B.Ed / D.El.Ed, 6 an MBBS / BDS,
// 2 a CA / CMA; 18 more accept one of these as an alternative.
function requiredCredential(exam) {
  const q = exam.min_qualification || ''
  // The CA/CS/CMA courses themselves can be entered after Class 12; "varies by post"
  // covers non-specialist posts too
  if ((exam.track === 'Q' && /10\+2|class 12|12th/i.test(q)) || /varies by post/i.test(q)) return null
  for (const [key, re] of Object.entries(CREDENTIAL_PATTERNS)) {
    if (!re.test(q)) continue
    const joined = new RegExp(`(\\+|\\bwith\\b)\\s*(${re.source})`, re.flags).test(q) ||
      new RegExp(`(${re.source})\\.?\\s*\\+`, re.flags).test(q)
    if (!GENERAL_DEGREE_ROUTE.test(q) || joined) return key
  }
  return null
}

function parseAgeLimits(ageStr) {
  if (!ageStr) return { min: 18, max: 32 }
  const clean = ageStr.toLowerCase()
  
  // Look for range e.g. "21-32", "18 - 30", "19-38 years"
  const rangeMatch = clean.match(/(\d+)\s*[-–to]+\s*(\d+)/)
  if (rangeMatch) {
    return { min: parseInt(rangeMatch[1], 10), max: parseInt(rangeMatch[2], 10) }
  }
  
  // Look for max e.g. "up to 30", "max 27", "below 35", "30 years"
  const maxMatch = clean.match(/(?:up to|max|maximum|below|under|upto)?\s*(\d+)\s*(?:years|yrs)?/)
  if (maxMatch) {
    const val = parseInt(maxMatch[1], 10)
    if (val >= 16 && val <= 65) {
      return { min: 18, max: val }
    }
  }

  return { min: 18, max: 32 }
}

function getExamRequiredRank(minQualStr, levelStr) {
  const q = (minQualStr || '').toLowerCase()
  const l = (levelStr || '').toLowerCase()

  if (q.includes('post grad') || q.includes('master') || q.includes('m.tech') || q.includes('m.sc') || l.includes('postgraduate')) {
    return 5
  }
  if (q.includes('bachelor') || q.includes('degree') || q.includes('graduate') || q.includes('b.tech') || q.includes('b.e') || q.includes('mbbs') || l.includes('graduate') || l.includes('undergraduate')) {
    return 4
  }
  if (q.includes('diploma') || q.includes('polytechnic')) {
    return 3
  }
  if (q.includes('12th') || q.includes('intermediate') || q.includes('10+2') || q.includes('higher secondary')) {
    return 2
  }
  if (q.includes('10th') || q.includes('matric') || q.includes('secondary') || q.includes('high school')) {
    return 1
  }
  return 4 // default to graduate
}

export default function EligibilityScreener({ exams, onViewDetails, onApplyFilter, initialQualification }) {
  const [age, setAge] = useState(24)
  const [category, setCategory] = useState('gen')
  const [qualification, setQualification] = useState(
    QUALIFICATIONS.some(q => q.id === initialQualification) ? initialQualification : 'graduate'
  )
  const [domicile, setDomicile] = useState('All')
  const [resultFilter, setResultFilter] = useState('eligible') // 'eligible', 'aging_out', 'all'
  const [domainFilter, setDomainFilter] = useState('All')
  // Desktop shows the top 48 at once; a phone starts at 12 (each card is
  // nearly a screen tall there) and reveals more on request
  const isMobile = useIsMobile()
  const [mobileVisible, setMobileVisible] = useState(12)
  const RESULT_CAP = 48
  // A changed input means a new result list — start it from the top again
  useEffect(() => { setMobileVisible(12) }, [age, category, qualification, domicile, resultFilter, domainFilter])

  // List of states
  const states = useMemo(() => {
    const s = new Set(exams.filter(e => e.jurisdiction === 'state' && e.state).map(e => e.state))
    return ['All', ...Array.from(s).sort()]
  }, [exams])

  // List of domains
  const domains = useMemo(() => {
    return ['All', ...new Set(exams.map(e => e.domain))].sort()
  }, [exams])

  const selectedCategoryObj = useMemo(() => {
    return CATEGORIES.find(c => c.id === category) || CATEGORIES[0]
  }, [category])

  const selectedQualObj = useMemo(() => {
    return QUALIFICATIONS.find(q => q.id === qualification) || QUALIFICATIONS[3]
  }, [qualification])

  // Process all exams
  const analyzedExams = useMemo(() => {
    const candRank = selectedQualObj.levelRank
    const relaxation = selectedCategoryObj.relaxation

    return exams.map(exam => {
      const { min: baseMin, max: baseMax } = parseAgeLimits(exam.age_limit)
      const allowedMax = baseMax + relaxation
      const reqRank = getExamRequiredRank(exam.min_qualification, exam.level)

      // Age qualification
      const isAgeQualified = age >= baseMin && age <= allowedMax
      const yearsRemaining = allowedMax - age
      const isAgingOut = isAgeQualified && yearsRemaining <= 2

      // Education qualification. A required professional credential decides it
      // outright: a graduate isn't eligible for a judicial exam without an LLB,
      // and an LLB holder is.
      const reqCredential = requiredCredential(exam)
      const candCredential = selectedQualObj.credential || null
      let isEduQualified = false
      if (reqCredential) {
        isEduQualified = candCredential === reqCredential
      } else if (candCredential && mentionedCredentials(exam).includes(candCredential)) {
        isEduQualified = true // e.g. "Master's in Commerce or CA" for a CA
      } else if (qualification === 'engineering') {
        isEduQualified = exam.domain === 'Engineering' || reqRank <= 4
      } else if (qualification === 'medical') {
        isEduQualified = exam.domain === 'Medical' || reqRank <= 4
      } else {
        isEduQualified = candRank >= reqRank
      }

      // Domicile / State eligibility
      let isStateQualified = true
      if (exam.jurisdiction === 'state' && domicile !== 'All') {
        isStateQualified = exam.state === domicile || exam.state === 'All India'
      }

      const isFullyEligible = isAgeQualified && isEduQualified && isStateQualified

      return {
        ...exam,
        baseMin,
        baseMax,
        allowedMax,
        yearsRemaining,
        isAgeQualified,
        isEduQualified,
        isStateQualified,
        isFullyEligible,
        isAgingOut
      }
    })
  }, [exams, age, selectedCategoryObj, selectedQualObj, domicile, qualification])

  // Counts
  const metrics = useMemo(() => {
    const eligible = analyzedExams.filter(e => e.isFullyEligible)
    const agingOut = analyzedExams.filter(e => e.isFullyEligible && e.isAgingOut)
    const central = eligible.filter(e => e.jurisdiction === 'central')
    const state = eligible.filter(e => e.jurisdiction === 'state')

    return {
      totalEligible: eligible.length,
      agingOutCount: agingOut.length,
      centralCount: central.length,
      stateCount: state.length,
    }
  }, [analyzedExams])

  // Filtered view
  const displayedExams = useMemo(() => {
    let list = analyzedExams

    if (domainFilter !== 'All') {
      list = list.filter(e => e.domain === domainFilter)
    }

    if (resultFilter === 'eligible') {
      return list.filter(e => e.isFullyEligible)
    }
    if (resultFilter === 'aging_out') {
      return list.filter(e => e.isFullyEligible && e.isAgingOut)
    }
    return list
  }, [analyzedExams, resultFilter, domainFilter])

  return (
    <div className="screener-container slide-up">
      {/* Hero Header */}
      <div className="screener-hero">
        <div className="screener-badge">
          <HiOutlineShieldCheck /> Career Intelligence Engine
        </div>
        <h1 className="screener-title">
          "Am I Eligible?" <span className="logo-highlight">Screener & Age Calculator</span>
        </h1>
        <p className="screener-subtitle">
          Input your age, educational degree, and category to calculate official age relaxations
          and discover statutory examinations you can target before your attempt window closes.
        </p>
      </div>

      {/* Inputs Panel */}
      <div className="screener-control-panel">
        <div className="screener-grid-inputs">
          {/* Age Input */}
          <div className="screener-input-card">
            <label htmlFor="screener-age-input" className="screener-label">
              <HiOutlineClock className="screener-icon text-amber" /> Current Age
            </label>
            <div className="screener-age-row">
              <input
                id="screener-age-input"
                type="number"
                min="16"
                max="50"
                value={age}
                onChange={e => setAge(Math.max(16, Math.min(50, Number(e.target.value) || 18)))}
                className="screener-number-input"
              />
              <span className="screener-age-unit">Years Old</span>
            </div>
            <input
              type="range"
              min="18"
              max="45"
              value={age}
              onChange={e => setAge(Number(e.target.value))}
              className="screener-range-slider"
            />
            <div className="screener-subtext">Calculated as on current recruitment cycle</div>
          </div>

          {/* Social Category */}
          <div className="screener-input-card">
            <label htmlFor="screener-category-select" className="screener-label">
              <HiOutlineUser className="screener-icon text-blue" /> Reservation Category
            </label>
            <select
              id="screener-category-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="screener-select"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.label} {c.relaxation > 0 ? `(+${c.relaxation} yrs)` : ''}
                </option>
              ))}
            </select>
            <div className="screener-subtext highlight-relaxation">
              {selectedCategoryObj.desc}
            </div>
          </div>

          {/* Highest Qualification */}
          <div className="screener-input-card">
            <label htmlFor="screener-qual-select" className="screener-label">
              <HiOutlineAcademicCap className="screener-icon text-emerald" /> Highest Qualification
            </label>
            <select
              id="screener-qual-select"
              value={qualification}
              onChange={e => setQualification(e.target.value)}
              className="screener-select"
            >
              <optgroup label="School & degree">
                {QUALIFICATIONS.filter(q => !q.professional).map(q => (
                  <option key={q.id} value={q.id}>{q.label}</option>
                ))}
              </optgroup>
              <optgroup label="Professional qualification">
                {QUALIFICATIONS.filter(q => q.professional).map(q => (
                  <option key={q.id} value={q.id}>{q.label}</option>
                ))}
              </optgroup>
            </select>
            <div className="screener-subtext">
              {selectedQualObj.professional
                ? 'Also opens exams that require this qualification, such as judicial, teaching or finance-officer posts'
                : 'Includes appearing / final semester'}
            </div>
          </div>

          {/* Domicile State */}
          <div className="screener-input-card">
            <label htmlFor="screener-state-select" className="screener-label">
              <HiOutlineLocationMarker className="screener-icon text-purple" /> Domicile State / UT
            </label>
            <select
              id="screener-state-select"
              value={domicile}
              onChange={e => setDomicile(e.target.value)}
              className="screener-select"
            >
              {states.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="screener-subtext">State quota & local PSC eligibility</div>
          </div>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="screener-kpi-bar">
        <div className="screener-kpi-card highlight-green">
          <div className="screener-kpi-val">{metrics.totalEligible}</div>
          <div className="screener-kpi-label">Examinations Eligible Right Now</div>
        </div>
        <div className="screener-kpi-card highlight-amber">
          <div className="screener-kpi-val">{metrics.agingOutCount}</div>
          <div className="screener-kpi-label">Final Window (Aging Out ≤ 2 Yrs)</div>
        </div>
        <div className="screener-kpi-card">
          <div className="screener-kpi-val">{metrics.centralCount}</div>
          <div className="screener-kpi-label">Central & All-India Posts</div>
        </div>
        <div className="screener-kpi-card">
          <div className="screener-kpi-val">{metrics.stateCount}</div>
          <div className="screener-kpi-label">State Commissions & Boards</div>
        </div>
      </div>

      {/* Results Header & Filters */}
      <div className="screener-results-toolbar">
        <div className="screener-view-tabs">
          <button
            className={`screener-tab ${resultFilter === 'eligible' ? 'active' : ''}`}
            onClick={() => setResultFilter('eligible')}
          >
            Eligible ({metrics.totalEligible})
          </button>
          <button
            className={`screener-tab alert-tab ${resultFilter === 'aging_out' ? 'active' : ''}`}
            onClick={() => setResultFilter('aging_out')}
          >
            ⚠️ Final Window ({metrics.agingOutCount})
          </button>
          <button
            className={`screener-tab ${resultFilter === 'all' ? 'active' : ''}`}
            onClick={() => setResultFilter('all')}
          >
            All Analyzed ({analyzedExams.length})
          </button>
        </div>

        <div className="screener-filter-actions">
          <select
            value={domainFilter}
            onChange={e => setDomainFilter(e.target.value)}
            className="screener-domain-select"
            aria-label="Filter by Domain"
          >
            {domains.map(d => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Career Domains' : d}
              </option>
            ))}
          </select>

          {onApplyFilter && (
            <button
              className="screener-apply-filter-btn"
              onClick={() => onApplyFilter(displayedExams.map(e => e.id))}
              title="Filter main directory with these matching exams"
            >
              <HiOutlineFilter /> Open in Explore Grid
            </button>
          )}
        </div>
      </div>

      {/* Exam Results Grid */}
      <div className="screener-cards-grid">
        {displayedExams.slice(0, isMobile ? Math.min(mobileVisible, RESULT_CAP) : RESULT_CAP).map(exam => {
          const domainColor = getDomainColor(exam.domain)

          return (
            <div
              key={exam.id}
              className={`screener-exam-card ${exam.isFullyEligible ? 'is-eligible' : 'not-eligible'}`}
              style={{ borderTopColor: domainColor }}
            >
              <div className="screener-card-header">
                <span
                  className="screener-domain-pill"
                  style={{ color: domainColor, borderColor: `${domainColor}55` }}
                >
                  {exam.domain}
                </span>
                {exam.isAgingOut && exam.isFullyEligible && (
                  <span className="screener-urgency-badge" title="Under 2 years remaining before maximum cutoff">
                    Final Window ({exam.yearsRemaining}y left)
                  </span>
                )}
                {exam.isFullyEligible && !exam.isAgingOut && (
                  <span className="screener-eligible-badge">
                    <HiOutlineCheckCircle /> Eligible
                  </span>
                )}
                {!exam.isFullyEligible && (
                  <span className="screener-ineligible-badge">
                    {!exam.isAgeQualified ? 'Age Exceeded' : 'Criteria Not Met'}
                  </span>
                )}
              </div>

              <h3 className="screener-exam-title">{exam.name}</h3>
              <p className="screener-exam-body">{exam.conducting_body} · {exam.jurisdiction === 'central' ? 'Central / All-India' : exam.state}</p>

              <div className="screener-card-specs">
                <div className="screener-spec-row">
                  <span className="spec-label">Your Age Limit:</span>
                  <span className="spec-val">
                    Max <strong>{exam.allowedMax}</strong> yrs
                    {selectedCategoryObj.relaxation > 0 && (
                      <span className="spec-sub"> (Base {exam.baseMax} + {selectedCategoryObj.relaxation})</span>
                    )}
                  </span>
                </div>
                <div className="screener-spec-row">
                  <span className="spec-label">Min Qualification:</span>
                  <span className="spec-val text-truncate">{exam.min_qualification}</span>
                </div>
                <div className="screener-spec-row">
                  <span className="spec-label">Cadre / Scale:</span>
                  <span className="spec-val">{exam.cadre || 'Notified Post'}</span>
                </div>
              </div>

              <div className="screener-card-footer">
                <button
                  className="screener-dossier-btn"
                  onClick={() => onViewDetails && onViewDetails(exam)}
                >
                  View Dossier <HiOutlineArrowRight />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {isMobile && mobileVisible < Math.min(displayedExams.length, RESULT_CAP) && (
        <button type="button" className="show-more-btn" onClick={() => setMobileVisible(v => v + 12)}>
          Show more ({Math.min(displayedExams.length, RESULT_CAP) - mobileVisible} more)
        </button>
      )}

      {displayedExams.length > RESULT_CAP && (!isMobile || mobileVisible >= RESULT_CAP) && (
        <div className="screener-pagination-note">
          Showing top {RESULT_CAP} of {displayedExams.length} matching examinations. Use "Open in Explore Grid" to browse the complete list with full pagination.
        </div>
      )}
    </div>
  )
}
