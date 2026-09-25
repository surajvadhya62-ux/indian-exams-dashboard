import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import {
  HiOutlineSearch, HiOutlineExternalLink, HiOutlineClipboardCopy,
  HiOutlineRefresh, HiOutlineCheck, HiOutlineSparkles,
  HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineDocumentText,
  HiOutlineRss, HiOutlineCollection, HiOutlineGlobeAlt
} from 'react-icons/hi'
import authoritiesData from '../data/authorities.json'
import { fetchLiveExamNews, loadArchive, mergeIntoArchive, getRelativeTime } from '../utils/newsRssFetcher'
import { newsSummary } from '../utils/newsMatch'
import useIsMobile from '../hooks/useIsMobile'

// The past week's headlines, rebuilt every morning by
// scripts/automation/refresh-news.mjs. A separate file rather than a bundled
// import: it's a few hundred KB, and only this view needs all of it.
const STORED_NEWS_URL = './news/all.json'

const byNewest = (a, b) => (Date.parse(b.published_at) || 0) - (Date.parse(a.published_at) || 0)

export default function UpdatesFeed({ exams = [], onViewDetails }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAuthority, setSelectedAuthority] = useState('all')
  const [selectedScope, setSelectedScope] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [feedMode, setFeedMode] = useState('all') // 'all' | 'stored' | 'live_rss'
  const [storedNews, setStoredNews] = useState([])
  const [storedStatus, setStoredStatus] = useState('loading') // 'loading' | 'ready' | 'failed'
  const [liveRssItems, setLiveRssItems] = useState(loadArchive)
  const liveItemsRef = useRef(liveRssItems)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState('Real-Time Stream Active')
  const [toastMessage, setToastMessage] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const searchInputRef = useRef(null)
  // Hundreds of stories — a phone shows 25 at a time
  const isMobile = useIsMobile()
  const [mobileVisible, setMobileVisible] = useState(25)
  useEffect(() => { setMobileVisible(25) }, [searchQuery, selectedAuthority, selectedScope, selectedType, feedMode])

  useEffect(() => {
    let cancelled = false
    fetch(STORED_NEWS_URL, { cache: 'no-cache' })
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then(items => {
        if (cancelled) return
        setStoredNews(Array.isArray(items) ? items : [])
        setStoredStatus('ready')
      })
      .catch(() => { if (!cancelled) setStoredStatus('failed') })
    return () => { cancelled = true }
  }, [])

  // Fetch real-time RSS from Google News & PIB across Indian exams
  const pollLiveRss = useCallback(async (authName = '', forceRefresh = false, manual = false) => {
    setIsSyncing(true)
    try {
      const res = await fetchLiveExamNews(authName, searchQuery, forceRefresh)
      if (res.success && res.items.length > 0) {
        // Add to what's already been collected rather than replacing it —
        // otherwise the total stays pinned at one fetch's worth of stories
        const { items: merged, added } = mergeIntoArchive(liveItemsRef.current, res.items)
        liveItemsRef.current = merged
        setLiveRssItems(merged)
        const now = new Date()
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLastSyncTime(`${timeStr} IST · Real-Time Stream Synced (${merged.length} Live Items)`)
        // Background syncs stay quiet unless they found something new
        if (added > 0 || manual) {
          setToastMessage(added > 0
            ? `✓ ${added} new ${added === 1 ? 'story' : 'stories'} added · ${merged.length} live stories in total`
            : `✓ Up to date — no new stories since the last sync (${merged.length} live stories)`)
          setTimeout(() => setToastMessage(null), 3500)
        }
      } else if (res.error) {
        setToastMessage(`Couldn't reach the live news source right now. Showing the past week's stored headlines.`)
        setTimeout(() => setToastMessage(null), 4000)
      }
    } catch {
      // Graceful fallback to static data
    } finally {
      setIsSyncing(false)
    }
  }, [searchQuery])

  // Initial fetch on mount, when authority changes, and automated periodic background sync every 5 minutes
  useEffect(() => {
    pollLiveRss(selectedAuthority === 'all' ? '' : selectedAuthority)

    // Automated periodic sync every 5 minutes (300,000 ms) across all authorities
    const interval = setInterval(() => {
      pollLiveRss(selectedAuthority === 'all' ? '' : selectedAuthority, true)
    }, 300000)

    // Re-check stream whenever candidate returns to this browser tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        pollLiveRss(selectedAuthority === 'all' ? '' : selectedAuthority)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [selectedAuthority, pollLiveRss])

  // Active authority object from authorities.json
  const activeAuthorityObj = useMemo(() => {
    if (selectedAuthority === 'all') return null
    return authoritiesData.find(a => a.name === selectedAuthority || a.id === selectedAuthority)
  }, [selectedAuthority])

  // Live stories and the stored week, newest first. Both are keyed by article
  // link (newsMatch.storyId), so a story present in both is counted once.
  const allStories = useMemo(() => {
    const byId = new Map()
    for (const item of [...liveRssItems, ...storedNews]) {
      if (!byId.has(item.id)) byId.set(item.id, item)
    }
    return [...byId.values()].sort(byNewest)
  }, [liveRssItems, storedNews])

  const combinedStream = useMemo(() => {
    if (feedMode === 'stored') return storedNews
    if (feedMode === 'live_rss') return liveRssItems
    return allStories
  }, [feedMode, storedNews, liveRssItems, allStories])

  // Filtered dispatches based on all criteria
  const filteredDispatches = useMemo(() => {
    return combinedStream.filter(item => {
      // Authority match (across authoritiesData.length conducting authorities)
      if (selectedAuthority !== 'all') {
        const target = selectedAuthority.toLowerCase().trim()
        const authFull = (item.authority_full || '').toLowerCase()
        const src = (item.source || '').toLowerCase()
        const acronym = (item.exam_acronym || '').toLowerCase()
        const title = (item.title || '').toLowerCase()
        const examId = (item.exam_id || '').toLowerCase()

        const matches = authFull.includes(target) ||
                        src.includes(target) ||
                        acronym.includes(target) ||
                        title.includes(target) ||
                        examId.includes(target) ||
                        target.includes(acronym) ||
                        target.includes(src)

        if (!matches) {
          return false
        }
      }

      // Scope / Jurisdiction match
      if (selectedScope !== 'all' && item.category !== selectedScope) {
        return false
      }

      // Type code match
      if (selectedType !== 'all' && item.type_code !== selectedType) {
        return false
      }

      // Text search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title?.toLowerCase().includes(q)
        const matchExam = item.exam_acronym?.toLowerCase().includes(q)
        const matchSource = item.source?.toLowerCase().includes(q)
        const matchSummary = item.summary?.toLowerCase().includes(q)
        const matchAuth = item.authority_full?.toLowerCase().includes(q)
        if (!matchTitle && !matchExam && !matchSource && !matchSummary && !matchAuth) {
          return false
        }
      }

      return true
    })
  }, [combinedStream, selectedAuthority, selectedScope, selectedType, searchQuery])

  // Telemetry Type Breakdown Counts
  const typeCounts = useMemo(() => {
    const counts = { NOTIF: 0, ADMIT: 0, KEY: 0, RESULT: 0, SCHED: 0 }
    filteredDispatches.forEach(item => {
      if (counts[item.type_code] !== undefined) {
        counts[item.type_code] += 1
      }
    })
    return counts
  }, [filteredDispatches])

  // Copy citation action
  const handleCopyCitation = (item, e) => {
    e.stopPropagation()
    const text = `${item.title} — ${item.source}, ${item.date}\n${item.link}`
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage('Headline and link copied to clipboard')
      setTimeout(() => setToastMessage(null), 2500)
    }).catch(() => {
      setToastMessage('Failed to copy to clipboard')
      setTimeout(() => setToastMessage(null), 2000)
    })
  }

  // Find linked exam object to allow 1-click jump to Exam Details
  const getExamObject = (examId) => {
    // Authority-level stories have no exam_id — without this guard the
    // acronym comparison below matched any exam lacking an acronym
    if (!examId) return null
    return exams.find(e => e.id === examId || e.acronym?.toLowerCase() === examId?.toLowerCase())
  }

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="mterminal-wire-wrapper fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="mterminal-toast" role="alert">
          <HiOutlineCheck className="mterminal-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="mterminal-card">
        {/* Top Control Bar */}
        <div className="mterminal-control-header">
          <div className="mterminal-section-title">
            <span className="mterminal-amber-label">EXAM NEWS & UPDATES</span>
            <span className="mterminal-status-pill">
              <span className="mterminal-pulse-dot" /> {authoritiesData.length} COMMISSIONS INDEXED
            </span>
          </div>

          <div className="mterminal-filter-cluster">
            {/* Conducting Authority Dropdown covering every known authority */}
            <div className="mterminal-select-wrapper">
              <select
                className="mterminal-select mterminal-authority-select"
                value={selectedAuthority}
                onChange={(e) => setSelectedAuthority(e.target.value)}
                aria-label={`Filter by Conducting Authority (${authoritiesData.length} total)`}
                title={`Select from ${authoritiesData.length} conducting authorities`}
              >
                <option value="all">All {authoritiesData.length} Conducting Authorities</option>
                <optgroup label="Primary Central Commissions">
                  <option value="UPSC">UPSC (Union Public Service Commission)</option>
                  <option value="SSC">SSC (Staff Selection Commission)</option>
                  <option value="NTA">NTA (National Testing Agency)</option>
                  <option value="IBPS">IBPS (Institute of Banking Personnel Selection)</option>
                  <option value="Railway Recruitment Boards">RRB (Railway Recruitment Boards)</option>
                  <option value="NBEMS">NBEMS (National Board of Examinations in Medical Sciences)</option>
                </optgroup>
                <optgroup label={`All ${authoritiesData.length} Conducting Authorities (Alphabetical)`}>
                  {authoritiesData.map(auth => (
                    <option key={auth.id} value={auth.name}>
                      {auth.name} ({auth.jurisdiction === 'central' ? 'Central' : auth.state || 'State'})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Jurisdiction Dropdown */}
            <div className="mterminal-select-wrapper">
              <select
                className="mterminal-select"
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                aria-label="Filter by Commission Jurisdiction"
              >
                <option value="all">All Jurisdictions</option>
                <option value="central">Central Commissions</option>
                <option value="state">State PSCs & Boards</option>
                <option value="banking">Banking & Insurance</option>
                <option value="defence">Defence & Armed Forces</option>
              </select>
            </div>

            {/* Story Type Dropdown */}
            <div className="mterminal-select-wrapper">
              <select
                className="mterminal-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                aria-label="Filter by story type"
              >
                <option value="all">All Types</option>
                <option value="NOTIF">[NOTIF] Notifications</option>
                <option value="ADMIT">[ADMIT] Admit Cards</option>
                <option value="KEY">[KEY] Answer Keys</option>
                <option value="RESULT">[RESULT] Results & Merit</option>
                <option value="SCHED">[SCHED] Shifts & Schedules</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="mterminal-search-wrapper">
              <HiOutlineSearch className="mterminal-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                className="mterminal-search-input"
                placeholder={`Q SEARCH ${authoritiesData.length} BODIES...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search exam news"
              />
              {searchQuery && (
                <button
                  className="mterminal-clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Sync / Fetch Button */}
            <button
              className={`mterminal-fetch-btn ${isSyncing ? 'syncing' : ''}`}
              onClick={() => pollLiveRss(selectedAuthority === 'all' ? '' : selectedAuthority, true, true)}
              title="Check Google News for headlines published since the last check"
              disabled={isSyncing}
            >
              <HiOutlineRefresh className={`mterminal-fetch-icon ${isSyncing ? 'spinning' : ''}`} />
              <span>{isSyncing ? 'CHECKING...' : 'CHECK FOR NEW'}</span>
            </button>
          </div>
        </div>

        {/* Source filter: everything / the stored week / fetched live in this browser */}
        <div className="mterminal-source-mode-bar">
          <div className="mterminal-mode-pills">
            <button
              className={`mterminal-mode-pill ${feedMode === 'all' ? 'active' : ''}`}
              onClick={() => setFeedMode('all')}
            >
              <HiOutlineSparkles className="pill-icon" />
              <span>ALL NEWS ({allStories.length})</span>
            </button>
            <button
              className={`mterminal-mode-pill ${feedMode === 'stored' ? 'active' : ''}`}
              onClick={() => setFeedMode('stored')}
              title="Headlines from the past 7 days, refreshed every morning"
            >
              <HiOutlineCollection className="pill-icon text-amber" />
              <span>PAST 7 DAYS ({storedStatus === 'loading' ? '…' : storedNews.length})</span>
            </button>
            <button
              className={`mterminal-mode-pill ${feedMode === 'live_rss' ? 'active' : ''}`}
              onClick={() => setFeedMode('live_rss')}
              title="Headlines fetched live while you have this page open"
            >
              <HiOutlineRss className="pill-icon text-emerald" />
              <span>LIVE ({liveRssItems.length})</span>
            </button>
          </div>

          {/* Active Authority Info Strip if an authority is selected */}
          {activeAuthorityObj && (
            <div className="mterminal-authority-info-chip">
              <span className="auth-chip-name">{activeAuthorityObj.name}</span>
              <span className="auth-chip-sep">·</span>
              <span className="auth-chip-meta">{activeAuthorityObj.jurisdiction.toUpperCase()} · {activeAuthorityObj.domain}</span>
              <span className="auth-chip-sep">·</span>
              <span className="auth-chip-exams">{activeAuthorityObj.exam_ids.length} EXAMS</span>
              <a
                href={activeAuthorityObj.website}
                target="_blank"
                rel="noopener noreferrer"
                className="auth-chip-link"
                title={`Visit official website: ${activeAuthorityObj.website}`}
              >
                <HiOutlineGlobeAlt />
                <span>OFFICIAL PORTAL</span>
              </a>
            </div>
          )}
        </div>

        {/* Telemetry / Metric Bar matching M-Terminal */}
        <div className="mterminal-telemetry-row">
          <div className="mterminal-telemetry-left">
            <div className="mterminal-score-line">
              <span className="mterminal-big-score">{filteredDispatches.length}</span>
              <span className="mterminal-score-denom">/{combinedStream.length}</span>
              <span className="mterminal-score-caption">
                STORIES MATCHED · {lastSyncTime}
              </span>
            </div>

            {/* Segmented Horizontal Progress Bar */}
            {filteredDispatches.length > 0 && (
              <div className="mterminal-segmented-bar" role="progressbar" aria-label="Breakdown by story type">
                <div
                  className="mterminal-bar-seg seg-notif"
                  style={{ width: `${(typeCounts.NOTIF / filteredDispatches.length) * 100}%` }}
                  title={`Notifications: ${typeCounts.NOTIF}`}
                />
                <div
                  className="mterminal-bar-seg seg-admit"
                  style={{ width: `${(typeCounts.ADMIT / filteredDispatches.length) * 100}%` }}
                  title={`Admit Cards: ${typeCounts.ADMIT}`}
                />
                <div
                  className="mterminal-bar-seg seg-key"
                  style={{ width: `${(typeCounts.KEY / filteredDispatches.length) * 100}%` }}
                  title={`Answer Keys: ${typeCounts.KEY}`}
                />
                <div
                  className="mterminal-bar-seg seg-result"
                  style={{ width: `${(typeCounts.RESULT / filteredDispatches.length) * 100}%` }}
                  title={`Results: ${typeCounts.RESULT}`}
                />
                <div
                  className="mterminal-bar-seg seg-sched"
                  style={{ width: `${(typeCounts.SCHED / filteredDispatches.length) * 100}%` }}
                  title={`Schedules: ${typeCounts.SCHED}`}
                />
              </div>
            )}

            {/* Breakdown Pills */}
            <div className="mterminal-breakdown-legend">
              <button
                className={`mterminal-legend-btn ${selectedType === 'NOTIF' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'NOTIF' ? 'all' : 'NOTIF')}
              >
                <span className="mterminal-legend-dot dot-notif" />
                <span>{typeCounts.NOTIF} notifications</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'ADMIT' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'ADMIT' ? 'all' : 'ADMIT')}
              >
                <span className="mterminal-legend-dot dot-admit" />
                <span>{typeCounts.ADMIT} admit cards</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'KEY' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'KEY' ? 'all' : 'KEY')}
              >
                <span className="mterminal-legend-dot dot-key" />
                <span>{typeCounts.KEY} answer keys</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'RESULT' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'RESULT' ? 'all' : 'RESULT')}
              >
                <span className="mterminal-legend-dot dot-result" />
                <span>{typeCounts.RESULT} results</span>
              </button>
              <span className="mterminal-legend-sep">·</span>
              <button
                className={`mterminal-legend-btn ${selectedType === 'SCHED' ? 'active' : ''}`}
                onClick={() => setSelectedType(selectedType === 'SCHED' ? 'all' : 'SCHED')}
              >
                <span className="mterminal-legend-dot dot-sched" />
                <span>{typeCounts.SCHED} schedules</span>
              </button>
            </div>
          </div>

          <div className="mterminal-telemetry-right">
            <div className="mterminal-meta-group">
              <div className="mterminal-meta-label">CONDUCTING AUTHORITIES COVERED</div>
              <div className="mterminal-meta-val">
                {selectedAuthority === 'all'
                  ? `${authoritiesData.length} National & State Bodies`
                  : activeAuthorityObj?.name || selectedAuthority}
              </div>
            </div>
            <div className="mterminal-meta-group">
              <div className="mterminal-meta-label">SOURCE</div>
              <div className="mterminal-meta-val">
                News publishers, via Google News
              </div>
            </div>
            <div className="mterminal-meta-desc">
              These are news reports, not official notices. Always confirm dates, vacancies and
              deadlines on the conducting authority's official website before acting.
              {storedStatus === 'failed' && ' (The stored headlines could not be loaded — showing live headlines only.)'}
            </div>
          </div>
        </div>

        {/* Headlines List Section */}
        <div className="mterminal-headlines-section">
          <div className="mterminal-headlines-header">
            <span className="mterminal-amber-label">HEADLINES</span>
            <span className="mterminal-count-label">{filteredDispatches.length} {filteredDispatches.length === 1 ? 'story' : 'stories'}</span>
          </div>

          {filteredDispatches.length === 0 && storedStatus === 'loading' ? (
            <div className="mterminal-empty-state">
              <p className="mterminal-empty-msg">Loading headlines…</p>
            </div>
          ) : filteredDispatches.length === 0 ? (
            <div className="mterminal-empty-state">
              <p className="mterminal-empty-msg">
                No news found for &quot;{searchQuery || selectedAuthority || selectedScope}&quot;.
              </p>
              <button
                className="mterminal-reset-btn"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedAuthority('all')
                  setSelectedScope('all')
                  setSelectedType('all')
                  setFeedMode('all')
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="mterminal-list">
              {(isMobile ? filteredDispatches.slice(0, mobileVisible) : filteredDispatches).map((item) => {
                const isExpanded = expandedId === item.id
                const examObj = getExamObject(item.exam_id)

                return (
                  <div
                    key={item.id}
                    className={`mterminal-headline-row-container ${isExpanded ? 'expanded' : ''}`}
                  >
                    {/* Collapsed Headline Row */}
                    <div
                      className="mterminal-headline-row"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setExpandedId(isExpanded ? null : item.id)
                        }
                      }}
                      aria-expanded={isExpanded}
                    >
                      <div className="mterminal-row-left">
                        {item.is_live && (
                          <span className="mterminal-live-feed-pill">
                            <span className="mterminal-pulse-dot" /> LIVE
                          </span>
                        )}

                        {/* Status Tag */}
                        <span className={`mterminal-type-pill pill-${item.type_code?.toLowerCase() || 'notif'}`}>
                          {item.type_code || 'NOTIF'}
                        </span>

                        {/* Title */}
                        <span className="mterminal-row-title" title={item.title}>
                          {item.title}
                        </span>

                        {/* Exam / Authority Acronym Tag */}
                        <span className="mterminal-exam-badge">
                          {item.exam_acronym || item.source}
                        </span>
                      </div>

                      <div className="mterminal-row-right">
                        <span className="mterminal-source-time">
                          {item.source} · {item.published_at ? getRelativeTime(item.published_at) : item.time_ago}
                        </span>
                        <button
                          className="mterminal-expand-icon-btn"
                          aria-label={isExpanded ? 'Collapse story' : 'Expand story'}
                        >
                          {isExpanded ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Dispatch Briefing */}
                    {isExpanded && (
                      <div className="mterminal-dispatch-drawer fade-in">
                        {/* Meta Ribbon */}
                        <div className="mterminal-drawer-ribbon">
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">PUBLISHER:</span>
                            <span className="mterminal-ribbon-v">{item.source}</span>
                          </div>
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">ABOUT:</span>
                            <span className="mterminal-ribbon-v">{item.authority_full || item.source}</span>
                          </div>
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">PUBLISHED:</span>
                            <span className="mterminal-ribbon-v monospace-text">{item.date}</span>
                          </div>
                          <div className="mterminal-ribbon-item">
                            <span className="mterminal-ribbon-k">STATUS:</span>
                            <span className="mterminal-ribbon-v">News report · not an official notice</span>
                          </div>
                        </div>

                        {/* Executive Abstract */}
                        <div className="mterminal-drawer-body">
                          <div className="mterminal-drawer-abstract">
                            <div className="mterminal-drawer-heading">WHAT THIS IS</div>
                            <p className="mterminal-abstract-text">{newsSummary(item.source, item.date)}</p>
                          </div>

                          {/* Action Cluster */}
                          <div className="mterminal-drawer-actions">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mterminal-action-btn primary-action"
                              title="Open the news article in a new tab"
                            >
                              <HiOutlineExternalLink className="mterminal-btn-icon" />
                              <span>READ ARTICLE</span>
                            </a>

                            {/^https?:\/\//.test(item.portal_url || '') && (
                              <a
                                href={item.portal_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mterminal-action-btn secondary-action"
                                title="Confirm on the conducting authority's own website"
                              >
                                <HiOutlineGlobeAlt className="mterminal-btn-icon" />
                                <span>OFFICIAL WEBSITE</span>
                              </a>
                            )}

                            {/* Jump to Exam Detail if matched */}
                            {examObj && onViewDetails && (
                              <button
                                className="mterminal-action-btn secondary-action"
                                onClick={() => onViewDetails(examObj)}
                                title={`Open full ${item.exam_acronym} Dossier`}
                              >
                                <HiOutlineDocumentText className="mterminal-btn-icon" />
                                <span>VIEW {item.exam_acronym} DOSSIER</span>
                              </button>
                            )}

                            {/* Copy Citation */}
                            <button
                              className="mterminal-action-btn tertiary-action"
                              onClick={(e) => handleCopyCitation(item, e)}
                              title="Copy the headline and link"
                            >
                              <HiOutlineClipboardCopy className="mterminal-btn-icon" />
                              <span>COPY LINK</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
              {isMobile && filteredDispatches.length > mobileVisible && (
                <button type="button" className="show-more-btn" onClick={() => setMobileVisible(v => v + 25)}>
                  Show more ({filteredDispatches.length - mobileVisible} more)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
