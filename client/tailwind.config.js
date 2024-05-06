/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '100': '25rem', // Establece el ancho en 120 píxeles
      }
    },
  },
  plugins: [],
}

