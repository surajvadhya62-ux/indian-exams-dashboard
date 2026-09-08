import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchFilter({
  searchQuery, setSearchQuery, filters, onFilterChange, clearFilters,
  activeFilters, domains, levels, frequencies, resultCount, totalCount
}) {
  return (
    <div className="search-filter-section">
      <div className="search-bar-wrapper">
        <HiOutlineSearch className="search-icon" />
        <input
          id="exam-search"
          type="text"
          className="search-bar"
          placeholder="Search exams by name, acronym, domain, conducting body..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
          <option value="entrance">Entrance Exams</option>
          <option value="job">Job / Recruitment</option>
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

      {activeFilters.length > 0 && (
        <div className="filter-chips">
          {activeFilters.map(([key, value]) => (
            <span key={key} className="filter-chip">
              {key === 'exam_type' ? (value === 'entrance' ? 'Entrance' : 'Job') : value}
              <button onClick={() => onFilterChange(key, '')}>×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
