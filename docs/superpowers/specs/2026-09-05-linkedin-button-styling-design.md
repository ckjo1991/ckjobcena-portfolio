# LinkedIn Contact Button Styling

## Goal

Make the LinkedIn CTA beneath the contact heading match the existing “Email me”
button’s filled layout and copy treatment while retaining the LinkedIn-specific
label and destination.

## Design

- Keep the existing LinkedIn anchor, URL, new-tab behavior, icon, and accessible
  label.
- Apply the same height, padding, typography, icon sizing, gap, radius, and
  transition utilities used by the email CTA.
- Use LinkedIn blue (`#0A66C2`) for the default background, a darker blue for
  hover, and white text/icon content for contrast.
- Keep the change scoped to the contact CTA styling; no component extraction or
  data-model changes are needed.

## Validation

- Run the existing ESLint script.
- Run the existing production build.
- Verify the contact section at responsive breakpoints and confirm both CTAs
  retain readable contrast and keyboard focus behavior.
