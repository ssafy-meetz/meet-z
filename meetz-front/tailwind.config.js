/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { width: '0', left: '50%' },
          '100%': { width: '100%', left: '0' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s forwards',
      },
    },
  },
  plugins: [],
}