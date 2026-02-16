/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        bg: {
          900: 'var(--color-bg-900)',
          800: 'var(--color-bg-800)',
        },
        surface: {
          700: 'var(--color-surface-700)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        border: {
          subtle: 'var(--color-border-subtle)',
        },
        accent: {
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          cool: 'var(--color-accent-cool)',
          teal: 'var(--color-accent-teal)',
          soft: 'var(--color-accent-soft-bg)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        h1: ['var(--text-h1)', { lineHeight: 'var(--leading-heading)' }],
        h2: ['var(--text-h2)', { lineHeight: 'var(--leading-heading)' }],
        h3: ['var(--text-h3)', { lineHeight: 'var(--leading-heading)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body)' }],
        'body-m': ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
        body: ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
        small: ['var(--text-small)', { lineHeight: 'var(--leading-body)' }],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        'stack-xs': 'var(--stack-xs)',
        'stack-sm': 'var(--stack-sm)',
        'stack-md': 'var(--stack-md)',
        'stack-lg': 'var(--stack-lg)',
        'stack-xl': 'var(--stack-xl)',
        'stack-2xl': 'var(--stack-2xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
      maxWidth: {
        container: 'var(--container-max-width)',
        wide: 'var(--container-wide)',
        narrow: 'var(--container-narrow)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '400ms',
      },
      transitionTimingFunction: {
        standard: 'ease',
      },
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
