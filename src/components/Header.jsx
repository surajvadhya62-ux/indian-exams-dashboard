import { useEffect, useRef, useState } from 'react'
import {
  HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck,
  HiOutlineSparkles, HiOutlineBookmark,
  HiOutlineBadgeCheck, HiOutlineSun, HiOutlineMoon,
  HiOutlineSearch, HiOutlineChatAlt2, HiOutlineNewspaper,
  HiOutlineUserCircle, HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle, HiOutlineChevronDown, HiOutlineAdjustments,
  HiOutlineInformationCircle
} from 'react-icons/hi'

// Was 11 flat top-level destinations — overflowed the bar on desktop (the
// 11th item clipped off the right edge) and required horizontal scrolling
// on mobile with no visual hint that it did. Grouped into 6: four direct
// destinations plus two dropdowns ("Tools" for decision-support features,
// "About" for reference/meta pages). "Overlap" is deliberately left out of
// Tools — it's currently a "module under maintenance" placeholder (see
// App.jsx), and giving a disabled feature a permanent nav slot would be the
// same kind of overclaim the Coverage & Method page exists to correct
// elsewhere on this site. Add it back once it's real again.
export default function Header({
  activeView,
  setActiveView,
  totalExams = 500,
  compareCount = 0,
  bookmarkCount = 0,
  onLogoClick,
  theme = 'dark',
  setTheme,
  onOpenCommandPalette,
  onOpenTour,
  currentUser,
  onOpenAuth
}) {
  const views = [
    { id: 'explore', num: '01', label: 'Explore', icon: <HiOutlineGlobeAlt className="hud-nav-icon" /> },
    { id: 'updates', num: '02', label: 'Updates', icon: <HiOutlineNewspaper className="hud-nav-icon text-amber" />, badge: 'LIVE' },
    { id: 'my-exams', num: '03', label: 'Saved', count: bookmarkCount, icon: <HiOutlineBookmark className="hud-nav-icon text-amber" /> },
    { id: 'calendar', num: '04', label: 'Calendar', icon: <HiOutlineCalendar className="hud-nav-icon" /> },
    {
      id: 'tools', num: '05', label: 'Tools', icon: <HiOutlineAdjustments className="hud-nav-icon" />,
      children: [
        { id: 'wizard', label: 'Wizard', icon: <HiOutlineSparkles className="hud-nav-icon text-amber" /> },
        { id: 'screener', label: 'Screener', icon: <HiOutlineBadgeCheck className="hud-nav-icon text-emerald" /> },
        { id: 'compare', label: 'Compare', count: compareCount, icon: <HiOutlineScale className="hud-nav-icon" /> },
      ],
    },
    {
      id: 'about', num: '06', label: 'About', icon: <HiOutlineInformationCircle className="hud-nav-icon" />,
      children: [
        { id: 'coverage', label: 'Coverage & Method', icon: <HiOutlineDocumentText className="hud-nav-icon" /> },
        { id: 'analytics', label: 'Analytics', icon: <HiOutlineChartBar className="hud-nav-icon" /> },
        { id: 'cadres', label: '7th CPC Cadres', icon: <HiOutlineShieldCheck className="hud-nav-icon" /> },
        { id: 'guide', label: 'Guide', icon: <HiOutlineQuestionMarkCircle className="hud-nav-icon" /> },
        { id: 'feedback', label: 'Feedback', icon: <HiOutlineChatAlt2 className="hud-nav-icon text-teal" /> },
      ],
    },
  ]

  const isAnalyticsActive = activeView === 'analytics' || activeView === 'dashboard'
  const isLight = theme === 'light' || theme === 'gazette'

  const isChildActive = (v) => v.id === 'my-exams'
    ? (activeView === 'my-exams' || activeView === 'saved')
    : (v.id === 'analytics' ? isAnalyticsActive : activeView === v.id)

  const [openMenu, setOpenMenu] = useState(null) // group id, or null
  const [menuPos, setMenuPos] = useState(null) // { top, left } of the open dropdown
  const navRef = useRef(null)

  useEffect(() => {
    if (!openMenu) return
    const onDocClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    const onEscape = (e) => { if (e.key === 'Escape') setOpenMenu(null) }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [openMenu])

  const selectView = (id) => {
    setActiveView(id)
    setOpenMenu(null)
  }

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
            <span className="hud-brand-text">INDIAEXAMS</span>
            <span className="hud-brand-sub">TERMINAL</span>
            <span className="hud-version-chip">v2.5 PROD</span>
          </div>

          {/* Center / Right Telemetry Status & Controls */}
          <div className="hud-controls">
            {/* Live 342 Authorities Status Pill */}
            <div className="hud-statutory-pill" title="Continuous automated ingestion across 342 official commissions">
              <span className="hud-live-dot" />
              <span className="hud-statutory-label">
                <strong>{totalExams}</strong> exams · <strong>342</strong> bodies
              </span>
            </div>

            {/* Guided Tour Trigger Button */}
            {onOpenTour && (
              <button
                className="hud-tour-btn"
                onClick={onOpenTour}
                title="Interactive Feature Walkthrough Tour"
                aria-label="Start Feature Tour"
              >
                <HiOutlineSparkles className="hud-tour-icon text-amber" />
                <span className="hud-tour-label hud-btn-text">Guided Tour</span>
              </button>
            )}

            {/* Site-Wide Aspirant Account / Login Trigger */}
            {onOpenAuth && (
              <button
                className={`hud-auth-btn ${currentUser ? 'logged-in' : ''}`}
                onClick={onOpenAuth}
                title={currentUser ? `Logged in as ${currentUser.name} (Click to manage vault)` : 'Sign in to save study progress and bookmarks'}
                aria-label="Aspirant Account Vault"
              >
                {currentUser ? (
                  <>
                    {currentUser.picture ? (
                      <img src={currentUser.picture} alt="" className="auth-avatar-img" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="auth-avatar-dot" />
                    )}
                    <span className="hud-auth-name">{currentUser.name.split(' ')[0]}</span>
                    <span className="hud-auth-sub hud-btn-text">Vault</span>
                  </>
                ) : (
                  <>
                    <HiOutlineUserCircle className="hud-auth-icon" />
                    <span className="hud-auth-label hud-btn-text">Sign In</span>
                  </>
                )}
              </button>
            )}

            {/* Command Palette Trigger */}
            {onOpenCommandPalette && (
              <button
                className="hud-cmd-btn"
                onClick={onOpenCommandPalette}
                title="Search Registry & Quick Commands (⌘K / Ctrl+K)"
                aria-label="Open Command Palette"
              >
                <HiOutlineSearch className="hud-cmd-icon" />
                <span className="hud-cmd-label hud-btn-text">Quick Search</span>
                <kbd className="hud-cmd-kbd hud-btn-text">⌘K</kbd>
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
                    <span className="hud-theme-text hud-btn-text">Dark</span>
                  </>
                ) : (
                  <>
                    <HiOutlineSun className="hud-theme-icon text-amber" />
                    <span className="hud-theme-text hud-btn-text">Light</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Tab Bar with Monospace Numbered Indicators */}
        <nav className="hud-nav-tabs" aria-label="Terminal Workstation Navigation" ref={navRef}>
          <div className="hud-tabs-scroll">
            {views.map(v => {
              if (v.children) {
                const groupActive = v.children.some(isChildActive)
                const isOpen = openMenu === v.id
                return (
                  <button
                    key={v.id}
                    className={`hud-tab-btn hud-tab-item ${groupActive ? 'active' : ''} ${isOpen ? 'menu-open' : ''}`}
                    onClick={(e) => {
                      if (isOpen) { setOpenMenu(null); return }
                      const rect = e.currentTarget.getBoundingClientRect()
                      setMenuPos({ top: rect.bottom + 6, left: rect.left })
                      setOpenMenu(v.id)
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span className="hud-tab-num">{v.num}</span>
                    <span className="hud-tab-icon-wrap">{v.icon}</span>
                    <span className="hud-tab-text">{v.label}</span>
                    <HiOutlineChevronDown className="hud-tab-chevron" />
                    {groupActive && <div className="hud-active-underline hud-active-bar" />}
                  </button>
                )
              }

              const isActive = isChildActive(v)
              return (
                <button
                  key={v.id}
                  className={`hud-tab-btn hud-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => selectView(v.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="hud-tab-num">{v.num}</span>
                  <span className="hud-tab-icon-wrap">{v.icon}</span>
                  <span className="hud-tab-text">{v.label}</span>

                  {typeof v.count === 'number' && v.count > 0 && (
                    <span className="hud-tab-count-pill hud-tab-counter">{v.count}</span>
                  )}

                  {v.badge && (
                    <span className="hud-tab-live-badge">{v.badge}</span>
                  )}

                  {isActive && <div className="hud-active-underline hud-active-bar" />}
                </button>
              )
            })}
          </div>

          {/* Dropdown panel — deliberately rendered OUTSIDE .hud-tabs-scroll,
              not nested under the trigger. That container scrolls
              horizontally (overflow-x: auto), and per the CSS overflow
              spec, pairing overflow-x: auto with an unset overflow-y
              silently computes overflow-y to auto too — so a dropdown
              nested inside it gets clipped the moment it extends past the
              bar's own height, even though its own computed style reports
              display: flex/visible. Caught by inspecting computed styles
              after a screenshot showed the toggle firing (chevron rotated,
              aria-expanded true) with no visible panel. Fixed by
              positioning it with `position: fixed` at coordinates taken
              from the trigger's own getBoundingClientRect() — the header
              is `position: sticky`, so those coordinates stay correct
              even after the page scrolls. */}
          {openMenu && menuPos && (() => {
            const group = views.find(v => v.id === openMenu)
            if (!group) return null
            return (
              <div className="hud-tab-dropdown fade-in" style={{ top: menuPos.top, left: menuPos.left }}>
                {group.children.map(child => (
                  <button
                    key={child.id}
                    className={`hud-dropdown-item ${isChildActive(child) ? 'active' : ''}`}
                    onClick={() => selectView(child.id)}
                  >
                    <span className="hud-tab-icon-wrap">{child.icon}</span>
                    <span>{child.label}</span>
                    {typeof child.count === 'number' && child.count > 0 && (
                      <span className="hud-tab-count-pill hud-tab-counter">{child.count}</span>
                    )}
                  </button>
                ))}
              </div>
            )
          })()}
        </nav>
      </div>
    </header>
  )
}
