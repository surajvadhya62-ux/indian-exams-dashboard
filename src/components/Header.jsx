import {
  HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck,
  HiOutlineSparkles, HiOutlineBookmark, HiOutlineQuestionMarkCircle
} from 'react-icons/hi'

export default function Header({
  activeView,
  setActiveView,
  totalExams,
  compareCount,
  bookmarkCount = 0,
  onLogoClick,
  onOpenGuide
}) {
  const views = [
    { id: 'explore', label: 'Explore', icon: <HiOutlineGlobeAlt className="nav-icon" /> },
    { id: 'wizard', label: 'Wizard', icon: <HiOutlineSparkles className="nav-icon text-amber" /> },
    { id: 'saved', label: `Saved${bookmarkCount > 0 ? ` (${bookmarkCount})` : ''}`, icon: <HiOutlineBookmark className="nav-icon" /> },
    { id: 'analytics', label: 'Analytics', icon: <HiOutlineChartBar className="nav-icon" /> },
    { id: 'cadres', label: 'Govt Grades Guide', icon: <HiOutlineShieldCheck className="nav-icon" /> },
    { id: 'compare', label: `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`, icon: <HiOutlineScale className="nav-icon" /> },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar className="nav-icon" /> },
  ]

  const isAnalyticsActive = activeView === 'analytics' || activeView === 'dashboard'

  return (
    <header className="header modern-header">
      <div className="header-inner">
        <div className="header-top-row">
          <div
            className="header-logo"
            onClick={onLogoClick || (() => setActiveView('explore'))}
            style={{ cursor: 'pointer' }}
            title="IndiaExams - National Examinations Directory"
          >
            <span className="logo-icon">🎓</span>
            <span className="brand-wordmark" id="ie-brand-wordmark">
              INDIA<span className="brand-accent">EXAMS</span>
            </span>
            <span className="registry-version-badge">v2.4</span>
          </div>

          <div className="header-stats">
            <div className="live-status-badge">
              <span className="live-dot" />
              <span className="live-text">{totalExams} EXAMS VERIFIED · SEP 2026</span>
            </div>

            {onOpenGuide && (
              <button
                className="guide-help-btn"
                onClick={onOpenGuide}
                title="Open Quick Guide & Orientation"
              >
                <HiOutlineQuestionMarkCircle /> Guide
              </button>
            )}
          </div>
        </div>

        <nav className="header-nav modern-nav-tabs" aria-label="Main Navigation">
          {views.map(v => {
            const isActive = v.id === 'analytics' ? isAnalyticsActive : activeView === v.id
            return (
              <button
                key={v.id}
                className={`nav-btn modern-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveView(v.id)}
              >
                {v.icon}
                <span className="nav-label">{v.label}</span>
                {isActive && <span className="tab-active-indicator" />}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
