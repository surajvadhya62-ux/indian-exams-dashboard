import { useMemo } from 'react'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { getDomainColor } from '../utils/helpers'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '8px',
        padding: '10px 14px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(10px)',
        color: '#f1f5f9',
        fontSize: '0.85rem'
      }}>
        <p style={{ fontWeight: 600, marginBottom: '4px', color: payload[0].payload.fill || '#60a5fa' }}>
          {label || payload[0].name}
        </p>
        <p style={{ margin: 0, color: '#cbd5e1' }}>
          Count: <strong style={{ color: '#fff' }}>{payload[0].value}</strong> exams
        </p>
      </div>
    )
  }
  return null
}

export default function Analytics({ exams, fullView = false, onApplyFilter }) {
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

  // Level breakdown (Top 8 entries, horizontal layout to avoid label clipping)
  const levelData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const lvl = e.level || 'Other'
      counts[lvl] = (counts[lvl] || 0) + 1
    })
    const palette = ['#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#10b981', '#f97316']
    return Object.entries(counts)
      .map(([name, value], i) => ({
        name,
        value,
        fill: palette[i % palette.length]
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [exams])

  // Frequency breakdown
  const frequencyData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const f = e.frequency || 'Annual'
      counts[f] = (counts[f] || 0) + 1
    })
    const colors = {
      'Annual': '#10b981',
      'Biannual': '#3b82f6',
      'Multiple times a year': '#8b5cf6',
      'Quarterly': '#f59e0b',
      'On Demand': '#06b6d4',
      'As Advertised': '#f43f5e'
    }
    return Object.entries(counts)
      .map(([name, value]) => ({
        name,
        value,
        fill: colors[name] || '#a78bfa'
      }))
      .sort((a, b) => b.value - a.value)
  }, [exams])

  // Exam mode breakdown (for fullView)
  const modeData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const mode = e.exam_mode || 'Unknown'
      counts[mode] = (counts[mode] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [exams])

  // Jurisdiction breakdown (Central vs State)
  const jurisdictionData = useMemo(() => {
    const central = exams.filter(e => e.jurisdiction === 'central').length
    const state = exams.filter(e => e.jurisdiction === 'state').length
    return [
      { name: 'Central & All-India', value: central, fill: '#3b82f6' },
      { name: 'State Government', value: state, fill: '#a855f7' }
    ]
  }, [exams])

  // Top states by exam count
  const stateData = useMemo(() => {
    const counts = {}
    exams.filter(e => e.jurisdiction === 'state' && e.state && e.state !== 'All India').forEach(e => {
      counts[e.state] = (counts[e.state] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }, [exams])

  return (
    <section className="analytics-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">📊 Exam Landscape Analytics</h2>
          <p className="section-subtitle">
            Statistical breakdown of {exams.length} examinations across conducting authorities, domains, and levels
          </p>
        </div>
      </div>

      {onApplyFilter && (
        <div className="analytics-interactive-banner">
          <span>👆 <strong>Interactive Visual Explorer:</strong> Click on any slice, category name, or bar below to instantly filter matching examinations in the catalog.</span>
        </div>
      )}

      <div className="analytics-grid">
        {/* Domain Distribution Donut */}
        <div className="chart-card">
          <div className="chart-header-row">
            <h3 className="chart-card-title">Distribution by Domain</h3>
            {onApplyFilter && <span className="chart-clickable-tag">Click slice to filter</span>}
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
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  cursor={onApplyFilter ? 'pointer' : 'default'}
                  onClick={(entry) => onApplyFilter && onApplyFilter('domain', entry.name)}
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.4)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '0.72rem', paddingTop: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Conducting Bodies */}
        <div className="chart-card">
          <div className="chart-header-row">
            <h3 className="chart-card-title">Top Conducting Authorities</h3>
            {onApplyFilter && <span className="chart-clickable-tag">Click bar to filter</span>}
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conductingBodyData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
              >
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: '#cbd5e1', fontSize: 11 }}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[0, 6, 6, 0]}
                  cursor={onApplyFilter ? 'pointer' : 'default'}
                  onClick={(entry) => onApplyFilter && onApplyFilter('conducting_body', entry.name)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Education Level Breakdown (Horizontal to avoid "Undergraduate" clipping) */}
        <div className="chart-card">
          <div className="chart-header-row">
            <h3 className="chart-card-title">Degree / Entry Level</h3>
            {onApplyFilter && <span className="chart-clickable-tag">Click bar to filter</span>}
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 15, bottom: 5 }}
              >
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: '#cbd5e1', fontSize: 11 }}
                  width={140}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  radius={[0, 6, 6, 0]}
                  cursor={onApplyFilter ? 'pointer' : 'default'}
                  onClick={(entry) => onApplyFilter && onApplyFilter('level', entry.name)}
                >
                  {levelData.map((entry, index) => (
                    <Cell key={`lvl-cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exam Frequency */}
        <div className="chart-card">
          <div className="chart-header-row">
            <h3 className="chart-card-title">Exam Frequency Breakdown</h3>
            {onApplyFilter && <span className="chart-clickable-tag">Click slice to filter</span>}
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={frequencyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  cursor={onApplyFilter ? 'pointer' : 'default'}
                  onClick={(entry) => onApplyFilter && onApplyFilter('frequency', entry.name)}
                >
                  {frequencyData.map((entry, index) => (
                    <Cell key={`freq-cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.4)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '0.75rem', paddingTop: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Central vs State Jurisdiction Breakdown */}
        <div className="chart-card">
          <div className="chart-header-row">
            <h3 className="chart-card-title">Central vs State Jurisdiction</h3>
            {onApplyFilter && <span className="chart-clickable-tag">Click slice to filter</span>}
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jurisdictionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  cursor={onApplyFilter ? 'pointer' : 'default'}
                  onClick={(entry) => {
                    if (!onApplyFilter) return
                    const isCentral = entry.name.includes('Central')
                    onApplyFilter('jurisdiction', isCentral ? 'central' : 'state')
                  }}
                >
                  {jurisdictionData.map((entry, index) => (
                    <Cell key={`jur-cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.4)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '0.8rem', paddingTop: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top States Distribution */}
        <div className="chart-card">
          <div className="chart-header-row">
            <h3 className="chart-card-title">State Government Exams by State</h3>
            {onApplyFilter && <span className="chart-clickable-tag">Click bar to filter</span>}
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stateData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 15, bottom: 5 }}
              >
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: '#cbd5e1', fontSize: 11 }}
                  width={130}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="#a855f7"
                  radius={[0, 6, 6, 0]}
                  cursor={onApplyFilter ? 'pointer' : 'default'}
                  onClick={(entry) => onApplyFilter && onApplyFilter('state', entry.name)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {fullView && (
          <>
            {/* Exam Mode Breakdown */}
            <div className="chart-card">
              <div className="chart-header-row">
                <h3 className="chart-card-title">Exam Delivery Mode</h3>
                {onApplyFilter && <span className="chart-clickable-tag">Click bar to filter</span>}
              </div>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={modeData}
                    margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
                  >
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      fill="#14b8a6"
                      radius={[6, 6, 0, 0]}
                      cursor={onApplyFilter ? 'pointer' : 'default'}
                      onClick={(entry) => onApplyFilter && onApplyFilter('exam_mode', entry.name)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="chart-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 className="chart-card-title">💡 Landscape Highlights</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
                  <strong>Engineering & Medical:</strong> Account for over 35% of total high-stakes national examinations.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <strong>Annual Cycle:</strong> More than 70% of exams are conducted strictly on an annual schedule.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                  <strong>Computer-Based Transition:</strong> Over 60% of exams have transitioned to Computer Based Test (CBT) or hybrid mode.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
                  <strong>Interactive Drilldown:</strong> Click any chart item to immediately filter and view the matching exams.
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
