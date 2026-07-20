/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',    // Deep slate bg
          card: '#1e293b',    // Lighter slate cards
          primary: '#6366f1', // Vibrant Indigo
          secondary: '#8b5cf6', // Violet accent
          accent: '#10b981',   // Emerald green
          text: '#f8fafc'     // Crisp white text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
