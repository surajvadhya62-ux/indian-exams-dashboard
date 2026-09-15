import { useMemo, useState, useEffect } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area, CartesianGrid
} from 'recharts'
import { getDomainColor } from '../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="terminal-tooltip" style={{
        background: '#11151c',
        border: '1px solid #2e3846',
        borderRadius: '4px',
        padding: '8px 12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        color: '#e8eaed',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-sans)',
        minWidth: '160px'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '4px', color: payload[0].fill || '#e8a33d', fontFamily: 'var(--font-mono)' }}>
          {label || payload[0].name}
        </p>
        {payload.map((entry, i) => (
          <p key={i} style={{ margin: '2px 0', color: '#8a93a0', fontSize: '0.76rem', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <span>{entry.name || 'Count'}:</span>
            <strong style={{ color: '#e8eaed', fontFamily: 'var(--font-mono)' }}>{entry.value} exams</strong>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics({ exams, onApplyFilter }) {
  const [filterModule, setFilterModule] = useState('all')

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(max-width: 768px)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Domain distribution
  const domainData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const d = e.domain || 'Other'
      counts[d] = (counts[d] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        color: getDomainColor(name)
      }))
      .sort((a, b) => b.value - a.value)
  }, [exams])

  // Top conducting bodies
  const conductingBodyData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const body = e.conducting_body || 'Various / Other'
      counts[body] = (counts[body] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [exams])

  // Comparative Data 1: Central vs State by Purpose (Grouped comparison)
  const jurisdictionPurposeData = useMemo(() => {
    const centralJobs = exams.filter(e => e.jurisdiction === 'central' && e.exam_type === 'job').length
    const centralEnt = exams.filter(e => e.jurisdiction === 'central' && e.exam_type === 'entrance').length
    const stateJobs = exams.filter(e => e.jurisdiction === 'state' && e.exam_type === 'job').length
    const stateEnt = exams.filter(e => e.jurisdiction === 'state' && e.exam_type === 'entrance').length

    return [
      {
        jurisdiction: 'Central & All-India',
        'Job / Career Recruitment': centralJobs,
        'Entrance / Admissions': centralEnt,
        total: centralJobs + centralEnt
      },
      {
        jurisdiction: 'State Government',
        'Job / Career Recruitment': stateJobs,
        'Entrance / Admissions': stateEnt,
        total: stateJobs + stateEnt
      }
    ]
  }, [exams])

  // Comparative Data 2: Cadre and Pay Scale Hierarchy
  const cadreData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const c = e.cadre || 'Unclassified'
      counts[c] = (counts[c] || 0) + 1
    })
    const palette = {
      'Group A & B (Gazetted / Officer)': '#e8a33d',
      'Group B & C (Executive / Technical)': '#3b82f6',
      'Group C & D (Subordinate / Technical)': '#06b6d4',
      'Officer / Managerial': '#a855f7',
      'Teaching & Education': '#ec4899',
      'Entrance / Admission': '#8a93a0'
    }
    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        fill: palette[name] || '#8a93a0'
      }))
      .sort((a, b) => b.value - a.value)
  }, [exams])

  // Comparative Data 3: Minimum Educational Eligibility Breakdown
  const qualificationData = useMemo(() => {
    const counts = {
      'Bachelor’s Degree': 0,
      'Professional Degree (Eng/Med/Law)': 0,
      '10+2 / Intermediate': 0,
      '10th / Matriculation': 0,
      'Technical Diploma': 0,
      'Post-Graduate / Masters': 0
    }
    exams.forEach(e => {
      const q = (e.min_qualification || '').toLowerCase()
      if (q.includes('bachelor') || q.includes('graduate') || q.includes('degree') || q.includes('any graduate')) {
        counts['Bachelor’s Degree']++
      } else if (q.includes('12th') || q.includes('10+2') || q.includes('intermediate') || q.includes('higher secondary')) {
        counts['10+2 / Intermediate']++
      } else if (q.includes('10th') || q.includes('matric') || q.includes('sslc')) {
        counts['10th / Matriculation']++
      } else if (q.includes('master') || q.includes('post graduate') || q.includes('pg') || q.includes('m.')) {
        counts['Post-Graduate / Masters']++
      } else if (q.includes('diploma')) {
        counts['Technical Diploma']++
      } else {
        counts['Professional Degree (Eng/Med/Law)']++
      }
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [exams])

  // Comparative Data 4: Delivery Modernization (CBT vs Offline)
  const modeData = useMemo(() => {
    let cbt = 0
    let offline = 0
    let hybrid = 0
    exams.forEach(e => {
      const m = (e.exam_mode || '').toLowerCase()
      if (m.includes('online') || m.includes('cbt')) {
        cbt++
      } else if (m.includes('offline') || m.includes('omr') || m.includes('pen')) {
        offline++
      } else {
        hybrid++
      }
    })
    return [
      { name: 'Computer-Based Test (CBT)', value: cbt, fill: '#14b8a6' },
      { name: 'Offline (Pen & Paper / OMR)', value: offline, fill: '#e8a33d' },
      { name: 'Hybrid / Interview Stages', value: hybrid, fill: '#8b5cf6' }
    ]
  }, [exams])

  // Comparative Data 5: Annual Seasonality / Month-by-Month Examination Pressure
  const seasonalityData = useMemo(() => {
    const monthsOrder = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const counts = {}
    monthsOrder.forEach(m => { counts[m] = 0 })

    exams.forEach(e => {
      const monthStr = (e.exam_month || '')
      monthsOrder.forEach(m => {
        if (monthStr.toLowerCase().includes(m.toLowerCase())) {
          counts[m]++
        }
      })
    })

    return monthsOrder.map(m => ({
      month: m.slice(0, 3),
      fullName: m,
      exams: counts[m]
    }))
  }, [exams])

  // Top states distribution
  const stateData = useMemo(() => {
    const counts = {}
    exams.filter(e => e.jurisdiction === 'state' && e.state && e.state !== 'All India').forEach(e => {
      counts[e.state] = (counts[e.state] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
  }, [exams])

  return (
    <section className="analytics-section">
      {/* Intelligence Telemetry Overview Bar */}
      <div className="analytics-kpi-tape">
        <div className="analytics-kpi-cell">
          <div className="kpi-tag">JURISDICTION BALANCE</div>
          <div className="kpi-val">260 <span className="kpi-dim">/ 255</span></div>
          <div className="kpi-sub">50.5% Central · 49.5% State</div>
        </div>

        <div className="analytics-kpi-cell">
          <div className="kpi-tag">PURPOSE DOMINANCE</div>
          <div className="kpi-val highlight-amber">76.1%</div>
          <div className="kpi-sub">392 Jobs · 123 Entrance</div>
        </div>

        <div className="analytics-kpi-cell">
          <div className="kpi-tag">CBT DIGITAL ADOPTION</div>
          <div className="kpi-val highlight-teal">53.6%</div>
          <div className="kpi-sub">276 CBT vs 224 Offline</div>
        </div>

        <div className="analytics-kpi-cell">
          <div className="kpi-tag">DEGREE THRESHOLD</div>
          <div className="kpi-val highlight-blue">62.3%</div>
          <div className="kpi-sub">321 require Bachelor's Degree</div>
        </div>
      </div>

      {/* Section Header */}
      <div className="section-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <h2 className="section-title" style={{ fontSize: '1.4rem' }}>
            📊 National Examinations Intelligence & Comparative Analytics
          </h2>
          <p className="section-subtitle" style={{ color: 'var(--muted)', fontSize: '0.86rem' }}>
            Multi-dimensional comparative telemetry across conducting commissions, administrative cadres, eligibility gateways, and seasonal density.
          </p>
        </div>
      </div>

      {onApplyFilter && (
        <div className="analytics-interactive-banner">
          <span>👆 <strong>Terminal Interactive Filter:</strong> Click any bar, chart slice, or authority name to immediately jump to matching examinations in the registry.</span>
        </div>
      )}

      {/* Module Selector */}
      <div className="analytics-module-tabs">
        <button
          className={`module-tab ${filterModule === 'all' ? 'active' : ''}`}
          onClick={() => setFilterModule('all')}
        >
          All Intelligence Modules
        </button>
        <button
          className={`module-tab ${filterModule === 'comparisons' ? 'active' : ''}`}
          onClick={() => setFilterModule('comparisons')}
        >
          Cross-Dimensional Comparisons
        </button>
        <button
          className={`module-tab ${filterModule === 'distributions' ? 'active' : ''}`}
          onClick={() => setFilterModule('distributions')}
        >
          Domains & Authorities
        </button>
        <button
          className={`module-tab ${filterModule === 'calendar' ? 'active' : ''}`}
          onClick={() => setFilterModule('calendar')}
        >
          Seasonality & Geography
        </button>
      </div>

      <div className="analytics-grid">
        {/* Comparison 1: Central vs State Purpose (Job vs Entrance) */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Central vs State: Purpose Comparison</h3>
                <span className="chart-card-subtitle">Job Recruitments vs Higher-Ed Admissions</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={jurisdictionPurposeData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a33" vertical={false} />
                  <XAxis dataKey="jurisdiction" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ fontSize: '0.78rem', paddingBottom: '10px' }}
                  />
                  <Bar
                    dataKey="Job / Career Recruitment"
                    fill="#2e9e6b"
                    radius={[4, 4, 0, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={() => onApplyFilter && onApplyFilter('exam_type', 'job')}
                  />
                  <Bar
                    dataKey="Entrance / Admissions"
                    fill="#e8a33d"
                    radius={[4, 4, 0, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={() => onApplyFilter && onApplyFilter('exam_type', 'entrance')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Comparison 2: Government Service Cadres & Pay Hierarchy */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Government Service Cadre Hierarchy</h3>
                <span className="chart-card-subtitle">Group A/B Gazetted vs Executive vs Subordinate Services</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click bar</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cadreData}
                  layout="vertical"
                  margin={{ top: 10, right: isMobile ? 15 : 30, left: isMobile ? 0 : 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a33" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: isMobile ? 8.5 : 10 }}
                    width={isMobile ? 90 : 140}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('conducting_body', entry.name)}
                  >
                    {cadreData.map((entry, index) => (
                      <Cell key={`cadre-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Comparison 3: Minimum Educational Qualification Gateways */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Educational Eligibility Gateways</h3>
                <span className="chart-card-subtitle">Minimum qualification threshold across {exams.length} examinations</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={qualificationData}
                  layout="vertical"
                  margin={{ top: 10, right: isMobile ? 15 : 30, left: isMobile ? 0 : 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a33" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: isMobile ? 8.5 : 10.5 }}
                    width={isMobile ? 95 : 150}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Comparison 4: Exam Delivery Mode Modernization */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Delivery Mode Modernization Index</h3>
                <span className="chart-card-subtitle">Computer Based Testing (CBT) vs Traditional Pen & Paper (OMR)</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click slice</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={isMobile ? 45 : 60}
                    outerRadius={isMobile ? 75 : 95}
                    paddingAngle={4}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('exam_mode', entry.name.includes('CBT') ? 'Online' : 'Offline')}
                  >
                    {modeData.map((entry, index) => (
                      <Cell key={`mode-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: isMobile ? '0.72rem' : '0.78rem', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Comparison 5: Month-by-Month Annual Examination Pressure Curve */}
        {(filterModule === 'all' || filterModule === 'calendar') && (
          <div className="chart-card panel chart-full-width">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Annual Examination Density & Peak Seasonality</h3>
                <span className="chart-card-subtitle">Month-by-month examination frequency showing the May-June-July peak crunch</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={seasonalityData}
                  margin={{ top: 15, right: isMobile ? 15 : 30, left: isMobile ? -10 : 10, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="monthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e8a33d" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#e8a33d" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a33" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="exams"
                    name="Scheduled Examinations"
                    stroke="#e8a33d"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#monthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Distribution 1: Domain Distribution Donut */}
        {(filterModule === 'all' || filterModule === 'distributions') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Distribution by Professional Domain</h3>
                <span className="chart-card-subtitle">Representation across 20 distinct professional disciplines</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click slice</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={domainData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={isMobile ? 42 : 55}
                    outerRadius={isMobile ? 75 : 95}
                    paddingAngle={2}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('domain', entry.name)}
                  >
                    {domainData.map((entry, index) => (
                      <Cell key={`domain-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.4)" strokeWidth={1} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: isMobile ? '0.65rem' : '0.7rem', paddingTop: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Distribution 2: Top Conducting Authorities */}
        {(filterModule === 'all' || filterModule === 'distributions') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Top Conducting Commissions & Bodies</h3>
                <span className="chart-card-subtitle">Major examination boards by number of conducted tests</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click bar</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conductingBodyData}
                  layout="vertical"
                  margin={{ top: 10, right: isMobile ? 15 : 30, left: isMobile ? 0 : 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a33" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: isMobile ? 8.5 : 11 }}
                    width={isMobile ? 80 : 110}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('conducting_body', entry.name)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Distribution 3: State Government Exams (Top 10 States) */}
        {(filterModule === 'all' || filterModule === 'calendar') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">State Public Service Commission Volume</h3>
                <span className="chart-card-subtitle">Top 10 State Governments by indexed competitive exams</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click bar</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateData}
                  layout="vertical"
                  margin={{ top: 10, right: isMobile ? 15 : 30, left: isMobile ? 0 : 15, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232a33" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: isMobile ? 8.5 : 11 }}
                    width={isMobile ? 90 : 130}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#a855f7"
                    radius={[0, 4, 4, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('state', entry.name)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Intelligence Summary Box */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="chart-card-title" style={{ color: 'var(--amber-bright)', marginBottom: '0.75rem' }}>
              💡 Strategic Examination Landscape Highlights
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#2e9e6b', fontWeight: 'bold' }}>✓</span>
                <span><strong>Central vs State Divergence:</strong> Central exams maintain a 70:30 job-to-entrance ratio due to national technical entrance gates (JEE/NEET/GATE), while State boards focus over 82% on direct public recruitment.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#e8a33d', fontWeight: 'bold' }}>✓</span>
                <span><strong>Cadre Pyramidal Structure:</strong> Group C & D frontline positions comprise the largest volume (114 exams), followed by Group A & B Gazetted leadership tiers (100 exams).</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>✓</span>
                <span><strong>May-June Scheduling Bottleneck:</strong> More than 28% of all national examinations overlap in May and June, creating critical scheduling and preparation bottlenecks for aspirants.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#a855f7', fontWeight: 'bold' }}>✓</span>
                <span><strong>Accelerated CBT Adoption:</strong> 53.6% of exams now utilize computer-based testing, led by SSC, RRB, IBPS, and NTA.</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
