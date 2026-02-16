import { useEffect } from 'react'

export function useScrollReveal(scopeRef, resetKey) {
  useEffect(() => {
    const scopeNode = scopeRef.current
    if (!scopeNode) return

    const targets = Array.from(scopeNode.querySelectorAll('[data-scroll-reveal]'))
    if (!targets.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    targets.forEach((target) => {
      target.classList.remove('reveal-ready', 'is-revealed')
      target.classList.add('reveal-ready')

      if (prefersReducedMotion) {
        target.classList.add('is-revealed')
        return
      }

      const targetTop = target.getBoundingClientRect().top
      if (targetTop <= window.innerHeight * 0.9) {
        target.classList.add('is-revealed')
      }
    })

    if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
      targets.forEach((target) => target.classList.add('is-revealed'))
      return
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    targets.forEach((target) => {
      if (!target.classList.contains('is-revealed')) {
        observer.observe(target)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [scopeRef, resetKey])
}
