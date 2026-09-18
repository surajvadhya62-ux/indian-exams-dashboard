import { useState, useEffect, useMemo } from 'react'
import newsData from '../data/news.json'
import { fetchLiveExamNews } from '../utils/newsRssFetcher'

export default function NewsTicker({ onSelectNews, setActiveView }) {
  const [liveTickerItems, setLiveTickerItems] = useState([])

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
    if (liveTickerItems.length > 0) {
      // Interleave top live items with official statutory circulars
      const staticTop = newsData.slice(0, 4)
      return [...liveTickerItems, ...staticTop]
    }
    return newsData.slice(0, 8)
  }, [liveTickerItems])

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
    <div className="mterminal-ticker-bar" aria-label="Statutory Wire Ticker">
      <div className="mterminal-ticker-inner">
        <div className="mterminal-ticker-lead">
          <span className="mterminal-pulse-dot" />
          <span className="mterminal-ticker-title">LIVE GAZETTE WIRE</span>
          <span className="mterminal-ticker-sep">/</span>
        </div>

        <div className="mterminal-marquee-track">
          <div className="mterminal-marquee-content">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                className="mterminal-ticker-item"
                onClick={() => handleClick(item)}
                title={`Click to view gazette dispatch: ${item.title}`}
              >
                {item.is_live && (
                  <span className="mterminal-live-feed-pill" style={{ marginRight: '6px', padding: '1px 5px', fontSize: '9px' }}>
                    <span className="mterminal-pulse-dot" /> LIVE
                  </span>
                )}
                <span className={`mterminal-mini-tag tag-${item.type_code?.toLowerCase() || 'notif'}`}>
                  [{item.type_code || 'NOTIF'}]
                </span>
                <span className="mterminal-ticker-exam">{item.exam_acronym}:</span>
                <span className="mterminal-ticker-text">{item.title}</span>
                <span className="mterminal-ticker-time">({item.time_ago})</span>
                <span className="mterminal-ticker-bullet">◆</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
