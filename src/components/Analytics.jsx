import { useMemo, useState, useEffect } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area, CartesianGrid
} from 'recharts'
import {
  HiOutlineSparkles, HiOutlineDownload, HiOutlineTable,
  HiOutlineChartPie, HiOutlineChartBar, HiOutlineFilter
} from 'react-icons/hi'
import { getDomainColor } from '../utils/helpers'
import IndiaMap from './IndiaMap'
import { SkeletonChart } from './Skeletons'

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

  // Custom Analytics Studio State
  const [customDimension, setCustomDimension] = useState('domain')
  const [customMetric, setCustomMetric] = useState('count')
  const [customChartType, setCustomChartType] = useState('bar')
  const [customScopeFilter, setCustomScopeFilter] = useState('all')
  const [customTypeFilter, setCustomTypeFilter] = useState('all')

  const customAnalyticsData = useMemo(() => {
    let filtered = exams || []
    if (customScopeFilter === 'central') {
      filtered = filtered.filter(e => e.jurisdiction === 'central')
    } else if (customScopeFilter === 'state') {
      filtered = filtered.filter(e => e.jurisdiction === 'state')
    }

    if (customTypeFilter === 'entrance') {
      filtered = filtered.filter(e => e.exam_type === 'entrance')
    } else if (customTypeFilter === 'job') {
      filtered = filtered.filter(e => e.exam_type === 'job')
    }

    const groups = {}

    filtered.forEach(exam => {
      let key = 'Other'
      if (customDimension === 'domain') {
        key = exam.domain || 'Unspecified'
      } else if (customDimension === 'jurisdiction') {
        key = exam.jurisdiction === 'central' ? 'Central / All-India' : 'State Commission'
      } else if (customDimension === 'level') {
        const l = (exam.level || '').toLowerCase()
        if (l.includes('10th')) key = '10th Pass / Secondary'
        else if (l.includes('12th') || l.includes('undergraduate')) key = '12th Pass / Intermediate'
        else if (l.includes('diploma') || l.includes('iti')) key = 'Diploma / ITI'
        else if (l.includes('postgraduate') || l.includes('master')) key = 'Postgraduate'
        else if (l.includes('doctoral') || l.includes('ph.d')) key = 'Doctoral / Ph.D.'
        else key = "Graduate / Bachelor's"
      } else if (customDimension === 'exam_type') {
        key = exam.exam_type === 'entrance' ? 'Entrance Examination' : 'Job Recruitment'
      } else if (customDimension === 'exam_mode') {
        const m = (exam.exam_mode || '').toLowerCase()
        if (m.includes('online') || m.includes('cbt')) key = 'Online / CBT'
        else if (m.includes('offline') || m.includes('omr') || m.includes('pen')) key = 'Offline / OMR'
        else key = 'Hybrid / Multimodal'
      } else if (customDimension === 'frequency') {
        key = exam.frequency || 'Annual'
      } else if (customDimension === 'state') {
        key = exam.jurisdiction === 'central' ? 'All-India Central' : (exam.state || 'Regional')
      }

      if (!groups[key]) {
        groups[key] = { name: key, count: 0, vacancies: 0, paySum: 0, payCount: 0, ageSum: 0, ageCount: 0 }
      }

      groups[key].count++

      let vac = 0
      if (exam.vacancies) {
        const n = parseInt(exam.vacancies.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(n)) vac = n
      }
      if (!vac) vac = 450
      groups[key].vacancies += vac

      const cadre = (exam.cadre || '').toLowerCase()
      let pay = 35400
      if (cadre.includes('level 10') || cadre.includes('group a')) pay = 56100
      else if (cadre.includes('level 8')) pay = 47600
      else if (cadre.includes('level 7')) pay = 44900
      else if (cadre.includes('level 6') || cadre.includes('group b')) pay = 35400
      else if (cadre.includes('level 5')) pay = 29200
      else if (cadre.includes('level 4') || cadre.includes('group c')) pay = 25500
      else if (cadre.includes('level 2')) pay = 19900
      else if (cadre.includes('level 1')) pay = 18000
      groups[key].paySum += pay
      groups[key].payCount++

      let maxAge = 30
      if (exam.age_limit) {
        const nums = exam.age_limit.match(/\d+/g)
        if (nums && nums.length > 0) {
          const parsed = parseInt(nums[nums.length - 1], 10)
          if (parsed >= 16 && parsed <= 60) maxAge = parsed
        }
      }
      groups[key].ageSum += maxAge
      groups[key].ageCount++
    })

    const chartColors = [
      '#c8862a', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899',
      '#06b6d4', '#f59e0b', '#14b8a6', '#6366f1', '#f97316',
      '#84cc16', '#a855f7', '#64748b'
    ]

    let data = Object.values(groups).map((g, idx) => {
      let val = g.count
      let formattedVal = `${g.count} exams`

      if (customMetric === 'vacancies') {
        val = g.vacancies
        formattedVal = `${g.vacancies.toLocaleString('en-IN')} posts`
      } else if (customMetric === 'starting_pay') {
        val = Math.round(g.paySum / (g.payCount || 1))
        formattedVal = `Rs. ${val.toLocaleString('en-IN')}/mo`
      } else if (customMetric === 'max_age') {
        val = Math.round((g.ageSum / (g.ageCount || 1)) * 10) / 10
        formattedVal = `${val} yrs`
      }

      return {
        name: g.name,
        value: val,
        rawCount: g.count,
        vacancies: g.vacancies,
        avgPay: Math.round(g.paySum / (g.payCount || 1)),
        avgAge: Math.round((g.ageSum / (g.ageCount || 1)) * 10) / 10,
        formattedVal,
        fill: chartColors[idx % chartColors.length]
      }
    })

    data.sort((a, b) => b.value - a.value)

    if (customDimension === 'state' && data.length > 12) {
      data = data.slice(0, 12)
    }

    const totalMetricSum = data.reduce((acc, d) => acc + d.value, 0)
    let metricSumFormatted = totalMetricSum.toLocaleString('en-IN')
    if (customMetric === 'starting_pay') {
      metricSumFormatted = `Rs. ${Math.round(totalMetricSum / (data.length || 1)).toLocaleString('en-IN')} avg`
    } else if (customMetric === 'max_age') {
      metricSumFormatted = `${Math.round((totalMetricSum / (data.length || 1)) * 10) / 10} yrs avg`
    }

    return {
      data,
      totalCount: filtered.length,
      topLeader: data[0] || null,
      metricSumFormatted
    }
  }, [exams, customDimension, customMetric, customScopeFilter, customTypeFilter])

  const exportCustomCsv = () => {
    if (!customAnalyticsData.data || customAnalyticsData.data.length === 0) return
    const headers = ['Segment', 'Value', 'Exams Count', 'Estimated Vacancies', 'Avg Starting Pay (Rs/mo)', 'Avg Max Age']
    const rows = customAnalyticsData.data.map(d => [
      `"${d.name.replace(/"/g, '""')}"`,
      d.value,
      d.rawCount,
      d.vacancies,
      d.avgPay,
      d.avgAge
    ])
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `indiaexams_analytics_${customDimension}_${customMetric}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

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
        <button
          className={`module-tab ${filterModule === 'map' ? 'active' : ''}`}
          onClick={() => setFilterModule('map')}
        >
          🗺️ Geospatial Map
        </button>
      </div>

      <div className="analytics-grid">
        {/* Geospatial India Map Module */}
        {(filterModule === 'all' || filterModule === 'calendar' || filterModule === 'map') && (
          <div style={{ gridColumn: '1 / -1' }}>
            <IndiaMap exams={exams} onApplyFilter={onApplyFilter} />
          </div>
        )}

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

      {/* ─────────────────────────────────────────────────────────────
          CUSTOM ANALYTICS STUDIO WORKBENCH (Point 7)
          ───────────────────────────────────────────────────────────── */}
      <div className="custom-analytics-studio panel" style={{ marginTop: '2rem' }}>
        <div className="studio-header-strip">
          <div className="studio-title-block">
            <div className="studio-badge">
              <HiOutlineSparkles className="studio-sparkle-icon" />
              <span>DYNAMIC ANALYTICS STUDIO</span>
            </div>
            <h3 className="studio-title">Custom Cross-Tabulation & Breakdown Studio</h3>
            <p className="studio-desc">
              Generate custom analytics across all parameters. Group by any dimension, calculate metrics, and switch visualizations on the fly without deleting existing analytics.
            </p>
          </div>

          <button className="studio-export-btn" onClick={exportCustomCsv} title="Download aggregated breakdown as CSV">
            <HiOutlineDownload />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="studio-toolbar">
          <div className="studio-control-item">
            <label className="studio-label">GROUP BY DIMENSION:</label>
            <select
              className="hud-select studio-select"
              value={customDimension}
              onChange={e => setCustomDimension(e.target.value)}
            >
              <option value="domain">Discipline / Domain</option>
              <option value="jurisdiction">Jurisdiction (Central vs State)</option>
              <option value="level">Qualification Tier</option>
              <option value="exam_type">Examination Type</option>
              <option value="exam_mode">Testing Mode (CBT / Offline)</option>
              <option value="frequency">Cycle Frequency</option>
              <option value="state">State / Region (Top 12)</option>
            </select>
          </div>

          <div className="studio-control-item">
            <label className="studio-label">METRIC CALCULATION:</label>
            <select
              className="hud-select studio-select"
              value={customMetric}
              onChange={e => setCustomMetric(e.target.value)}
            >
              <option value="count">Total Examination Targets</option>
              <option value="vacancies">Estimated Vacancy Volume (Seats)</option>
              <option value="starting_pay">Est. Starting Basic Pay (Rs./mo)</option>
              <option value="max_age">Average Maximum Age Limit (Years)</option>
            </select>
          </div>

          <div className="studio-control-item">
            <label className="studio-label">VISUALIZATION FORMAT:</label>
            <div className="studio-format-pills">
              <button
                type="button"
                className={`studio-fmt-btn ${customChartType === 'bar' ? 'active' : ''}`}
                onClick={() => setCustomChartType('bar')}
              >
                <HiOutlineChartBar /> Bar
              </button>
              <button
                type="button"
                className={`studio-fmt-btn ${customChartType === 'pie' ? 'active' : ''}`}
                onClick={() => setCustomChartType('pie')}
              >
                <HiOutlineChartPie /> Donut
              </button>
              <button
                type="button"
                className={`studio-fmt-btn ${customChartType === 'area' ? 'active' : ''}`}
                onClick={() => setCustomChartType('area')}
              >
                Area
              </button>
              <button
                type="button"
                className={`studio-fmt-btn ${customChartType === 'table' ? 'active' : ''}`}
                onClick={() => setCustomChartType('table')}
              >
                <HiOutlineTable /> Table
              </button>
            </div>
          </div>

          <div className="studio-control-item">
            <label className="studio-label">SCOPE FILTER:</label>
            <select
              className="hud-select studio-select"
              value={customScopeFilter}
              onChange={e => setCustomScopeFilter(e.target.value)}
            >
              <option value="all">All Scopes (Central & State)</option>
              <option value="central">Central & All-India Only</option>
              <option value="state">State Commissions Only</option>
            </select>
          </div>

          <div className="studio-control-item">
            <label className="studio-label">TYPE FILTER:</label>
            <select
              className="hud-select studio-select"
              value={customTypeFilter}
              onChange={e => setCustomTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="job">Job Recruitment Only</option>
              <option value="entrance">Entrance Exams Only</option>
            </select>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="studio-telemetry-row">
          <div className="studio-telemetry-chip">
            <span className="telemetry-label">ANALYZED TARGETS:</span>
            <span className="telemetry-value">{customAnalyticsData.totalCount}</span>
          </div>
          <div className="studio-telemetry-chip">
            <span className="telemetry-label">DISTINCT CATEGORIES:</span>
            <span className="telemetry-value">{customAnalyticsData.data.length}</span>
          </div>
          <div className="studio-telemetry-chip">
            <span className="telemetry-label">LEADER:</span>
            <span className="telemetry-value highlight">
              {customAnalyticsData.topLeader ? `${customAnalyticsData.topLeader.name} (${customAnalyticsData.topLeader.formattedVal})` : 'N/A'}
            </span>
          </div>
          <div className="studio-telemetry-chip">
            <span className="telemetry-label">AGGREGATE:</span>
            <span className="telemetry-value">{customAnalyticsData.metricSumFormatted}</span>
          </div>
        </div>

        {/* Studio Chart Canvas / Table Canvas */}
        <div className="studio-canvas-area" style={{ marginTop: '1.25rem' }}>
          {customChartType === 'bar' && (
            <div style={{ width: '100%', height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={customAnalyticsData.data}
                  margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: 11 }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={65}
                  />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Value" radius={[4, 4, 0, 0]}>
                    {customAnalyticsData.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {customChartType === 'pie' && (
            <div style={{ width: '100%', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customAnalyticsData.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={130}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {customAnalyticsData.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {customChartType === 'area' && (
            <div style={{ width: '100%', height: 380 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={customAnalyticsData.data}
                  margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
                >
                  <defs>
                    <linearGradient id="studioAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c8862a" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#c8862a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    tick={{ fill: '#cbd5e1', fontSize: 11 }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={65}
                  />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#c8862a" strokeWidth={2} fillOpacity={1} fill="url(#studioAreaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {customChartType === 'table' && (
            <div className="studio-table-container">
              <table className="studio-data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Segment Category</th>
                    <th style={{ textAlign: 'right' }}>Active Metric Value</th>
                    <th style={{ textAlign: 'right' }}>Exams Count</th>
                    <th style={{ textAlign: 'right' }}>Est. Vacancies</th>
                    <th style={{ textAlign: 'right' }}>Avg Starting Pay</th>
                    <th style={{ textAlign: 'right' }}>Avg Max Age</th>
                  </tr>
                </thead>
                <tbody>
                  {customAnalyticsData.data.map((row, idx) => (
                    <tr key={row.name}>
                      <td className="mono-idx">{idx + 1}</td>
                      <td className="segment-name-cell">
                        <span className="color-swatch" style={{ background: row.fill }} />
                        <strong>{row.name}</strong>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--amber-bright, #e8a33d)' }}>
                        {row.formattedVal}
                      </td>
                      <td style={{ textAlign: 'right' }}>{row.rawCount}</td>
                      <td style={{ textAlign: 'right' }}>{row.vacancies.toLocaleString('en-IN')}</td>
                      <td style={{ textAlign: 'right' }}>Rs. {row.avgPay.toLocaleString('en-IN')}/mo</td>
                      <td style={{ textAlign: 'right' }}>{row.avgAge} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
