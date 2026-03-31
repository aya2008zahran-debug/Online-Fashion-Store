/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: '#111111',
          light: '#f8f8f8',
          gray: '#E5E7EB',
          accent: '#000000'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Elegant serif for headings
        sans: ['"Inter"', 'sans-serif'], // Clean sans-serif for body text
      },
      boxShadow: {
        'luxury': '0 4px 30px rgba(0, 0, 0, 0.05)', // Subtle shadow
      }
    },
  },
  plugins: [],
}
