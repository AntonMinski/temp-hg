<template>
  <div class="flex min-h-screen flex-col bg-white pt-[4.5rem] text-gray-700 dark:bg-gray-800 dark:text-white">
    <Header />

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useHomeStore } from '~/store/home';
const { getHomePage } = useHomeStore();
await useAsyncData(getHomePage);

// const { vueApp } = useNuxtApp();
// onMounted(async () => {
//   await vueApp.$api.auth.login('anton_minski5@ukr.net', '602653Qw');
// });
</script>
