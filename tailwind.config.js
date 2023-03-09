/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GeneralSans-Variable', 'sans-serif'],
      },
      keyframes: {
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(50px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-50px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(50px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-50px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.9)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'scale(1)' },
          to: { opacity: 0, transform: 'scale(0.9)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        scaleIn: 'scaleIn 100ms ease',
        scaleOut: 'scaleOut 100ms ease',
        fadeIn: 'fadeIn 100ms ease',
        fadeOut: 'fadeOut 100ms ease',
        enterFromLeft: 'enterFromLeft 200ms ease',
        enterFromRight: 'enterFromRight 200ms ease',
        exitToLeft: 'exitToLeft 200ms ease',
        exitToRight: 'exitToRight 200ms ease',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
