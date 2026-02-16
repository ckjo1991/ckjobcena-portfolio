import { useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'ck-portfolio-theme'

function readStoredTheme() {
  if (typeof window === 'undefined') return null

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
  } catch {
    return null
  }
}

function getInitialTheme() {
  const storedTheme = readStoredTheme()
  if (storedTheme) {
    return storedTheme
  }

  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useThemeMode() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore storage write failures (e.g. blocked storage in private browsing)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
