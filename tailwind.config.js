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
          },
        },
        dark: {
          css: {
            color: '#fff',
            a: {
              color: '#90cdf4',
              '&:hover': {
                color: '#63b3ed',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};