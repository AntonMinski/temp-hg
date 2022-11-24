<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>


<script lang="ts" setup>
import { useAsyncData } from '#app';

import { useGlobalStore } from '~/store/global';
const { getGlobalData } = useGlobalStore();

await useAsyncData(getGlobalData);

// const { vueApp } = useNuxtApp();
// onMounted(async () => {
//   await vueApp.$api.auth.login('anton_minski5@ukr.net', '602653Qw');
// });
</script>


