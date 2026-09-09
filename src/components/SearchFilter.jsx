import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchFilter({
  searchQuery, setSearchQuery, filters, onFilterChange, clearFilters,
  activeFilters, domains, levels, frequencies, states,
  centralCount, stateCount, resultCount, totalCount
}) {
  const isStateScope = filters.jurisdiction === 'state'
  const isCentralScope = filters.jurisdiction === 'central'

  const handleScopeSelect = (scope) => {
    onFilterChange('jurisdiction', scope)
    if (scope === 'central') {
      onFilterChange('state', '')
    }
  }

  return (
    <div className="search-filter-section">
      {/* Scope Selector: Central vs State vs All */}
      <div className="scope-selector-wrapper">
        <div className="scope-pills">
          <button
            id="scope-all"
            className={`scope-pill ${!filters.jurisdiction ? 'active' : ''}`}
            onClick={() => handleScopeSelect('')}
          >
            🌐 All Examinations
            <span className="scope-pill-count">{totalCount}</span>
          </button>
          <button
            id="scope-central"
            className={`scope-pill ${isCentralScope ? 'active' : ''}`}
            onClick={() => handleScopeSelect('central')}
          >
            🇮🇳 Central & All-India
            <span className="scope-pill-count">{centralCount}</span>
          </button>
          <button
            id="scope-state"
            className={`scope-pill ${isStateScope ? 'active state-active' : ''}`}
            onClick={() => handleScopeSelect('state')}
          >
            🏛️ State Government
            <span className="scope-pill-count">{stateCount}</span>
          </button>
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

      {/* Search Input */}
      <div className="search-bar-wrapper">
        <HiOutlineSearch className="search-icon" />
        <input
          id="exam-search"
          type="text"
          className="search-bar"
          placeholder="Search exams by name, acronym, domain, conducting body, role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Secondary Filters Bar */}
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
          <option value="">All Levels</option>
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

        {activeFilters.length > 0 && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            ✕ Clear All
          </button>
        )}

        <div className="results-count">
          <span>{resultCount}</span> of {totalCount} exams
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="filter-chips">
          {activeFilters.map(([key, value]) => {
            let label = value
            if (key === 'jurisdiction') {
              label = value === 'central' ? 'Scope: Central & All-India' : 'Scope: State Government'
            } else if (key === 'state') {
              label = `State: ${value}`
            } else if (key === 'exam_type') {
              label = value === 'entrance' ? 'Type: Entrance' : 'Type: Job'
            } else if (key === 'domain') {
              label = `Domain: ${value}`
            } else if (key === 'level') {
              label = `Level: ${value}`
            } else if (key === 'frequency') {
              label = `Frequency: ${value}`
            }
            return (
              <span key={key} className="filter-chip">
                {label}
                <button onClick={() => onFilterChange(key, '')}>×</button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

