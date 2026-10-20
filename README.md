# CK Portfolio MVP

Token-driven portfolio app built with React, Vite, Tailwind, and React Router.

## Current Status

- Foundation setup complete: Vite baseline, Tailwind config, token mapping, and routing.
- MVP single-page sections implemented on `/`:
  hero, projects preview, about preview, and contact.
- Project detail pages now render a full structured case-study layout after a project preview card click.
- Case-study routes now use reviewer-readable slugs (`/projects/angkas`, `/projects/kuryenteph`, `/projects/fast`) with legacy slug redirects preserved.
- Project detail pages now include a right-side sticky scrollspy with active-section highlight and vertical progress (appears after Project Summary).
- FAST (`/projects/fast`) now includes full scannable case-study content, real exported media, and a linked interactive prototype.
- KuryentePH (`/projects/kuryenteph`) now includes full scannable case-study content, real exported media, and a linked interactive prototype.
- KuryentePH wireframe and prototyping process sections now render JPG media assets.
- Case-study images on `/projects/:projectId` are now clickable and open in a Mac Preview-style lightbox overlay.
- Floating section navigation is implemented with active-section tracking.
- Navigation active state now auto-recovers if smooth-scroll is interrupted before reaching the target section.
- Active navigation initializes consistently during prerender hydration, then tracks hash-linked sections from scroll position.
- Reveal stagger delays now use duration-only motion tokens for valid token-driven timing.
- Light/dark mode toggle is live with persisted preference.
- Theme persistence now fails safely when browser storage is unavailable.
- Case-study mobile controls now respond correctly when resizing between desktop/mobile breakpoints.
- Mobile nav label visibility and overflow behavior are stabilized.
- Mobile active nav labels now stay visible while the theme toggle sits above the bottom nav on narrow viewports.
- Brand mark is integrated from `public/ck.svg` as an icon-only shell element.
- CSS spacing/layout values are normalized to the 8pt scale for component spacing.
- Section reveal and shell entrance motion timing now uses transition tokens (`--transition-fast/base/slow`).
- Project preview visuals now include layered scroll parallax motion with reduced-motion fallback.
- Responsive layout refinements are applied across `sm`, `md`, `lg`, and `xl` breakpoints.
- Accessibility audit updates are in place (active-nav semantics and keyboard focus management for image preview modal).
- Cross-browser smoke pass includes compatibility checks and Safari-safe blur fallbacks (`-webkit-backdrop-filter`) with clean lint/build output.
- Motion performance tuning is in place (`requestAnimationFrame` throttling for scrollspy updates and tighter reveal `will-change` scope).
- Navigation timing and hit areas are tuned for keyboard/touch (faster nav transitions, larger touch targets, and improved mobile nav tap area sizing).
- Typography now uses responsive tokens for mobile/tablet/desktop (`h1`, `h2`, `h3`, `body-lg`, `body`, `small`).
- Hero heading now uses semantic `text-h1` with token-driven scaling across breakpoints.
- Home and case-study routes now ship prerendered HTML so crawlers and link unfurlers can read real content before JavaScript hydration.
- Route-aware metadata is now generated for `/` and each `/projects/:projectId` page (title, description, canonical, Open Graph, Twitter, and JSON-LD).
- Final QA/content polish pass is complete (including removal of leftover placeholder taxonomy copy).
- Responsive typography values were tuned for smoother size jumps and better mobile readability.
- LinkedIn contact CTA now matches the email CTA format with LinkedIn blue styling.
- Contact section now includes a responsive theme-aware inquiry form with name/email/message validation and an optional international phone field defaulting to Philippines (+63), with country-specific live formatting and an adaptive searchable country picker.
- Form submissions are sent asynchronously to `ckjobcena@gmail.com` through FormSubmit.co; the provider must be activated by verifying the inbox before real delivery can be confirmed.
- Contact form feedback distinguishes provider acceptance from inbox delivery and discloses FormSubmit's 30-day submission retention and anti-spam checks.
- Contact form focus uses a single accent-colored border without an extra outline, including the grouped phone control.
- The downloadable portfolio resume is sourced from the latest supplied CV PDF.
- The online resume view embeds the same PDF asset as the download.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- ESLint

## Source Layout

- `src/app/AppRoutes.jsx`: route composition and page wiring
- `src/features/`: feature-specific modules (home, project detail, etc.)
- `src/features/home/ContactSection.jsx`: home-page contact intro and contact links
- `src/features/home/ContactForm.jsx`: validated contact form and FormSubmit request states
- `src/features/home/InternationalPhoneField.jsx`: searchable country-code picker and international number input, with a desktop dropdown and mobile picker sheet
- `src/shared/data/`: shared static portfolio data
- `src/shared/hooks/`: reusable hooks
- `src/shared/ui/`: shared icons and UI primitives
- `src/styles/index.css`: global tokens and component styles

## Local Development

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run lint
npm run build
```

Generate sitemap/robots files manually:

```bash
SITE_URL=https://your-domain.com npm run sitemap
```

## Routes

- `/` (single-page anchored sections)
- `/projects/angkas` (Angkas case study)
- `/projects/kuryenteph` (KuryentePH case study)
- `/projects/fast` (FAST case study)
- `/projects/:projectId` (structured case-study detail page, with legacy slug redirects)

## SEO Files

- `public/sitemap.xml` and `public/robots.txt` are generated by `scripts/generate-sitemap.mjs`.
- `npm run build` now generates sitemap/robots files, builds a server render bundle, and prerenders `/` plus each case-study route into static HTML.
- Route metadata is sourced from `src/shared/seo/metadata.js` and kept in sync on both the prerendered HTML and client-side navigation.
- `SITE_URL` (or `VITE_SITE_URL`) overrides the canonical/OG/sitemap origin at build time. Without an override, the build falls back to `https://ckjobcena-portfolio.vercel.app`.

## Section Anchors On `/`

- `#hero`
- `#projects-preview`
- `#about-preview`
- `#contact-me`

## Branding Asset

- Logo file: `public/ck.svg`
- App usage: `src="/ck.svg"`
- Logo background token: `--color-accent-500` (`#F5C542`)
- App shell treatment: icon-only mark with no text wrapper
- Brand mark interaction: clickable shortcut back to `#hero`
- Render size: `48px x 48px` (`.brand-mark`)

## Theme Toggle

- Toggle location: bottom-right (`.theme-toggle`)
- Modes: dark and light
- Persistence key: `ck-portfolio-theme` in `localStorage`
- Light theme uses token overrides under `[data-theme="light"]`
- The contact section and its form follow the currently selected theme.

## Contact Form

- Required: name, email address, and message; optional: phone number.
- Names accept Unicode letters, spaces, apostrophes, hyphens, and periods; numbers and unrelated symbols are rejected.
- Phone numbers use a searchable country/calling-code picker with Philippines (+63) as the default, format as the visitor types for the selected country, use the same `Type phone number here` placeholder for every country, and are validated with full phone-number metadata only when provided.
- The country picker opens as a five-row searchable dropdown on desktop and a taller searchable bottom sheet on mobile. No typical national-number length hint is displayed.
- Shared +1 territories display their territory-specific dialing prefix in the picker; the phone input accepts the complete national number without a length hint.
- FormSubmit.co asynchronously forwards submissions to `ckjobcena@gmail.com`. Verify the destination inbox with FormSubmit before expecting email delivery.
- FormSubmit processes submissions, retains them for 30 days, and may show an anti-spam challenge. The portfolio does not store submissions.
- Focused contact fields show one accent border; the phone control highlights its outer border when the country selector or number input receives focus.

## Notes

- Product requirements and guardrails: `prd.md`
- Build plan and implementation decisions: `planning.md`
- Milestone tracking and execution status: `tasks.md`
