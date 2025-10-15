/** @type {import('tailwindcss').Config} */
module.exports = {
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
        'background-color': '#0B0B17',
        'background-Gradient': '#0E0E22, #14142F',
        'section-overlays': 'rgba(255,255,255,0.04)',
        //behind phon gradient
        'highlight-gradient': 'linear-gradient(135deg, #0C0C22 0%, #1A1A3F 100%)',
        'tess-gradient': '#ffff004d, rgba(51, 255, 0, 0.3), rgba(255, 128, 0, 0.17)',
        'tess-blue': '#170F49',
        'tess-gray': '#6F6C90',
        'tess-orange': '#f7941D',
        'tess-red': '#EF4444',
      },
      textColor: {
        'Primary-text': '#FFFFFF',
        'Secondary-text': '#B0B0C3',
        'Pink-text': '#FF3CAC',
        'Purple-text': '#784BA0',
        'Red-text': '#FF5E7E',
      },
      button: {
        'tess-primary': '#82de68',
        'tess-primary-strong': '#64C857',
        'tess-primary-foreground': '#FFFFFF',
        'tess-primary-foreground-strong': '#FFFFFF',
        'tess-primary-hover': '#64C857',
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        input: '1rem',
      },
      spacing: {
        'input-height': '4rem',
        'section-padding': '2rem',
        'section-padding-lg': '4rem',
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
};
