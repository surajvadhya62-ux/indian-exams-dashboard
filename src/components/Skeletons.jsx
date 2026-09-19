import React from 'react'

export function SkeletonCard() {
  return (
    <div className="skeleton-card panel">
      <div className="skeleton-card-header">
        <div className="skeleton-title-group">
          <div className="skeleton-line skeleton-title" style={{ width: '75%', height: '1.2rem', marginBottom: '8px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <div className="skeleton-pill" style={{ width: '60px', height: '18px' }} />
            <div className="skeleton-pill" style={{ width: '70px', height: '18px' }} />
          </div>
        </div>
        <div className="skeleton-circle" style={{ width: '32px', height: '32px' }} />
      </div>

      <div style={{ display: 'flex', gap: '8px', margin: '14px 0 10px' }}>
        <div className="skeleton-pill" style={{ width: '90px', height: '20px' }} />
        <div className="skeleton-pill" style={{ width: '80px', height: '20px' }} />
      </div>

      <div className="skeleton-body" style={{ margin: '10px 0' }}>
        <div className="skeleton-line" style={{ width: '100%', height: '12px', marginBottom: '6px' }} />
        <div className="skeleton-line" style={{ width: '92%', height: '12px', marginBottom: '6px' }} />
        <div className="skeleton-line" style={{ width: '65%', height: '12px' }} />
      </div>

      <div className="skeleton-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--hairline)' }}>
        <div className="skeleton-line" style={{ width: '90px', height: '14px' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div className="skeleton-btn" style={{ width: '70px', height: '28px', borderRadius: '4px' }} />
          <div className="skeleton-btn" style={{ width: '60px', height: '28px', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="exam-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonChart({ height = 320, title = 'Loading telemetry module...' }) {
  return (
    <div className="chart-card skeleton-chart-container">
      <div className="chart-header-row">
        <div>
          <div className="skeleton-line" style={{ width: '180px', height: '1.1rem', marginBottom: '6px' }} />
          <div className="skeleton-line" style={{ width: '260px', height: '0.8rem' }} />
        </div>
        <div className="skeleton-pill" style={{ width: '80px', height: '22px' }} />
      </div>
      <div className="skeleton-chart-body" style={{ height, display: 'flex', alignItems: 'flex-end', gap: '14px', padding: '20px 10px 10px' }}>
        <div className="skeleton-chart-bar" style={{ height: '40%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '75%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '55%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '90%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '65%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '80%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '45%', flex: 1 }} />
        <div className="skeleton-chart-bar" style={{ height: '70%', flex: 1 }} />
      </div>
    </div>
  )
}

export function SkeletonModal() {
  return (
    <div className="skeleton-modal-inner fade-in">
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
        <div className="skeleton-pill" style={{ width: '110px', height: '24px' }} />
        <div className="skeleton-pill" style={{ width: '140px', height: '24px' }} />
        <div className="skeleton-pill" style={{ width: '120px', height: '24px' }} />
      </div>
      <div className="skeleton-line" style={{ width: '70%', height: '1.8rem', marginBottom: '10px' }} />
      <div className="skeleton-line" style={{ width: '40%', height: '1rem', marginBottom: '20px' }} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--hairline-2)', paddingBottom: '10px' }}>
        <div className="skeleton-pill" style={{ width: '110px', height: '32px' }} />
        <div className="skeleton-pill" style={{ width: '130px', height: '32px' }} />
        <div className="skeleton-pill" style={{ width: '140px', height: '32px' }} />
        <div className="skeleton-pill" style={{ width: '120px', height: '32px' }} />
      </div>

      {/* Section 1 */}
      <div style={{ marginBottom: '24px' }}>
        <div className="skeleton-line" style={{ width: '100%', height: '14px', marginBottom: '8px' }} />
        <div className="skeleton-line" style={{ width: '95%', height: '14px', marginBottom: '8px' }} />
        <div className="skeleton-line" style={{ width: '80%', height: '14px' }} />
      </div>

      {/* Section 2 Grid */}
      <div className="skeleton-line" style={{ width: '160px', height: '1.2rem', marginBottom: '14px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-param-box" style={{ padding: '14px', borderRadius: '8px', border: '1px solid var(--hairline)' }}>
            <div className="skeleton-line" style={{ width: '50%', height: '10px', marginBottom: '8px' }} />
            <div className="skeleton-line" style={{ width: '80%', height: '16px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div className="stat-card skeleton-stat-cell">
      <div className="skeleton-line" style={{ width: '60px', height: '11px', marginBottom: '8px' }} />
      <div className="skeleton-line" style={{ width: '80px', height: '24px', marginBottom: '6px' }} />
      <div className="skeleton-line" style={{ width: '100px', height: '12px' }} />
    </div>
  )
}

// Generic fallback for a lazy-loaded view/modal while its code chunk
// downloads (see App.jsx's code-splitting — most views load on demand
// rather than in the initial bundle). Deliberately brief and undetailed:
// on a warm cache this flashes for a frame or two, so it isn't worth
// building a page-specific skeleton for every destination.
export function ViewLoadingFallback() {
  return (
    <div className="view-loading-fallback fade-in">
      <div className="skeleton-pill" style={{ width: '46px', height: '46px', borderRadius: '50%' }} />
    </div>
  )
}

export default {
  SkeletonCard,
  SkeletonGrid,
  SkeletonChart,
  SkeletonModal,
  SkeletonStat,
  ViewLoadingFallback
}
