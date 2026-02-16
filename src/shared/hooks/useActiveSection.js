import { useEffect, useRef, useState } from 'react'
import { SECTION_NAV_TARGET_EVENT } from '../navigation/sectionNavigation'

const MAX_LOCK_MS = 1500

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === 'undefined') {
      return sectionIds[0]
    }

    const initialHash = window.location.hash.replace('#', '')
    return sectionIds.includes(initialHash) ? initialHash : sectionIds[0]
  })
  const [lockedSection, setLockedSection] = useState(null)
  const lockStartedAtRef = useRef(0)

  useEffect(() => {
    let rafId = 0

    const updateActiveSection = () => {
      const triggerLine = window.innerHeight * 0.3
      let currentSection = sectionIds[0]

      sectionIds.forEach((sectionId) => {
        const target = document.getElementById(sectionId)
        if (!target) return

        const top = target.getBoundingClientRect().top
        if (top <= triggerLine) {
          currentSection = sectionId
        }
      })

      const reachedPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (reachedPageBottom) {
        currentSection = sectionIds[sectionIds.length - 1]
      }

      if (lockedSection) {
        const lockedTarget = document.getElementById(lockedSection)
        if (!lockedTarget) {
          setLockedSection(null)
          setActiveSection(currentSection)
          return
        }

        const lockedTop = Math.abs(lockedTarget.getBoundingClientRect().top)
        const reachedLockedTarget =
          lockedTop <= 12 || (reachedPageBottom && lockedSection === sectionIds[sectionIds.length - 1])
        const lockExpired = performance.now() - lockStartedAtRef.current > MAX_LOCK_MS

        if (reachedLockedTarget) {
          setLockedSection(null)
          setActiveSection(lockedSection)
          return
        }

        if (lockExpired) {
          setLockedSection(null)
          setActiveSection(currentSection)
          return
        }

        setActiveSection(lockedSection)
        return
      }

      setActiveSection(currentSection)
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateActiveSection)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const onNavTarget = (event) => {
      const nextSectionId = event?.detail?.sectionId
      if (sectionIds.includes(nextSectionId)) {
        lockStartedAtRef.current = performance.now()
        setLockedSection(nextSectionId)
        setActiveSection(nextSectionId)
      }
    }

    window.addEventListener(SECTION_NAV_TARGET_EVENT, onNavTarget)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener(SECTION_NAV_TARGET_EVENT, onNavTarget)
    }
  }, [sectionIds, lockedSection])

  return activeSection
}
