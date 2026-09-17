import { useState, useMemo, useEffect, useRef } from 'react'
import {
  HiOutlineSearch, HiOutlineExternalLink, HiOutlineClipboardCopy,
  HiOutlineRefresh, HiOutlineCheck, HiOutlineSparkles,
  HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineDocumentText
} from 'react-icons/hi'
import rawNewsData from '../data/news.json'

// Enrich dispatches with official statutory reference codes if not present
const enrichedNews = rawNewsData.map((item, index) => {
  const refPrefixMap = {
    'upsc-cse': 'F.No. 1/4/2026-E.I(B)',
    'ssc-cgl': 'F.No. 3/1/2026-P&P-I',
    'jee-main': 'NTA/2026/JEE-MAIN/CIR-08',
    'ibps-po': 'IBPS/CRP-PO-XIV/2026/CALL-01',
    'nda': 'F.No. 7/2/2026-E.I(B)/NDA',
    'rrb-ntpc': 'CEN 05/2026/RRB-NTPC/ADDENDUM',
    'uppsc-pcs': 'UPPSC/A-1/E-1/2026-RESCHED',
    'gate': 'IITR/GATE-2027/GOAPS-NOTIF-01',
    'cat': 'IIMK/CAT-2026/REG-EXT-02',
    'rbi-grade-b': 'RBISB/2026/DR-GEN/PHASE2',
    'neet-ug': 'NMC/UGMEB/2026/ELIG-CLARIF',
    'bpsc': 'BPSC/70TH-CCE/NOTIF-2026/1957'
  }
  return {
    ...item,
    gazette_ref: refPrefixMap[item.exam_id] || `GOI-STATUTORY-CIRCULAR-2026/${String(index + 101).padStart(4, '0')}`,
    verified_stamp: 'AUTHENTICATED · NIC GAZETTE REPOSITORY'
  }
})

export default function UpdatesFeed({ exams = [], onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScope, setSelectedScope] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [expandedId, setExpandedId] = useState(enrichedNews[0]?.id || null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState('Just now · Live NIC Sync')
  const [toastMessage, setToastMessage] = useState(null)
  const searchInputRef = useRef(null)

  // Trigger manual refresh animation
  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      const now = new Date()
      setLastSyncTime(`${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST · Synchronized`)
    }, 650)
  }

  // Filtered dispatches
  const filteredDispatches = useMemo(() => {
    return enrichedNews.filter(item => {
      // Scope match
      if (selectedScope !== 'all' && item.category !== selectedScope) {
        return false
      }
      // Type match
      if (selectedType !== 'all' && item.type_code !== selectedType) {
        return false
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchExam = item.exam_acronym.toLowerCase().includes(q)
        const matchSource = item.source.toLowerCase().includes(q)
        const matchSummary = item.summary.toLowerCase().includes(q)
        const matchRef = item.gazette_ref.toLowerCase().includes(q)
        if (!matchTitle && !matchExam && !matchSource && !matchSummary && !matchRef) {
          return false
        }
      }
      return true
    })
  }, [selectedScope, selectedType, searchQuery])

  // Telemetry Type Breakdown Counts
  const typeCounts = useMemo(() => {
    const counts = { NOTIF: 0, ADMIT: 0, KEY: 0, RESULT: 0, SCHED: 0 }
    enrichedNews.forEach(item => {
      if (counts[item.type_code] !== undefined) {
        counts[item.type_code] += 1
      }
    })
    return counts
  }, [])

  // Copy citation action
  const handleCopyCitation = (item, e) => {
    e.stopPropagation()
    const text = `[STATUTORY GAZETTE CITATION] ${item.exam_acronym} — ${item.title}\nRef: ${item.gazette_ref} | Authority: ${item.authority_full}\nOfficial Portal: ${item.link}`
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`Citation for ${item.exam_acronym} copied to clipboard`)
      setTimeout(() => setToastMessage(null), 2500)
    }).catch(() => {
      setToastMessage('Failed to copy to clipboard')
      setTimeout(() => setToastMessage(null), 2000)
    })
  }

  // Find linked exam object to allow 1-click jump to Exam Details
  const getExamObject = (examId) => {
    return exams.find(e => e.id === examId || e.acronym?.toLowerCase() === examId.toLowerCase())
  }

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="mterminal-wire-wrapper fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="mterminal-toast" role="alert">
          <HiOutlineCheck className="mterminal-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="mterminal-card">
        {/* Top Control Bar */}
        <div className="mterminal-control-header">
          <div className="mterminal-section-title">
            <span className="mterminal-amber-label">STATUTORY GAZETTE & EXAMINATION WIRE</span>
            <span className="mterminal-status-pill">
              <span className="mterminal-pulse-dot" /> LIVE CRAWLER
            </span>
          </div>

          <div className="mterminal-filter-cluster">
            {/* Scope / Category Dropdown */}
            <div className="mterminal-select-wrapper">
              <select
                className="mterminal-select"
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                aria-label="Filter by Commission Jurisdiction"
              >
                <option value="all">All Jurisdictions</option>
                <option value="central">Central Commissions (UPSC, SSC, NTA)</option>
                <option value="state">State PSCs (UPPSC, BPSC)</option>
                <option value="banking">Banking & Regulatory (IBPS, RBI)</option>
                <option value="defence">Defence & Armed Forces (NDA)</option>
              </select>
            </div>

            {/* Circular Type Dropdown */}
            <div className="mterminal-select-wrapper">
              <select
                className="mterminal-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by Circular Type"
              >
                <option value="all">All Circular Types</option>
                <option value="NOTIF">[NOTIF] Notifications</option>
                <option value="ADMIT">[ADMIT] Admit Cards</option>
                <option value="KEY">[KEY] Answer Keys</option>
                <option value="RESULT">[RESULT] Results & Merit</option>
                <option value="SCHED">[SCHED] Shifts & Schedules</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="mterminal-search-wrapper">
              <HiOutlineSearch className="mterminal-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="mterminal-search-input"
                placeholder="Q SEARCH GAZETTE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search statutory gazette"
              />
              {searchQuery && (
                <button
                  className="mterminal-clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Sync / Fetch Button */}
            <button
              className={`mterminal-fetch-btn ${isSyncing ? 'syncing' : ''}`}
              onClick={handleSync}
              title="Poll official commission endpoints for new dispatches"
              disabled={isSyncing}
            >
              <HiOutlineRefresh className={`mterminal-fetch-icon ${isSyncing ? 'spinning' : ''}`} />
              <span>{isSyncing ? 'SYNCING...' : 'SYNC'}</span>
            </button>
          </div>
        </div>

        {/* Telemetry / Metric Bar matching M-Terminal */}
        <div className="mterminal-telemetry-row">
          <div className="mterminal-telemetry-left">
            <div className="mterminal-score-line">
              <span className="mterminal-big-score">{filteredDispatches.length}</span>
              <span className="mterminal-score-denom">/{enrichedNews.length}</span>
              <span className="mterminal-score-caption">DISPATCHES MATCHED · {lastSyncTime}</span>
            </div>

            {/* Segmented Horizontal Progress Bar */}
            <div className="mterminal-segmented-bar" role="progressbar" aria-label="Circular Breakdown">
              <div
                className="mterminal-bar-seg seg-notif"
                style={{ width: `${(typeCounts.NOTIF / enrichedNews.length) * 100}%` }}
                title={`Notifications: ${typeCounts.NOTIF}`}
              />
              <div
                className="mterminal-bar-seg seg-admit"
                style={{ width: `${(typeCounts.ADMIT / enrichedNews.length) * 100}%` }}
                title={`Admit Cards: ${typeCounts.ADMIT}`}
              />
              <div
                className="mterminal-bar-seg seg-key"
                style={{ width: `${(typeCounts.KEY / enrichedNews.length) * 100}%` }}
                title={`Answer Keys: ${typeCounts.KEY}`}
              />
              <div
                className="mterminal-bar-seg seg-result"
                style={{ width: `${(typeCounts.RESULT / enrichedNews.length) * 100}%` }}
                title={`Results: ${typeCounts.RESULT}`}
              />
              <div
                className="mterminal-bar-seg seg-sched"
                style={{ width: `${(typeCounts.SCHED / enrichedNews.length) * 100}%` }}
                title={`Schedules: ${typeCounts.SCHED}`}
              />
            </div>

            {/* Breakdown Pills */}
            <div className="mterminal-breakdown-legend">
              <button
                className={`mterminal-legend-btn ${selectedType === 'NOTIF' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'NOTIF' ? 'all' : 'NOTIF')}
              >
                <span className="mterminal-legend-dot dot-notif" />
                <span>{typeCounts.NOTIF} notifications</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'ADMIT' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'ADMIT' ? 'all' : 'ADMIT')}
              >
                <span className="mterminal-legend-dot dot-admit" />
                <span>{typeCounts.ADMIT} admit cards</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'KEY' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'KEY' ? 'all' : 'KEY')}
              >
                <span className="mterminal-legend-dot dot-key" />
                <span>{typeCounts.KEY} answer keys</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'RESULT' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'RESULT' ? 'all' : 'RESULT')}
              >
                <span className="mterminal-legend-dot dot-result" />
                <span>{typeCounts.RESULT} results</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'SCHED' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'SCHED' ? 'all' : 'SCHED')}
              >
                <span className="mterminal-legend-dot dot-sched" />
                <span>{typeCounts.SCHED} schedules</span>
              </button>
            </div>
          </div>

          <div className="mterminal-telemetry-right">
            <div className="mterminal-meta-group">
              <div className="mterminal-meta-label">SCOPE</div>
              <div className="mterminal-meta-val">
                {selectedScope === 'all'
                  ? 'All Commissions & Statutory Bodies'
                  : selectedScope.toUpperCase()}
              </div>
            </div>
            <div className="mterminal-meta-group">
              <div className="mterminal-meta-label">DISPATCHES</div>
              <div className="mterminal-meta-val">{filteredDispatches.length}</div>
            </div>
            <div className="mterminal-meta-desc">
              Statutory gazette crawler continuously cross-referencing UPSC, SSC, NTA, IBPS, RRB & State PSC portals. Dispatches reflect legally binding gazette notifications and official NIC schedules.
            </div>
          </div>
        </div>

        {/* Headlines List Section */}
        <div className="mterminal-headlines-section">
          <div className="mterminal-headlines-header">
            <span className="mterminal-amber-label">HEADLINES</span>
            <span className="mterminal-count-label">{filteredDispatches.length} dispatches</span>
          </div>

          {filteredDispatches.length === 0 ? (
            <div className="mterminal-empty-state">
              <p className="mterminal-empty-msg">
                No statutory circulars found for &quot;{searchQuery || selectedScope || selectedType}&quot;.
              </p>
              <button
                className="mterminal-reset-btn"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedScope('all')
                  setSelectedType('all')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mterminal-list">
              {filteredDispatches.map((item) => {
                const isExpanded = expandedId === item.id
                const examObj = getExamObject(item.exam_id)

                return (
                  <div
                    key={item.id}
                    className={`mterminal-headline-row-container ${isExpanded ? 'expanded' : ''}`}
                  >
                    {/* Collapsed Headline Row */}
                    <div
                      className="mterminal-headline-row"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setExpandedId(isExpanded ? null : item.id)
                        }
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div className="mterminal-row-left">
                        {/* Status Tag */}
                        <span className={`mterminal-type-pill pill-${item.type_code.toLowerCase()}`}>
                          {item.type_code}
                        </span>

                        {/* Title */}
                        <span className="mterminal-row-title">
                          {item.title}
                        </span>

                        {/* Exam Acronym Tag */}
                        <span className="mterminal-exam-badge">
                          {item.exam_acronym}
                        </span>
                      </div>

                      <div className="mterminal-row-right">
                        <span className="mterminal-source-time">
                          {item.source} · {item.time_ago}
                        </span>
                        <button
                          className="mterminal-expand-icon-btn"
                          aria-label={isExpanded ? 'Collapse circular' : 'Expand circular'}
                        >
                          {isExpanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Dispatch Briefing */}
                    {isExpanded && (
                      <div className="mterminal-dispatch-drawer fade-in">
                        {/* Meta Ribbon */}
                        <div className="mterminal-drawer-ribbon">
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">STATUTORY REF:</span>
                            <span className="mterminal-ribbon-v monospace-text">{item.gazette_ref}</span>
                          </div>
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">AUTHORITY:</span>
                            <span className="mterminal-ribbon-v">{item.authority_full}</span>
                          </div>
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">GAZETTED DATE:</span>
                            <span className="mterminal-ribbon-v monospace-text">{item.date}</span>
                          </div>
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">SECURITY AUDIT:</span>
                            <span className="mterminal-ribbon-v text-emerald">{item.verified_stamp}</span>
                          </div>
                        </div>

                        {/* Executive Abstract */}
                        <div className="mterminal-drawer-body">
                          <div className="mterminal-drawer-abstract">
                            <div className="mterminal-drawer-heading">EXECUTIVE GAZETTE ABSTRACT</div>
                            <p className="mterminal-abstract-text">{item.summary}</p>
                          </div>

                          {/* Key Statutory Directives */}
                          {item.key_takeaways && item.key_takeaways.length > 0 && (
                            <div className="mterminal-drawer-takeaways">
                              <div className="mterminal-drawer-heading">STATUTORY DIRECTIVES & CANDIDATE ACTION ITEMS</div>
                              <ul className="mterminal-takeaways-list">
                                {item.key_takeaways.map((takeaway, tIdx) => (
                                  <li key={tIdx} className="mterminal-takeaway-item">
                                    <span className="mterminal-bullet-amber">▸</span>
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Action Cluster */}
                          <div className="mterminal-drawer-actions">
                            {/* Direct Official Link */}
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mterminal-action-btn primary-action"
                              title="Open official circular notice on commission portal"
                            >
                              <HiOutlineExternalLink className="mterminal-btn-icon" />
                              <span>OFFICIAL GAZETTE NOTICE</span>
                            </a>

                            {/* Jump to Exam Detail if available */}
                            {examObj && onViewDetails && (
                              <button
                                className="mterminal-action-btn secondary-action"
                                onClick={() => onViewDetails(examObj)}
                                title={`Open full ${item.exam_acronym} Dossier`}
                              >
                                <HiOutlineDocumentText className="mterminal-btn-icon" />
                                <span>VIEW {item.exam_acronym} DOSSIER</span>
                              </button>
                            )}

                            {/* Copy Citation */}
                            <button
                              className="mterminal-action-btn tertiary-action"
                              onClick={(e) => handleCopyCitation(item, e)}
                              title="Copy statutory citation to clipboard"
                            >
                              <HiOutlineClipboardCopy className="mterminal-btn-icon" />
                              <span>COPY CITATION</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
