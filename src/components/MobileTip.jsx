import { useState } from 'react'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import useIsMobile from '../hooks/useIsMobile'

const DISMISS_KEY = 'indiaexams_mobile_tip_dismissed'

function wasDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

// Shown on phones until the visitor closes it. The phone layout works, but
// the comparison tables and dense views read better on a wider screen.
export default function MobileTip() {
  const isMobile = useIsMobile()
  const [dismissed, setDismissed] = useState(wasDismissed)

  if (!isMobile || dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Private browsing etc. — it just shows again next visit
    }
  }

  return (
    <div className="mobile-tip" role="note">
      <HiOutlineDesktopComputer className="mobile-tip-icon" aria-hidden="true" />
      <p>
        Tables read best on a laptop, or with <strong>Desktop site</strong> turned on in your
        browser menu.
      </p>
      <button type="button" className="mobile-tip-close" onClick={dismiss} aria-label="Dismiss tip">✕</button>
    </div>
  )
}
