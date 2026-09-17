import { useMemo } from 'react'
import newsData from '../data/news.json'

export default function NewsTicker({ onSelectNews, setActiveView }) {
  const tickerItems = useMemo(() => {
    return newsData.slice(0, 6)
  }, [])

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
                <span className={`mterminal-mini-tag tag-${item.type_code.toLowerCase()}`}>
                  [{item.type_code}]
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
