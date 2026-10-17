import { useLayoutEffect, useMemo, useRef } from 'react'
import { AsYouType } from 'libphonenumber-js/max'
import { countries, formatPhoneLengths } from './phoneNumberMetadata'

function formatPhoneNumber(value, country) {
  const digits = value.replace(/\D/g, '')
  const hasInternationalPrefix = value.trimStart().startsWith('+')
  const nationalInput =
    country === 'PH' && !hasInternationalPrefix && digits.startsWith('9')
      ? `0${value}`
      : value

  return new AsYouType(country).input(nationalInput)
}

export default function InternationalPhoneField({
  country,
  error,
  inputRef,
  onBlur,
  onChange,
  onCountryChange,
  value,
}) {
  const cursorDigitCountRef = useRef(null)

  const selectedCountry = countries.find((option) => option.iso2 === country) ?? countries[0]
  const phoneLengthHint = useMemo(() => {
    const nationalLengths = selectedCountry.areaCodes.length
      ? selectedCountry.subscriberLengths
      : selectedCountry.nationalLengths

    return `${formatPhoneLengths(nationalLengths)} digits`
  }, [selectedCountry])

  useLayoutEffect(() => {
    if (cursorDigitCountRef.current === null) return

    const input = inputRef.current
    if (!input || document.activeElement !== input) {
      cursorDigitCountRef.current = null
      return
    }

    let digitCount = 0
    let cursorPosition = 0
    while (cursorPosition < value.length && digitCount < cursorDigitCountRef.current) {
      if (/\d/.test(value[cursorPosition])) digitCount += 1
      cursorPosition += 1
    }

    input.setSelectionRange(cursorPosition, cursorPosition)
    cursorDigitCountRef.current = null
  }, [inputRef, value])

  const handlePhoneChange = (event) => {
    const { selectionStart, value: inputValue } = event.target
    const digitsBeforeCursor = inputValue
      .slice(0, selectionStart ?? inputValue.length)
      .replace(/\D/g, '').length
    const typedPhilippineNationalNumber =
      country === 'PH' &&
      !inputValue.trimStart().startsWith('+') &&
      inputValue.replace(/\D/g, '').startsWith('9')

    cursorDigitCountRef.current = digitsBeforeCursor + Number(typedPhilippineNationalNumber)
    onChange(formatPhoneNumber(inputValue, country))
  }

  return (
    <div className={`contact-phone${error ? ' contact-phone--invalid' : ''}`}>
      <div className="contact-phone__control">
        <label className="contact-phone__country-label" htmlFor="contact-phone-country">
          Country code
        </label>
        <select
          id="contact-phone-country"
          className="contact-phone__country-select"
          name="phone-country"
          value={country}
          aria-label="Country code"
          onChange={(event) => {
            const nextCountry = event.target.value
            onCountryChange(nextCountry)
            if (value) onChange(formatPhoneNumber(value, nextCountry))
          }}
        >
          {countries.map((option) => (
            <option key={option.iso2} value={option.iso2}>
              {option.flag} {option.iso2} +{option.displayCallingCode}
            </option>
          ))}
        </select>

        <input
          ref={inputRef}
          id="contact-phone"
          className="contact-phone__input"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={country === 'PH' ? '09XX XXX XXXX' : 'Local phone number'}
          value={value}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'contact-phone-error' : undefined}
          onChange={handlePhoneChange}
          onBlur={onBlur}
        />

        <span className="contact-phone__digit-hint" aria-live="polite">
          {phoneLengthHint}
        </span>
      </div>

      {error && (
        <p id="contact-phone-error" className="contact-form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
