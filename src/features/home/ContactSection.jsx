import { LinkedInIcon, MailIcon } from '../../shared/ui/icons'
import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section id="contact-me" className="home-section contact-section mx-auto max-w-wide py-5">
      <div className="contact-section__layout">
        <div
          className="contact-section__intro scroll-reveal scroll-reveal--left"
          data-scroll-reveal
        >
          <h2 className="contact-section__title text-h2">
            Have a product challenge? Let&apos;s talk.
          </h2>
          <div className="contact-section__copy text-small">
            <p>
              I&apos;m a UX Designer with a background in real-time analytics and workforce
              operations. I design with structure and care about measurable outcomes.
            </p>
            <p>
              Share the problem, constraints, and goals. I&apos;ll come prepared.
            </p>
          </div>

          <div
            className="contact-section__links"
            role="group"
            aria-label="Other ways to get in touch"
          >
            <a className="contact-section__link" href="mailto:ckjobcena@gmail.com">
              <span className="contact-section__link-icon" aria-hidden="true">
                <MailIcon />
              </span>
              <span>ckjobcena@gmail.com</span>
            </a>
            <a
              className="contact-section__link"
              href="https://www.linkedin.com/in/ckjobcena/"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on LinkedIn (opens in a new tab)"
            >
              <span className="contact-section__link-icon" aria-hidden="true">
                <LinkedInIcon />
              </span>
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
