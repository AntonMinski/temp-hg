export default defineNuxtConfig({
  css: [
    "~/assets/fonts/XL-9XL/stylesheet.css",
    "~/assets/fonts/XS-LG/stylesheet.css",
    "~/assets/css/icomoon.css",
    "~/assets/css/tailwind.css",
  ],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
  modules: [],
  plugins: ["@/plugins/flowbite.client.ts"],
});
