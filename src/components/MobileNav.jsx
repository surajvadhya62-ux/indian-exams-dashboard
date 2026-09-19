import { useEffect, useRef, useState } from 'react'
import {
  HiOutlineGlobeAlt, HiOutlineChartBar, HiOutlineScale,
  HiOutlineCalendar, HiOutlineShieldCheck, HiOutlineSparkles,
  HiOutlineBookmark, HiOutlineBadgeCheck, HiOutlineChatAlt2,
  HiOutlineNewspaper, HiOutlineDocumentText,
  HiOutlineAdjustments, HiOutlineInformationCircle, HiOutlineQuestionMarkCircle
} from 'react-icons/hi'

// Mirrors the grouping in Header.jsx — same reasoning (11 flat items were
// scrolling off the right edge of a 390px screen with no hint they did).
export default function MobileNav({ activeView, setActiveView, compareCount, bookmarkCount }) {
  const items = [
    { id: 'explore', label: 'Explore', icon: <HiOutlineGlobeAlt /> },
    { id: 'updates', label: 'Updates', icon: <HiOutlineNewspaper /> },
    { id: 'my-exams', label: 'Saved', icon: <HiOutlineBookmark />, count: bookmarkCount },
    { id: 'calendar', label: 'Calendar', icon: <HiOutlineCalendar /> },
    {
      id: 'tools', label: 'Tools', icon: <HiOutlineAdjustments />,
      children: [
        { id: 'wizard', label: 'Wizard', icon: <HiOutlineSparkles /> },
        { id: 'screener', label: 'Screener', icon: <HiOutlineBadgeCheck /> },
        { id: 'compare', label: 'Compare', icon: <HiOutlineScale />, count: compareCount },
      ],
    },
    {
      id: 'about', label: 'About', icon: <HiOutlineInformationCircle />,
      children: [
        { id: 'coverage', label: 'Coverage & Method', icon: <HiOutlineDocumentText /> },
        { id: 'analytics', label: 'Analytics', icon: <HiOutlineChartBar /> },
        { id: 'cadres', label: '7th CPC Cadres', icon: <HiOutlineShieldCheck /> },
        { id: 'guide', label: 'Guide', icon: <HiOutlineQuestionMarkCircle /> },
        { id: 'feedback', label: 'Feedback', icon: <HiOutlineChatAlt2 /> },
      ],
    },
  ]

  const isChildActive = (item) => item.id === 'my-exams'
    ? (activeView === 'my-exams' || activeView === 'saved')
    : (activeView === item.id || (item.id === 'analytics' && activeView === 'dashboard'))

  const [openMenu, setOpenMenu] = useState(null)
  const [menuPos, setMenuPos] = useState(null) // { bottom, left } of the open dropdown
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!openMenu) return
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [openMenu])

  const selectView = (id) => {
    setActiveView(id)
    setOpenMenu(null)
  }

  const openGroup = (e, id, isOpen) => {
    if (isOpen) { setOpenMenu(null); return }
    const rect = e.currentTarget.getBoundingClientRect()
    // `.mobile-bottom-nav` scrolls horizontally (overflow-x: auto), which
    // per the CSS overflow spec silently forces overflow-y: auto too —
    // an absolutely-positioned dropdown nested inside it gets clipped the
    // instant it extends past the bar's own height (same root cause as
    // the desktop nav's dropdown, see Header.jsx's comment). Fixed the
    // same way: render the dropdown outside the scrolling element
    // (as a sibling of <nav>, inside this component's own wrapper div)
    // and position it with `position: fixed` from the trigger's own rect.
    setMenuPos({ bottom: window.innerHeight - rect.top + 10, left: rect.left + rect.width / 2 })
    setOpenMenu(id)
  }

  const openGroupData = items.find(i => i.id === openMenu)

  return (
    <div ref={wrapRef}>
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        {items.map(item => {
          if (item.children) {
            const groupActive = item.children.some(isChildActive)
            const isOpen = openMenu === item.id
            return (
              <button
                key={item.id}
                className={`mobile-nav-btn ${groupActive ? 'active' : ''} ${isOpen ? 'menu-open' : ''}`}
                onClick={(e) => openGroup(e, item.id, isOpen)}
                title={item.label}
                aria-expanded={isOpen}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </button>
            )
          }

          const isActive = isChildActive(item)
          return (
            <button
              key={item.id}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => selectView(item.id)}
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

      {openGroupData && menuPos && (
        <div
          className="mobile-nav-dropdown fade-in"
          style={{ bottom: menuPos.bottom, left: menuPos.left, transform: 'translateX(-50%)' }}
        >
          {openGroupData.children.map(child => (
            <button
              key={child.id}
              className={`mobile-dropdown-item ${isChildActive(child) ? 'active' : ''}`}
              onClick={() => selectView(child.id)}
            >
              <span className="mobile-nav-icon">
                {child.icon}
                {child.count > 0 && <span className="mobile-nav-badge">{child.count}</span>}
              </span>
              <span>{child.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
