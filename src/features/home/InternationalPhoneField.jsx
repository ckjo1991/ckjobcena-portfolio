import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AsYouType, getCountries, getCountryCallingCode } from 'libphonenumber-js'

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

function getFlagEmoji(countryCode) {
  return String.fromCodePoint(
    ...Array.from(countryCode, (letter) => 127397 + letter.charCodeAt(0)),
  )
}

const countries = getCountries()
  .map((iso2) => ({
    iso2,
    name: regionNames.of(iso2) || iso2,
    callingCode: getCountryCallingCode(iso2),
    flag: getFlagEmoji(iso2),
  }))
  .sort((left, right) => left.name.localeCompare(right.name, 'en'))

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
  const countryPickerRef = useRef(null)
  const countryButtonRef = useRef(null)
  const countrySearchRef = useRef(null)
  const activeCountryOptionRef = useRef(null)
  const cursorDigitCountRef = useRef(null)

  const selectedCountry = countries.find((option) => option.iso2 === country) ?? countries[0]
  const filteredCountries = useMemo(() => {
    const normalizedQuery = countryQuery.trim().toLocaleLowerCase()
    if (!normalizedQuery) return countries

    return countries.filter(({ name, iso2, callingCode }) => {
      return (
        name.toLocaleLowerCase().includes(normalizedQuery) ||
        iso2.toLocaleLowerCase().includes(normalizedQuery) ||
        `+${callingCode}`.includes(normalizedQuery)
      )
    })
  }, [countryQuery])

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

  const selectCountry = (nextCountry) => {
    onChange(formatPhoneNumber(value, nextCountry.iso2))
    onCountryChange(nextCountry.iso2)
    setIsCountryListOpen(false)
    inputRef.current?.focus()
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
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveCountryIndex((index) => Math.min(index + 1, filteredCountries.length - 1))
      return
    }

    if (event.key === 'ArrowUp') {
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
      setIsCountryListOpen(false)
      countryButtonRef.current?.focus()
    }
  }

  return (
    <div className={`contact-phone${error ? ' contact-phone--invalid' : ''}`}>
      <div className="contact-phone__control" ref={countryPickerRef}>
        <button
          ref={countryButtonRef}
          type="button"
          className="contact-phone__country-button"
          aria-label={`Choose country code. Current country: ${selectedCountry.name}, +${selectedCountry.callingCode}`}
          aria-expanded={isCountryListOpen}
          aria-controls="contact-country-listbox"
          aria-haspopup="listbox"
          onClick={() => {
            if (isCountryListOpen) {
              setIsCountryListOpen(false)
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
            {selectedCountry.iso2} +{selectedCountry.callingCode}
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
          <div className="contact-phone__popover">
            <label className="contact-phone__search-label" htmlFor="contact-country-search">
              Search countries
            </label>
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
                    +{option.callingCode}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

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
      </div>
      {error && (
        <p id="contact-phone-error" className="contact-form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
