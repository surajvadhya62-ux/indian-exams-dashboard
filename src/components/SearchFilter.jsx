import { useEffect, useRef, useState } from 'react'
import {
  HiOutlineSearch, HiOutlineViewGrid, HiOutlineViewList,
  HiOutlineSortDescending, HiOutlineBookmark, HiOutlineX
} from 'react-icons/hi'

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
  filters,
  onFilterChange,
  clearFilters,
  activeFilters,
  domains,
  levels,
  frequencies,
  states,
  centralCount,
  stateCount,
  resultCount,
  totalCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showOnlySaved,
  setShowOnlySaved,
  savedCount,
  allExams = [],
  onSelectExam
}) {
  const isStateScope = filters.jurisdiction === 'state'
  const isCentralScope = filters.jurisdiction === 'central'
  const searchInputRef = useRef(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Global keyboard shortcut: press '/' to focus search, 'Escape' to blur/clear
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid stealing keypress when user is already typing in an input or select
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

  // Quick Autocomplete suggestions
  const suggestions = searchQuery.trim().length >= 2
    ? allExams.filter(exam =>
        exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.acronym.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const handleScopeSelect = (scope) => {
    onFilterChange('jurisdiction', scope)
    if (scope === 'central') {
      onFilterChange('state', '')
    }
  }

  return (
    <div className="search-filter-section">
      {/* Scope Selector: Central vs State vs All + Saved Quick Filter */}
      <div className="scope-selector-wrapper">
        <div className="scope-pills">
          <button
            id="scope-all"
            className={`scope-pill ${!filters.jurisdiction && !showOnlySaved ? 'active' : ''}`}
            onClick={() => {
              setShowOnlySaved(false)
              handleScopeSelect('')
            }}
          >
            🌐 All Examinations
            <span className="scope-pill-count">{totalCount}</span>
          </button>

          <button
            id="scope-central"
            className={`scope-pill ${isCentralScope && !showOnlySaved ? 'active' : ''}`}
            onClick={() => {
              setShowOnlySaved(false)
              handleScopeSelect('central')
            }}
          >
            🇮🇳 Central & All-India
            <span className="scope-pill-count">{centralCount}</span>
          </button>

          <button
            id="scope-state"
            className={`scope-pill ${isStateScope && !showOnlySaved ? 'active state-active' : ''}`}
            onClick={() => {
              setShowOnlySaved(false)
              handleScopeSelect('state')
            }}
          >
            🏛️ State Government
            <span className="scope-pill-count">{stateCount}</span>
          </button>

          {savedCount > 0 && (
            <button
              id="scope-saved"
              className={`scope-pill saved-pill ${showOnlySaved ? 'active saved-active' : ''}`}
              onClick={() => setShowOnlySaved(!showOnlySaved)}
              title="View your saved / bookmarked exams"
            >
              <HiOutlineBookmark /> Saved
              <span className="scope-pill-count">{savedCount}</span>
            </button>
          )}
        </div>

        {/* Quick State Selector when in State scope or when browsing */}
        {(isStateScope || states?.length > 0) && (
          <div className="scope-state-filter">
            <select
              id="filter-state-select"
              className="state-select"
              value={filters.state}
              onChange={(e) => {
                const val = e.target.value
                onFilterChange('state', val)
                if (val && !filters.jurisdiction) {
                  onFilterChange('jurisdiction', 'state')
                }
              }}
            >
              <option value="">🏛️ {isStateScope ? 'All States & UTs' : 'Filter by State / UT'}</option>
              {states?.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Hero Search Bar with Shortcut hint and Autocomplete */}
      <div className="search-bar-wrapper">
        <HiOutlineSearch className="search-icon" />
        <input
          ref={searchInputRef}
          id="exam-search"
          type="text"
          className="search-bar"
          placeholder="Search 504 exams by title, acronym, domain, conducting commission, or role..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        {searchQuery ? (
          <button
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <HiOutlineX />
          </button>
        ) : (
          <div className="search-kbd-hint" title="Press / anywhere to search">/</div>
        )}

        {/* Autocomplete Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions-dropdown slide-up">
            <div className="suggestions-header">Quick Matches</div>
            {suggestions.map(exam => (
              <div
                key={exam.id}
                className="suggestion-item"
                onClick={() => {
                  setShowSuggestions(false)
                  if (onSelectExam) {
                    onSelectExam(exam)
                  } else {
                    setSearchQuery(exam.name)
                  }
                }}
              >
                <span className="suggestion-name">{exam.name}</span>
                <span className="suggestion-acronym">{exam.acronym}</span>
                <span className="suggestion-domain">{exam.domain}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Secondary Filters Bar + Sort Controls + View Toggle */}
      <div className="filter-bar">
        <select
          id="filter-domain"
          className="filter-select"
          value={filters.domain}
          onChange={(e) => onFilterChange('domain', e.target.value)}
        >
          <option value="">All Domains</option>
          {domains.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          id="filter-level"
          className="filter-select"
          value={filters.level}
          onChange={(e) => onFilterChange('level', e.target.value)}
        >
          <option value="">All Entry Levels</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select
          id="filter-type"
          className="filter-select"
          value={filters.exam_type}
          onChange={(e) => onFilterChange('exam_type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="entrance">🎓 Entrance Exams</option>
          <option value="job">💼 Job / Recruitment</option>
        </select>

        <select
          id="filter-frequency"
          className="filter-select"
          value={filters.frequency}
          onChange={(e) => onFilterChange('frequency', e.target.value)}
        >
          <option value="">All Frequencies</option>
          {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
        </select>

        {/* Sort Controls */}
        <div className="sort-wrapper">
          <HiOutlineSortDescending className="sort-icon" />
          <select
            id="sort-by-select"
            className="filter-select sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity">Sort: High Popularity</option>
            <option value="name_asc">Sort: Name (A to Z)</option>
            <option value="name_desc">Sort: Name (Z to A)</option>
            <option value="domain">Sort: Domain</option>
            <option value="state">Sort: State / Region</option>
          </select>
        </div>

        {/* Grid vs List View Switcher */}
        {setViewMode && (
          <div className="view-mode-toggle" role="group" aria-label="View layout">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Card Grid View"
              aria-label="Grid view"
            >
              <HiOutlineViewGrid />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Dense List View"
              aria-label="List view"
            >
              <HiOutlineViewList />
            </button>
          </div>
        )}

        {activeFilters.length > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            ✕ Clear All
          </button>
        )}

        <div className="results-count">
          <span>{resultCount}</span> of {totalCount} exams
        </div>
      </div>
    </div>
  )
}
