# Contact Phone Selector Adjustments

## Goal

Simplify the optional phone field prompt and make country selection easier to
use across desktop and mobile without changing country-aware formatting,
validation, or submission behavior.

## Approved Design

- Use the placeholder `Type phone number here` for every selected country,
  including the Philippines.
- Remove the typical national-number length hint from below and beside the
  phone field.
- Keep the country-code selector on the left side of the phone input.
- On desktop, opening the country selector displays a searchable dropdown with
  five 40px country rows visible at once. The results list scrolls, and search
  filters the available countries.
- On mobile, opening the country selector displays a larger picker sheet with
  a persistent search field and a taller scrollable country list. At viewport
  widths below the project's 768px tablet breakpoint, use a viewport-safe
  bottom sheet with a maximum height of 85dvh and a full-width layout inset by
  16px on each side. Show up to eight 40px country rows at once, with the list
  scrolling when results exceed the available height. On very short screens,
  constrain the sheet to the viewport and allow the list to show fewer rows.
- Selecting a country updates the calling code and retains existing
  country-aware phone formatting and full-metadata validation.
- Preserve the default Philippines country, optional-phone behavior, and
  normalized international number submission.

## Component and Interaction

Keep the behavior within `InternationalPhoneField`. The selected country and
phone value remain controlled by `ContactForm`; the field emits country and
formatted-number changes through the existing callbacks.

The selector remains keyboard-operable. Search results expose country names
and calling codes, keyboard navigation can move through results, Escape closes
the picker, and selecting a country returns focus to the phone input. The
mobile picker sheet must fit within the viewport and keep its search input and
results usable at small widths. The approved visual reference is mockup B in
the brainstorming companion for this session.

## Validation and Error Handling

The phone number remains optional. When supplied, existing libphonenumber
validation remains authoritative. Country length metadata is no longer
displayed as helper copy. Existing invalid-state messaging and accessible
field-error association remain unchanged.

## Scope

- No change to the form provider, required fields, validation rules, or payload.
- No changes to unrelated contact section layout, navigation, or project routes.
- Do not push or deploy without explicit user approval.

## Verification

- Confirm the placeholder is identical for Philippines and other countries.
- Confirm no national-number length helper is rendered.
- At widths of 768px and above, confirm the dropdown has search, five 40px rows,
  and a scrollable result list.
- Below 768px, confirm picker B opens as a viewport-safe bottom sheet, with
  search, up to eight 40px visible rows, and a taller scrollable list.
- Verify keyboard interaction, focus behavior, selected-country updates,
  live phone formatting, and country-aware validation.
- Run the existing ESLint and production build commands.
