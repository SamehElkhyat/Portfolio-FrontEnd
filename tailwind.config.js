/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary-dark': '#0a0a0a',
        'secondary-dark': '#1a1a1a',
        'accent-cyan': '#00ffff',
        'accent-blue': '#00d4ff',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeInLeft': 'fadeInLeft 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.7',
          }
        }
      }
    },
  },
  plugins: [],
} 