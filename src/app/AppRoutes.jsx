import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import HomePage from '../features/home/HomePage'
import ProjectCardVisual from '../features/projects/ProjectCardVisual'
import { projectDetailContentByVariant, projects } from '../shared/data/portfolio-data'
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

function SectionLink({ sectionId, className, children, onNavigate }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    event.preventDefault()
    onNavigate?.(sectionId, event.timeStamp)
    scrollToSection(sectionId)
  }

  return (
    <a className={className} href={`/#${sectionId}`} onClick={handleClick}>
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
      Math.abs(eventTimeStamp - lastMobilePress.timeStamp) < 60

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
          <img src="/ck.svg" alt="CK logo" className="brand-mark" />
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

function ProjectPlaceholderPage() {
  const { projectId } = useParams()
  const project = projects.find((item) => item.id === projectId)
  const detailPageRef = useRef(null)

  useLayoutEffect(() => {
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

  if (!project) {
    return <Navigate replace to="/" />
  }

  const detail = projectDetailContentByVariant[project.variant] ?? projectDetailContentByVariant.insights
  const projectIndex = projects.findIndex((item) => item.id === project.id)
  const nextProject = projects[(projectIndex + 1) % projects.length]

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
        className={`project-detail-page project-detail-page--${project.variant} mx-auto max-w-wide pt-1 pb-7`}
      >
        <section
          className="project-detail-section project-detail-section--plain scroll-reveal scroll-reveal--up mt-0"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(1) }}
        >
          <h2 className="text-h3 text-text-primary">Project Context</h2>
          <div className="project-detail-context mt-3">
            {detail.context.map((item, index) => (
              <div
                key={item.label}
                className="project-detail-context__item scroll-reveal scroll-reveal--up"
                data-scroll-reveal
                style={{ '--reveal-delay': revealDelay(index + 2) }}
              >
                <p className="project-detail-context__label">{item.label}</p>
                <p className="project-detail-context__value">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <article
          className="project-detail-hero scroll-reveal scroll-reveal--up rounded-lg border border-border-subtle bg-surface-700 p-4 md:p-5"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(1) }}
        >
          <div
            className="project-detail-hero__copy scroll-reveal scroll-reveal--up"
            data-scroll-reveal
            style={{ '--reveal-delay': revealDelay(2) }}
          >
            <p className="project-detail-hero__eyebrow text-small uppercase tracking-[0.12em] text-accent-500">
              {detail.heroLabel}
            </p>
            <h1 className="mt-2 text-h2 text-text-primary">{project.title}</h1>
            <p className="mt-2 max-w-[66ch] text-body-lg text-text-secondary">{detail.heroLead}</p>
          </div>
          <div
            className="project-detail-hero__visual project-placeholder-card__visual scroll-reveal scroll-reveal--right"
            aria-hidden="true"
            data-scroll-reveal
            style={{ '--reveal-delay': revealDelay(3) }}
          >
            <div className="project-placeholder-card__fog" />
            <ProjectCardVisual variant={project.variant} />
          </div>
        </article>

        <section
          className="project-detail-section scroll-reveal scroll-reveal--up mt-4"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(2) }}
        >
          <h2 className="text-h3 text-text-primary">Problem Space</h2>
          <ul className="project-detail-list mt-3">
            {detail.problemPoints.map((point, index) => (
              <li
                key={point}
                className="scroll-reveal scroll-reveal--up"
                data-scroll-reveal
                style={{ '--reveal-delay': revealDelay(index + 3) }}
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {detail.solutionHighlights?.length ? (
          <section
            className="project-detail-section scroll-reveal scroll-reveal--up mt-4"
            data-scroll-reveal
            style={{ '--reveal-delay': revealDelay(2) }}
          >
            <h2 className="text-h3 text-text-primary">Solution Highlights</h2>
            <ul className="project-detail-list mt-3">
              {detail.solutionHighlights.map((point, index) => (
                <li
                  key={point}
                  className="scroll-reveal scroll-reveal--up"
                  data-scroll-reveal
                  style={{ '--reveal-delay': revealDelay(index + 3) }}
                >
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section
          className="project-detail-section scroll-reveal scroll-reveal--up mt-4"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(2) }}
        >
          <h2 className="text-h3 text-text-primary">Process</h2>
          <div className="project-detail-process mt-3">
            {detail.processSteps.map((step, index) => (
              <article
                key={step.title}
                className="project-detail-process__step scroll-reveal scroll-reveal--up"
                data-scroll-reveal
                style={{ '--reveal-delay': revealDelay(index + 3) }}
              >
                <p className="project-detail-process__title">{step.title}</p>
                <p className="project-detail-process__description">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="project-detail-section scroll-reveal scroll-reveal--up mt-4"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(3) }}
        >
          <h2 className="text-h3 text-text-primary">Outcomes</h2>
          <div className="project-detail-outcomes mt-3">
            {detail.outcomes.map((outcome, index) => (
              <article
                key={outcome.label}
                className="project-detail-outcomes__item scroll-reveal scroll-reveal--up"
                data-scroll-reveal
                style={{ '--reveal-delay': revealDelay(index + 3) }}
              >
                <p className="project-detail-outcomes__metric">{outcome.metric}</p>
                <p className="project-detail-outcomes__label">{outcome.label}</p>
              </article>
            ))}
          </div>
        </section>

        {detail.prototypeHref ? (
          <div
            className="scroll-reveal scroll-reveal--up mt-4"
            data-scroll-reveal
            style={{ '--reveal-delay': revealDelay(3) }}
          >
            <a
              href={detail.prototypeHref}
              target="_blank"
              rel="noreferrer"
              className="project-detail-resource-link inline-flex min-h-[var(--button-size-md)] rounded-md border border-border-subtle bg-surface-700 px-[var(--button-padding-x)] py-[var(--button-padding-y)] text-small text-text-secondary transition-colors duration-base ease-standard hover:border-accent-400 hover:text-text-primary"
            >
              {detail.prototypeLabel ?? 'View Prototype'}
            </a>
          </div>
        ) : null}

        <div
          className="scroll-reveal scroll-reveal--up mt-4"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(3) }}
        >
          <Link
            to={nextProject.href}
            className="project-detail-next inline-flex min-h-[var(--button-size-md)] rounded-md bg-[var(--color-cta-bg)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] font-medium text-[var(--color-cta-text)] transition-colors duration-base ease-standard hover:bg-[var(--color-cta-hover-bg)]"
          >
            Next Project
          </Link>
        </div>
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
