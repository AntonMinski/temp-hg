import Toaster from '@meforma/vue-toaster/src';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toaster)
    // nuxtApp.provide('toaster', nuxtApp.vueApp.config.globalProperties.$toast)
    nuxtApp.vueApp.provide('toaster', nuxtApp.vueApp.config.globalProperties.$toast)
});
