# Hero Copy and Portrait Design

## Status

Approved by the user on 2026-10-21. This document defines the intended home-page hero update and is ready for implementation planning.

## Context

The current hero headline is “UX Designer With An Analytics Background,” followed by “I Turn Messy Workflows Into Clear, Measurable Products.” Feedback identified three issues: the phrase “Analytics Background” could be clearer to a broad audience, the name “CK Obcena” is not visible in the portfolio content, and the hero portrait appears too short or tightly cropped.

The user's CV describes close to a year of hands-on UX design and nearly eight years in real-time analysis and reporting in BPO operations. It describes a working approach of starting with data, identifying root causes, and designing for the user's decision.

## Goals

- Preserve the existing hero headline and desktop 7/5 text-to-image composition.
- Make “CK Obcena” visible in the hero.
- Clarify the connection between the user's analytics and reporting experience and UX design using CV-grounded language.
- Give the desktop hero portrait more vertical presence and avoid the current tight crop.
- Preserve the current mobile behavior: the hero image remains hidden at the existing breakpoint.
- Keep the implementation within the existing token-driven visual system, 12-column grid, 8pt spacing scale, and accessibility baseline.

## Approved Design

### Copy and hierarchy

Display the following name/role eyebrow above the existing H1:

> CK Obcena · UX Designer

Keep the current H1 unchanged:

> UX Designer With An Analytics Background

Replace the current supporting sentence with:

> I bring nearly 8 years in real-time analysis and reporting to UX—using data to find root causes and design clearer digital experiences.

The name/role line must be visibly readable in both themes and must not visually compete with the headline. Preserve semantic heading order: the name/role is supporting text, the existing headline remains the page's H1, and the intro remains paragraph text.

### Desktop portrait

Retain the desktop 7/5 split: copy spans seven columns and the portrait spans five columns. Increase the visual height of the portrait container and adjust image sizing/positioning so that the portrait feels taller and less tightly cropped. Keep the existing portrait asset and theme-aware treatment. The implementation may tune the image fit and container dimensions to the asset's portrait aspect ratio, while avoiding distortion and unintended clipping of important content.

### Mobile behavior

Keep the current breakpoint behavior exactly: the hero portrait is hidden on mobile/narrow layouts. Do not add a mobile portrait or otherwise change the breakpoint as part of this work.

## Accessibility and Responsive Requirements

- Keep text contrast legible in dark and light themes.
- Keep the portrait's existing meaningful alternative text.
- Ensure the new eyebrow, headline, and intro wrap without horizontal overflow at supported breakpoints.
- Preserve reduced-motion and existing reveal behavior.
- Do not introduce new focusable elements or interactions.

## Out of Scope

- Rewriting the headline.
- Adding new sections, badges, or interactive controls.
- Changing the illustration asset.
- Showing the hero image on mobile.
- Altering navigation, contact form, or other portfolio sections.
- Changing deployment configuration or adding deployment features. The user has authorized pushing the completed, scoped hero changes to `origin/main`.

## Validation

- Run the project's lint and production build commands after implementation.
- Inspect desktop and mobile breakpoints: verify the taller desktop portrait and confirm the portrait remains hidden where it is hidden today.
- Check dark and light themes for readable hierarchy and contrast.
- Confirm the original headline, exact approved supporting copy, and visible name are present in rendered output.
- Update the repository's `README.md`, `tasks.md`, `planning.md`, and `prd.md` to reflect implemented state when code changes are made.
