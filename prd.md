# Product Requirements Document

## Executive Summary

This project is a premium portfolio built as a React + Vite SPA with a
dark visual system and yellow-led accents. The MVP centers on a
single-page flow with four anchored sections: Hero, Project Preview,
About Preview, and Contact Me.

## Problem

Designers and developers need a portfolio that communicates quality and
clarity quickly while remaining responsive, accessible, and technically
clean.

## Target Users

- Creative directors
- Recruiters
- Startup founders
- Agencies
- Design-focused clients

## MVP Scope

- Hero section
- Project Preview section with three case-study cards
- About Preview section
- Contact Me section
- Smooth transitions between sections
- Responsive behavior that does not break
- Icon-first navigation that expands from icon-only to icon+label on hover/focus
- Navigation links that scroll to section anchors (`#hero`, `#projects-preview`, `#about-preview`, `#contact-me`)
- Project previews that lead each case-study entry
- Structured case-study detail pages on `/projects/:projectId` with narrative sections (summary, problem, research, exploration, solution, outcomes, reflection)
- Project detail pages include a sticky right-side scrollspy section navigation with active-section state and a vertical progress indicator (appears after Project Summary)
- Layered project preview visuals with subtle scroll parallax enhancement

## Out of Scope (Post-MVP)

- Database-backed content workflows
- Notifications-ready architecture
- Advanced offline workflows beyond static asset caching

## Technical Requirements

- React.js
- Vite
- Tailwind CSS
- React Router with hash-based section deep linking on `/`
- Feature-based source organization (`src/app`, `src/features`, `src/shared`, `src/styles`)
- Semantic HTML and accessible interactions
- WCAG 2.1 AA baseline
- 12-column grid discipline for layout
- Cross-browser smoke checks on current Chrome, Safari, and Firefox
- `prefers-reduced-motion` handling for all non-essential motion
- Theme preference persistence must fail safely when storage APIs are unavailable
- Brand mark served from `public/ck.svg` and reused via `/ck.svg` path

## Design Tokens (Source of Truth)

```css
:root {
  /* Color system */
  --color-bg-900: #0f1115;
  --color-bg-800: #161a20;
  --color-surface-700: #1e232b;

  --color-text-primary: #f5f7fa;
  --color-text-secondary: #a6b0bf;
  --color-text-muted: #6b7280;

  --color-border-subtle: #262c35;

  /* Primary accent (yellow) */
  --color-accent-400: #ffd866;
  --color-accent-500: #f5c542;
  --color-accent-600: #e6b532;
  --color-accent-soft-bg: rgba(245, 197, 66, 0.08);

  /* Secondary accents (sparingly) */
  --color-accent-cool: #4f7cac;
  --color-accent-teal: #2fbf9f;

  /* Typography */
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;

  --text-h1-mobile: 40px;
  --text-h1-tablet: 58px;
  --text-h1-desktop: 84px;
  --text-h2-mobile: 30px;
  --text-h2-tablet: 38px;
  --text-h2-desktop: 48px;
  --text-h3-mobile: 22px;
  --text-h3-tablet: 28px;
  --text-h3-desktop: 32px;
  --text-body-lg-mobile: 16px;
  --text-body-lg-tablet: 17px;
  --text-body-lg-desktop: 18px;
  --text-body-mobile: 16px;
  --text-body-tablet: 16px;
  --text-body-desktop: 16px;
  --text-small-mobile: 14px;
  --text-small-tablet: 14px;
  --text-small-desktop: 14px;

  --text-h1: var(--text-h1-mobile);
  --text-h2: var(--text-h2-mobile);
  --text-h3: var(--text-h3-mobile);
  --text-body-lg: var(--text-body-lg-mobile);
  --text-body: var(--text-body-mobile);
  --text-small: var(--text-small-mobile);

  --leading-heading-mobile: 1.16;
  --leading-heading-tablet: 1.14;
  --leading-heading-desktop: 1.12;
  --leading-body-mobile: 1.65;
  --leading-body-tablet: 1.62;
  --leading-body-desktop: 1.6;

  --leading-heading: var(--leading-heading-mobile);
  --leading-body: var(--leading-body-mobile);

  /* Spacing (8pt) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 64px;
  --space-7: 96px;
  --space-8: 128px;
  --button-size-md: 40px;
  --button-padding-y: 8px;
  --button-padding-x: 16px;

  /* Radius and elevation */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.25);

  /* Motion */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Layout */
  --container-max-width: 1200px;
  --container-wide: 1440px;
  --container-narrow: 960px;
  --container-padding-x: 24px;

  --grid-columns: 12;
  --grid-gutter: 24px;
  --grid-gutter-lg: 32px;

  --section-padding-y-sm: 64px;
  --section-padding-y-md: 96px;
  --section-padding-y-lg: 128px;

  --stack-xs: 8px;
  --stack-sm: 16px;
  --stack-md: 24px;
  --stack-lg: 32px;
  --stack-xl: 48px;
  --stack-2xl: 64px;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

@media (min-width: 768px) {
  :root {
    --text-h1: var(--text-h1-tablet);
    --text-h2: var(--text-h2-tablet);
    --text-h3: var(--text-h3-tablet);
    --text-body-lg: var(--text-body-lg-tablet);
    --text-body: var(--text-body-tablet);
    --text-small: var(--text-small-tablet);
    --leading-heading: var(--leading-heading-tablet);
    --leading-body: var(--leading-body-tablet);
  }
}

@media (min-width: 1024px) {
  :root {
    --text-h1: var(--text-h1-desktop);
    --text-h2: var(--text-h2-desktop);
    --text-h3: var(--text-h3-desktop);
    --text-body-lg: var(--text-body-lg-desktop);
    --text-body: var(--text-body-desktop);
    --text-small: var(--text-small-desktop);
    --leading-heading: var(--leading-heading-desktop);
    --leading-body: var(--leading-body-desktop);
  }
}
```

## Design Guardrails

- `--color-accent-500` is the main highlight.
- `--color-accent-600` is hover state.
- `--color-accent-400` is glow/micro-highlight.
- `--color-accent-soft-bg` is subtle emphasis only.
- Yellow should not exceed roughly 10 to 15 percent of visible area.
- Secondary accents are supportive only and must not compete with yellow.
- Never use spacing values outside the 8pt token scale.
- Keep elevation minimal; avoid heavy card-floating aesthetics.

## Layout Blueprint Decisions

### Hero (Chosen Pattern)

- Desktop: 12-column layout with left 7 columns for primary statement and
  right 5 for support.
- Mobile/tablet: collapse to single-column while preserving rhythm.
- Do not mix this with a centered hero variant in MVP.

### Case Studies (Repeatable Pattern)

1. Preview-first case study card with expressive visual area
2. Supporting narrative block with Problem, Approach, Constraints, Impact
3. Two-column desktop composition (text 5/12, preview 7/12) with alternating card direction
4. Quick-read impact statement without leaving the single-page flow

### Navigation Pattern

- Navigation is fixed and follows the viewer through all page sections.
- Desktop behavior starts with icon-only items and expands each item to icon+label on hover/focus.
- Mobile behavior uses a compact bottom navigation treatment.
- Active section state is visible in navigation styling.
- Active nav items must use a solid icon style; inactive items use outline icons.
- Mobile active nav item must present full text label without truncation.
- Mobile active label visibility should use explicit show/hide rules rather than only opacity transforms.
- Mobile nav wrapper must remove desktop `right` anchoring and size to content so items do not render outside.
- Mobile nav should enforce viewport-aware width limits (`max-width`) on wrapper and active chip.
- Active section lock should recover automatically if smooth-scroll navigation is interrupted before target arrival.
- App shell brand badge uses `public/ck.svg` with yellow token background and no adjacent text label.
- App shell brand badge should render as a plain icon (no extra border/background container).
- App shell brand badge should be clickable and return the user to `#hero`.
- Desktop placement: floating navigation aligns to the right; brand badge is fixed near top-left.
- Brand badge render size is fixed at `48px x 48px` to match desktop nav-link footprint.
- Provide a subtle bottom-right CTA to toggle dark/light theme without disrupting primary navigation.

### Sitemap

1. `/` with section anchors:
   `#hero`
   `#projects-preview`
   `#about-preview`
   `#contact-me`

## Motion Rules

- Animate containers and section groups, not every small element.
- Keep easing/timing consistent using motion tokens.
- Use token-derived delay steps for staggered reveals rather than hardcoded millisecond values (compose from duration-only motion tokens).
- Preferred pattern: section fade + translateY with controlled text
  stagger.
- Project preview visuals should use layered parallax tied to scroll position.
- Parallax layers should move at different speeds and stay subtle enough to preserve readability.
- Reduced-motion users should receive static previews without parallax transforms.
- Theme toggle should preserve contrast and readability in both dark and light modes.

## Success Criteria

- All MVP sections are complete and content-ready.
- Navigation and section transitions feel smooth and coherent.
- No responsive breakage at defined breakpoints.
- Accessibility baseline reaches WCAG 2.1 AA expectations.
- Project Preview section clearly presents preview-first case studies with consistent narrative structure.
- Clicked project cards open detail pages with consistent long-form structure and responsive behavior.
- Detail pages expose a sticky right-side scrollspy after Project Summary, with active-section highlighting and vertical progress feedback.
- Navigation expansion and section-anchor scrolling are functional on desktop and gracefully adapted on mobile.

## Future Considerations

- CMS integration
- CMS-driven case-study authoring and deeper expansion variants
- Enhanced offline strategy
- Additional motion treatments
