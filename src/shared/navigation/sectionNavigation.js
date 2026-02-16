export const SECTION_NAV_TARGET_EVENT = 'section-nav-target'

export function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId)
  if (!target) return

  window.dispatchEvent(new CustomEvent(SECTION_NAV_TARGET_EVENT, { detail: { sectionId } }))
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const nextHash = `#${sectionId}`

  if (window.location.hash !== nextHash) {
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`
    window.history.replaceState(window.history.state, '', nextUrl)
  }
}
