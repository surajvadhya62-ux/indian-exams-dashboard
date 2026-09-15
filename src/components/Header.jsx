import {
  HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck,
  HiOutlineLightBulb
} from 'react-icons/hi'

export default function Header({ activeView, setActiveView, totalExams, compareCount, onLogoClick }) {
  const views = [
    { id: 'explore', label: 'Explore', icon: <HiOutlineGlobeAlt className="nav-icon" /> },
    { id: 'guide', label: 'How to Use', icon: <HiOutlineLightBulb className="nav-icon" /> },
    { id: 'analytics', label: 'Dashboard & Analytics', icon: <HiOutlineChartBar className="nav-icon" /> },
    { id: 'cadres', label: 'Govt Grades Guide', icon: <HiOutlineShieldCheck className="nav-icon" /> },
    { id: 'compare', label: `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`, icon: <HiOutlineScale className="nav-icon" /> },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar className="nav-icon" /> },
  ]

  const isAnalyticsActive = activeView === 'analytics' || activeView === 'dashboard'

  return (
    <header className="header tbar">
      <div className="header-inner">
        <div className="header-top-row">
          <div className="header-logo tbar-brand" onClick={onLogoClick || (() => setActiveView('explore'))} style={{ cursor: 'pointer' }}>
            <span className="logo-icon">🎓</span>
            <span className="brand-wordmark" id="ie-brand-wordmark">
              INDIA<span className="brand-accent">EXAMS</span>
              <span className="wordmark-tick">▮</span>
            </span>
            <span className="terminal-badge">TERMINAL</span>
          </div>

          <div className="header-stats tbar-status">
            <div className="live-status-badge">
              <span className="live-dot"></span>
              <span className="live-text">LIVE · {totalExams} EXAMS</span>
            </div>
          </div>
        </div>

        <nav className="header-nav ttabs">
          {views.map(v => {
            const isActive = v.id === 'analytics' ? isAnalyticsActive : activeView === v.id
            return (
              <button
                key={v.id}
                className={`nav-btn ttab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveView(v.id)}
              >
                {v.icon}
                <span className="nav-label">{v.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
