/** @type {import('tailwindcss').Config} */

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [

    "blur-[55px]",
    "blur-[65px]",
    "blur-[75px]",

    "bg-white/20",
    "bg-orange-100/20",
    "bg-gray-100/15",

  ],

  theme: {
    extend: {},
  },

  plugins: [],
}