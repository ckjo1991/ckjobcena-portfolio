export function HomeIcon({ solid = false }) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3.8 2.8 12h2.7v8.2h5.5V14h2v6.2h5.5V12h2.7L12 3.8Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M6.5 10.7V20h11V10.7" />
    </svg>
  )
}

export function AboutIcon({ solid = false }) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="7" r="3.3" />
        <path d="M5.3 20a6.7 6.7 0 0 1 13.4 0Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="7" r="3" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

export function ProjectsIcon({ solid = false }) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="5.5" rx="1.1" />
        <rect x="3.5" y="13.5" width="8" height="6" rx="1.1" />
        <rect x="14.5" y="13.5" width="6" height="6" rx="1.1" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="17" height="5.5" rx="1" />
      <rect x="3.5" y="13.5" width="8" height="6" rx="1" />
      <rect x="14.5" y="13.5" width="6" height="6" rx="1" />
    </svg>
  )
}

export function ContactIcon({ solid = false }) {
  if (solid) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.5 5.5h13A2.5 2.5 0 0 1 21 8v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16V8a2.5 2.5 0 0 1 2.5-2.5Z" />
        <path d="M4.9 7.1 12 12.6l7.1-5.5" fill="none" stroke="#0f1115" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.2 7.5 6 7.5-6" />
    </svg>
  )
}

export function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M15 5.5 8.5 12l6.5 6.5" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.2 7.5 6 7.5-6" />
    </svg>
  )
}

export function LinkedInIcon() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5.2 8.6h3.1V19H5.2zM6.8 4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.8 4.1h3v1.4h.1c.4-.8 1.5-1.7 3-1.7 3.3 0 3.9 2.1 3.9 4.9V19h-3.1v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V19h-3.1V8.6Z" />
    </svg>
  )
}

export function CheckIcon() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5.5 12.4 4.1 4.1 8.9-8.9" />
    </svg>
  )
}

export function ThemeSunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.8v2.1M12 19.1v2.1M21.2 12h-2.1M4.9 12H2.8M18.6 5.4l-1.5 1.5M6.9 17.1l-1.5 1.5M18.6 18.6l-1.5-1.5M6.9 6.9 5.4 5.4" />
    </svg>
  )
}

export function ThemeMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M20.4 14.8A8.6 8.6 0 1 1 9.2 3.6a7.3 7.3 0 0 0 11.2 11.2Z" />
    </svg>
  )
}

export function BeakerIcon({ solid = false }) {
  return solid ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10.5 3.75a.75.75 0 0 0-1.5 0V9a.75.75 0 0 1-.082.341L5.25 16.5h13.5l-3.668-7.159A.75.75 0 0 1 15 9V3.75a.75.75 0 0 0-1.5 0V9a2.25 2.25 0 0 0 .25 1.029l3.368 6.571H6.882l3.368-6.571A2.25 2.25 0 0 0 10.5 9V3.75ZM3.75 17.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 0 1 .45 1.318 2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.318a2.25 2.25 0 0 1 .45-1.318L8.25 9" />
    </svg>
  )
}
