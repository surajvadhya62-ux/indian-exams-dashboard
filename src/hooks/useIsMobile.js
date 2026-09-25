import { useEffect, useState } from 'react'

// Same breakpoint as the mobile bottom nav and the rest of the phone layout
// in index.css. Used where a phone needs different *behaviour* (shorter lists,
// collapsed filters), not just different styling.
export const MOBILE_QUERY = '(max-width: 768px)'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}
