# Product Requirements Document

## Executive Summary

This project is a premium portfolio built as a React + Vite SPA with a
dark visual system and yellow-led accents. The MVP focuses on six
outcomes only: a strong hero, about section, three case studies, contact
section, smooth transitions, and reliable responsive behavior.

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

- Landing hero section with strong motion
- About section
- Three strong case studies
- Contact section
- Smooth transitions between sections
- Responsive behavior that does not break

## Out of Scope (Post-MVP)

- Database-backed content workflows
- Notifications-ready architecture
- Advanced offline workflows beyond static asset caching

## Technical Requirements

- React.js
- Vite
- Tailwind CSS
- React Router with deep linking
- Semantic HTML and accessible interactions
- WCAG 2.1 AA baseline
- 12-column grid discipline for layout
- Cross-browser smoke checks on current Chrome, Safari, and Firefox

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

  --text-h1: 88px;
  --text-h2: 48px;
  --text-h3: 32px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-small: 14px;

  --leading-heading: 1.15;
  --leading-body: 1.6;

  /* Spacing (8pt) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 48px;
  --space-6: 64px;
  --space-7: 96px;
  --space-8: 128px;

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

1. Full-width visual section (`--container-wide`)
2. Centered text block (`--container-narrow`) with:
   Problem, Approach, Constraints, Impact
3. Two-column breakdown (6/6)
4. Outcome metrics or reflection

## Motion Rules

- Animate containers and section groups, not every small element.
- Keep easing/timing consistent using motion tokens.
- Preferred pattern: section fade + translateY with controlled text
  stagger.

## Success Criteria

- All MVP sections are complete and content-ready.
- Navigation and section transitions feel smooth and coherent.
- No responsive breakage at defined breakpoints.
- Accessibility baseline reaches WCAG 2.1 AA expectations.

## Future Considerations

- CMS integration
- Deeper case-study expansion pages
- Enhanced offline strategy
- Additional motion treatments
