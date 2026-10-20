# Contact Form Implementation Plan

## Scope

Implement the approved theme-aware contact form in the existing `#contact-me`
section. Keep the app static, send form submissions through FormSubmit.co, and
do not push or deploy without the user's explicit approval.

## Tasks

1. **Inspect existing UI and dependency patterns**
   - Re-check the current home contact section, token-based form/control styles,
     theme hook, and package manifest.
   - Use `libphonenumber-js` for calling-code data and international number
     validation; keep the searchable country selector accessible and responsive.

2. **Implement the contact form**
   - Extract the form into a focused feature component under
     `src/features/home/` and retain the existing section anchor and contact
     introduction.
   - Add required name, email, and message fields; optional international
     phone; inline label markers; and the required-fields legend below Message.
   - Validate Unicode names using the approved allowed character set, email
     format, and an entered phone number. Format phone input live according
     to the selected country and submit the normalized international number.
     Use a consistent `Type phone number here` placeholder and omit national
     number length guidance. Keep libphonenumber validation authoritative.
     Associate all errors with their fields for keyboard and screen-reader
     users.
   - Implement pending, FormSubmit-accepted, provider/network failure, and
     retry states. Preserve values after failures and clear only after provider
     acceptance. Never describe provider acceptance as guaranteed inbox
     delivery.

3. **Style and integrate**
   - Follow existing color/theme tokens so the form matches the active dark or
     light theme.
   - Use a single accent-colored border for contact field focus without an
     extra outline; apply phone focus to the outer grouped control.
   - Use a compact 5/7-style 12-column split on wide layouts and stack the
     intro and form card on narrow viewports.
   - Preserve visible focus, adequate contrast, token spacing, and reduced
     motion behavior.

4. **Configure FormSubmit and privacy notice**
   - Submit asynchronously to the approved FormSubmit recipient and map the
     provider response to explicit UI states.
   - Include the approved disclosure that FormSubmit processes submissions
     and retains them for 30 days; account for possible anti-spam challenges.
   - Keep credentials out of client code. Do not send real test submissions
     until the user has activated the inbox endpoint.

5. **Synchronize project documentation**
   - Update `README.md`, `planning.md`, `prd.md`, and `tasks.md` to reflect the
     completed contact form, validation, theme behavior, delivery service, and
     external inbox-activation requirement.

6. **Verify locally**
   - Run the existing lint and production build.
   - Exercise accepted/rejected names, malformed/valid emails, missing required
     fields, empty/valid/invalid optional phones, and message validation.
   - Verify the desktop five-row searchable country dropdown and mobile picker
     sheet, keyboard operation, default country, country-specific live number
     formatting (including shared +1 area-code territories), theme switching,
     pending/success/error/retry states, and responsive layouts at the
     defined breakpoints.
   - Verify focused contact fields show one accent border, including invalid
     fields and both phone-control focus targets, in dark and light themes.
   - Test provider response handling without sending real user data; verify
     actual inbox delivery only after the user activates FormSubmit.
   - Do not push or deploy until the user explicitly approves.
