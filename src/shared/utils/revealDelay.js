export function revealDelay(step = 0) {
  if (step <= 0) return '0ms'
  return `calc(var(--transition-fast-duration) * ${step})`
}
