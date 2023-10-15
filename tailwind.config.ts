/** @type {import('tailwindcss').Config} */

const defaults = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

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
        '3xl': '1600px',
        '4xl': '1800px',
        '5xl': '2000px',
      },
    },
    extend: {
      fontSize: {
        md: '1.075rem',
      },
      fontFamily: {
        sans: ['var(--font-source)'],
        display: ['var(--font-open)'],
      },
      boxShadow: {
        neumorphicTopLeft:
          '0.1rem 0.1rem 0.1rem rgba(26, 26, 26, 0.9), -0.1rem -0.1rem 0.1rem rgba(255, 255, 255, 0.1)',
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
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-fluid-type')({
      values: {
        md: [0, 1.075],
      },
    }),
    plugin(({ addVariant }: any) => {
      addVariant('group-active-link', ':merge(.group).active-link &');
    }),
  ],
};
