import { useEffect, useState } from 'react'

/**
 * Simple parallax hook for subtle background movements
 * Returns transform value based on scroll position
 */
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Only run if user hasn't opted for reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }
      
      const scrolled = window.pageYOffset
      setOffset(scrolled * speed)
    }

    // Throttle scroll events for performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return offset
}
