# Contact Form Focus Border Implementation Plan

## Scope

Implement the approved single-accent-border focus treatment for contact form
fields. Do not change other site controls or form behavior.

## Tasks

1. Update focus selectors in `src/styles/index.css`:
   - Use the accent border without an outside outline for text inputs,
     textarea, and country search, for both pointer and keyboard focus.
   - Use the existing phone control `:focus-within` border for both the
     country-code button and phone number input; suppress nested outlines.
   - Keep invalid text and accessibility attributes unchanged; the accent
     focus border remains visible when validation moves focus programmatically.
2. Update related documentation (`README.md`, `planning.md`, `prd.md`,
   `tasks.md`, and the contact form design/plan) with the focus behavior.
3. Validate by focusing each control in dark and light themes, including an
   invalid field and both phone sub-controls; verify there is one accent border
   and no outside ring. Run ESLint and the production build.

## Guardrails

- Do not change layout, validation, submission, or unrelated focus styles.
- Preserve the 8pt spacing scale and existing theme tokens.
- Do not push or deploy without explicit user approval.
