function App() {
  return (
    <main className="bg-bg-900">
      <section className="mx-auto grid max-w-wide grid-cols-1 gap-4 px-3 pb-7 pt-8 lg:grid-cols-12 lg:gap-[var(--grid-gutter)] lg:px-[var(--container-padding-x)]">
        <div className="space-y-stack-md lg:col-span-7">
          <p className="inline-flex rounded-sm border border-border-subtle bg-accent-soft px-2 py-1 text-small text-accent-400 transition-colors duration-base ease-standard">
            Portfolio MVP Foundation
          </p>
          <h1 className="text-[48px] leading-[var(--leading-heading)] text-text-primary md:text-h1">
            Building clear, high-impact digital work with{" "}
            <span className="text-accent-500">intentional systems</span>.
          </h1>
          <p className="max-w-[65ch] text-body-lg text-text-secondary">
            React + Vite and Tailwind are wired with your token system. You can now build hero,
            about, case studies, and contact sections with consistent color, typography, spacing,
            and motion.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              className="rounded-md bg-accent-500 px-3 py-2 font-medium text-bg-900 transition-colors duration-base ease-standard hover:bg-accent-600"
              href="#case-studies"
            >
              View Case Studies
            </a>
            <a
              className="rounded-md border border-border-subtle bg-bg-800 px-3 py-2 font-medium text-text-primary transition-colors duration-base ease-standard hover:border-accent-400"
              href="#contact"
            >
              Contact
            </a>
          </div>
        </div>

        <aside className="rounded-lg border border-border-subtle bg-surface-700 p-4 shadow-soft transition-transform duration-slow ease-standard lg:col-span-5">
          <h2 className="mb-stack-sm text-h3 text-text-primary">System Rules</h2>
          <ul className="space-y-stack-xs text-text-secondary">
            <li>8pt spacing tokens only</li>
            <li>12-column structure for desktop layout</li>
            <li>Yellow accent stays restrained and intentional</li>
            <li>Motion applies to groups, not noisy micro-animations</li>
          </ul>
        </aside>
      </section>

      <section id="about" className="border-y border-border-subtle bg-bg-800 py-6">
        <div className="mx-auto max-w-container px-3 lg:px-[var(--container-padding-x)]">
          <h2 className="mb-stack-sm text-h2 text-text-primary">About</h2>
          <p className="max-w-narrow text-body-lg text-text-secondary">
            This starter includes the core design language for your MVP portfolio. Build each
            section using tokenized spacing, typography, and transitions for visual consistency.
          </p>
        </div>
      </section>

      <section id="case-studies" className="mx-auto max-w-container px-3 py-6 lg:px-[var(--container-padding-x)]">
        <h2 className="mb-stack-md text-h2 text-text-primary">Case Studies</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="rounded-md border border-border-subtle bg-surface-700 p-3 transition-colors duration-base ease-standard hover:border-accent-400"
            >
              <h3 className="mb-stack-xs text-h3 text-text-primary">Project {item}</h3>
              <p className="text-text-secondary">
                Replace with your problem, approach, constraints, and impact summary.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-border-subtle bg-bg-800 py-6">
        <div className="mx-auto max-w-narrow px-3 lg:px-[var(--container-padding-x)]">
          <h2 className="mb-stack-sm text-h2 text-text-primary">Contact</h2>
          <p className="mb-stack-md text-body-lg text-text-secondary">
            Ready for project inquiries and collaboration.
          </p>
          <a
            className="inline-flex rounded-md bg-accent-500 px-3 py-2 font-medium text-bg-900 transition-colors duration-base ease-standard hover:bg-accent-600"
            href="mailto:hello@example.com"
          >
            hello@example.com
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
