import Api from '~/api/ApiBase';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Api);
});
