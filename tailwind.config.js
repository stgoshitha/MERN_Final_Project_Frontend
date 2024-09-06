// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          20: '#D9D9D9',
        },
        green: {
          30: '#56F0D4',
        },
        orange: {
          10: '#FFDFBD',
          20: '#D7CCC8',
        },
      },
      fontFamily: {
        kotta: ['Kotta One', 'serif'],
        madimi: ['Madimi One', 'sans-serif'], 
        font2: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
