/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ave-primary": "#215fff",
      },
      backgroundColor: {
        "bg-ave-primary": "#215fff",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
  },
  plugins: [],
};
