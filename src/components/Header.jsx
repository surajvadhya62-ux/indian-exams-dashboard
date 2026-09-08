import {
  HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck
} from 'react-icons/hi'

export default function Header({ activeView, setActiveView, totalExams, compareCount }) {
  const views = [
    { id: 'explore', label: 'Explore', icon: <HiOutlineGlobeAlt className="nav-icon" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <HiOutlineChartBar className="nav-icon" /> },
    { id: 'analytics', label: 'Analytics', icon: <HiOutlineChartBar className="nav-icon" /> },
    { id: 'cadres', label: 'Govt Grades Guide', icon: <HiOutlineShieldCheck className="nav-icon" /> },
    { id: 'compare', label: `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`, icon: <HiOutlineScale className="nav-icon" /> },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar className="nav-icon" /> },
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="logo-icon">🎓</span>
          <span>India<span className="logo-highlight">Exams</span></span>
        </div>

        <nav className="header-nav">
          {views.map(v => (
            <button
              key={v.id}
              className={`nav-btn ${activeView === v.id ? 'active' : ''}`}
              onClick={() => setActiveView(v.id)}
            >
              {v.icon}
              {v.label}
            </button>
          ))}
        </nav>

        <div className="header-stats">
          <div className="header-stat">
            <HiOutlineAcademicCap />
            <span className="header-stat-value">{totalExams}</span>
            <span>Exams</span>
          </div>
        </div>
      </div>
    </header>
  )
}
