/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

const MyClass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)"
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px"
    },
    ".backflip-hidden": {
      backfaceVisibility: "hidden"
    },
    ".slide-enter": {
      opacity: "0",
      transform: "translateX(100%)",
    },
    ".slide-enter-active": {
      opacity: "1",
      transform: "translateX(0%)",
      transition: "opacity 0.5s, transform 0.5s",
    },
    ".slide-exit": {
      opacity: "1",
      transform: "translateX(0)",
    },
    ".slide-exit-active": {
      opacity: "0",
      transform: "translateX(-100%)",
      transition: "opacity 0.5s, transform 0.5s",
    },
    ".slide-left": {
      opacity: "0",
      transform: "translateX(100%)",
      transition: "opacity 0.5s, transform 0.5s",
    },
    ".slide-left-exit": {
      opacity: "1",
      transform: "translateX(0%)",
      transition: "opacity 0.5s, transform 0.5s",
    }
  })
});

export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [MyClass],
};


