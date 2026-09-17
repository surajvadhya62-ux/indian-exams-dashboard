import {
  HiOutlineGlobeAlt, HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineShieldCheck, HiOutlineSparkles,
  HiOutlineBookmark
} from 'react-icons/hi'

export default function MobileNav({ activeView, setActiveView, compareCount, bookmarkCount }) {
  const items = [
    { id: 'explore', label: 'Explore', icon: <HiOutlineGlobeAlt /> },
    { id: 'wizard', label: 'Wizard', icon: <HiOutlineSparkles /> },
    { id: 'saved', label: 'Saved', icon: <HiOutlineBookmark />, count: bookmarkCount },
    { id: 'analytics', label: 'Analytics', icon: <HiOutlineChartBar /> },
    { id: 'cadres', label: 'Grades', icon: <HiOutlineShieldCheck /> },
    { id: 'compare', label: 'Compare', icon: <HiOutlineScale />, count: compareCount },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar /> },
  ]

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      {items.map(item => {
        const isActive = activeView === item.id || (item.id === 'analytics' && activeView === 'dashboard')
        return (
          <button
            key={item.id}
            className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
            title={item.label}
          >
            <span className="mobile-nav-icon">
              {item.icon}
              {item.count > 0 && <span className="mobile-nav-badge">{item.count}</span>}
            </span>
            <span className="mobile-nav-label">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
