# Contact Form Focus Border

## Goal

Remove the distracting double-border appearance on focused contact form fields
while retaining a clear, accessible focus indicator.

## Approved Design

- Use one accent-colored border to indicate focus; do not add an external
  outline. Apply the border for both pointer and keyboard focus.
- Apply this treatment consistently to the contact form's text inputs,
  textarea, country search input, and phone field.
- For the phone field, highlight the outer control border when either the
  country-code button or phone-number input has focus. The inner phone input
  must not draw a second focus border or outline.
- Keep normal unfocused border styles and existing invalid-state messaging.
- Preserve visible focus through the single accent border, including when form
  validation moves focus programmatically to an invalid field.
- When an invalid field is focused, keep the accent focus border and retain the
  existing associated error message and invalid accessibility state; the error
  text remains the distinct invalid-state cue rather than adding another border.

## Scope

- Update only contact form focus styles in `src/styles/index.css`.
- Do not change field layout, form behavior, or focus handling for unrelated
  controls.
- No dependency changes.
- Do not push or deploy without explicit user approval.

## Verification

- Focus each contact text input, textarea, and country search input; verify
  exactly one accent border and no external ring.
- Focus the phone country button and phone input separately; verify the same
  single accent border around the phone control.
- Check focused invalid fields retain the single accent border, visible error
  text, and invalid accessibility state in both themes.
- Run ESLint and visually inspect the focus states.
