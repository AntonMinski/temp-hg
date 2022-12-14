export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error: NuxtError): void => {
    const runtimeConfig = useRuntimeConfig();
    if (runtimeConfig.public.env === 'development') {
      const time = new Date().toLocaleTimeString();
      console.error(error.statusCode || '', error.statusMessage || error.toString(), time);
    }
    // @ts-ignore
    nuxtApp.vueApp.$toast.error(error.statusMessage || error.toString());
  };
});
