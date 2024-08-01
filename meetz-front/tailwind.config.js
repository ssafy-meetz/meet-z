/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 10px rgba(255, 255, 255, 0.7)',
        'shine': '0 2px 10px rgba(255, 79, 93, 0.5), 0 0 10px rgba(255, 79, 93, 0.1), 0 0 12px rgba(255, 79, 93, 0.1)',
      },
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
  plugins: [
    require('tailwindcss-textshadow')
  ],
}