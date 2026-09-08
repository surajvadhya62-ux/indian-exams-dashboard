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

export default function Analytics({ exams, fullView = false }) {
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

  // Level breakdown
  const levelData = useMemo(() => {
    const counts = {}
    exams.forEach(e => {
      const lvl = e.level || 'Other'
      counts[lvl] = (counts[lvl] || 0) + 1
    })
    const palette = ['#3b82f6', '#14b8a6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4']
    return Object.entries(counts)
      .map(([name, value], i) => ({
        name,
        value,
        fill: palette[i % palette.length]
      }))
      .sort((a, b) => b.value - a.value)
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

      <div className="analytics-grid">
        {/* Domain Distribution Donut */}
        <div className="chart-card">
          <h3 className="chart-card-title">Distribution by Domain</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
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
                  wrapperStyle={{ fontSize: '0.75rem', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Conducting Bodies */}
        <div className="chart-card">
          <h3 className="chart-card-title">Top Conducting Authorities</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conductingBodyData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: '#cbd5e1', fontSize: 11 }}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Education Level Breakdown */}
        <div className="chart-card">
          <h3 className="chart-card-title">Degree / Entry Level</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={levelData}
                margin={{ top: 10, right: 20, left: -10, bottom: 30 }}
              >
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
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
          <h3 className="chart-card-title">Exam Frequency Breakdown</h3>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={frequencyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {frequencyData.map((entry, index) => (
                    <Cell key={`freq-cell-${index}`} fill={entry.fill} stroke="rgba(0,0,0,0.4)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {fullView && (
          <>
            {/* Exam Mode Breakdown */}
            <div className="chart-card">
              <h3 className="chart-card-title">Exam Delivery Mode</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={modeData}
                    margin={{ top: 10, right: 20, left: -10, bottom: 10 }}
                  >
                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#14b8a6" radius={[6, 6, 0, 0]} />
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
                  <strong>Key Bodies:</strong> NTA, UPSC, and state PSCs conduct the majority of multi-lakh candidate exams.
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
