/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("color-swatch", [
        "&::-webkit-color-swatch",
        "&::-moz-color-swatch",
      ]);
      addVariant("color-swatch-wrapper", "&::-webkit-color-swatch-wrapper");
    }),
  ],
};
