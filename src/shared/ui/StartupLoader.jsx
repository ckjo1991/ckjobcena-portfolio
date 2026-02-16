import { useEffect, useState } from 'react'

function StartupLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minDuration = reduceMotion ? 280 : 1700
    const maxDuration = 3200
    const startedAt = performance.now()

    let hideTimer
    const fallbackTimer = window.setTimeout(() => setVisible(false), maxDuration)

    const hideLoader = () => {
      const elapsed = performance.now() - startedAt
      const remaining = Math.max(0, minDuration - elapsed)
      hideTimer = window.setTimeout(() => setVisible(false), remaining)
    }

    const onLoad = () => hideLoader()

    if (document.readyState === 'complete') {
      hideLoader()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      if (hideTimer) {
        window.clearTimeout(hideTimer)
      }
      window.clearTimeout(fallbackTimer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <div
      className={`startup-loader ${visible ? 'is-visible' : 'is-hidden'}`}
      aria-hidden={visible ? undefined : true}
      aria-busy={visible}
    >
      <div className="startup-loader-content" role="status" aria-live="polite">
        {visible ? <span className="sr-only">Loading portfolio</span> : null}
        <span className="startup-loader-mark" aria-hidden="true">
          <img
            className="startup-loader-logo startup-loader-logo--base"
            src="/ck.svg"
            alt=""
            width="84"
            height="84"
            loading="eager"
          />
          <span className="startup-loader-fill" aria-hidden="true">
            <span className="startup-loader-fill-logo">
              <img
                className="startup-loader-logo startup-loader-logo--fill"
                src="/ck.svg"
                alt=""
                width="84"
                height="84"
                loading="eager"
              />
            </span>
            <span className="startup-loader-wave" />
          </span>
        </span>
      </div>
    </div>
  )
}

export default StartupLoader
