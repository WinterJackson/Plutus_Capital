/** @type {import('tailwindcss').Config} */
 const tail={
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'primary':'#800020',
        'secondary': '#ffffff',
        'chocolate': '#333333',
        'darkText':'#815C39E6',
        'lightText':'rgba(255,183,114,0.8)',
        "slightWhiteBg":'rgba(255, 255, 255, 0.7)',
        "lightBrownBg":"#FEEFE8",
        'darkBrownBg':'#4a3521',
        "hoverBg":'#764d2f'
      },
      fontFamily: {
        opensans: ['Open Sans', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        montserrat:['Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [],
}

export default tail