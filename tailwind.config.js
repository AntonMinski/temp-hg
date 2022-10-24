module.exports = {
  important: true,
  content: [
    "./assets/**/*.{vue,js,css}",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
