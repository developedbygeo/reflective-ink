/** @type {import('tailwindcss').Config} */

const defaults = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-source)'],
        display: ['var(--font-open)'],
      },
      boxShadow: {
        neumorphicTopLeft:
          '1rem 1rem 2.5rem rgba(26, 26, 26, 0.6), -1rem -1rem 2.5rem #272727',
      },
      colors: {
        brand: '#584FBB',
        brandDarker: '#413993',
        textMid: '#B8B6C8',
        textLight: '#D6DEE7',
        textLightest: '#F0EDED',
        darkGray: '#212121',
        darkerGray: '#121212',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-fluid-type')],
};
