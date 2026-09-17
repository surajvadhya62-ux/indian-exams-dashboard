import {
  HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck,
  HiOutlineSparkles, HiOutlineBookmark,
  HiOutlineBadgeCheck, HiOutlineSun, HiOutlineMoon,
  HiOutlineSearch, HiOutlineChatAlt2, HiOutlineNewspaper
} from 'react-icons/hi'

export default function Header({
  activeView,
  setActiveView,
  totalExams = 500,
  compareCount = 0,
  bookmarkCount = 0,
  onLogoClick,
  theme = 'dark',
  setTheme,
  onOpenCommandPalette
}) {
  const views = [
    { id: 'explore', num: '01', label: 'Explore', icon: <HiOutlineGlobeAlt className="hud-nav-icon" /> },
    { id: 'updates', num: '02', label: 'Gazette Wire', icon: <HiOutlineNewspaper className="hud-nav-icon text-amber" />, badge: 'LIVE' },
    { id: 'my-exams', num: '03', label: 'Radar', count: bookmarkCount, icon: <HiOutlineBookmark className="hud-nav-icon text-amber" /> },
    { id: 'cadres', num: '04', label: '7th CPC Cadres', icon: <HiOutlineShieldCheck className="hud-nav-icon" /> },
    { id: 'compare', num: '05', label: 'Compare', count: compareCount, icon: <HiOutlineScale className="hud-nav-icon" /> },
    { id: 'analytics', num: '06', label: 'Analytics', icon: <HiOutlineChartBar className="hud-nav-icon" /> },
    { id: 'calendar', num: '07', label: 'Calendar', icon: <HiOutlineCalendar className="hud-nav-icon" /> },
    { id: 'screener', num: '08', label: 'Screener', icon: <HiOutlineBadgeCheck className="hud-nav-icon text-emerald" /> },
    { id: 'wizard', num: '09', label: 'Wizard', icon: <HiOutlineSparkles className="hud-nav-icon text-amber" /> },
    { id: 'feedback', num: '10', label: 'Feedback', icon: <HiOutlineChatAlt2 className="hud-nav-icon text-teal" /> },
  ]

  const isAnalyticsActive = activeView === 'analytics' || activeView === 'dashboard'
  const isLight = theme === 'light' || theme === 'gazette'

  return (
    <header className="terminal-hud-header">
      <div className="terminal-hud-inner">
        {/* Top Utility Bar */}
        <div className="hud-top-bar">
          {/* Left Brand Identity */}
          <div
            className="hud-brand"
            onClick={onLogoClick || (() => setActiveView('explore'))}
            title="Return to IndiaExams Platform Gate"
          >
            <span className="hud-brand-symbol">▪</span>
            <span className="hud-brand-text">I N D I A E X A M S</span>
            <span className="hud-version-chip">v2.5 PROD</span>
          </div>

          {/* Center / Right Telemetry Status & Controls */}
          <div className="hud-controls">
            {/* Live 342 Authorities Status Pill */}
            <div className="hud-statutory-pill" title="Continuous automated ingestion across 342 official commissions">
              <span className="hud-live-dot" />
              <span className="hud-statutory-label">
                <strong>{totalExams}</strong> TARGETS · <strong>342</strong> BODIES
              </span>
            </div>

            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                className="hud-cmd-btn"
                onClick={onOpenCommandPalette}
                title="Search Registry & Quick Commands (⌘K / Ctrl+K)"
                aria-label="Open Command Palette"
              >
                <HiOutlineSearch className="hud-cmd-icon" />
                <span className="hud-cmd-label">Quick Search</span>
                <kbd className="hud-cmd-kbd">⌘K</kbd>
              </button>
            )}

            {/* Dark / Light Theme Toggle */}
            {setTheme && (
              <button
                className="hud-theme-btn"
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
                aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              >
                {isLight ? (
                  <>
                    <HiOutlineMoon className="hud-theme-icon" />
                    <span className="hud-theme-text">Dark</span>
                  </>
                ) : (
                  <>
                    <HiOutlineSun className="hud-theme-icon text-amber" />
                    <span className="hud-theme-text">Light</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Tab Bar with Monospace Numbered Indicators */}
        <nav className="hud-nav-tabs" aria-label="Terminal Workstation Navigation">
          <div className="hud-tabs-scroll">
            {views.map(v => {
              const isActive = v.id === 'my-exams'
                ? (activeView === 'my-exams' || activeView === 'saved')
                : (v.id === 'analytics' ? isAnalyticsActive : activeView === v.id)

              return (
                <button
                  key={v.id}
                  className={`hud-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveView(v.id)}
                  title={`Navigate to ${v.label}`}
                >
                  <span className="hud-tab-num">{v.num}</span>
                  <span className="hud-tab-icon">{v.icon}</span>
                  <span className="hud-tab-label">{v.label}</span>
                  {v.count > 0 && (
                    <span className="hud-tab-count-pill">{v.count}</span>
                  )}
                  {v.badge && (
                    <span className="hud-tab-live-badge">{v.badge}</span>
                  )}
                  {isActive && <span className="hud-active-underline" />}
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}
