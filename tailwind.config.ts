/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    fontMetrics: {
      sans: {
        capHeight: 1490,
        ascent: 1984,
        descent: -494,
        lineGap: 0,
        unitsPerEm: 2048,
      },
    },

    fontSize: {
      base: '11px',
      xl: '20px',
    },
    lineHeight: {
      none: '14px',
    },
    extend: {
      colors: {
        hover: '#ADADAE',
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      spacing: {
        '1': '16px',
        '2': '32px',
        '75': '75px',
        '100': '100px',
      },
    },
  },
  plugins: [require('tailwindcss-capsize')],
};
/** @type {import('tailwindcss').Config} */
