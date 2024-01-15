/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'container': '1600px',
      },
      fontFamily: {
        'DM': ['DM Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}