import { Component } from 'react'
import { HiOutlineExclamationCircle, HiOutlineRefresh } from 'react-icons/hi'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('IndiaExams Dashboard Caught Error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (window.location.hash) {
      window.location.hash = '#explore'
    } else {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--ink, #080a0f)',
          color: 'var(--fg, #e8eaed)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(200, 75, 60, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            color: 'var(--accent-rose, #f43f5e)'
          }}>
            <HiOutlineExclamationCircle size={36} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif, Georgia)',
            fontSize: '1.75rem',
            marginBottom: '0.75rem',
            color: 'var(--fg, #e8eaed)'
          }}>
            Something unexpected occurred
          </h2>
          <p style={{
            color: 'var(--muted, #8a93a0)',
            maxWidth: '480px',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}>
            A temporary component or data parsing error was caught. The rest of the intelligence registry remains safe.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '6px',
              background: 'var(--amber-bright, #e8a33d)',
              color: '#080a0f',
              fontWeight: 600,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <HiOutlineRefresh size={18} /> Return to Explore View
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
