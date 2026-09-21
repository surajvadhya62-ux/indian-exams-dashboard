import { useEffect, useRef, useState, useMemo } from 'react'
import {
  HiOutlineSearch, HiOutlineViewGrid, HiOutlineViewList,
  HiOutlineSortDescending, HiOutlineBookmark, HiOutlineX,
  HiOutlineFilter, HiOutlineAdjustments
} from 'react-icons/hi'

// Narrow phones cut the full placeholder off mid-word ("…name, condu"), which
// reads as a broken layout rather than a hint. Swap in the short version.
const NARROW_SCREEN = '(max-width: 640px)'

function useNarrowScreen() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(NARROW_SCREEN).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(NARROW_SCREEN)
    const onChange = (e) => setNarrow(e.matches)
    mq.addEventListener('change', onChange)
    setNarrow(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return narrow
}

const QUICK_DOMAINS = [
  { label: 'All Disciplines', domain: '' },
  { label: 'Govt Services', domain: 'Government Services' },
  { label: 'Engineering', domain: 'Engineering' },
  { label: 'Defence', domain: 'Defence' },
  { label: 'Law & Judiciary', domain: 'Law' },
  { label: 'Education', domain: 'Education' },
  { label: 'Finance & Banking', domain: 'Finance' },
  { label: 'Medical', domain: 'Medical' },
  { label: 'Research & Academia', domain: 'Research & Academia' },
  { label: 'Agriculture', domain: 'Agriculture' },
  { label: 'Management', domain: 'Management' },
  { label: 'Civil Services', domain: 'Civil Services' },
  { label: 'Insurance', domain: 'Insurance' },
  { label: 'Design', domain: 'Design' }
]

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  filters,
  onFilterChange,
  clearFilters,
  activeFilters,
  domains = [],
  levels = [],
  frequencies = [],
  states = [],
  centralCount = 0,
  stateCount = 0,
  resultCount = 0,
  totalCount = 0,
  sortBy,
  setSortBy,
  viewMode = 'grid',
  setViewMode,
  showOnlySaved,
  setShowOnlySaved,
  savedCount = 0,
  allExams = [],
  onSelectExam,
  screenerActive = false,
  onClearScreener
}) {
  const isStateScope = filters.jurisdiction === 'state'
  const isCentralScope = filters.jurisdiction === 'central'
  const searchInputRef = useRef(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showFilterDrawer, setShowFilterDrawer] = useState(false)
  const isNarrow = useNarrowScreen()

  // Keyboard shortcut: '/' focuses search input, 'Escape' blurs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (e.key === 'Escape') {
          e.target.blur()
          setShowSuggestions(false)
        }
        return
      }

      if (e.key === '/') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return []
    const q = searchQuery.toLowerCase().trim()
    return allExams
      .filter(e => e.name.toLowerCase().includes(q) || e.acronym.toLowerCase().includes(q))
      .slice(0, 6)
  }, [searchQuery, allExams])

  const handleScopeSelect = (scope) => {
    onFilterChange('jurisdiction', scope)
    if (scope === 'central') {
      onFilterChange('state', '')
    }
  }

  const handleQuickDomain = (item) => {
    onFilterChange('domain', item.domain)
  }

  const isQuickDomainActive = (item) => {
    if (!item.domain) return !filters.domain
    return filters.domain === item.domain
  }

  return (
    <div className="precision-query-hud" aria-label="Search and Registry Filters">
      {/* 1. Scope & Primary Segment Bar */}
      <div className="query-hud-top">
        <div className="query-scope-segments">
          <button
            type="button"
            className={`query-scope-pill ${!filters.jurisdiction && !showOnlySaved ? 'active' : ''}`}
            onClick={() => {
              setShowOnlySaved(false)
              handleScopeSelect('')
            }}
          >
            <span className="query-scope-icon">🌐</span>
            <span className="query-scope-text">All Examinations</span>
            <span className="query-scope-count">{totalCount}</span>
          </button>

          <button
            type="button"
            className={`query-scope-pill ${isCentralScope && !showOnlySaved ? 'active' : ''}`}
            onClick={() => {
              setShowOnlySaved(false)
              handleScopeSelect('central')
            }}
          >
            <span className="query-scope-icon">🏛️</span>
            <span className="query-scope-text">Central & All-India</span>
            <span className="query-scope-count">{centralCount}</span>
          </button>

          <button
            type="button"
            className={`query-scope-pill ${isStateScope && !showOnlySaved ? 'active' : ''}`}
            onClick={() => {
              setShowOnlySaved(false)
              handleScopeSelect('state')
            }}
          >
            <span className="query-scope-icon">🗺️</span>
            <span className="query-scope-text">State Government</span>
            <span className="query-scope-count">{stateCount}</span>
          </button>

          {savedCount > 0 && (
            <button
              type="button"
              className={`query-scope-pill radar-scope ${showOnlySaved ? 'active' : ''}`}
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              title="Filter to examinations pinned on your Active Radar"
            >
              <HiOutlineBookmark className="query-scope-icon text-amber" />
              <span className="query-scope-text">Active Radar</span>
              <span className="query-scope-count highlight-amber">{savedCount}</span>
            </button>
          )}
        </div>

        {/* State Commission Filter if State scope selected */}
        {(isStateScope || states?.length > 0) && (
          <div className="query-state-select-wrapper">
            <select
              className="query-select-pill"
              value={filters.state}
              onChange={(e) => {
                const val = e.target.value
                onFilterChange('state', val)
                if (val && !filters.jurisdiction) {
                  onFilterChange('jurisdiction', 'state')
                }
              }}
            >
              <option value="">🏛️ {isStateScope ? 'All 28 States & 8 UTs' : 'Filter State / UT'}</option>
              {states?.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 2. Precision Search Bar with Keyboard Hotkey */}
      <div className="query-search-container">
        <div className="query-search-box">
          <HiOutlineSearch className="query-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="query-search-input"
            placeholder={isNarrow
              ? `Search ${totalCount || 509} exams...`
              : `Search ${totalCount || 509} exams by acronym, name, conducting commission (UPSC, NTA, SSC, BPSC), or cadre...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
          />
          {searchQuery ? (
            <button
              type="button"
              className="query-search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search query"
            >
              <HiOutlineX />
            </button>
          ) : (
            <span className="query-search-kbd" title="Press / anywhere to search">/</span>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="query-suggestions-menu">
            <div className="suggestions-header">Quick Registry Matches</div>
            {suggestions.map(exam => (
              <div
                key={exam.id}
                className="suggestion-row"
                onClick={() => {
                  setShowSuggestions(false)
                  if (onSelectExam) {
                    onSelectExam(exam)
                  } else {
                    setSearchQuery(exam.name)
                  }
                }}
              >
                <span className="suggestion-acronym">{exam.acronym}</span>
                <span className="suggestion-name">{exam.name}</span>
                <span className="suggestion-body">{exam.conducting_body}</span>
                <span className="suggestion-domain-tag">{exam.domain}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Quick Domain Segmented Chips */}
      <div className="query-quick-domains">
        <div className="quick-domains-label">DISCIPLINE //</div>
        <div className="quick-domains-scroll">
          {QUICK_DOMAINS.map(d => {
            const active = isQuickDomainActive(d)
            return (
              <button
                key={d.label}
                type="button"
                className={`quick-domain-chip ${active ? 'active' : ''}`}
                onClick={() => handleQuickDomain(d)}
              >
                {d.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Secondary Filter Bar & View Controls */}
      <div className="query-controls-strip">
        <div className="controls-left">
          {/* Discipline Filter (All 20 Domains) */}
          <select
            className="hud-select"
            value={filters.domain}
            onChange={(e) => onFilterChange('domain', e.target.value)}
          >
            <option value="">Discipline: All ({domains.length})</option>
            {domains.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* Streamlined Entry Level Filter */}
          <select
            className="hud-select"
            value={filters.level}
            onChange={(e) => onFilterChange('level', e.target.value)}
          >
            <option value="">Entry Level: All Qualifications</option>
            <option value="10th">10th Pass / Secondary</option>
            <option value="12th">12th Pass / Intermediate</option>
            <option value="diploma">Diploma / Polytechnic / ITI</option>
            <option value="graduate">Graduate / Bachelor's Degree</option>
            <option value="postgraduate">Postgraduate / Master's Degree</option>
            <option value="doctoral">Doctoral / Ph.D. / Research</option>
          </select>

          {/* Type Filter */}
          <select
            className="hud-select"
            value={filters.track}
            onChange={(e) => onFilterChange('track', e.target.value)}
          >
            <option value="">Type: All Types</option>
            <option value="A">🎓 Admission Exam</option>
            <option value="R">💼 Job Recruitment</option>
            <option value="Q">📜 Professional Qualification</option>
          </select>

          {/* Frequency Filter */}
          <select
            className="hud-select"
            value={filters.frequency}
            onChange={(e) => onFilterChange('frequency', e.target.value)}
          >
            <option value="">Frequency: All</option>
            {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          {/* Sort Selector */}
          <div className="hud-sort-group">
            <HiOutlineSortDescending className="hud-sort-icon" />
            <select
              className="hud-select sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Sort: High Popularity</option>
              <option value="name_asc">Sort: Title (A to Z)</option>
              <option value="name_desc">Sort: Title (Z to A)</option>
              <option value="domain">Sort: Domain</option>
              <option value="state">Sort: State / Region</option>
            </select>
          </div>
        </div>

        <div className="controls-right">
          {/* Active Screener Badge */}
          {screenerActive && (
            <button
              type="button"
              className="hud-active-filter-pill screener-pill"
              onClick={onClearScreener}
              title="Clear Screener Eligibility Filter"
            >
              🎯 Screener Active ✕
            </button>
          )}

          {/* Clear All Filters */}
          {activeFilters?.length > 0 && (
            <button
              type="button"
              className="hud-clear-all-btn"
              onClick={clearFilters}
            >
              ✕ Reset Filters
            </button>
          )}

          {/* Result Count Metric */}
          <div className="hud-result-counter">
            <span className="count-bold">{resultCount}</span>
            <span className="count-total">of {totalCount} exams</span>
          </div>

          {/* View Mode Toggle: Grid vs Data Matrix Table */}
          {setViewMode && (
            <div className="hud-view-switcher" role="group" aria-label="Workstation View Layout">
              <button
                type="button"
                className={`view-switch-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Dossier Grid View"
                aria-label="Grid View"
              >
                <HiOutlineViewGrid />
                <span className="view-switch-text">Grid</span>
              </button>
              <button
                type="button"
                className={`view-switch-btn ${viewMode === 'table' || viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="High-Density Data Matrix Table"
                aria-label="Matrix Table View"
              >
                <HiOutlineViewList />
                <span className="view-switch-text">Table</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
