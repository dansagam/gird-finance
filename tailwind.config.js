/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const PRIMARY = {
  main: "var(--primary-main)",
  light: "var(--primary-light)",
};
const palette = {
  primary: {
    ...PRIMARY,
  },
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1440px",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      ...colors,
      ...palette,
    },
  },
  plugins: [],
};
