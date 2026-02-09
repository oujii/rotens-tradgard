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
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
      colors: {
        // Rotens Palette matches globals.css
        brand: {
          DEFAULT: '#3A5A40',
          light: '#588157',
          dark: '#344E41',
        },
        accent: {
          DEFAULT: '#A3B18A',
          pop: '#DAD7CD',
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
