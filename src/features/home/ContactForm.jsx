import { useRef, useState } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'
import InternationalPhoneField from './InternationalPhoneField'

const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/ckjobcena@gmail.com'
const DEFAULT_PHONE_COUNTRY = 'PH'
const NAME_PATTERN = /^(?=.*\p{L})[\p{L}\p{M} .'\u2019-]+$/u

function isFormSubmitAccepted(payload) {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'success' in payload &&
    (payload.success === true || payload.success === 'true')
  )
}

export default function ContactForm() {
  const [phoneValue, setPhoneValue] = useState('')
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)
  const formRef = useRef(null)
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const messageInputRef = useRef(null)

  const validate = () => {
    const form = formRef.current
    if (!form) return null

    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const phone = phoneValue.trim()
    const nextErrors = {}

    if (nameInputRef.current) nameInputRef.current.value = name
    if (emailInputRef.current) emailInputRef.current.value = email
    if (messageInputRef.current) messageInputRef.current.value = message

    if (!name) {
      nextErrors.name = 'Enter your name.'
    } else if (!NAME_PATTERN.test(name)) {
      nextErrors.name =
        'Use letters, spaces, apostrophes, hyphens, or periods. Numbers are not allowed.'
    }

    if (!email) {
      nextErrors.email = 'Enter your email address.'
    } else if (emailInputRef.current?.validity.typeMismatch) {
      nextErrors.email = 'Enter a valid email address.'
    }

    const parsedPhone = phone
      ? parsePhoneNumberFromString(phone, phoneCountry)
      : undefined
    if (phone && (!parsedPhone || !parsedPhone.isValid())) {
      nextErrors.phone = 'Enter a valid phone number for the selected country.'
    }

    if (!message) {
      nextErrors.message = 'Enter a message.'
    }

    setErrors(nextErrors)
    setStatus(null)

    if (Object.keys(nextErrors).length) {
      const firstInvalidInput = [
        ['name', nameInputRef],
        ['email', emailInputRef],
        ['phone', phoneInputRef],
        ['message', messageInputRef],
      ].find(([field]) => nextErrors[field])

      window.requestAnimationFrame(() => firstInvalidInput?.[1].current?.focus())
      return null
    }

    return {
      name,
      email,
      message,
      phone: parsedPhone?.number ?? '',
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const values = validate()
    if (!values) return

    setIsSubmitting(true)
    setStatus(null)

    const formBody = new URLSearchParams({
      name: values.name,
      email: values.email,
      message: values.message,
      _subject: 'New portfolio contact form submission',
    })
    if (values.phone) formBody.set('phone', values.phone)

    let response
    try {
      response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formBody,
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'The form could not connect. Please try again or email me directly.',
      })
      setIsSubmitting(false)
      return
    }

    let result
    try {
      result = await response.json()
    } catch {
      setStatus({
        type: 'error',
        message: 'The email service returned an unexpected response. Please try again or email me directly.',
      })
      setIsSubmitting(false)
      return
    }

    if (!response.ok || !isFormSubmitAccepted(result)) {
      setStatus({
        type: 'error',
        message: 'Your message was not accepted. Please try again or email me directly.',
      })
      setIsSubmitting(false)
      return
    }

    formRef.current?.reset()
    setPhoneValue('')
    setPhoneCountry(DEFAULT_PHONE_COUNTRY)
    setErrors({})
    setStatus({
      type: 'success',
      message: 'Thanks — your message was submitted. If you do not hear back, email me directly.',
    })
    setIsSubmitting(false)
  }

  return (
    <form
      ref={formRef}
      className="contact-form scroll-reveal scroll-reveal--up"
      data-scroll-reveal
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      <div className="contact-form__row">
        <div className={`contact-form__field${errors.name ? ' is-invalid' : ''}`}>
          <label className="contact-form__label" htmlFor="contact-name">
            Name <span className="contact-form__required">*</span>
          </label>
          <input
            ref={nameInputRef}
            id="contact-name"
            className="contact-form__input"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="contact-name-error" className="contact-form__error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`contact-form__field${errors.email ? ' is-invalid' : ''}`}>
          <label className="contact-form__label" htmlFor="contact-email">
            Email address <span className="contact-form__required">*</span>
          </label>
          <input
            ref={emailInputRef}
            id="contact-email"
            className="contact-form__input"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="contact-email-error" className="contact-form__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-phone">
          Phone <span className="contact-form__optional">(optional)</span>
        </label>
        <InternationalPhoneField
          country={phoneCountry}
          error={errors.phone}
          inputRef={phoneInputRef}
          onChange={setPhoneValue}
          onCountryChange={setPhoneCountry}
          value={phoneValue}
        />
      </div>

      <div className={`contact-form__field${errors.message ? ' is-invalid' : ''}`}>
        <label className="contact-form__label" htmlFor="contact-message">
          Message <span className="contact-form__required">*</span>
        </label>
        <textarea
          ref={messageInputRef}
          id="contact-message"
          className="contact-form__input contact-form__textarea"
          name="message"
          rows="4"
          required
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="A little about the project..."
        />
        {errors.message && (
          <p id="contact-message-error" className="contact-form__error" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <p className="contact-form__required-legend">
        <span className="contact-form__required">*</span> Required
      </p>

      <button className="contact-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
        {!isSubmitting && (
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8h9m-4-4 4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <p className="contact-form__privacy">
        FormSubmit.co processes submissions and retains them for 30 days. An anti-spam check may
        appear.
      </p>

      {status && (
        <p
          className={`contact-form__status contact-form__status--${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live={status.type === 'error' ? 'assertive' : 'polite'}
        >
          {status.message}{' '}
          {status.type === 'error' && (
            <a href="mailto:ckjobcena@gmail.com">Email me instead.</a>
          )}
        </p>
      )}
    </form>
  )
}
