# Theme-Aware Contact Form Design

## Goal

Add a usable inquiry form to the existing portfolio contact section and deliver
submissions to `ckjobcena@gmail.com` without adding a custom backend or paid
service.

## Current Context

The home page already has a `#contact-me` section with introductory copy and
email/LinkedIn CTAs. The application is a statically deployed React + Vite SPA
with an existing dark/light theme toggle and token-driven styles. There is no
form service or server-side submission endpoint in the application.

## Approved Design

### Layout and Theme

- Retain the existing `#contact-me` anchor and section navigation behavior.
- Use a compact two-column layout: a concise contact introduction and the
  existing email contact on the left; the form in a distinct surface card on
  the right.
- Stack the columns at narrow widths and preserve the project’s 12-column
  layout discipline and 8pt spacing scale.
- Use existing design tokens for backgrounds, text, borders, accent, and
  transitions. The form follows the active site theme rather than forcing a
  separate light appearance: dark is the default and the existing theme toggle
  switches it to light.
- Keep field markers inline with their labels. Show `* Required` directly below
  the message field. Phone is marked `(optional)`.

### Fields and Validation

1. **Name** — required. Accept Unicode letters and combining marks, spaces,
   apostrophes (straight and typographic), hyphens, and periods. Reject digits
   and other symbols. Reject blank/whitespace-only values.
2. **Email address** — required. Use an email input and validate its address
   format before submission.
3. **Phone** — optional. Provide a searchable country-code selector on the
   left, defaulting to the Philippines (+63). Use a five-row searchable
   dropdown on desktop and a larger searchable bottom sheet on mobile. Use the
   same `Type phone number here` placeholder for every country and do not show
   national-number length guidance. Format the number as the visitor types
   according to the selected country’s numbering rules and use country
   metadata to validate only when a value is supplied. Submit the normalized
   international number with its calling code.
4. **Message** — required.

Validation errors must be associated with their fields and announced
accessibly. The country picker must be keyboard-operable and expose meaningful
country names and calling codes to assistive technology. Phone is not used for
SMS, OTP, or account verification.

### Submission and Privacy

- Send the form asynchronously through FormSubmit.co to
  `ckjobcena@gmail.com`; do not navigate visitors away from the portfolio.
- FormSubmit is a third party that processes submissions and, according to its
  current documentation, retains submissions for 30 days. It may show an
  anti-spam challenge. Disclose the service and retention near the submit
  action.
- The portfolio does not store submissions. The public client-side form
  endpoint is not a secret and must not contain credentials.
- Verify the destination inbox with FormSubmit before expecting delivery.
- Treat a documented successful FormSubmit response as confirmation that the
  provider accepted the submission, not proof that the email reached the inbox.
  Show a status such as “Your message was submitted” only after that response,
  then clear the form. On provider/network failure, display an accessible
  error and keep the visitor’s entered values so they can retry.

### Error and Interaction States

- Prevent duplicate submission while a request is pending and provide a clear
  pending state.
- Invalid fields receive visible inline feedback, an invalid state, and an
  association to the relevant error text.
- A provider anti-spam challenge, provider-level rejection, or network failure
  must not be represented as an accepted submission. Never claim inbox
  delivery based only on a successful browser response.
- Do not silently ignore empty or malformed input.

## Scope Boundaries

- No database, custom API, attachment upload, SMS verification, or paid service.
- No changes to case-study routes or unrelated contact/navigation behavior.
- Do not push or deploy without explicit user approval.

## Validation Plan

- Run the existing ESLint and production build commands.
- Verify name acceptance/rejection cases, valid and malformed email addresses,
  required fields, and optional phone behavior.
- Verify the responsive country-code picker, default country, calling-code
  submission, consistent phone placeholder, country-specific live formatting,
  and full-metadata international number validation.
- Verify pending, provider-accepted, provider-failure, and retry states. The
  UI must distinguish provider acceptance from confirmed inbox delivery.
- Smoke-test dark and light themes, keyboard navigation/focus, accessible error
  announcements, and responsive behavior at the project breakpoints.
- Verify FormSubmit inbox activation and actual delivery with the user before
  treating end-to-end email delivery as complete.
