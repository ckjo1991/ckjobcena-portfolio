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

## Design Guardrails

- Yellow is the primary accent and should stay within 10 to 15 percent of
  visible page area.
- Secondary accents are supportive only.
- Avoid heavy shadows and over-rounded UI treatment.
- Avoid mixing hero layout patterns; use the chosen 7/5 split pattern.

## Code Standards

- Functional components
- Reusable components
- Semantic HTML
- Clean Tailwind utility usage
- Motion consistency via transition tokens only

## File Conventions

- Components in `src/components`
- Pages in `src/pages`
- Styles/tokens in `src/styles`

## Testing Requirements

- Manual responsive testing at defined breakpoints
- Accessibility testing with Lighthouse
- Cross-browser smoke checks
- Motion smoothness/performance validation
