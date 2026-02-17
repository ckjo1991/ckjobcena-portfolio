import { useEffect } from 'react'

const PARALLAX_MEDIA_SHIFT = 14
const PARALLAX_BACK_SHIFT = 8
const PARALLAX_FRONT_SHIFT = 10

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function resetParallax(node) {
  node.style.setProperty('--preview-parallax-media-y', '0px')
  node.style.setProperty('--preview-parallax-back-y', '0px')
  node.style.setProperty('--preview-parallax-front-y', '0px')
}

export function usePreviewParallax(scopeRef) {
  useEffect(() => {
    const scopeNode = scopeRef.current
    if (!scopeNode || typeof window === 'undefined') return undefined

    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targets = Array.from(scopeNode.querySelectorAll('[data-preview-parallax]'))
    if (!targets.length) return undefined

    let rafId = 0

    const updateParallax = () => {
      rafId = 0

      if (prefersReducedMotionQuery.matches) {
        targets.forEach((target) => resetParallax(target))
        return
      }

      const viewportHeight = window.innerHeight || 1
      const viewportCenterY = viewportHeight / 2

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect()
        const isOffscreen = rect.bottom < 0 || rect.top > viewportHeight
        if (isOffscreen) {
          resetParallax(target)
          return
        }

        const elementCenterY = rect.top + rect.height / 2
        const normalized = clamp((elementCenterY - viewportCenterY) / viewportCenterY, -1, 1)

        const mediaShift = -normalized * PARALLAX_MEDIA_SHIFT
        const backShift = -normalized * PARALLAX_BACK_SHIFT
        const frontShift = normalized * PARALLAX_FRONT_SHIFT

        target.style.setProperty('--preview-parallax-media-y', `${mediaShift.toFixed(2)}px`)
        target.style.setProperty('--preview-parallax-back-y', `${backShift.toFixed(2)}px`)
        target.style.setProperty('--preview-parallax-front-y', `${frontShift.toFixed(2)}px`)
      })
    }

    const scheduleUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateParallax)
    }

    const onMotionPreferenceChange = () => {
      scheduleUpdate()
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    if (typeof prefersReducedMotionQuery.addEventListener === 'function') {
      prefersReducedMotionQuery.addEventListener('change', onMotionPreferenceChange)
    } else {
      prefersReducedMotionQuery.addListener(onMotionPreferenceChange)
    }

    scheduleUpdate()

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }

      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)

      if (typeof prefersReducedMotionQuery.addEventListener === 'function') {
        prefersReducedMotionQuery.removeEventListener('change', onMotionPreferenceChange)
      } else {
        prefersReducedMotionQuery.removeListener(onMotionPreferenceChange)
      }

      targets.forEach((target) => resetParallax(target))
    }
  }, [scopeRef])
}
