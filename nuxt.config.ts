import GlobalSettings from "./environmentsettings";
const appEnv = process.env.ENV || "development";
const settings = GlobalSettings[appEnv];

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
  auth: {
    pinia : {
      namespace: 'authModule'
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: false,
          autoFetch: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
            user: false
        }
      }
    }
  },
  modules: [
    '@nuxtjs-alt/auth',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
        ],
      },
    ],
    '@nuxtjs-alt/http',
  ],
  http:{
    baseURL: settings.apiUrl,
    browserBaseURL: settings.apiUrl,
    headers: {
      accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  },
  plugins: [
    "@/plugins/flowbite.client.ts",
    "@/plugins/vueToaster.client.ts",
    "@/plugins/errorHandler.client.ts",
  ],
  runtimeConfig: {
    public: {
      env: appEnv, // development, staging, production
      test: settings.api,
      apiUrl: settings.apiUrl,
    },
  }
});
