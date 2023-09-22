/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "black",
      // customize "black" theme with Volta color
      {
        "black": {
          ...require("daisyui/src/theming/themes")["[data-theme=black]"],
          ".btn-main": {
            "background-color": "#272626",
            "color": "#11F5FF",
            "border-radius": "6px"
          },
          ".btn-main:hover": {
            "background-color": "#0fdce5", // same but a little darker
          },
        },
      },
    ],
  },
}
