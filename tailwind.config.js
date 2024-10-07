/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'EWpurple': '#c897d8',
        'EWred': '#fc6a97',
        'EWblue': '#3878e2',
        'EWdarkPurple': '#764d79',
        'EWdarkBlue': '#333159',
      },
      backgroundImage: {
        'hero': "url('/src/assets/cwhface.png')",
      },
      width: {
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
      },
      height: {
        '400px': '400px',
        '500px': '500px',
        '600px': '600px',
        '700px': '700px',
      },
      maxWeight: {
        '400px': '400px',
      },
    },
    
  },
  plugins: [],
}