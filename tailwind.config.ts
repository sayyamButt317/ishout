import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'background': '#0B0B17',
        'backgroundGradient': '#0E0E22, #14142F',
        'section-overlays': 'rgba(255,255,255,0.04)',
        //behind phon gradient
        'highlight-gradient': 'linear-gradient(135deg, #0C0C22 0%, #1A1A3F 100%)',
        // Custom button colors
        'primaryButton': '#FF5E7E',
        'primaryHover': '#FF6F7F',
        'secondaryButton': '#170F49',
        'secondaryHover': '#18124B',

        // Custom text colors
        'Primary-text': '#FFFFFF',
        'Secondary-text': '#B0B0C3',
        'Pink-text': '#FF3CAC',
        'Purple-text': '#784BA0',
        'Red-text': '#FF5E7E',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'Roboto', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}

export default config
