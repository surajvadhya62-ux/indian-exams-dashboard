import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  HiOutlineSwitchHorizontal, HiOutlineSparkles, HiOutlineCheckCircle,
  HiOutlineExclamation, HiOutlineInformationCircle, HiOutlineSearch,
  HiOutlineArrowRight, HiOutlineFilter, HiOutlineClipboardCopy,
  HiOutlineCheck, HiOutlineScale, HiOutlineExternalLink, HiOutlineClock,
  HiOutlineAcademicCap, HiOutlineLightningBolt, HiOutlineViewGrid
} from 'react-icons/hi'
import {
  calculateSyllabusOverlap,
  getExamSyllabusProfile,
  SYLLABUS_MODULES
} from '../utils/syllabusTaxonomy'
import { getDomainColor } from '../utils/helpers'

const POPULAR_PRIMARY_IDS = [
  'upsc-cse', 'ssc-cgl', 'ibps-po', 'rbi-grade-b',
  'gate', 'jee-main', 'neet-ug', 'cds', 'nda', 'uppsc-pcs', 'bpsc'
]

export default function SyllabusOverlapEngine({
  exams = [],
  onViewDetails,
  initialPrimaryId,
  initialSecondaryId,
  setActiveView
}) {
  // Primary exam selection
  const [primaryId, setPrimaryId] = useState(() => {
    if (initialPrimaryId && exams.some(e => e.id === initialPrimaryId)) {
      return initialPrimaryId
    }
    return 'upsc-cse'
  })

  // Secondary comparator exam selection
  const [secondaryId, setSecondaryId] = useState(() => {
    if (initialSecondaryId && exams.some(e => e.id === initialSecondaryId)) {
      return initialSecondaryId
    }
    return 'uppsc-pcs'
  })

  // Mode: 'radar' (browse all ranked overlaps) vs 'deepdive' (head-to-head 1-on-1)
  const [activeMode, setActiveMode] = useState('deepdive')

  // Search & Filters for Radar mode
  const [radarSearch, setRadarSearch] = useState('')
  const [radarDomain, setRadarDomain] = useState('all')
  const [radarFungibility, setRadarFungibility] = useState('all') // 'all' | 'high' | 'moderate'
  const [radarJurisdiction, setRadarJurisdiction] = useState('all') // 'all' | 'central' | 'state'
  const [copiedSummary, setCopiedSummary] = useState(false)

  // Domains list for filtering
  const domains = useMemo(() => {
    return [...new Set(exams.map(e => e.domain))].filter(Boolean).sort()
  }, [exams])

  // Primary Exam Object
  const primaryExam = useMemo(() => {
    return exams.find(e => e.id === primaryId) || exams[0]
  }, [exams, primaryId])

  // Secondary Exam Object
  const secondaryExam = useMemo(() => {
    return exams.find(e => e.id === secondaryId) || exams[1]
  }, [exams, secondaryId])

  // Head-to-head Overlap calculation
  const headToHeadResult = useMemo(() => {
    if (!primaryExam || !secondaryExam) return null
    return calculateSyllabusOverlap(primaryExam, secondaryExam)
  }, [primaryExam, secondaryExam])

  // Ranked Overlaps across all other exams (for Radar mode)
  const rankedRadarExams = useMemo(() => {
    if (!primaryExam) return []

    const results = []
    exams.forEach(target => {
      if (target.id === primaryExam.id) return
      const overlap = calculateSyllabusOverlap(primaryExam, target)
      if (overlap) {
        results.push({
          exam: target,
          ...overlap
        })
      }
    })

    // Sort by overlap percentage descending
    results.sort((a, b) => b.overlapPercentage - a.overlapPercentage)
    return results
  }, [exams, primaryExam])

  // Filtered radar results
  const filteredRadarExams = useMemo(() => {
    return rankedRadarExams.filter(item => {
      const q = radarSearch.toLowerCase().trim()
      if (q) {
        const matchesName = item.exam.name.toLowerCase().includes(q)
        const matchesAcronym = item.exam.acronym?.toLowerCase().includes(q)
        const matchesBody = item.exam.conducting_body?.toLowerCase().includes(q)
        if (!matchesName && !matchesAcronym && !matchesBody) return false
      }

      if (radarDomain !== 'all' && item.exam.domain !== radarDomain) return false
      if (radarFungibility !== 'all' && item.fungibilityRating !== radarFungibility) return false
      if (radarJurisdiction !== 'all' && item.exam.jurisdiction !== radarJurisdiction) return false

      return true
    })
  }, [rankedRadarExams, radarSearch, radarDomain, radarFungibility, radarJurisdiction])

  // Swap Primary and Secondary
  const handleSwap = () => {
    const temp = primaryId
    setPrimaryId(secondaryId)
    setSecondaryId(temp)
  }

  // Quick switch from radar card to deep dive
  const handleSelectFromRadar = (targetId) => {
    setSecondaryId(targetId)
    setActiveMode('deepdive')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Copy analysis summary to clipboard
  const handleCopySummary = () => {
    if (!headToHeadResult) return
    const text = `🎓 IndiaExams Syllabus Overlap Crosswalk:
Primary Target: ${primaryExam.name} (${primaryExam.acronym})
Secondary Target: ${secondaryExam.name} (${secondaryExam.acronym})
Synergy Overlap: ${headToHeadResult.overlapPercentage}% (${headToHeadResult.verdict})
Estimated Delta Effort: ~${headToHeadResult.estimatedDeltaHours} hours
Shared Core Subjects: ${headToHeadResult.sharedModules.map(m => m.name).join(', ')}
Delta Subjects Required for ${secondaryExam.acronym}: ${headToHeadResult.extraRequiredForB.map(m => m.name).join(', ') || 'None (100% covered)'}
Tactical Recommendation: ${headToHeadResult.tacticalAdvice}
Verified on IndiaExams Intelligence Terminal`

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSummary(true)
      setTimeout(() => setCopiedSummary(false), 2500)
    })
  }

  return (
    <section className="overlap-engine-section">
      {/* HUD Header Bar */}
      <div className="overlap-hud-header">
        <div className="overlap-header-content">
          <div className="overlap-title-row">
            <span className="overlap-telemetry-badge">
              <HiOutlineLightningBolt className="text-amber" />
              CROSS-EXAM FUNGIBILITY MATRIX
            </span>
            <span className="overlap-corpus-tag">
              TAXONOMY v2.5 · 500 TARGETS BENCHMARKED
            </span>
          </div>
          <h2 className="overlap-main-title">
            Syllabus Overlap &amp; Preparation Bridge
          </h2>
          <p className="overlap-subtitle">
            Determine quantitative syllabus synergy, shared subject modules, and incremental study delta to safely target secondary examinations without diluting your primary focus.
          </p>
        </div>

        {/* Mode Switcher Buttons */}
        <div className="overlap-mode-toggle" role="tablist">
          <button
            className={`overlap-toggle-btn ${activeMode === 'deepdive' ? 'active' : ''}`}
            onClick={() => setActiveMode('deepdive')}
            role="tab"
            aria-selected={activeMode === 'deepdive'}
          >
            <HiOutlineScale className="toggle-btn-icon" />
            <span>Head-to-Head Deep Dive</span>
          </button>
          <button
            className={`overlap-toggle-btn ${activeMode === 'radar' ? 'active' : ''}`}
            onClick={() => setActiveMode('radar')}
            role="tab"
            aria-selected={activeMode === 'radar'}
          >
            <HiOutlineViewGrid className="toggle-btn-icon" />
            <span>Overlap Radar ({rankedRadarExams.length})</span>
          </button>
        </div>
      </div>

      {/* Primary Target Selector Strip */}
      <div className="overlap-selector-strip">
        <div className="selector-block primary-block">
          <label className="selector-label" htmlFor="primary-exam-select">
            <span className="step-num">STEP 1</span>
            <strong>PRIMARY EXAM TARGET</strong> (What you are actively studying for):
          </label>
          <div className="selector-row">
            <select
              id="primary-exam-select"
              className="overlap-select primary-select"
              value={primaryId}
              onChange={(e) => setPrimaryId(e.target.value)}
            >
              {exams.map(e => (
                <option key={e.id} value={e.id}>
                  {e.acronym ? `${e.acronym} — ` : ''}{e.name} ({e.domain})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Popular Benchmark Chips */}
          <div className="quick-chips-row">
            <span className="quick-chip-label">Quick Benchmarks:</span>
            {POPULAR_PRIMARY_IDS.map(pId => {
              const examObj = exams.find(e => e.id === pId)
              if (!examObj) return null
              return (
                <button
                  key={pId}
                  className={`quick-chip-btn ${primaryId === pId ? 'active' : ''}`}
                  onClick={() => setPrimaryId(pId)}
                >
                  {examObj.acronym || examObj.name.slice(0, 10)}
                </button>
              )
            })}
          </div>
        </div>

        {activeMode === 'deepdive' && (
          <>
            {/* Swap Button */}
            <div className="swap-btn-container">
              <button
                className="overlap-swap-btn"
                onClick={handleSwap}
                title="Swap Primary and Secondary Exam"
                aria-label="Swap Primary and Secondary Exam"
              >
                <HiOutlineSwitchHorizontal />
              </button>
            </div>

            {/* Secondary Comparator Selector */}
            <div className="selector-block secondary-block">
              <label className="selector-label" htmlFor="secondary-exam-select">
                <span className="step-num">STEP 2</span>
                <strong>SECONDARY EXAM TARGET</strong> (Potential backup / dual target):
              </label>
              <div className="selector-row">
                <select
                  id="secondary-exam-select"
                  className="overlap-select secondary-select"
                  value={secondaryId}
                  onChange={(e) => setSecondaryId(e.target.value)}
                >
                  {exams
                    .filter(e => e.id !== primaryId)
                    .map(e => (
                      <option key={e.id} value={e.id}>
                        {e.acronym ? `${e.acronym} — ` : ''}{e.name} ({e.domain})
                      </option>
                    ))}
                </select>
              </div>
              <div className="quick-chips-row">
                <span className="quick-chip-label">Suggestions for {primaryExam.acronym || 'Primary'}:</span>
                {rankedRadarExams.slice(0, 4).map(item => (
                  <button
                    key={item.exam.id}
                    className={`quick-chip-btn ${secondaryId === item.exam.id ? 'active' : ''}`}
                    onClick={() => setSecondaryId(item.exam.id)}
                  >
                    {item.exam.acronym || item.exam.name.slice(0, 8)} ({item.overlapPercentage}%)
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* MODE 1: HEAD-TO-HEAD DEEP DIVE */}
      {activeMode === 'deepdive' && headToHeadResult && (
        <div className="deepdive-container fade-in">
          {/* Synergy Score & Feasibility Summary Banner */}
          <div className="synergy-hero-card">
            <div className="hero-left-metrics">
              <div className={`circular-score-ring ${headToHeadResult.verdictClass}`}>
                <span className="score-number">{headToHeadResult.overlapPercentage}</span>
                <span className="score-percent">%</span>
                <span className="score-caption">SYLLABUS OVERLAP</span>
              </div>

              <div className="hero-text-content">
                <div className="verdict-tag-row">
                  <span className={`fungibility-tag ${headToHeadResult.verdictClass}`}>
                    {headToHeadResult.fungibilityRating === 'high' && <HiOutlineCheckCircle className="tag-icon" />}
                    {headToHeadResult.fungibilityRating === 'moderate' && <HiOutlineLightningBolt className="tag-icon" />}
                    {headToHeadResult.fungibilityRating === 'divergent' && <HiOutlineExclamation className="tag-icon" />}
                    {headToHeadResult.verdict}
                  </span>
                  <span className="delta-hours-pill">
                    <HiOutlineClock className="pill-icon" />
                    Estimated Delta: ~<strong>{headToHeadResult.estimatedDeltaHours} hrs</strong> study
                  </span>
                </div>

                <h3 className="comparison-headline">
                  Can you prepare for <span className="highlight-b">{secondaryExam.name}</span> alongside <span className="highlight-a">{primaryExam.name}</span>?
                </h3>

                <p className="tactical-advice-box">
                  <HiOutlineInformationCircle className="advice-icon text-amber" />
                  <span><strong>Tactical Strategy:</strong> {headToHeadResult.tacticalAdvice}</span>
                </p>

                {headToHeadResult.missingSpecializedCores && headToHeadResult.missingSpecializedCores.length > 0 && (
                  <div className="specialized-barrier-alert">
                    <span className="barrier-alert-label">⚠️ Non-Transferable Core Barrier:</span>
                    <div className="barrier-chips-wrap">
                      {headToHeadResult.missingSpecializedCores.map(core => (
                        <span key={core.id} className="barrier-chip">
                          ⚡ {core.name}
                        </span>
                      ))}
                    </div>
                    <span className="barrier-desc">These specialized modules cannot be cleared through General Studies or Aptitude preparation alone.</span>
                  </div>
                )}

                <div className="hero-actions-row">
                  <button
                    className="action-btn-copy"
                    onClick={handleCopySummary}
                  >
                    {copiedSummary ? <HiOutlineCheck className="btn-icon text-emerald" /> : <HiOutlineClipboardCopy className="btn-icon" />}
                    <span>{copiedSummary ? 'Roadmap Copied!' : 'Copy Study Roadmap'}</span>
                  </button>
                  {onViewDetails && (
                    <button
                      className="action-btn-link"
                      onClick={() => onViewDetails(secondaryExam)}
                    >
                      <HiOutlineExternalLink className="btn-icon" />
                      <span>{secondaryExam.acronym || 'Target'} Dossier &amp; Pay Scale</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Domain comparison chip card */}
            <div className="hero-right-cards">
              <div className="mini-exam-box box-primary">
                <span className="mini-box-tag">PRIMARY FOCUS</span>
                <h4 className="mini-box-name">{primaryExam.name}</h4>
                <div className="mini-box-details">
                  <span className="domain-pill" style={{ borderColor: `${getDomainColor(primaryExam.domain)}44`, color: getDomainColor(primaryExam.domain) }}>
                    {primaryExam.domain}
                  </span>
                  <span className="body-pill">{primaryExam.conducting_body}</span>
                </div>
              </div>

              <div className="mini-versus-symbol">VS</div>

              <div className="mini-exam-box box-secondary">
                <span className="mini-box-tag text-amber">SECONDARY TARGET</span>
                <h4 className="mini-box-name">{secondaryExam.name}</h4>
                <div className="mini-box-details">
                  <span className="domain-pill" style={{ borderColor: `${getDomainColor(secondaryExam.domain)}44`, color: getDomainColor(secondaryExam.domain) }}>
                    {secondaryExam.domain}
                  </span>
                  <span className="body-pill">{secondaryExam.conducting_body}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Granular Syllabus Crosswalk Grid */}
          <div className="crosswalk-grid">
            {/* Column 1: Shared Core Syllabus */}
            <div className="crosswalk-column shared-column">
              <div className="column-header">
                <div className="col-icon-wrapper text-emerald">
                  <HiOutlineCheckCircle />
                </div>
                <div>
                  <h4 className="col-title">Shared Core Modules</h4>
                  <span className="col-count">
                    {headToHeadResult.sharedModules.length} topics automatically covered (100% reusable)
                  </span>
                </div>
              </div>
              <div className="column-content">
                {headToHeadResult.sharedModules.length === 0 ? (
                  <div className="empty-column-msg">No direct syllabus overlap found between these subjects.</div>
                ) : (
                  headToHeadResult.sharedModules.map(m => (
                    <div key={m.id} className="module-item module-shared">
                      <span className="module-cat-tag">{m.category}</span>
                      <span className="module-name">{m.name}</span>
                      <span className="module-status-check text-emerald">✓ Covered</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 2: Incremental Delta Required (The Must-Study Topics) */}
            <div className="crosswalk-column delta-column">
              <div className="column-header">
                <div className="col-icon-wrapper text-amber">
                  <HiOutlineLightningBolt />
                </div>
                <div>
                  <h4 className="col-title">Incremental Delta Required</h4>
                  <span className="col-count text-amber">
                    {headToHeadResult.extraRequiredForB.length} extra subjects required for {secondaryExam.acronym || 'Target B'}
                  </span>
                </div>
              </div>
              <div className="column-content">
                {headToHeadResult.extraRequiredForB.length === 0 ? (
                  <div className="zero-delta-box">
                    <HiOutlineCheckCircle className="zero-icon text-emerald" />
                    <strong>Zero Incremental Topics!</strong>
                    <p>Your primary preparation covers 100% of this target&apos;s written syllabus requirements.</p>
                  </div>
                ) : (
                  headToHeadResult.extraRequiredForB.map(m => (
                    <div key={m.id} className="module-item module-delta">
                      <span className="module-cat-tag delta-cat">{m.category}</span>
                      <span className="module-name">{m.name}</span>
                      <span className="module-status-delta text-amber">+ Requires Study</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Column 3: Primary Only (Topics Omitted for Target B) */}
            <div className="crosswalk-column omitted-column">
              <div className="column-header">
                <div className="col-icon-wrapper text-slate">
                  <HiOutlineAcademicCap />
                </div>
                <div>
                  <h4 className="col-title">Omitted for {secondaryExam.acronym || 'Target B'}</h4>
                  <span className="col-count">
                    {headToHeadResult.missingInB.length} primary subjects not tested in {secondaryExam.acronym || 'Target B'}
                  </span>
                </div>
              </div>
              <div className="column-content">
                {headToHeadResult.missingInB.length === 0 ? (
                  <div className="empty-column-msg">All topics in your primary target are also tested in Target B.</div>
                ) : (
                  headToHeadResult.missingInB.map(m => (
                    <div key={m.id} className="module-item module-omitted">
                      <span className="module-cat-tag omitted-cat">{m.category}</span>
                      <span className="module-name">{m.name}</span>
                      <span className="module-status-omitted">Can Skip</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Category-by-Category Coverage Progress Bars */}
          <div className="category-bars-card">
            <h4 className="bars-card-title">
              Category-Wise Syllabus Coverage for {secondaryExam.name}
            </h4>
            <div className="category-bars-list">
              {headToHeadResult.categoryBreakdown.map(cat => {
                if (cat.countB === 0 && cat.countA === 0) return null
                return (
                  <div key={cat.category} className="cat-bar-row">
                    <div className="cat-bar-labels">
                      <span className="cat-bar-name">{cat.category}</span>
                      <span className="cat-bar-stat">
                        {cat.countB > 0
                          ? `${cat.sharedCount} of ${cat.countB} modules covered (${cat.percentage}%)`
                          : 'Not in Target B'}
                      </span>
                    </div>
                    <div className="cat-bar-track">
                      <div
                        className="cat-bar-fill"
                        style={{
                          width: `${cat.percentage}%`,
                          backgroundColor: cat.percentage >= 75 ? 'var(--emerald, #10b981)' : cat.percentage >= 40 ? 'var(--amber, #f59e0b)' : 'var(--rose, #f43f5e)'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: OVERLAP RADAR (DISCOVERY MODE) */}
      {activeMode === 'radar' && (
        <div className="radar-container fade-in">
          {/* Filter Bar */}
          <div className="radar-filters-bar">
            <div className="radar-search-wrapper">
              <HiOutlineSearch className="search-icon" />
              <input
                type="text"
                className="radar-search-input"
                placeholder="Search secondary targets by exam name, body, or acronym..."
                value={radarSearch}
                onChange={(e) => setRadarSearch(e.target.value)}
              />
            </div>

            <div className="radar-filters-group">
              <select
                className="radar-select"
                value={radarDomain}
                onChange={(e) => setRadarDomain(e.target.value)}
              >
                <option value="all">All Domains ({domains.length})</option>
                {domains.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                className="radar-select"
                value={radarFungibility}
                onChange={(e) => setRadarFungibility(e.target.value)}
              >
                <option value="all">All Fungibility Ratings</option>
                <option value="high">🟢 High Synergy (≥ 75%)</option>
                <option value="moderate">🟡 Moderate Synergy (50-74%)</option>
                <option value="divergent">🔴 Divergent (&lt; 50%)</option>
              </select>

              <select
                className="radar-select"
                value={radarJurisdiction}
                onChange={(e) => setRadarJurisdiction(e.target.value)}
              >
                <option value="all">All Jurisdictions</option>
                <option value="central">Central Govt / All-India</option>
                <option value="state">State PSC / Regional</option>
              </select>
            </div>
          </div>

          <div className="radar-results-header">
            <span>Showing <strong>{filteredRadarExams.length}</strong> compatible secondary targets for <strong>{primaryExam.name}</strong></span>
          </div>

          {/* Cards Grid */}
          <div className="radar-grid">
            {filteredRadarExams.slice(0, 36).map(item => {
              const domColor = getDomainColor(item.exam.domain)
              return (
                <div key={item.exam.id} className="radar-card">
                  <div className="card-top-row">
                    <span
                      className="radar-domain-badge"
                      style={{
                        background: `${domColor}18`,
                        color: domColor,
                        borderColor: `${domColor}33`
                      }}
                    >
                      {item.exam.domain}
                    </span>
                    <span className="radar-jur-badge">
                      {item.exam.jurisdiction === 'central' ? 'Central' : (item.exam.state || 'State')}
                    </span>
                  </div>

                  <h4 className="radar-exam-name">
                    {item.exam.name}
                  </h4>
                  <div className="radar-exam-acronym">
                    {item.exam.acronym ? item.exam.acronym : item.exam.conducting_body}
                  </div>

                  {/* Overlap Ring Indicator */}
                  <div className="radar-gauge-row">
                    <div className={`radar-score-pill ${item.verdictClass}`}>
                      <span className="radar-score-val">{item.overlapPercentage}%</span>
                      <span className="radar-score-lbl">OVERLAP</span>
                    </div>

                    <div className="radar-stats-col">
                      <span className="stat-shared text-emerald">
                        ✓ {item.sharedModules.length} Shared Modules
                      </span>
                      <span className="stat-delta text-amber">
                        {item.extraRequiredForB.length > 0 ? `+ ${item.extraRequiredForB.length} Delta Topics` : '0 Delta (Full Match)'}
                      </span>
                    </div>
                  </div>

                  {/* Specialized Core Barrier Warning */}
                  {item.missingSpecializedCores && item.missingSpecializedCores.length > 0 && (
                    <div className="radar-barrier-row">
                      <span className="barrier-badge" title={item.missingSpecializedCores.map(c => c.name).join(', ')}>
                        ⚡ Core Barrier: {item.missingSpecializedCores[0].name}
                        {item.missingSpecializedCores.length > 1 && ` +${item.missingSpecializedCores.length - 1}`}
                      </span>
                    </div>
                  )}

                  {/* Delta Preview */}
                  {item.extraRequiredForB.length > 0 && (
                    <div className="radar-delta-preview">
                      <span className="delta-preview-label">Requires:</span>
                      <div className="delta-chips-wrap">
                        {item.extraRequiredForB.slice(0, 2).map(m => (
                          <span key={m.id} className="mini-delta-chip">
                            {m.name.length > 25 ? `${m.name.slice(0, 22)}...` : m.name}
                          </span>
                        ))}
                        {item.extraRequiredForB.length > 2 && (
                          <span className="mini-delta-chip extra-count">
                            +{item.extraRequiredForB.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Actions */}
                  <div className="radar-card-actions">
                    <button
                      className="radar-action-deepdive"
                      onClick={() => handleSelectFromRadar(item.exam.id)}
                    >
                      <HiOutlineScale />
                      <span>Deep Dive</span>
                    </button>
                    {onViewDetails && (
                      <button
                        className="radar-action-dossier"
                        onClick={() => onViewDetails(item.exam)}
                        title="View Full Exam Dossier"
                      >
                        <HiOutlineExternalLink />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredRadarExams.length === 0 && (
            <div className="radar-empty-state">
              <HiOutlineSearch className="empty-icon" />
              <h4>No matching examinations found</h4>
              <p>Try adjusting your search keywords or broadening your fungibility filters.</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
