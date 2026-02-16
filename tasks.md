# Tasks and Milestones

## Milestone 1 Foundation

- [x] Initialize project structure and documentation
- [x] Create React + Vite SPA baseline
- [x] Configure Tailwind CSS
- [x] Define global design tokens (color, typography, spacing, layout, motion)
- [x] Map tokens into Tailwind theme and utility usage
- [x] Set up routing
- [x] Refactor source layout into `src/app`, `src/features`, `src/shared`, and `src/styles`

## Milestone 2 MVP Build

- [x] Build `#hero` section with strong motion
- [x] Build `#projects-preview` section with three case-study previews
- [x] Build `#about-preview` section
- [x] Build `#contact-me` section
- [x] Add smooth transitions between anchored sections
- [x] Implement fixed icon-first navigation that expands to icon+label on hover/focus
- [x] Route nav interactions to section anchors (`#hero`, `#projects-preview`, `#about-preview`, `#contact-me`)
- [x] Render active nav icons as solid style while keeping inactive icons as outline
- [x] Prevent stale active-nav state when smooth-scroll is interrupted mid-navigation
- [x] Implement project preview-first case study layout
- [ ] Add scroll parallax layers inside project preview visuals
- [x] Apply `public/ck.svg` brand mark in app shell
- [x] Update `ck.svg` background to token yellow and use icon-only app shell badge
- [x] Remove app-shell badge wrapper border/background and keep icon-only logo
- [x] Move `CK` icon to left side and place desktop floating navigation on the right
- [x] Keep `CK` icon at `48px x 48px` to match desktop nav-link footprint
- [x] Add light mode version with subtle bottom-right toggle CTA and persisted preference
- [x] Update mobile nav layout so active label text is fully visible (no truncation) and use `Home` label
- [x] Enforce mobile active-label visibility with explicit display rules to avoid hidden label regressions
- [x] Fix mobile nav wrapper overflow by unsetting desktop `right` and using content-based wrapper width
- [x] Add mobile `max-width` guards for nav wrapper/active item and nowrap label to prevent horizontal overflow
- [x] Normalize component spacing/layout values to the 8pt scale
- [x] Route reveal/shell motion timing through transition tokens (`--transition-fast/base/slow`)
- [x] Ensure reveal-delay math uses duration-only motion tokens (valid CSS delay values)
- [x] Replace hardcoded hero heading sizes with typography tokens
- [x] Guard theme persistence for storage-restricted environments
- [x] Make case-study mobile controls reactive to viewport breakpoint changes

## Milestone 3 Quality

- [ ] Responsive refinement across `sm`, `md`, `lg`, `xl`
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Cross-browser smoke tests
- [ ] Motion performance pass
- [ ] Verify reduced-motion fallback disables project parallax effects
- [ ] Tune nav interaction timing and hit areas for keyboard and touch
- [ ] Decide whether brand mark should be clickable to return to `#hero`
- [ ] Final QA and content polish

## Dependencies

- React + Vite baseline before section implementation
- Design tokens before component styling
- Case study blueprint before project preview content build
- Section-anchor map before navigation implementation

## Priorities

1. Foundation
2. MVP Sections
3. Motion and Responsiveness
4. Accessibility and QA
