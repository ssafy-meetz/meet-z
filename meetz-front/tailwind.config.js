/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'audiowide': ['Audiowide', 'sans-serif'],
      },
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
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        floatIn: {
          '0%': { transform: 'translateY(30px) scale(0.55)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s forwards',
        staggeredFadeIn: 'fadeIn 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideInFromTop: 'slideInFromTop 0.5s ease-out forwards',
        slideInFromBottom: 'slideInFromBottom 0.5s ease-out forwards',
        floatIn: 'floatIn 1s ease-out forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}