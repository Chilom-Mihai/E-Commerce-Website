/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        searchButton: '#0079FF',
        textColorWhite: '#2B3442',
        textColorBlack: '#FFF',
        lightGray: '#4B6A9B',
      },
      fontFamily: {
        'space-mono': ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        h1: '26px',
      },
      lineHeight: {
        h1: '38px',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        h1: {
          fontFamily: theme('fontFamily.space-mono'),
          fontSize: theme('fontSize.h1'),
          lineHeight: theme('lineHeight.h1'),
        },
      });
    },
  ],
};
