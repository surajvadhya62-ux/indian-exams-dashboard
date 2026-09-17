import {
  HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck,
  HiOutlineSparkles, HiOutlineBookmark,
  HiOutlineBadgeCheck, HiOutlineSun, HiOutlineMoon,
  HiOutlineSearch, HiOutlineChatAlt2
} from 'react-icons/hi'

export default function Header({
  activeView,
  setActiveView,
  totalExams,
  compareCount,
  bookmarkCount = 0,
  onLogoClick,
  theme = 'dark',
  setTheme,
  onOpenCommandPalette
}) {
  const views = [
    { id: 'explore', label: 'Explore', icon: <HiOutlineGlobeAlt className="nav-icon" /> },
    { id: 'wizard', label: 'Wizard', icon: <HiOutlineSparkles className="nav-icon text-amber" /> },
    { id: 'screener', label: 'Eligible?', icon: <HiOutlineBadgeCheck className="nav-icon text-emerald" /> },
    { id: 'saved', label: `Saved${bookmarkCount > 0 ? ` (${bookmarkCount})` : ''}`, icon: <HiOutlineBookmark className="nav-icon" /> },
    { id: 'analytics', label: 'Analytics', icon: <HiOutlineChartBar className="nav-icon" /> },
    { id: 'cadres', label: 'Govt Grades Guide', icon: <HiOutlineShieldCheck className="nav-icon" /> },
    { id: 'compare', label: `Compare${compareCount > 0 ? ` (${compareCount})` : ''}`, icon: <HiOutlineScale className="nav-icon" /> },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar className="nav-icon" /> },
    { id: 'feedback', label: 'Feedback', icon: <HiOutlineChatAlt2 className="nav-icon text-teal" /> },
  ]

  const isAnalyticsActive = activeView === 'analytics' || activeView === 'dashboard'
  const isLight = theme === 'light' || theme === 'gazette'

  return (
    <header className="header modern-header tbar">
      <div className="header-inner">
        <div className="header-top-row">
          <div
            className="header-logo tbar-brand"
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

          <div className="header-stats tbar-status">
            <div className="live-status-badge">
              <span className="live-dot" />
              <span className="live-text">{totalExams} EXAMS VERIFIED · SEP 2026</span>
            </div>

            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                className="header-cmd-btn"
                onClick={onOpenCommandPalette}
                title="Search & Commands (⌘K or Ctrl+K)"
                aria-label="Open Command Palette"
              >
                <HiOutlineSearch className="cmd-icon" />
                <span className="cmd-label">Search / Command</span>
                <kbd className="cmd-shortcut">⌘K</kbd>
              </button>
            )}

            {/* Dark / Light Mode Switcher */}
            {setTheme && (
              <div className="theme-switcher-container">
                <button
                  className="theme-switch-btn"
                  onClick={() => setTheme(isLight ? 'dark' : 'light')}
                  title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
                  aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
                >
                  {isLight ? (
                    <>
                      <HiOutlineMoon className="theme-icon" />
                      <span className="theme-label">Dark</span>
                    </>
                  ) : (
                    <>
                      <HiOutlineSun className="theme-icon text-amber" />
                      <span className="theme-label">Light</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <nav className="header-nav modern-nav-tabs ttabs" aria-label="Main Navigation">
          {views.map(v => {
            const isActive = v.id === 'analytics' ? isAnalyticsActive : activeView === v.id
            return (
              <button
                key={v.id}
                className={`nav-btn modern-tab-btn ttab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveView(v.id)}
              >
                {v.icon}
                {v.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
