/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            pre: {
              backgroundColor: '#1a202c',
              color: '#e2e8f0',
            },
            code: {
              color: '#805ad5',
            },
          },
        },
        dark: {
          css: {
            color: '#e2e8f0',
            a: {
              color: '#90cdf4',
              '&:hover': {
                color: '#63b3ed',
              },
            },
            pre: {
              backgroundColor: '#2d3748',
              color: '#e2e8f0',
            },
            code: {
              color: '#b794f4',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};