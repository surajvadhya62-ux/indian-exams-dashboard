import { useState, useEffect, useRef, useMemo } from 'react'
import {
  HiOutlineSearch, HiX, HiOutlineGlobeAlt, HiOutlineSparkles,
  HiOutlineBadgeCheck, HiOutlineBookmark, HiOutlineChartBar,
  HiOutlineShieldCheck, HiOutlineScale, HiOutlineCalendar,
  HiOutlineSun, HiOutlineMoon, HiOutlineRefresh, HiOutlineChatAlt2,
  HiOutlineArrowRight, HiOutlineExternalLink, HiOutlineSwitchHorizontal
} from 'react-icons/hi'
import { getDomainColor } from '../utils/helpers'

export default function CommandPalette({
  isOpen,
  onClose,
  allExams = [],
  onSelectExam,
  setActiveView,
  theme = 'dark',
  setTheme,
  clearFilters
}) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  // System views
  const navigationItems = useMemo(() => [
    {
      id: 'nav-explore',
      type: 'view',
      title: 'Explore Examination Registry',
      subtitle: 'Browse & filter 500+ national & state examinations',
      icon: <HiOutlineGlobeAlt className="cp-icon" />,
      action: () => setActiveView('explore')
    },
    {
      id: 'nav-overlap',
      type: 'view',
      title: 'Syllabus Overlap & Cross-Exam Bridge',
      subtitle: 'Quantified syllabus synergy and incremental delta analysis',
      icon: <HiOutlineSwitchHorizontal className="cp-icon text-amber" />,
      action: () => setActiveView('overlap')
    },
    {
      id: 'nav-wizard',
      type: 'view',
      title: 'Aspirant Decision Wizard',
      subtitle: 'Personalized stream & career qualification matching',
      icon: <HiOutlineSparkles className="cp-icon text-amber" />,
      action: () => setActiveView('wizard')
    },
    {
      id: 'nav-screener',
      type: 'view',
      title: 'Eligibility Screener',
      subtitle: 'Filter exams matching your exact degree, age & domicile',
      icon: <HiOutlineBadgeCheck className="cp-icon text-emerald" />,
      action: () => setActiveView('screener')
    },
    {
      id: 'nav-analytics',
      type: 'view',
      title: 'Intelligence & Analytics',
      subtitle: 'Telemetry across cadres, commissions & seasonality',
      icon: <HiOutlineChartBar className="cp-icon" />,
      action: () => setActiveView('analytics')
    },
    {
      id: 'nav-cadres',
      type: 'view',
      title: 'Govt Grades & Pay Scales Guide',
      subtitle: '7th CPC pay matrices, apex pay scales & hierarchies',
      icon: <HiOutlineShieldCheck className="cp-icon" />,
      action: () => setActiveView('cadres')
    },
    {
      id: 'nav-compare',
      type: 'view',
      title: 'Side-by-Side Comparison Matrix',
      subtitle: 'Compare syllabus, age limits, pay scale & patterns',
      icon: <HiOutlineScale className="cp-icon" />,
      action: () => setActiveView('compare')
    },
    {
      id: 'nav-calendar',
      type: 'view',
      title: 'National Examinations Calendar',
      subtitle: 'Timeline of application windows and exam dates',
      icon: <HiOutlineCalendar className="cp-icon" />,
      action: () => setActiveView('calendar')
    },
    {
      id: 'nav-saved',
      type: 'view',
      title: 'Saved Bookmarks',
      subtitle: 'View your pinned examinations',
      icon: <HiOutlineBookmark className="cp-icon" />,
      action: () => setActiveView('saved')
    },
    {
      id: 'nav-feedback',
      type: 'view',
      title: 'Feedback & Support Desk',
      subtitle: 'Submit data corrections, suggest exams, or reach team',
      icon: <HiOutlineChatAlt2 className="cp-icon text-amber" />,
      action: () => setActiveView('feedback')
    }
  ], [setActiveView])

  // Quick actions
  const actionItems = useMemo(() => [
    {
      id: 'act-theme',
      type: 'action',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: 'Toggle dashboard interface appearance',
      icon: theme === 'dark' ? <HiOutlineSun className="cp-icon text-amber" /> : <HiOutlineMoon className="cp-icon" />,
      action: () => setTheme && setTheme(theme === 'dark' ? 'light' : 'dark')
    },
    {
      id: 'act-reset',
      type: 'action',
      title: 'Reset All Filters & Search',
      subtitle: 'Clear all active filter pills and restore default view',
      icon: <HiOutlineRefresh className="cp-icon" />,
      action: () => {
        if (clearFilters) clearFilters()
        setActiveView('explore')
      }
    }
  ], [theme, setTheme, clearFilters, setActiveView])

  // Filtered Results List
  const filteredList = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) {
      // Default initial view: Views + Actions + Top Popular Exams
      const popular = allExams
        .filter(e => e.popularity === 'very_high' || e.popularity === 'high')
        .slice(0, 6)
        .map(e => ({
          id: `exam-${e.id}`,
          type: 'exam',
          title: e.name,
          subtitle: `${e.acronym} · ${e.conducting_body} · ${e.domain}`,
          domain: e.domain,
          badge: e.acronym,
          exam: e,
          action: () => onSelectExam(e)
        }))

      return [
        { category: 'Quick Navigation', items: navigationItems },
        { category: 'Actions', items: actionItems },
        { category: 'Popular Examinations', items: popular }
      ]
    }

    // Matching views & actions
    const matchedViews = navigationItems.filter(v =>
      v.title.toLowerCase().includes(q) || v.subtitle.toLowerCase().includes(q)
    )

    const matchedActions = actionItems.filter(a =>
      a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
    )

    // Matching exams
    const matchedExams = allExams
      .filter(e =>
        e.name.toLowerCase().includes(q) ||
        (e.acronym && e.acronym.toLowerCase().includes(q)) ||
        (e.conducting_body && e.conducting_body.toLowerCase().includes(q)) ||
        (e.domain && e.domain.toLowerCase().includes(q)) ||
        (e.state && e.state.toLowerCase().includes(q)) ||
        (e.description && e.description.toLowerCase().includes(q))
      )
      .slice(0, 15)
      .map(e => ({
        id: `exam-${e.id}`,
        type: 'exam',
        title: e.name,
        subtitle: `${e.acronym || ''} · ${e.conducting_body} · ${e.jurisdiction === 'central' ? 'Central' : e.state || 'State'} · ${e.domain}`,
        domain: e.domain,
        badge: e.acronym,
        exam: e,
        action: () => onSelectExam(e)
      }))

    const sections = []
    if (matchedViews.length > 0) sections.push({ category: 'Navigation', items: matchedViews })
    if (matchedActions.length > 0) sections.push({ category: 'Actions', items: matchedActions })
    if (matchedExams.length > 0) sections.push({ category: `Examinations (${matchedExams.length})`, items: matchedExams })

    return sections
  }, [query, navigationItems, actionItems, allExams, onSelectExam])

  // Flatten items for single linear index navigation
  const flatItems = useMemo(() => {
    return filteredList.flatMap(sec => sec.items)
  }, [filteredList])

  // Keep selected index within range
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % (flatItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + flatItems.length) % (flatItems.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (flatItems[selectedIndex]) {
        flatItems[selectedIndex].action()
        onClose()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('.cp-item.active')
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  if (!isOpen) return null

  let runningIndex = 0

  return (
    <div className="cp-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="cp-container slide-up" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        {/* Search Input Bar */}
        <div className="cp-search-row">
          <HiOutlineSearch className="cp-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cp-input"
            placeholder="Type a command or search exams (e.g., UPSC, JEE, Analytics, Theme)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search examinations and commands"
          />
          {query ? (
            <button className="cp-clear-btn" onClick={() => setQuery('')} aria-label="Clear search">
              <HiX />
            </button>
          ) : (
            <kbd className="cp-kbd-esc">ESC</kbd>
          )}
        </div>

        {/* Results List */}
        <div className="cp-list" ref={listRef}>
          {flatItems.length === 0 ? (
            <div className="cp-empty">
              <div className="cp-empty-icon">🔍</div>
              <p className="cp-empty-title">No matching examinations or commands</p>
              <p className="cp-empty-sub">Try searching by exam name, acronym (e.g. UPSC, NDA), state or domain</p>
            </div>
          ) : (
            filteredList.map((section) => (
              <div key={section.category} className="cp-section">
                <div className="cp-section-header">{section.category}</div>
                {section.items.map((item) => {
                  const currentIndex = runningIndex++
                  const isSelected = currentIndex === selectedIndex
                  const color = item.domain ? getDomainColor(item.domain) : null

                  return (
                    <div
                      key={item.id}
                      className={`cp-item ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        item.action()
                        onClose()
                      }}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                    >
                      <div className="cp-item-left">
                        {item.icon ? (
                          <div className="cp-item-icon-box">{item.icon}</div>
                        ) : (
                          <span
                            className="cp-item-dot"
                            style={{ backgroundColor: color || 'var(--amber-bright)' }}
                          />
                        )}
                        <div className="cp-item-text">
                          <div className="cp-item-title-row">
                            <span className="cp-item-title">{item.title}</span>
                            {item.badge && (
                              <span className="cp-item-badge mono-badge" style={color ? { borderColor: `${color}60`, color } : {}}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="cp-item-sub">{item.subtitle}</span>
                        </div>
                      </div>

                      <div className="cp-item-right">
                        {isSelected && (
                          <span className="cp-enter-pill">
                            Jump <HiOutlineArrowRight />
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="cp-footer">
          <div className="cp-footer-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div className="cp-footer-stats">
            500 Exams Indexed · Instant Jump
          </div>
        </div>
      </div>
    </div>
  )
}
