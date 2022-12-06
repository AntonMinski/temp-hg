<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useAsyncData, useNuxtApp, useRuntimeConfig } from '#app';
import { useGlobalStore } from '~/store/global';
import { useHead } from '#head';
const { vueApp } = useNuxtApp();

const { setAppData } = useGlobalStore();
const runtimeConfig = useRuntimeConfig();

useHead({
  htmlAttrs: {
    class: runtimeConfig.public.theme,
  },
});

await useAsyncData(setAppData);

// const { vueApp } = useNuxtApp();
// onMounted(async () => {
//   await vueApp.$api.auth.login('anton_minski5@ukr.net', '602653Qw');
// });
</script>
