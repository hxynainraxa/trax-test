/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#F58A45',
          500: '#E7651C',
          600: '#D65312',
          700: '#B5420F',
          800: '#913612',
          900: '#762F12',
          950: '#401507',
        },
      },

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'red-hat': ['"Red Hat Display"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },

  plugins: [],
};