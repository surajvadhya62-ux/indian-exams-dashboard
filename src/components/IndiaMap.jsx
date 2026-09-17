import { useState, useMemo } from 'react'
import { INDIA_MAP_PATH, INDIA_MAP_VIEWBOX } from './IndiaMapPath'
import {
  HiOutlineLocationMarker, HiOutlineFilter, HiOutlineSearch,
  HiOutlineArrowRight, HiOutlineInformationCircle
} from 'react-icons/hi'

// State geographic centroids on the Lambert projection (0 0 600 650)
const STATE_COORDINATES = [
  { name: 'Jammu & Kashmir', code: 'JK', x: 200, y: 95, zone: 'North' },
  { name: 'Ladakh', code: 'LA', x: 245, y: 70, zone: 'North' },
  { name: 'Himachal Pradesh', code: 'HP', x: 215, y: 135, zone: 'North' },
  { name: 'Punjab', code: 'PB', x: 185, y: 160, zone: 'North' },
  { name: 'Chandigarh', code: 'CH', x: 198, y: 168, zone: 'North' },
  { name: 'Uttarakhand', code: 'UK', x: 250, y: 165, zone: 'North' },
  { name: 'Haryana', code: 'HR', x: 205, y: 190, zone: 'North' },
  { name: 'Delhi', code: 'DL', x: 220, y: 205, zone: 'North' },
  { name: 'Rajasthan', code: 'RJ', x: 155, y: 245, zone: 'North' },
  { name: 'Uttar Pradesh', code: 'UP', x: 275, y: 235, zone: 'North' },
  { name: 'Bihar', code: 'BR', x: 360, y: 255, zone: 'East' },
  { name: 'West Bengal', code: 'WB', x: 395, y: 310, zone: 'East' },
  { name: 'Jharkhand', code: 'JH', x: 345, y: 300, zone: 'East' },
  { name: 'Odisha', code: 'OD', x: 345, y: 365, zone: 'East' },
  { name: 'Madhya Pradesh', code: 'MP', x: 245, y: 295, zone: 'Central' },
  { name: 'Chhattisgarh', code: 'CG', x: 295, y: 340, zone: 'Central' },
  { name: 'Gujarat', code: 'GJ', x: 120, y: 300, zone: 'West' },
  { name: 'Maharashtra', code: 'MH', x: 200, y: 380, zone: 'West' },
  { name: 'Goa', code: 'GA', x: 172, y: 465, zone: 'West' },
  { name: 'Karnataka', code: 'KA', x: 200, y: 470, zone: 'South' },
  { name: 'Telangana', code: 'TS', x: 255, y: 395, zone: 'South' },
  { name: 'Andhra Pradesh', code: 'AP', x: 265, y: 450, zone: 'South' },
  { name: 'Tamil Nadu', code: 'TN', x: 240, y: 535, zone: 'South' },
  { name: 'Kerala', code: 'KL', x: 210, y: 540, zone: 'South' },
  { name: 'Puducherry', code: 'PY', x: 262, y: 515, zone: 'South' },
  { name: 'Sikkim', code: 'SK', x: 380, y: 210, zone: 'North-East' },
  { name: 'Assam', code: 'AS', x: 465, y: 230, zone: 'North-East' },
  { name: 'Arunachal Pradesh', code: 'AR', x: 505, y: 180, zone: 'North-East' },
  { name: 'Meghalaya', code: 'ML', x: 450, y: 245, zone: 'North-East' },
  { name: 'Nagaland', code: 'NL', x: 510, y: 225, zone: 'North-East' },
  { name: 'Manipur', code: 'MN', x: 505, y: 255, zone: 'North-East' },
  { name: 'Mizoram', code: 'MZ', x: 485, y: 285, zone: 'North-East' },
  { name: 'Tripura', code: 'TR', x: 465, y: 280, zone: 'North-East' },
  { name: 'Andaman & Nicobar', code: 'AN', x: 495, y: 520, zone: 'South' },
  { name: 'Lakshadweep', code: 'LD', x: 155, y: 535, zone: 'South' }
]

export default function IndiaMap({ exams = [], onApplyFilter }) {
  const [hoveredState, setHoveredState] = useState(null)
  const [selectedZone, setSelectedZone] = useState('All')
  const [searchFilter, setSearchFilter] = useState('')

  // Aggregate stats per state
  const stateStats = useMemo(() => {
    const statsMap = {}
    exams.forEach(e => {
      if (e.state && e.state !== 'All India') {
        if (!statsMap[e.state]) {
          statsMap[e.state] = {
            count: 0,
            bodies: {},
            domains: {}
          }
        }
        statsMap[e.state].count++
        const body = e.conducting_body || 'PSC'
        statsMap[e.state].bodies[body] = (statsMap[e.state].bodies[body] || 0) + 1
        const domain = e.domain || 'General'
        statsMap[e.state].domains[domain] = (statsMap[e.state].domains[domain] || 0) + 1
      }
    })
    return statsMap
  }, [exams])

  // Combine coordinate data with counts
  const enrichedStates = useMemo(() => {
    return STATE_COORDINATES.map(item => {
      const stats = stateStats[item.name] || { count: 0, bodies: {}, domains: {} }
      const topBody = Object.entries(stats.bodies).sort((a, b) => b[1] - a[1])[0]?.[0] || 'State PSC'
      const topDomain = Object.entries(stats.domains).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Civil Services'
      return {
        ...item,
        count: stats.count,
        topBody,
        topDomain
      }
    }).sort((a, b) => b.count - a.count)
  }, [stateStats])

  const maxCount = useMemo(() => {
    return Math.max(...enrichedStates.map(s => s.count), 1)
  }, [enrichedStates])

  // Filtered leaderboard
  const filteredLeaderboard = useMemo(() => {
    return enrichedStates.filter(s => {
      const matchZone = selectedZone === 'All' || s.zone === selectedZone
      const matchQuery = !searchFilter ||
        s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
        s.topBody.toLowerCase().includes(searchFilter.toLowerCase())
      return matchZone && matchQuery
    })
  }, [enrichedStates, selectedZone, searchFilter])

  // Color helper based on count
  const getDensityColor = (count) => {
    if (count >= 15) return '#ef4444' // Red (High)
    if (count >= 10) return '#f59e0b' // Amber (Medium-High)
    if (count >= 5) return '#10b981'  // Green (Medium)
    if (count > 0) return '#0ea5e9'   // Sky Blue (Moderate)
    return '#64748b'                  // Muted Slate (0 or unindexed)
  }

  const getRadius = (count) => {
    if (count >= 15) return 14
    if (count >= 10) return 12
    if (count >= 5) return 9.5
    if (count > 0) return 7.5
    return 5
  }

  const handleStateClick = (stateName) => {
    if (onApplyFilter) {
      onApplyFilter('state', stateName)
    }
  }

  const zones = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East']

  return (
    <div className="india-map-module chart-card">
      <div className="chart-header-row" style={{ flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 className="chart-card-title">
            🗺️ Interactive National Examination Density Map
          </h3>
          <span className="chart-card-subtitle">
            Geospatial concentration of 253 state public service and departmental recruitment examinations
          </span>
        </div>
        <div className="map-legend-row">
          <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} /> 15+ Exams</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} /> 10-14</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} /> 5-9</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: '#0ea5e9' }} /> 1-4</span>
        </div>
      </div>

      {/* Zone Selector */}
      <div className="map-zone-tabs">
        {zones.map(z => (
          <button
            key={z}
            className={`map-zone-btn ${selectedZone === z ? 'active' : ''}`}
            onClick={() => setSelectedZone(z)}
          >
            {z === 'All' ? '🇮🇳 Pan-India' : z}
          </button>
        ))}
      </div>

      <div className="india-map-layout">
        {/* SVG Map Canvas */}
        <div className="india-map-canvas-wrapper">
          <svg
            viewBox={INDIA_MAP_VIEWBOX}
            className="india-svg-map"
            aria-label="Interactive Map of India with examination density"
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--panel-bg, #0d121c)" />
                <stop offset="100%" stopColor="var(--card-bg, #151b27)" />
              </linearGradient>
            </defs>

            {/* Official Survey of India Boundary Path */}
            <path
              d={INDIA_MAP_PATH}
              className="india-national-boundary"
              fill="url(#mapGradient)"
              stroke="var(--hairline-2, rgba(255,255,255,0.18))"
              strokeWidth="1.8"
            />

            {/* State Markers */}
            {enrichedStates.map(st => {
              const color = getDensityColor(st.count)
              const r = getRadius(st.count)
              const isHovered = hoveredState?.name === st.name
              const isDimmed = selectedZone !== 'All' && st.zone !== selectedZone

              return (
                <g
                  key={st.name}
                  className={`state-marker-group ${isHovered ? 'hovered' : ''} ${isDimmed ? 'dimmed' : ''}`}
                  onClick={() => handleStateClick(st.name)}
                  onMouseEnter={() => setHoveredState(st)}
                  onMouseLeave={() => setHoveredState(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulse wave for top density states */}
                  {st.count >= 12 && !isDimmed && (
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={r + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth="1.2"
                      opacity="0.4"
                      className="state-pulse-wave"
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={isHovered ? r + 3 : r}
                    fill={color}
                    stroke="#0b0e14"
                    strokeWidth={isHovered ? '2.5' : '1.5'}
                    filter={isHovered ? 'url(#glow)' : undefined}
                    className="state-marker-circle"
                  />

                  {/* State Code / Count Text */}
                  {st.count > 0 && (
                    <text
                      x={st.x}
                      y={st.y + 3.5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={r >= 12 ? '9' : '7.5'}
                      fontWeight="700"
                      fontFamily="var(--font-mono, monospace)"
                      pointerEvents="none"
                    >
                      {st.count}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Floating Hover Card */}
          {hoveredState && (
            <div className="map-hover-card fade-in">
              <div className="map-hover-header">
                <span className="map-hover-zone">{hoveredState.zone} Zone</span>
                <span className="map-hover-count" style={{ color: getDensityColor(hoveredState.count) }}>
                  {hoveredState.count} Exams
                </span>
              </div>
              <h4 className="map-hover-title">{hoveredState.name}</h4>
              <p className="map-hover-body">
                Primary Body: <strong>{hoveredState.topBody}</strong>
              </p>
              <div className="map-hover-action">
                Click to inspect state registry <HiOutlineArrowRight />
              </div>
            </div>
          )}
        </div>

        {/* State Leaderboard & Breakdown Panel */}
        <div className="india-map-leaderboard">
          <div className="leaderboard-search-box">
            <HiOutlineSearch className="leaderboard-search-icon" />
            <input
              type="text"
              className="leaderboard-search-input"
              placeholder="Filter states or commissions..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
            />
            {searchFilter && (
              <button className="leaderboard-clear-btn" onClick={() => setSearchFilter('')}>✕</button>
            )}
          </div>

          <div className="leaderboard-scroll-area">
            {filteredLeaderboard.map((st, idx) => {
              const color = getDensityColor(st.count)
              const pct = ((st.count / maxCount) * 100).toFixed(0)
              const isHovered = hoveredState?.name === st.name

              return (
                <div
                  key={st.name}
                  className={`leaderboard-item ${isHovered ? 'active' : ''}`}
                  onClick={() => handleStateClick(st.name)}
                  onMouseEnter={() => setHoveredState(st)}
                  onMouseLeave={() => setHoveredState(null)}
                >
                  <div className="leaderboard-rank">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>

                  <div className="leaderboard-info">
                    <div className="leaderboard-info-top">
                      <span className="leaderboard-state-name">{st.name}</span>
                      <span className="leaderboard-count" style={{ color }}>
                        {st.count} {st.count === 1 ? 'exam' : 'exams'}
                      </span>
                    </div>

                    <div className="leaderboard-progress-bg">
                      <div
                        className="leaderboard-progress-fill"
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    </div>

                    <div className="leaderboard-sub-meta">
                      <span>{st.topBody}</span>
                      <span>{st.zone}</span>
                    </div>
                  </div>

                  <div className="leaderboard-action-btn" title={`Filter registry by ${st.name}`}>
                    <HiOutlineArrowRight />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="leaderboard-footer">
            <HiOutlineInformationCircle />
            <span>Click any state or row to view its exact examination dossiers in the registry.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
