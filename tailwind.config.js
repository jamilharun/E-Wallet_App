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
    },
    
  },
  plugins: [],
}