import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import HomePage from '../features/home/HomePage'
import { projectCaseStudiesById, projects } from '../shared/data/portfolio-data'
import { useActiveSection } from '../shared/hooks/useActiveSection'
import { useScrollReveal } from '../shared/hooks/useScrollReveal'
import { useThemeMode } from '../shared/hooks/useThemeMode'
import { scrollToSection } from '../shared/navigation/sectionNavigation'
import {
  AboutIcon,
  BackIcon,
  ContactIcon,
  HomeIcon,
  ProjectsIcon,
  ThemeMoonIcon,
  ThemeSunIcon,
} from '../shared/ui/icons'
import StartupLoader from '../shared/ui/StartupLoader'
import { revealDelay } from '../shared/utils/revealDelay'

const sectionNavItems = [
  { id: 'hero', label: 'Home', icon: HomeIcon },
  { id: 'projects-preview', label: 'Project', icon: ProjectsIcon },
  { id: 'about-preview', label: 'About', icon: AboutIcon },
  { id: 'contact-me', label: 'Contact', icon: ContactIcon },
]

const sectionIds = sectionNavItems.map((item) => item.id)
const MOBILE_DUPLICATE_PRESS_GUARD_MS = 180
const caseStudySectionIds = [
  'project-summary',
  'problem-space',
  'research-insights',
  'design-exploration',
  'solution-summary',
  'final-design',
  'outcomes',
  'reflection-next-steps',
]

function SectionLink({ sectionId, className, children, onNavigate, isActive = false }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    onNavigate?.(sectionId, event.timeStamp)
    scrollToSection(sectionId)
  }

  return (
    <a
      className={className}
      href={`/#${sectionId}`}
      onClick={handleClick}
      aria-current={isActive ? 'location' : undefined}
    >
      {children}
    </a>
  )
}

function FloatingNav({ activeSection }) {
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null)
  const lastMobilePressRef = useRef({ sectionId: null, timeStamp: -1 })

  const handleNavPress = (sectionId, eventTimeStamp = -1) => {
    if (!window.matchMedia('(max-width: 1023px)').matches) {
      return
    }

    const lastMobilePress = lastMobilePressRef.current
    const isDuplicateTap =
      lastMobilePress.sectionId === sectionId &&
      typeof eventTimeStamp === 'number' &&
      eventTimeStamp >= 0 &&
      Math.abs(eventTimeStamp - lastMobilePress.timeStamp) < MOBILE_DUPLICATE_PRESS_GUARD_MS

    if (isDuplicateTap) {
      return
    }

    lastMobilePressRef.current = { sectionId, timeStamp: eventTimeStamp }
    setMobileExpandedSection((currentSection) => (currentSection === sectionId ? null : sectionId))
  }

  return (
    <nav aria-label="Main navigation" className="floating-nav">
      {sectionNavItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        const isMobileExpanded = mobileExpandedSection === item.id

        return (
          <SectionLink
            key={item.id}
            sectionId={item.id}
            className={`floating-nav__link ${isActive ? 'is-active' : ''} ${isMobileExpanded ? 'is-mobile-expanded' : ''}`}
            onNavigate={handleNavPress}
            isActive={isActive}
          >
            <span className="floating-nav__icon" aria-hidden="true">
              <Icon solid={isActive} />
            </span>
            <span className="floating-nav__label">{item.label}</span>
          </SectionLink>
        )
      })}
    </nav>
  )
}

function CaseStudyBackButton({ homeHref }) {
  return (
    <Link to={homeHref} className="case-study-back-button" aria-label="Back to home">
      <span className="case-study-back-button__icon" aria-hidden="true">
        <BackIcon />
      </span>
    </Link>
  )
}

function AppShell({
  children,
  activeSection,
  disableSectionNav = false,
  mobileCaseStudyNav = null,
}) {
  const { theme, toggleTheme } = useThemeMode()
  const isLightTheme = theme === 'light'
  const isCaseStudyShell = disableSectionNav && Boolean(mobileCaseStudyNav)
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 1023px)').matches
  })
  const isCaseStudyScrollRevealMode = isCaseStudyShell && isMobileViewport
  const [isMobileCaseStudyControlsVisible, setIsMobileCaseStudyControlsVisible] = useState(false)
  const scrollStopTimeoutRef = useRef(null)
  const controlsHideTimeoutRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQueryList = window.matchMedia('(max-width: 1023px)')
    const syncViewportMode = () => {
      setIsMobileViewport(mediaQueryList.matches)
    }

    syncViewportMode()

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', syncViewportMode)
      return () => {
        mediaQueryList.removeEventListener('change', syncViewportMode)
      }
    }

    mediaQueryList.addListener(syncViewportMode)
    return () => {
      mediaQueryList.removeListener(syncViewportMode)
    }
  }, [])

  useEffect(() => {
    const clearTimers = () => {
      if (scrollStopTimeoutRef.current) {
        window.clearTimeout(scrollStopTimeoutRef.current)
        scrollStopTimeoutRef.current = null
      }
      if (controlsHideTimeoutRef.current) {
        window.clearTimeout(controlsHideTimeoutRef.current)
        controlsHideTimeoutRef.current = null
      }
    }

    if (!isCaseStudyScrollRevealMode) {
      clearTimers()
      return
    }

    const onScroll = () => {
      setIsMobileCaseStudyControlsVisible(false)
      clearTimers()

      scrollStopTimeoutRef.current = window.setTimeout(() => {
        setIsMobileCaseStudyControlsVisible(true)
        controlsHideTimeoutRef.current = window.setTimeout(() => {
          setIsMobileCaseStudyControlsVisible(false)
        }, 2000)
      }, 120)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimers()
      window.removeEventListener('scroll', onScroll)
    }
  }, [isCaseStudyScrollRevealMode])

  return (
    <main className="bg-bg-900">
      <div
        className={`nav-theme-dock ${isCaseStudyShell ? 'nav-theme-dock--case-study' : ''} ${
          isCaseStudyShell && isMobileCaseStudyControlsVisible ? 'is-mobile-controls-visible' : ''
        }`}
      >
        {!disableSectionNav && <FloatingNav activeSection={activeSection} />}
        {isCaseStudyShell ? (
          <CaseStudyBackButton homeHref={mobileCaseStudyNav.homeHref} />
        ) : null}

        <button
          type="button"
          className={`theme-toggle ${isCaseStudyShell ? 'theme-toggle--case-study' : ''}`}
          onClick={toggleTheme}
          aria-label={isLightTheme ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <span className="theme-toggle__icon">{isLightTheme ? <ThemeMoonIcon /> : <ThemeSunIcon />}</span>
        </button>
      </div>

      {!isCaseStudyShell ? (
        <div className="app-shell-brand-row px-3 pt-3 md:px-5 lg:px-6">
          <SectionLink sectionId="hero" className="app-shell-brand-row__action" isActive={activeSection === 'hero'}>
            <img src="/ck.svg" alt="CK logo" className="brand-mark" />
          </SectionLink>
        </div>
      ) : null}

      <div
        className={`app-shell-content min-h-screen px-3 pb-10 ${isCaseStudyShell ? 'pt-[84px]' : 'pt-4'} md:px-5 lg:px-6`}
      >
        {children}
      </div>
    </main>
  )
}

function SinglePagePortfolio() {
  const activeSection = useActiveSection(sectionIds)

  return (
    <AppShell activeSection={activeSection}>
      <HomePage />
    </AppShell>
  )
}

function CaseStudyMedia({ media, className = '', onOpenPreview }) {
  if (media?.type === 'image' && media.src) {
    const isPreviewEnabled = typeof onOpenPreview === 'function'
    const previewLabel = media.alt ? `Preview image: ${media.alt}` : 'Preview image'

    if (!isPreviewEnabled) {
      return (
        <figure className={`case-study-media ${className}`}>
          <img src={media.src} alt={media.alt ?? ''} loading="lazy" />
        </figure>
      )
    }

    return (
      <figure className={`case-study-media ${className}`}>
        <button
          type="button"
          className="case-study-media__trigger"
          onClick={() => onOpenPreview?.(media)}
          aria-label={previewLabel}
        >
          <img src={media.src} alt={media.alt ?? ''} loading="lazy" />
          <span className="case-study-media__hint" aria-hidden="true">
            Preview
          </span>
        </button>
      </figure>
    )
  }

  if (media?.type === 'pdf' && media.src) {
    const pdfTitle = media.alt ?? 'PDF preview'

    return (
      <figure className={`case-study-media ${className}`}>
        <iframe className="case-study-media__pdf" src={media.src} title={pdfTitle} loading="lazy" />
        <div className="case-study-media__pdf-link-row">
          <a
            href={media.src}
            target="_blank"
            rel="noreferrer"
            className="case-study-media__pdf-link"
            aria-label={`${pdfTitle} (opens in a new tab)`}
          >
            Open PDF
          </a>
        </div>
      </figure>
    )
  }

  return (
    <div className={`case-study-media case-study-media--placeholder ${className}`} aria-hidden="true">
      {media?.label ?? 'Media placeholder'}
    </div>
  )
}

function CaseStudyDetailSection({ sectionRef, revealStyle, children }) {
  return (
    <section
      ref={sectionRef}
      className="case-study-section scroll-reveal scroll-reveal--up"
      data-scroll-reveal
      style={revealStyle}
    >
      {children}
    </section>
  )
}

function ProjectPlaceholderPage() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)
  const detailPageRef = useRef(null)
  const sectionRefs = useRef({})
  const [activeScrollSpySection, setActiveScrollSpySection] = useState('project-summary')
  const [scrollSpyProgress, setScrollSpyProgress] = useState(0)
  const [showScrollSpy, setShowScrollSpy] = useState(false)
  const [activeMediaPreview, setActiveMediaPreview] = useState(null)
  const mediaPreviewRef = useRef(null)
  const mediaPreviewCloseButtonRef = useRef(null)
  const mediaPreviewLastFocusRef = useRef(null)
  const isMediaPreviewOpen =
    activeMediaPreview?.projectId === projectId && Boolean(activeMediaPreview?.src)

  useLayoutEffect(() => {
    sectionRefs.current = {}

    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)

    const rafId = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior
    })

    return () => {
      window.cancelAnimationFrame(rafId)
      root.style.scrollBehavior = previousScrollBehavior
    }
  }, [projectId])

  useScrollReveal(detailPageRef, projectId)

  useEffect(() => {
    if (!isMediaPreviewOpen) return undefined

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    mediaPreviewLastFocusRef.current = previousActiveElement

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
    const getFocusableElements = () => {
      if (!mediaPreviewRef.current) return []
      return Array.from(mediaPreviewRef.current.querySelectorAll(focusableSelector)).filter(
        (node) => node instanceof HTMLElement,
      )
    }

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveMediaPreview(null)
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (!focusableElements.length) {
        event.preventDefault()
        return
      }

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]
      const currentFocused = document.activeElement

      if (event.shiftKey && currentFocused === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
        return
      }

      if (!event.shiftKey && currentFocused === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    const focusTimer = window.requestAnimationFrame(() => {
      mediaPreviewCloseButtonRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      mediaPreviewLastFocusRef.current?.focus()
    }
  }, [isMediaPreviewOpen])

  useEffect(() => {
    let rafId = 0

    const updateScrollSpyState = () => {
      const activationOffset = Math.max(92, window.innerHeight * 0.28)
      const activationY = window.scrollY + activationOffset

      let nextActiveSection = 'project-summary'
      caseStudySectionIds.forEach((sectionId) => {
        const sectionNode = sectionRefs.current[sectionId]
        if (!sectionNode) return

        const sectionTop = sectionNode.getBoundingClientRect().top + window.scrollY
        if (activationY >= sectionTop - 8) {
          nextActiveSection = sectionId
        }
      })

      setActiveScrollSpySection((previousState) =>
        previousState === nextActiveSection ? previousState : nextActiveSection,
      )
      const problemSpaceNode = sectionRefs.current['problem-space']
      const shouldShowScrollSpy = problemSpaceNode
        ? problemSpaceNode.getBoundingClientRect().top <= activationOffset
        : window.scrollY > 240
      setShowScrollSpy((previousState) =>
        previousState === shouldShowScrollSpy ? previousState : shouldShowScrollSpy,
      )

      const firstSectionNode = sectionRefs.current[caseStudySectionIds[0]]
      const lastSectionNode =
        sectionRefs.current[caseStudySectionIds[caseStudySectionIds.length - 1]]

      if (!firstSectionNode || !lastSectionNode) return

      const firstSectionTop = firstSectionNode.getBoundingClientRect().top + window.scrollY
      const lastSectionBottom = lastSectionNode.getBoundingClientRect().bottom + window.scrollY
      const totalScrollableDistance = Math.max(lastSectionBottom - firstSectionTop, 1)
      const nextProgress = Math.min(
        1,
        Math.max(0, (activationY - firstSectionTop) / totalScrollableDistance),
      )

      setScrollSpyProgress((previousState) =>
        Math.abs(previousState - nextProgress) < 0.001 ? previousState : nextProgress,
      )
    }

    const scheduleScrollSpyUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(() => {
        rafId = 0
        updateScrollSpyState()
      })
    }

    scheduleScrollSpyUpdate()
    window.addEventListener('scroll', scheduleScrollSpyUpdate, { passive: true })
    window.addEventListener('resize', scheduleScrollSpyUpdate)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', scheduleScrollSpyUpdate)
      window.removeEventListener('resize', scheduleScrollSpyUpdate)
    }
  }, [projectId])

  if (!project) {
    return <Navigate replace to="/" />
  }

  const fallbackProjectId = projects[0]?.id
  const detail =
    projectCaseStudiesById[project.id] ??
    (fallbackProjectId ? projectCaseStudiesById[fallbackProjectId] : null)

  if (!detail) {
    return <Navigate replace to="/" />
  }

  const projectIndex = projects.findIndex((item) => item.id === project.id)
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const revealStyle = (index) => ({ '--reveal-delay': revealDelay(index) })
  const setSectionRef = (sectionId) => (node) => {
    if (node) {
      sectionRefs.current[sectionId] = node
      return
    }

    delete sectionRefs.current[sectionId]
  }
  const scrollSpyItems = [
    { id: 'project-summary', label: 'Project Summary' },
    { id: 'problem-space', label: 'Problem Space' },
    { id: 'research-insights', label: 'Research and Insights' },
    { id: 'design-exploration', label: 'Design Exploration' },
    { id: 'solution-summary', label: 'Solution Summary' },
    { id: 'final-design', label: 'Final Design' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'reflection-next-steps', label: 'Reflection and Next Steps' },
  ]

  const handleScrollSpyNavigate = (sectionId) => {
    const sectionNode = sectionRefs.current[sectionId]
    if (sectionNode) {
      sectionNode.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const openMediaPreview = (media) => {
    if (!media?.src) return
    setActiveMediaPreview({
      projectId,
      src: media.src,
      alt: media.alt ?? '',
    })
  }
  const previewHandler = openMediaPreview
  const closeMediaPreview = () => {
    setActiveMediaPreview(null)
  }

  return (
    <AppShell
      activeSection={sectionIds[1]}
      disableSectionNav
      mobileCaseStudyNav={{
        homeHref: '/',
      }}
    >
      <section
        key={projectId}
        ref={detailPageRef}
        className="case-study-page mx-auto max-w-wide pt-1 pb-7"
      >
        <section
          className="case-study-top-grid scroll-reveal scroll-reveal--up"
          data-scroll-reveal
          style={revealStyle(1)}
        >
          <div className="case-study-main-column">
            <h1 className="case-study-title text-h2 text-text-primary">{project.title}</h1>
            <p className="case-study-subtitle text-body-lg text-text-secondary">{detail.subtitle}</p>
            <CaseStudyMedia
              media={detail.headerMedia}
              className="case-study-media--hero"
              onOpenPreview={previewHandler}
            />

            <CaseStudyDetailSection
              sectionRef={setSectionRef('project-summary')}
              revealStyle={revealStyle(2)}
            >
              <p className="case-study-kicker">Project Summary</p>
              <p className="case-study-paragraph text-body text-text-secondary">{detail.summary}</p>
            </CaseStudyDetailSection>
          </div>

          <aside className="case-study-side-column">
            <div className="case-study-meta-card">
              {detail.meta.map((item) => (
                <div key={item.label} className="case-study-meta-item">
                  <p className="case-study-meta-label">{item.label}</p>
                  <p className="case-study-meta-value">{item.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <hr className="case-study-divider" />

        <aside className={`case-study-scrollspy ${showScrollSpy ? 'is-visible' : ''}`}>
          <div className="case-study-scrollspy__progress" aria-hidden="true">
            <span className="case-study-scrollspy__progress-track" />
            <span
              className="case-study-scrollspy__progress-fill"
              style={{ height: `${Math.max(2, scrollSpyProgress * 100)}%` }}
            />
          </div>
          <nav className="case-study-scrollspy__nav" aria-label="Case study section navigation">
            {scrollSpyItems.map((item) => {
              const isActive = activeScrollSpySection === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`case-study-scrollspy__item ${isActive ? 'is-active' : ''}`}
                  aria-label={item.label}
                  aria-current={isActive ? 'location' : undefined}
                  title={item.label}
                  data-label={item.label}
                  onClick={() => handleScrollSpyNavigate(item.id)}
                >
                  <span className="case-study-scrollspy__dot" aria-hidden="true" />
                  <span className="case-study-scrollspy__label">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        <CaseStudyDetailSection sectionRef={setSectionRef('problem-space')} revealStyle={revealStyle(3)}>
          <p className="case-study-kicker">Problem Space</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.problemSpace.title}</h2>
          <p className="case-study-paragraph text-body text-text-secondary">{detail.problemSpace.intro}</p>
          <ul className="case-study-list">
            {detail.problemSpace.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="case-study-callout">{detail.problemSpace.callout}</div>
        </CaseStudyDetailSection>

        <CaseStudyDetailSection sectionRef={setSectionRef('research-insights')} revealStyle={revealStyle(4)}>
          <p className="case-study-kicker">Research and Insights</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.researchInsights.title}</h2>
          <p className="case-study-paragraph text-body text-text-secondary">
            {detail.researchInsights.intro}
          </p>

          <h3 className="case-study-subheading text-text-primary">Approach</h3>
          <ul className="case-study-list">
            {detail.researchInsights.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="case-study-subheading text-text-primary">Key Findings</h3>
          <ul className="case-study-list">
            {detail.researchInsights.findings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="case-study-callout">
            <strong>Core Insight:</strong> {detail.researchInsights.coreInsight}
          </div>
        </CaseStudyDetailSection>

        <CaseStudyDetailSection sectionRef={setSectionRef('design-exploration')} revealStyle={revealStyle(5)}>
          <p className="case-study-kicker">Design Exploration</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.designExploration.title}</h2>
          <div className="case-study-callout">
            Guiding question: {detail.designExploration.guidingQuestion}
          </div>

          <h3 className="case-study-subheading text-text-primary">Sketching</h3>
          <p className="case-study-paragraph text-body text-text-secondary">
            {detail.designExploration.sketching.body}
          </p>
          <CaseStudyMedia
            media={detail.designExploration.sketching.media}
            className="case-study-media--process"
            onOpenPreview={previewHandler}
          />
          <ul className="case-study-list">
            {detail.designExploration.sketching.points.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="case-study-subheading text-text-primary">Wireframes</h3>
          <p className="case-study-paragraph text-body text-text-secondary">
            {detail.designExploration.wireframes.body}
          </p>
          <CaseStudyMedia
            media={detail.designExploration.wireframes.media}
            className="case-study-media--process"
            onOpenPreview={previewHandler}
          />

          <h3 className="case-study-subheading text-text-primary">Prototyping</h3>
          <p className="case-study-paragraph text-body text-text-secondary">
            {detail.designExploration.prototyping.body}
          </p>
          <CaseStudyMedia
            media={detail.designExploration.prototyping.media}
            className="case-study-media--process"
            onOpenPreview={previewHandler}
          />
        </CaseStudyDetailSection>

        <CaseStudyDetailSection sectionRef={setSectionRef('solution-summary')} revealStyle={revealStyle(6)}>
          <p className="case-study-kicker">Solution Summary</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.solutionSummary.title}</h2>
          {detail.solutionSummary.points.map((point) => (
            <div key={point.title} className="case-study-solution-item">
              <h3 className="case-study-subheading text-text-primary">{point.title}</h3>
              <p className="case-study-paragraph text-body text-text-secondary">{point.description}</p>
            </div>
          ))}
        </CaseStudyDetailSection>

        <CaseStudyDetailSection sectionRef={setSectionRef('final-design')} revealStyle={revealStyle(7)}>
          <p className="case-study-kicker">Final Design</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.finalDesign.title}</h2>
          <div className="case-study-gallery-grid">
            {detail.finalDesign.screens.map((screen) => (
              <div key={screen.label} className="case-study-gallery-item">
                <CaseStudyMedia
                  media={screen.media}
                  className="case-study-media--gallery"
                  onOpenPreview={previewHandler}
                />
              </div>
            ))}
          </div>
        </CaseStudyDetailSection>

        <CaseStudyDetailSection sectionRef={setSectionRef('outcomes')} revealStyle={revealStyle(8)}>
          <p className="case-study-kicker">Outcomes</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.outcomes.title}</h2>
          <p className="case-study-paragraph text-body text-text-secondary">{detail.outcomes.intro}</p>
          <ul className="case-study-list">
            {detail.outcomes.points.map((point) => (
              <li key={point.label}>
                <strong>{point.label}:</strong> {point.description}
              </li>
            ))}
          </ul>
          <div className="case-study-callout">{detail.outcomes.callout}</div>
        </CaseStudyDetailSection>

        <CaseStudyDetailSection
          sectionRef={setSectionRef('reflection-next-steps')}
          revealStyle={revealStyle(9)}
        >
          <p className="case-study-kicker">Reflection and Next Steps</p>
          <h2 className="case-study-panel-title text-h3 text-text-primary">{detail.reflection.title}</h2>
          <p className="case-study-paragraph text-body text-text-secondary">{detail.reflection.intro}</p>
          <h3 className="case-study-subheading text-text-primary">If continued further, I would</h3>
          <ul className="case-study-list">
            {detail.reflection.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <div className="case-study-footer-note">{detail.reflection.note}</div>
        </CaseStudyDetailSection>

        <div
          className="case-study-actions scroll-reveal scroll-reveal--up"
          data-scroll-reveal
          style={revealStyle(10)}
        >
          {detail.prototypeHref ? (
            <a
              href={detail.prototypeHref}
              target="_blank"
              rel="noreferrer"
              className="project-detail-resource-link inline-flex min-h-[var(--button-size-md)] rounded-md border border-border-subtle bg-surface-700 px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-small text-text-secondary transition-colors duration-base ease-standard hover:border-accent-400 hover:text-text-primary"
              aria-label={`${detail.prototypeLabel ?? 'View Prototype'} (opens in a new tab)`}
            >
              {detail.prototypeLabel ?? 'View Prototype'}
            </a>
          ) : null}

          <Link
            to={nextProject.href}
            className="project-detail-next inline-flex min-h-[var(--button-size-md)] rounded-md bg-[var(--color-cta-bg)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] font-medium text-[var(--color-cta-text)] transition-colors duration-base ease-standard hover:bg-[var(--color-cta-hover-bg)]"
          >
            Next Project
          </Link>
        </div>

        {isMediaPreviewOpen ? (
          <div
            ref={mediaPreviewRef}
            className="case-study-preview"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            onClick={closeMediaPreview}
          >
            <button
              ref={mediaPreviewCloseButtonRef}
              type="button"
              className="case-study-preview__close"
              onClick={closeMediaPreview}
              aria-label="Close image preview"
            >
              Close
            </button>
            <figure className="case-study-preview__frame" onClick={(event) => event.stopPropagation()}>
              <img src={activeMediaPreview?.src} alt={activeMediaPreview?.alt ?? ''} />
            </figure>
          </div>
        ) : null}
      </section>
    </AppShell>
  )
}

function AppRoutes() {
  return (
    <>
      <StartupLoader />
      <Routes>
        <Route path="/" element={<SinglePagePortfolio />} />
        <Route path="/projects/:projectId" element={<ProjectPlaceholderPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  )
}

export default AppRoutes
