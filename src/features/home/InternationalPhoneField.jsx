import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AsYouType } from 'libphonenumber-js/max'
import { countries } from './phoneNumberMetadata'

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
  const [isCountryListOpen, setIsCountryListOpen] = useState(false)
  const [countryQuery, setCountryQuery] = useState('')
  const [activeCountryIndex, setActiveCountryIndex] = useState(0)
  const [isMobilePicker, setIsMobilePicker] = useState(false)
  const countryPickerRef = useRef(null)
  const countryButtonRef = useRef(null)
  const countrySearchRef = useRef(null)
  const closeButtonRef = useRef(null)
  const activeCountryOptionRef = useRef(null)
  const cursorDigitCountRef = useRef(null)

  const selectedCountry = countries.find((option) => option.iso2 === country) ?? countries[0]
  const filteredCountries = useMemo(() => {
    const normalizedQuery = countryQuery.trim().toLocaleLowerCase()
    if (!normalizedQuery) return countries

    return countries.filter(({ name, iso2, callingCode, displayCallingCode }) => {
      return (
        name.toLocaleLowerCase().includes(normalizedQuery) ||
        iso2.toLocaleLowerCase().includes(normalizedQuery) ||
        `+${callingCode}`.includes(normalizedQuery) ||
        `+${displayCallingCode}`.includes(normalizedQuery)
      )
    })
  }, [countryQuery])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const updatePickerMode = () => setIsMobilePicker(mobileQuery.matches)

    updatePickerMode()
    mobileQuery.addEventListener('change', updatePickerMode)
    return () => mobileQuery.removeEventListener('change', updatePickerMode)
  }, [])

  useEffect(() => {
    if (!isCountryListOpen) return
    countrySearchRef.current?.focus()
  }, [isCountryListOpen])

  useEffect(() => {
    if (!isCountryListOpen) return undefined

    const closeOnOutsidePointer = (event) => {
      if (!countryPickerRef.current?.contains(event.target)) {
        setIsCountryListOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [isCountryListOpen])

  useEffect(() => {
    activeCountryOptionRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeCountryIndex])

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

  const closeCountryList = ({ focusPhone = false } = {}) => {
    setIsCountryListOpen(false)
    if (focusPhone) inputRef.current?.focus()
    else countryButtonRef.current?.focus()
  }

  const selectCountry = (nextCountry) => {
    onChange(formatPhoneNumber(value, nextCountry.iso2))
    onCountryChange(nextCountry.iso2)
    closeCountryList({ focusPhone: true })
  }

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

  const handleCountrySearchKeyDown = (event) => {
    if (event.key === 'ArrowDown' && filteredCountries.length) {
      event.preventDefault()
      setActiveCountryIndex((index) => Math.min(index + 1, filteredCountries.length - 1))
      return
    }

    if (event.key === 'ArrowUp' && filteredCountries.length) {
      event.preventDefault()
      setActiveCountryIndex((index) => Math.max(index - 1, 0))
      return
    }

    if (event.key === 'Enter' && filteredCountries[activeCountryIndex]) {
      event.preventDefault()
      selectCountry(filteredCountries[activeCountryIndex])
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeCountryList()
    }
  }

  const handlePickerKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeCountryList()
      return
    }

    if (!isMobilePicker || event.key !== 'Tab') return

    const focusableElements = [closeButtonRef.current, countrySearchRef.current].filter(Boolean)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements.at(-1)

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement?.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement?.focus()
    }
  }

  return (
    <div className={`contact-phone${error ? ' contact-phone--invalid' : ''}`}>
      <div className="contact-phone__control" ref={countryPickerRef}>
        <button
          ref={countryButtonRef}
          type="button"
          className="contact-phone__country-button"
          aria-label={`Choose country code. Current country: ${selectedCountry.name}, +${selectedCountry.displayCallingCode}`}
          aria-expanded={isCountryListOpen}
          aria-controls="contact-country-listbox"
          aria-haspopup="listbox"
          onClick={() => {
            if (isCountryListOpen) {
              closeCountryList()
              return
            }

            setCountryQuery('')
            setActiveCountryIndex(0)
            setIsCountryListOpen(true)
          }}
        >
          <span className="contact-phone__flag" aria-hidden="true">
            {selectedCountry.flag}
          </span>
          <span className="contact-phone__dial-code">
            {selectedCountry.iso2} +{selectedCountry.displayCallingCode}
          </span>
          <svg
            className="contact-phone__chevron"
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="m3 4.5 3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isCountryListOpen && (
          <>
            {isMobilePicker && (
              <button
                className="contact-phone__backdrop"
                type="button"
                tabIndex="-1"
                aria-label="Close country picker"
                onClick={() => closeCountryList()}
              />
            )}
            <div
              className={`contact-phone__popover${isMobilePicker ? ' is-mobile-picker' : ''}`}
              role="dialog"
              aria-label="Choose country code"
              aria-modal={isMobilePicker || undefined}
              onKeyDown={handlePickerKeyDown}
            >
              <div className="contact-phone__popover-header">
                <label className="contact-phone__search-label" htmlFor="contact-country-search">
                  Search countries
                </label>
                {isMobilePicker && (
                  <button
                    ref={closeButtonRef}
                    className="contact-phone__close"
                    type="button"
                    aria-label="Close country picker"
                    onClick={() => closeCountryList()}
                  >
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                      <path
                        d="m4 4 8 8m0-8-8 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <input
                ref={countrySearchRef}
                id="contact-country-search"
                className="contact-phone__search"
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="contact-country-listbox"
                aria-activedescendant={
                  filteredCountries[activeCountryIndex]
                    ? `contact-country-option-${filteredCountries[activeCountryIndex].iso2}`
                    : undefined
                }
                value={countryQuery}
                onChange={(event) => {
                  setCountryQuery(event.target.value)
                  setActiveCountryIndex(0)
                }}
                onKeyDown={handleCountrySearchKeyDown}
              />
              <p className="contact-phone__result-count" aria-live="polite">
                {filteredCountries.length
                  ? `${filteredCountries.length} countries`
                  : 'No countries found'}
              </p>
              <ul
                id="contact-country-listbox"
                className="contact-phone__country-list"
                role="listbox"
                aria-label="Countries and calling codes"
              >
                {filteredCountries.map((option, index) => (
                  <li
                    key={option.iso2}
                    ref={index === activeCountryIndex ? activeCountryOptionRef : null}
                    id={`contact-country-option-${option.iso2}`}
                    className={[
                      'contact-phone__country-option',
                      option.iso2 === country ? 'is-selected' : '',
                      index === activeCountryIndex ? 'is-active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    role="option"
                    aria-selected={option.iso2 === country}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectCountry(option)}
                  >
                    <span className="contact-phone__flag" aria-hidden="true">
                      {option.flag}
                    </span>
                    <span className="contact-phone__country-name">{option.name}</span>
                    <span className="contact-phone__country-dial-code">
                      +{option.displayCallingCode}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          id="contact-phone"
          className="contact-phone__input"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Type phone number here"
          value={value}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'contact-phone-error' : undefined}
          onChange={handlePhoneChange}
          onBlur={onBlur}
        />
      </div>
      {error && (
        <p id="contact-phone-error" className="contact-form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
