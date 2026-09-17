import { useMemo, useState, useEffect } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area, CartesianGrid
} from 'recharts'
import { getDomainColor } from '../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const title = label || payload[0].name
    const leadColor = payload[0].payload?.fill || payload[0].color || 'var(--amber-bright, #e8a33d)'

    return (
      <div className="analytics-custom-tooltip">
        <div className="tooltip-title" style={{ color: leadColor }}>
          {title}
        </div>
        {payload.map((entry, i) => (
          <div key={i} className="tooltip-row">
            <span className="tooltip-label">{entry.name || 'Count'}:</span>
            <span className="tooltip-val">{entry.value} exams</span>
          </div>
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

  // Dynamic Telemetry KPIs (100% computed from real data)
  const kpis = useMemo(() => {
    const total = exams.length
    if (!total) {
      return {
        total: 0, central: 0, state: 0, centralPct: '0', statePct: '0',
        jobs: 0, entrance: 0, jobsPct: '0',
        cbt: 0, offline: 0, cbtPct: '0',
        degree: 0, degreePct: '0'
      }
    }
    const central = exams.filter(e => e.jurisdiction === 'central').length
    const state = exams.filter(e => e.jurisdiction === 'state').length
    const jobs = exams.filter(e => e.exam_type === 'job').length
    const entrance = exams.filter(e => e.exam_type === 'entrance').length

    let cbt = 0
    let offline = 0
    exams.forEach(e => {
      const m = (e.exam_mode || '').toLowerCase()
      if (m.includes('online') || m.includes('cbt')) cbt++
      else if (m.includes('offline') || m.includes('omr') || m.includes('pen')) offline++
    })

    let degree = 0
    exams.forEach(e => {
      const q = (e.min_qualification || '').toLowerCase()
      if (
        q.includes('bachelor') || q.includes('graduate') || q.includes('degree') ||
        q.includes('mbbs') || q.includes('b.tech') || q.includes('llb') ||
        q.includes('master') || q.includes('post graduate') || q.includes('pg')
      ) {
        degree++
      }
    })

    return {
      total,
      central,
      state,
      centralPct: ((central / total) * 100).toFixed(1),
      statePct: ((state / total) * 100).toFixed(1),
      jobs,
      entrance,
      jobsPct: ((jobs / total) * 100).toFixed(1),
      cbt,
      offline,
      cbtPct: ((cbt / total) * 100).toFixed(1),
      degree,
      degreePct: ((degree / total) * 100).toFixed(1)
    }
  }, [exams])

  // Grouped Domain Distribution (Top 7 + 'Other' to prevent 18-slice unreadable clutter)
  const domainData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const d = e.domain || 'Other'
      counts[d] = (counts[d] || 0) + 1
    })
    const sorted = Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        color: getDomainColor(name)
      }))
      .sort((a, b) => b.value - a.value)

    if (sorted.length <= 8) return sorted
    const top7 = sorted.slice(0, 7)
    const remaining = sorted.slice(7)
    const otherCount = remaining.reduce((acc, curr) => acc + curr.value, 0)
    top7.push({
      name: `Other (${remaining.length} Domains)`,
      value: otherCount,
      color: '#64748b'
    })
    return top7
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

  // Comparative Data 1: Central vs State by Purpose
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

  // Comparative Data 3: Minimum Educational Eligibility (PG tested FIRST)
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
      // Test Post-Graduate before Bachelor / Graduate
      if (q.includes('master') || q.includes('post graduate') || q.includes('postgraduate') || q.includes('pg') || q.includes('m.')) {
        counts['Post-Graduate / Masters']++
      } else if (q.includes('bachelor') || q.includes('graduate') || q.includes('degree') || q.includes('any graduate')) {
        counts['Bachelor’s Degree']++
      } else if (q.includes('12th') || q.includes('10+2') || q.includes('intermediate') || q.includes('higher secondary')) {
        counts['10+2 / Intermediate']++
      } else if (q.includes('10th') || q.includes('matric') || q.includes('sslc')) {
        counts['10th / Matriculation']++
      } else if (q.includes('diploma') || q.includes('polytechnic')) {
        counts['Technical Diploma']++
      } else {
        counts['Professional Degree (Eng/Med/Law)']++
      }
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [exams])

  // Comparative Data 4: Delivery Modernization
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

  // Comparative Data 5: Annual Seasonality
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
      month: m.substring(0, 3),
      fullName: m,
      exams: counts[m]
    }))
  }, [exams])

  // Dynamic Strategic Highlights
  const strategicInsights = useMemo(() => {
    const mayExams = seasonalityData.find(s => s.fullName === 'May')?.exams || 0
    const juneExams = seasonalityData.find(s => s.fullName === 'June')?.exams || 0
    const mayJunePct = kpis.total ? (((mayExams + juneExams) / kpis.total) * 100).toFixed(1) : '25.0'

    const topCadre = cadreData[0] || { name: 'Frontline & Subordinate Cadres', value: 0 }
    const gazettedCadre = cadreData.find(c => c.name.includes('Group A')) || { value: 0 }

    return {
      mayJunePct,
      topCadreName: topCadre.name,
      topCadreCount: topCadre.value,
      gazettedCount: gazettedCadre.value
    }
  }, [seasonalityData, kpis, cadreData])

  // State-wise distribution
  const stateData = useMemo(() => {
    const counts = {}
    exams.filter(e => e.jurisdiction === 'state' && e.state).forEach(e => {
      counts[e.state] = (counts[e.state] || 0) + 1
    })
    return Object.entries(counts)
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }, [exams])

  return (
    <section className="analytics-section">
      {/* 100% Dynamic Telemetry Bar */}
      <div className="analytics-kpi-tape">
        <div className="analytics-kpi-cell">
          <div className="kpi-tag">JURISDICTION BALANCE</div>
          <div className="kpi-val">{kpis.central} <span className="kpi-dim">/ {kpis.state}</span></div>
          <div className="kpi-sub">{kpis.centralPct}% Central · {kpis.statePct}% State</div>
        </div>

        <div className="analytics-kpi-cell">
          <div className="kpi-tag">PURPOSE DOMINANCE</div>
          <div className="kpi-val highlight-amber">{kpis.jobsPct}%</div>
          <div className="kpi-sub">{kpis.jobs} Jobs · {kpis.entrance} Entrance</div>
        </div>

        <div className="analytics-kpi-cell">
          <div className="kpi-tag">CBT DIGITAL ADOPTION</div>
          <div className="kpi-val highlight-teal">{kpis.cbtPct}%</div>
          <div className="kpi-sub">{kpis.cbt} CBT vs {kpis.offline} Offline</div>
        </div>

        <div className="analytics-kpi-cell">
          <div className="kpi-tag">DEGREE THRESHOLD</div>
          <div className="kpi-val highlight-blue">{kpis.degreePct}%</div>
          <div className="kpi-sub">{kpis.degree} require Degree or higher</div>
        </div>
      </div>

      {/* Section Header */}
      <div className="section-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <h2 className="section-title">
            📊 National Examinations Intelligence & Comparative Analytics
          </h2>
          <p className="section-subtitle">
            Multi-dimensional telemetry across conducting commissions, administrative cadres, eligibility gateways, and seasonal density ({kpis.total} exams verified).
          </p>
        </div>
      </div>

      {onApplyFilter && (
        <div className="analytics-interactive-banner">
          <span>👆 <strong>Interactive Filter:</strong> Click any bar, chart slice, or authority name to immediately jump to matching examinations in the registry.</span>
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
        {/* Comparison 1: Central vs State Purpose */}
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
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="jurisdiction" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '0.78rem', paddingBottom: '10px' }} />
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

        {/* Comparison 2: Government Service Cadres */}
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
                  layout={isMobile ? 'vertical' : 'horizontal'}
                  margin={{ top: 20, right: 30, left: 10, bottom: isMobile ? 5 : 45 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  {isMobile ? (
                    <>
                      <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis type="category" dataKey="name" width={110} stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                    </>
                  ) : (
                    <>
                      <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                      <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    </>
                  )}
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    name="Examinations"
                    radius={[4, 4, 0, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('cadre', entry.name)}
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

        {/* Comparison 3: Minimum Educational Eligibility */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Minimum Educational Eligibility Gateways</h3>
                <span className="chart-card-subtitle">Distribution by base entry credential</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={qualificationData}
                  layout="vertical"
                  margin={{ top: 15, right: 30, left: isMobile ? 10 : 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={isMobile ? 110 : 160} stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Exams Requiring Level" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Comparison 4: Delivery Modernization */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Delivery Mode Modernization</h3>
                <span className="chart-card-subtitle">Adoption of Computer-Based (CBT) vs Traditional Paper</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={modeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {modeData.map((entry, index) => (
                      <Cell key={`mode-${index}`} fill={entry.fill} stroke="var(--ink, #080a0f)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '0.78rem', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Domain Distribution */}
        {(filterModule === 'all' || filterModule === 'distributions') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Examinations by Professional Domain</h3>
                <span className="chart-card-subtitle">Major career sector distribution (Top 7 + Grouped Other)</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click to filter</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={domainData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && !entry.name.includes('Other') && onApplyFilter('domain', entry.name)}
                  >
                    {domainData.map((entry, index) => (
                      <Cell key={`domain-${index}`} fill={entry.color} stroke="var(--ink, #080a0f)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '0.74rem', paddingTop: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Top Authorities */}
        {(filterModule === 'all' || filterModule === 'distributions') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Top Conducting Commissions & Boards</h3>
                <span className="chart-card-subtitle">Bodies administering the highest volume of national exams</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click bar</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conductingBodyData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={isMobile ? 100 : 130} stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    name="Conducted Exams"
                    fill="#e8a33d"
                    radius={[0, 4, 4, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('conducting_body', entry.name)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Seasonality */}
        {(filterModule === 'all' || filterModule === 'calendar') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">Annual Examination Pressure Curve</h3>
                <span className="chart-card-subtitle">Month-by-month distribution of major examination dates</span>
              </div>
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={seasonalityData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="colorExams" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e8a33d" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#e8a33d" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="exams"
                    name="Scheduled Exams"
                    stroke="#e8a33d"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorExams)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* State PSC Density */}
        {(filterModule === 'all' || filterModule === 'calendar') && (
          <div className="chart-card panel">
            <div className="chart-header-row">
              <div>
                <h3 className="chart-card-title">State Public Service Commission Density</h3>
                <span className="chart-card-subtitle">Indexed state-level examinations across top 10 regions</span>
              </div>
              {onApplyFilter && <span className="chart-clickable-tag">Click to filter</span>}
            </div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stateData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="state" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    name="State Exams"
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                    cursor={onApplyFilter ? 'pointer' : 'default'}
                    onClick={(entry) => onApplyFilter && onApplyFilter('state', entry.state)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Dynamic Intelligence Summary Box */}
        {(filterModule === 'all' || filterModule === 'comparisons') && (
          <div className="chart-card panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="chart-card-title" style={{ color: 'var(--amber-bright)', marginBottom: '0.75rem' }}>
              💡 Strategic Examination Landscape Highlights
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#2e9e6b', fontWeight: 'bold' }}>✓</span>
                <span><strong>Jurisdiction Dynamic:</strong> Central services account for {kpis.centralPct}% ({kpis.central} exams) featuring national technical entrance gates (JEE/NEET/GATE/UPSC), while State boards contribute {kpis.statePct}% ({kpis.state} exams) geared heavily towards regional governance.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#e8a33d', fontWeight: 'bold' }}>✓</span>
                <span><strong>Cadre Pyramidal Structure:</strong> {strategicInsights.topCadreName} comprises {strategicInsights.topCadreCount} exams, while Gazetted leadership tiers account for {strategicInsights.gazettedCount} high-stakes avenues.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>✓</span>
                <span><strong>Seasonal Scheduling Density:</strong> May & June account for {strategicInsights.mayJunePct}% of annual examination sessions, creating critical preparation and travel concurrency for multi-exam aspirants.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#a855f7', fontWeight: 'bold' }}>✓</span>
                <span><strong>Accelerated CBT Adoption:</strong> {kpis.cbtPct}% of exams ({kpis.cbt} total) now utilize computer-based testing, led by SSC, RRB, IBPS, and NTA.</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
