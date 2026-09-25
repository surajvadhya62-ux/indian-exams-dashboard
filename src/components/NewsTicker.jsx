import { useState, useEffect, useMemo } from 'react'
import { fetchLiveExamNews, getRelativeTime } from '../utils/newsRssFetcher'

// The newest few stored headlines (scripts/automation/refresh-news.mjs) — a
// small file, since this strip sits on every page
const LATEST_NEWS_URL = './news/latest.json'

export default function NewsTicker({ onSelectNews, setActiveView }) {
  const [liveTickerItems, setLiveTickerItems] = useState([])
  const [storedItems, setStoredItems] = useState([])

  useEffect(() => {
    let cancelled = false
    fetch(LATEST_NEWS_URL, { cache: 'no-cache' })
      .then(res => (res.ok ? res.json() : []))
      .then(items => { if (!cancelled && Array.isArray(items)) setStoredItems(items) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Fetch real-time live RSS items for ticker strip with 5-minute auto-refresh
  useEffect(() => {
    let isMounted = true
    const updateTicker = () => {
      fetchLiveExamNews().then(res => {
        if (isMounted && res.success && res.items.length > 0) {
          setLiveTickerItems(res.items.slice(0, 6))
        }
      }).catch(() => {})
    }

    updateTicker()
    const interval = setInterval(updateTicker, 300000) // Auto-refresh every 5 minutes
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const tickerItems = useMemo(() => {
    const seen = new Set()
    const items = []
    for (const item of [...liveTickerItems, ...storedItems]) {
      if (seen.has(item.id)) continue
      seen.add(item.id)
      items.push(item)
    }
    return items.slice(0, 10)
  }, [liveTickerItems, storedItems])

  const handleClick = (item) => {
    if (setActiveView) {
      setActiveView('updates')
    }
    if (onSelectNews) {
      onSelectNews(item)
    }
    window.location.hash = '#updates'
  }

  return (
    <div className="mterminal-ticker-bar" aria-label="Latest exam news">
      <div className="mterminal-ticker-inner">
        <div className="mterminal-ticker-lead">
          <span className="mterminal-pulse-dot" />
          <span className="mterminal-ticker-title">LATEST EXAM NEWS</span>
          <span className="mterminal-ticker-sep">/</span>
        </div>

        <div className="mterminal-marquee-track">
          <div className="mterminal-marquee-content">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                className="mterminal-ticker-item"
                onClick={() => handleClick(item)}
                title={`Open in Updates: ${item.title}`}
              >
                {item.is_live && (
                  <span className="mterminal-live-feed-pill" style={{ marginRight: '6px', padding: '1px 5px', fontSize: '9px' }}>
                    <span className="mterminal-pulse-dot" /> LIVE
                  </span>
                )}
                <span className={`mterminal-mini-tag tag-${item.type_code?.toLowerCase() || 'notif'}`}>
                  [{item.type_code || 'NOTIF'}]
                </span>
                <span className="mterminal-ticker-exam">{item.exam_acronym || item.source}:</span>
                <span className="mterminal-ticker-text">{item.title}</span>
                <span className="mterminal-ticker-time">({item.published_at ? getRelativeTime(item.published_at) : item.time_ago})</span>
                <span className="mterminal-ticker-bullet">◆</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
