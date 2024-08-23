/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
          Gray:{
            20 : '#D9D9D9'
          },
          green:{
            30: '#56F0D4'
          },
          orange:{
            10:'#FFDFBD',
            20:'#D7CCC8'
          },
          

      },
      fontFamily:{
        'kotta': ['Kotta One', 'serif'],
        'madimi': ['Madimi One', 'sans-serif'], 
        'font2':['Rajdhani','sans-serif']
      }
    },
  },
  plugins: [],
}
