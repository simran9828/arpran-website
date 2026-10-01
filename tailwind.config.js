/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arpran: {
          blue: "#0A4E9B",
          darkblue: "#042B59",
          gold: "#C5A059",
          charcoal: "#14161f"
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}

