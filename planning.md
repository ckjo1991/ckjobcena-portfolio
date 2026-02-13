# Planning Document

## Vision

Create a premium portfolio with strong motion, disciplined layout, and a
clear narrative across hero, about, and case studies.

## Locked Decisions

- App foundation: React + Vite SPA
- Scope: MVP only (hero, about, 3 case studies, contact, transitions,
  responsive stability)
- Design system: token-driven implementation from `prd.md`

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
- `/projects`
- `/projects/:id`
- `/about`
- `/contact`

## Layout and Motion Strategy

- 12-column grid with 24 to 32px desktop gutters
- Container widths:
  - Default sections: 1200px
  - Hero/expressive sections: 1440px
  - Long-form case-study text: 960px
- Animate containers and section groups instead of many small elements
- Use only the transition tokens defined in `prd.md`

## Hero and Case Study Blueprint

- Hero pattern: left 7 columns statement, right 5 columns supporting
  content (desktop), then single-column collapse on mobile
- Case study pattern:
  1. Full-width visual
  2. Centered text narrative (Problem, Approach, Constraints, Impact)
  3. Two-column (6/6) explanation + visual
  4. Outcome metrics/reflection

## File Structure

- `src/`
- `src/components/`
- `src/pages/`
- `src/styles/`
- `public/`
- `docs/`

## Development Phases

1. Create React + Vite baseline and configure Tailwind
2. Implement global design tokens and typography rules
3. Build hero, about, and contact sections
4. Build three case studies using the blueprint
5. Add smooth section transitions and motion polish
6. Run responsive, accessibility, and cross-browser checks
