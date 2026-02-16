import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
      colors: {
        // Rotens brand palette
        brand: {
          DEFAULT: '#476949',
          light: '#B6CBB1',
          dark: '#355038',
        },
        accent: {
          DEFAULT: '#B6CBB1',
          pop: '#E8BEC0',
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
