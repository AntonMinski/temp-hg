// import eslintPlugin from 'vite-plugin-eslint';
import GlobalSettings from './environmentsettings';
const appEnv = process.env.ENV || 'development';
const settings = GlobalSettings[appEnv];

export default defineNuxtConfig({
  css: [
    '~/assets/fonts/XL-9XL/stylesheet.css',
    '~/assets/fonts/XS-LG/stylesheet.css',
    '~/assets/css/icomoon.css',
    '~/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    // postcss: {
    //   postcssOptions: require('./postcss.config.js'),
    // },
    transpile: ['@vee-validate/rules'],
  },
  auth: {
    pinia: {
      namespace: 'authModule',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: 'slug',
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: false,
        },
      },
      cookie: {
        cookie: {
          server: true
        },
        token: {
          property: 'access_token',
        },
        options: {
          expires: 365,
        },
        user: {
          property: 'slug',
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: false,
        },
      },
    },
  },
  modules: [
    '@nuxt-alt/auth',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
    '@nuxt-alt/http',
  ],
  http: {
    baseURL: settings.apiUrl,
    browserBaseURL: settings.apiUrl,
    headers: {
      accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  },
  plugins: [
    '@/plugins/flowbite.client.ts',
    '@/plugins/vueToaster.client.ts',
    '@/plugins/errorHandler.client.ts',
    '@/plugins/httpApi.ts',
  ],
  runtimeConfig: {
    public: {
      theme: process.env.theme,
      env: appEnv, // development, staging, production
      test: settings.api,
      apiUrl: settings.apiUrl,
      homePageVideoSrc: GlobalSettings.homePageVideoUrl + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0',
    },
  },
  vite: {
    // plugins: [eslintPlugin()],
  },
});
