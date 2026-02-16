# Project Overview

This portfolio project follows a token-driven design system and a strict
MVP scope.

## Critical Workflow Rules

- Build as a React + Vite SPA
- Implement and use tokens from `prd.md` as the source of truth
- Follow the 8pt spacing scale only
- Use the 12-column grid for structural layout decisions
- Maintain WCAG 2.1 AA baseline
- Respect responsive breakpoints (`sm`, `md`, `lg`, `xl`)
- Organize source by feature/shared modules, not separate `mobile` and `desktop` root trees
- Whenever code changes, sync all repository `.md` files to reflect the new state

## Design Guardrails

- Yellow is the primary accent and should stay within 10 to 15 percent of
  visible page area.
- Secondary accents are supportive only.
- Avoid heavy shadows and over-rounded UI treatment.
- Avoid mixing hero layout patterns; use the chosen 7/5 split pattern.
- Keep brand badge treatment minimal: `ck.svg` in token yellow with no duplicate text label.
- Keep shell placement consistent: brand icon top-left, floating desktop navigation right-aligned.
- For shell icon sizing, use explicit pixel classes (e.g. `48px`) so token spacing overrides do not distort dimensions.
- Maintain dual-theme readability: dark is default, light mode is available via subtle bottom-right toggle.
- Keep nav labels readable; mobile active item must show full label text without clipping.
- Prefer explicit mobile label display toggles (`display`) over opacity-only hiding to avoid cross-browser clipping bugs.
- Ensure mobile nav unsets desktop side anchors (`right`) to prevent wrapper clipping/overflow.
- Add viewport-safe max-width guards for mobile nav wrapper and active chip labels.
- Ensure nav active-section lock can recover if smooth scrolling is interrupted before reaching the target.

## Code Standards

- Functional components
- Reusable components
- Semantic HTML
- Clean Tailwind utility usage
- Motion consistency via transition tokens only
- Reveal-delay timing must use duration-only transition tokens for valid CSS delays

## File Conventions

- Route composition in `src/app/AppRoutes.jsx`
- Shared data, hooks, and icons in `src/shared/`
- Feature-specific UI in `src/features/`
- Global styles/tokens in `src/styles/index.css`
- Static brand assets in `public/`
- Keep docs synchronized after code changes (`README.md`, `tasks.md`, `planning.md`, `prd.md`)

## Testing Requirements

- Manual responsive testing at defined breakpoints
- Accessibility testing with Lighthouse
- Cross-browser smoke checks
- Motion smoothness/performance validation
- Navigation active-state recovery check when smooth-scroll is manually interrupted
- Theme toggle resilience check when browser storage access is unavailable
