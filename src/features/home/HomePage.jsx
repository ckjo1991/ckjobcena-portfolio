import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ONLINE_RESUME_URL,
  projects,
} from '../../shared/data/portfolio-data'
import { usePreviewParallax } from '../../shared/hooks/usePreviewParallax'
import { useScrollReveal } from '../../shared/hooks/useScrollReveal'
import { LinkedInIcon, MailIcon } from '../../shared/ui/icons'
import { revealDelay } from '../../shared/utils/revealDelay'
import ProjectCardVisual from '../projects/ProjectCardVisual'

function ProjectPlaceholderCard({ project, index, isTapArmed, onTapArm, onTapProceed }) {
  const hasAttachedVisual = Boolean(project.previewImageSrc)

  const handleCardClick = (event) => {
    const isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!isCoarsePointer) return

    if (!isTapArmed) {
      event.preventDefault()
      onTapArm(project.id)
      return
    }

    onTapProceed()
  }

  return (
    <Link
      className={`project-placeholder-card scroll-reveal scroll-reveal--up project-placeholder-card--${project.variant} ${isTapArmed ? 'is-tap-armed' : ''}`}
      to={project.href}
      onClick={handleCardClick}
      aria-label={`${project.title} - ${isTapArmed ? 'Tap again to view more' : 'View more'}`}
      data-scroll-reveal
      style={{ '--reveal-delay': revealDelay(index + 1) }}
    >
      <div
        className={`project-placeholder-card__visual ${hasAttachedVisual ? 'project-placeholder-card__visual--image' : ''}`}
        aria-hidden="true"
        data-preview-parallax
      >
        <span className="project-placeholder-card__parallax-layer project-placeholder-card__parallax-layer--back" />
        <div className="project-placeholder-card__parallax-media">
          {hasAttachedVisual ? (
            <img
              src={project.previewImageSrc}
              alt=""
              className="project-placeholder-card__custom-image"
              loading="lazy"
            />
          ) : (
            <ProjectCardVisual variant={project.variant} />
          )}
        </div>
        <span className="project-placeholder-card__parallax-layer project-placeholder-card__parallax-layer--front" />
        {!hasAttachedVisual && <div className="project-placeholder-card__fog" />}
      </div>

      <div className="project-placeholder-card__content">
        <div className="project-placeholder-card__chips" aria-label="Project tags">
          {project.chips.map((chip) => (
            <span key={`${project.id}-${chip}`} className="project-placeholder-card__chip">
              {chip}
            </span>
          ))}
        </div>
        <h3 className="project-placeholder-card__title">{project.title}</h3>
        <p className="project-placeholder-card__summary">{project.summary}</p>
        <span className="project-placeholder-card__cta" aria-hidden="true">
          {isTapArmed ? 'Tap again' : 'View more'}
        </span>
      </div>
    </Link>
  )
}

function HomePage() {
  const [armedProjectId, setArmedProjectId] = useState(null)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [isResumeModalExpanded, setIsResumeModalExpanded] = useState(false)
  const armTimeoutRef = useRef(null)
  const homeContentRef = useRef(null)
  const resumeModalRef = useRef(null)
  const resumeModalCloseButtonRef = useRef(null)
  const resumeModalLastFocusRef = useRef(null)

  useScrollReveal(homeContentRef)
  usePreviewParallax(homeContentRef)

  useEffect(() => {
    return () => {
      if (armTimeoutRef.current) {
        window.clearTimeout(armTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isResumeModalOpen) return

    const previousActiveElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    resumeModalLastFocusRef.current = previousActiveElement

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

    const getFocusableElements = () => {
      if (!resumeModalRef.current) return []
      return Array.from(resumeModalRef.current.querySelectorAll(focusableSelector)).filter(
        (node) => node instanceof HTMLElement,
      )
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsResumeModalOpen(false)
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

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    const focusTimer = window.requestAnimationFrame(() => {
      resumeModalCloseButtonRef.current?.focus()
    })

    return () => {
      window.cancelAnimationFrame(focusTimer)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      resumeModalLastFocusRef.current?.focus()
    }
  }, [isResumeModalOpen])

  useEffect(() => {
    if (!isResumeModalOpen) {
      setIsResumeModalExpanded(false)
    }
  }, [isResumeModalOpen])

  const handleProjectTapArm = (projectId) => {
    setArmedProjectId(projectId)
    if (armTimeoutRef.current) {
      window.clearTimeout(armTimeoutRef.current)
    }

    armTimeoutRef.current = window.setTimeout(() => {
      setArmedProjectId(null)
    }, 1400)
  }

  const handleProjectTapProceed = () => {
    if (armTimeoutRef.current) {
      window.clearTimeout(armTimeoutRef.current)
      armTimeoutRef.current = null
    }
    setArmedProjectId(null)
  }

  return (
    <div ref={homeContentRef}>
      <section id="hero" className="home-section hero-layout mx-auto grid max-w-wide grid-cols-1 gap-4 py-5 lg:grid-cols-12 lg:gap-[var(--grid-gutter)]">
        <div
          className="hero-copy scroll-reveal scroll-reveal--up space-y-stack-md lg:col-span-7"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(1) }}
        >
          <h1 className="text-h1 text-text-primary">
            UX Designer With An Analytics Background
          </h1>
          <p className="max-w-[52ch] text-body-lg text-text-secondary">
            I Turn Messy Workflows Into Clear, Measurable Products.
          </p>
        </div>

        <div
          className="hero-image-container scroll-reveal scroll-reveal--right self-start lg:col-span-5"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(2) }}
        >
          <img
            className="hero-image"
            src="/caricature_me_bg_removed.png"
            alt="Caricature portrait of a UX designer surrounded by analytics and design elements."
            loading="eager"
          />
        </div>
      </section>

      <section id="projects-preview" className="home-section mx-auto max-w-wide py-5">
        <h2
          className="mb-stack-xs scroll-reveal scroll-reveal--up text-h2 text-text-primary"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(0) }}
        >
          Project Preview
        </h2>
        <p
          className="mb-stack-lg max-w-[70ch] scroll-reveal scroll-reveal--up text-body-lg text-text-secondary"
          data-scroll-reveal
          style={{ '--reveal-delay': revealDelay(1) }}
        >
          Selected case studies with distinct product focus and visual direction.
        </p>

        <div className="project-placeholder-grid">
          {projects.map((project, index) => (
            <ProjectPlaceholderCard
              key={project.id}
              project={project}
              index={index}
              isTapArmed={armedProjectId === project.id}
              onTapArm={handleProjectTapArm}
              onTapProceed={handleProjectTapProceed}
            />
          ))}
        </div>
      </section>

      <section id="about-preview" className="home-section mx-auto max-w-wide py-5">
        <div className="about-preview-layout grid grid-cols-1 gap-4">
          <div
            className="space-y-stack-sm scroll-reveal scroll-reveal--up lg:text-center"
            data-scroll-reveal
          >
            <h2 className="text-h2 text-text-primary">About me</h2>
            <p className="max-w-[64ch] text-body-lg text-text-secondary lg:mx-auto lg:max-w-none">
              <span className="xl:block xl:whitespace-nowrap">
                I work on messy, real world problems and turn them into clear, usable systems.
              </span>
              <span className="xl:block xl:whitespace-nowrap">
                My analytics background helps me measure what works and design with evidence, not
                guesswork.
              </span>
            </p>
          </div>

          <aside
            className="about-preview-resume scroll-reveal scroll-reveal--right rounded-lg border border-border-subtle bg-surface-700 py-4 px-2"
            data-scroll-reveal
            style={{ '--reveal-delay': revealDelay(1) }}
          >
            <div className="resume-actions">
              <h3 className="resume-title text-h3 text-text-primary">My resume</h3>
              <a
                className="resume-download-link"
                href="/CK-Jobcena-Resume.pdf"
                download="CK-Jobcena-Resume.pdf"
                aria-label="Download PDF Version"
              >
                Download
              </a>
              <a
                className="resume-view-link"
                href="/resume.html"
                onClick={(event) => {
                  event.preventDefault()
                  setIsResumeModalOpen(true)
                }}
              >
                View
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section id="contact-me" className="home-section contact-section mx-auto max-w-wide py-5">
        <div className="w-full grid grid-cols-1 gap-4">
          <div
            className="contact-primary-card scroll-reveal scroll-reveal--up flex min-h-full flex-col rounded-lg border border-border-subtle bg-surface-700 p-4 md:p-5"
            data-scroll-reveal
          >
            <div className="space-y-stack-sm lg:text-center">
              <h2 className="text-h2 text-text-primary">Let&apos;s build something that actually works.</h2>
              <div className="max-w-[64ch] space-y-2 text-small text-text-secondary lg:mx-auto">
                <p>
                  I&apos;m a UX Designer with a background in real-time analytics and workforce
                  operations. I design with structure, think in systems, and care about whether
                  decisions hold up under pressure - not just how they look.
                </p>
                <p>
                  If you&apos;re working on a product and need someone who can connect design
                  decisions to measurable outcomes, I&apos;m interested in that conversation.
                  Share the problem, the constraints, and the goals. I&apos;ll come prepared.
                </p>
              </div>
            </div>

            <div className="mt-stack-sm flex flex-col gap-3 md:flex-row md:items-center lg:justify-center">
              <a
                className="inline-flex min-h-[var(--button-size-md)] items-center gap-2 rounded-md bg-[var(--color-cta-bg)] px-[var(--button-padding-x)] py-[var(--button-padding-y)] font-medium text-[var(--color-cta-text)] transition-colors duration-base ease-standard hover:bg-[var(--color-cta-hover-bg)]"
                href="mailto:ckjobcena@gmail.com"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  <MailIcon />
                </span>
                <span>Let&apos;s connect</span>
              </a>

              <a
                className="inline-flex h-[var(--button-size-md)] w-[var(--button-size-md)] items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors duration-base ease-standard hover:border-accent-500 hover:text-text-primary"
                href="https://www.linkedin.com/in/ckjobcena/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  <LinkedInIcon />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {isResumeModalOpen && (
        <div
          ref={resumeModalRef}
          className="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Online resume"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsResumeModalOpen(false)
            }
          }}
        >
          <div className="resume-modal__controls">
            <button
              type="button"
              className="resume-modal__expand"
              onClick={() => setIsResumeModalExpanded((isExpanded) => !isExpanded)}
              aria-label={isResumeModalExpanded ? 'Collapse resume viewer' : 'Expand resume viewer'}
            >
              {isResumeModalExpanded ? 'Collapse' : 'Expand'}
            </button>
            <button
              ref={resumeModalCloseButtonRef}
              type="button"
              className="resume-modal__close"
              onClick={() => setIsResumeModalOpen(false)}
              aria-label="Close online resume popup"
            >
              Close
            </button>
          </div>
          <iframe
            className={`resume-modal__frame ${isResumeModalExpanded ? 'is-expanded' : ''}`}
            src={ONLINE_RESUME_URL}
            title="Online resume"
          />
        </div>
      )}
    </div>
  )
}

export default HomePage
