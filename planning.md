# Planning Document

## Vision

Create a premium portfolio with strong motion, disciplined layout, and a
clear narrative across hero, project preview, about preview, and contact.

## Locked Decisions

- App foundation: React + Vite SPA
- Scope: MVP single-page flow (hero, project preview, about preview,
  contact me, transitions, responsive stability)
- Design system: token-driven implementation from `prd.md`
- Source organization: feature-based (`app`, `features`, `shared`, `styles`) instead of split `mobile/desktop` trees

## Architecture

- React SPA with Vite build tooling
- React Router with deep linking support
- Modular component architecture
- Static content first; data layer is post-MVP

## Technology Stack

- React.js
- Vite
- Tailwind CSS
- React Router
- Google Material Icons or local SVG icon set
- ESLint
- Prettier

## Responsive Strategy

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up

Implementation notes:
- Mobile-first defaults below `sm`
- Collapse to one column on mobile
- Scale hero heading down to approximately 40 to 48px on mobile

## Routing Integration Plan

- `/`
- `/#hero`
- `/#projects-preview`
- `/#about-preview`
- `/#contact-me`

## Layout and Motion Strategy

- 12-column grid with 24 to 32px desktop gutters
- Container widths:
  - Default sections: 1200px
  - Hero/expressive sections: 1440px
  - Long-form case-study text: 960px
- Animate containers and section groups instead of many small elements
- Use only the transition tokens defined in `prd.md`
- Keep reveal delay increments token-driven so timing scales from `--transition-fast`
- Keep project previews layered and motion-ready
- Defer scroll parallax to Milestone 3 quality pass
- If parallax is enabled, keep it subtle and disable it when `prefers-reduced-motion` is enabled

Implementation status:
- Section reveal and shell entrance animations now consume transition tokens directly.
- Component spacing/layout values in `src/styles/index.css` are aligned to the 8pt scale.
- Hero heading sizing now uses typography tokens instead of fixed pixel classes.
- Active-section lock recovery is implemented to prevent stale nav highlights when smooth scroll is interrupted.
- Reveal delay now composes from duration-only transition tokens for valid CSS delay math.
- Theme preference persistence now safely degrades when storage access is blocked.
- Case-study mobile controls now react to viewport breakpoint changes without stale state.
- Typography tokens now scale across mobile/tablet/desktop breakpoints for headings and body text.
- Typography scale values are tuned for smoother breakpoint progression and mobile legibility.
- Route composition is centralized in `src/app/AppRoutes.jsx`.
- Shared data/hooks/icons are extracted under `src/shared/`.
- Home and project visual UI are extracted under `src/features/`.
- `/projects/:projectId` now renders a structured long-form case-study layout (top meta grid, problem/insight/exploration/solution/outcomes/reflection sections) while leaving the home preview section unchanged.
- Case-study detail pages on `/projects/:projectId` now use a sticky right-side scrollspy with active section tracking and vertical progress after the Project Summary section.

## Hero and Case Study Blueprint

- Hero pattern: left 7 columns statement, right 5 columns supporting
  content (desktop), then single-column collapse on mobile
- Case study pattern:
  1. Preview-first card with expressive visual
  2. Text narrative (Problem, Approach, Constraints, Impact)
  3. Two-column (5/7) explanation + preview on desktop, single column on mobile
  4. Outcome metrics/reflection inside the same page section

## Navigation and Interaction Plan

- Use fixed navigation links so section controls follow the viewer.
- Nav targets section anchors instead of route transitions.
- Desktop nav items render icon-first and expand to icon+text on hover/focus.
- Mobile nav shifts to bottom pill layout.
- Mobile active nav item expands to display full label text (no clipped label state).
- Mobile active label visibility is controlled with explicit display toggles for stability across browsers.
- Mobile nav must reset desktop positional constraints (`right`) so all items remain inside the wrapper.
- Mobile nav applies viewport-based `max-width` limits to wrapper and active chip to avoid horizontal spill.
- Active section state highlights navigation item.
- Active section lock from nav taps self-releases if the section is not reached within a short timeout.
- Active section icon variant is solid; inactive icons remain outline style.
- Desktop floating navigation is right-aligned; `CK` brand icon is fixed top-left.

## Component Notes

- `AppShell`: owns floating navigation layout and page padding offsets.
- `ProjectPlaceholderCard`: reusable preview card used in the Project Preview section.
- `useActiveSection`: tracks visible section for nav highlight state.
- Case study data shape now includes preview metadata plus full detail-page section content keyed by project id.

## Brand Asset Plan

- Canonical mark lives at `public/ck.svg`.
- Brand mark is rendered in app shell as a static identity element.
- All future logo usage should reference `/ck.svg` to avoid duplicate asset copies.
- Background fill uses token yellow (`--color-accent-500` / `#F5C542`).
- App shell brand control remains icon-only with no extra `CK` text label.
- App shell brand control has no wrapper border/background; only the icon is visible.
- App shell brand icon size is fixed at `48px x 48px`.

## Theme Strategy

- Default theme is dark with token palette from `:root`.
- Light mode is implemented through `[data-theme='light']` token overrides.
- Bottom-right subtle CTA toggles theme mode and persists user choice in `localStorage`.
- CTA is lifted above mobile bottom nav to avoid overlap.

## File Structure

- `src/`
- `src/app/`
- `src/features/`
- `src/shared/`
- `src/styles/`
- `public/`
- `docs/`

## Development Phases

1. Create React + Vite baseline and configure Tailwind
2. Implement global design tokens and typography rules
3. Build four anchored sections on `/` (`hero`, `projects-preview`, `about-preview`, `contact-me`)
4. Build three case-study preview cards using the preview-first blueprint
5. Implement fixed icon-first section navigation with responsive adaptation
6. Add section transitions and complete motion quality pass (including optional parallax)
7. Run responsive, accessibility, and cross-browser checks
