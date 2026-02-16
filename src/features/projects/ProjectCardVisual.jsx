function ProjectCardVisual({ variant }) {
  if (variant === 'insights') {
    return (
      <div className="placeholder-device">
        <div className="placeholder-device__status">
          <span />
          <span />
          <span />
        </div>
        <div className="placeholder-device__tabs">
          <span className="is-active">Overview</span>
          <span>Trends</span>
          <span>Signals</span>
        </div>
        <div className="placeholder-device__filters">
          <span />
          <span />
        </div>
        <div className="placeholder-device__insight">
          <p className="placeholder-device__label">Gait Speed</p>
          <p className="placeholder-device__value">-0.12 m/s</p>
          <div className="placeholder-device__tags">
            <span>N=144</span>
            <span>N=132</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'motion') {
    return (
      <div className="placeholder-motion">
        <div className="placeholder-motion__scanline" />
        <div className="placeholder-motion__skeleton">
          <span className="placeholder-motion__joint placeholder-motion__joint--hip" />
          <span className="placeholder-motion__joint placeholder-motion__joint--knee" />
          <span className="placeholder-motion__joint placeholder-motion__joint--ankle" />
          <span className="placeholder-motion__limb placeholder-motion__limb--thigh" />
          <span className="placeholder-motion__limb placeholder-motion__limb--shin" />
        </div>
      </div>
    )
  }

  return (
    <div className="placeholder-partnership">
      <div className="placeholder-partnership__panel placeholder-partnership__panel--watch">
        <div className="placeholder-partnership__watch">
          <span />
        </div>
      </div>
      <div className="placeholder-partnership__panel placeholder-partnership__panel--holo" />
    </div>
  )
}

export default ProjectCardVisual
