<template>
  <div
    class="flex min-h-screen flex-col bg-white text-gray-700 dark:bg-gray-800 dark:text-white"
    :class="isSearchBarOpen ? 'pt-[9.24rem]' : 'pt-[4.5rem]'">
    <LayoutHeader />
    <LayoutSearchBar v-if="isSearchBarOpen" />

    <main class="flex-1">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAsyncData } from '#app';
import { usePageStore } from '~/store/page';
import { useSearchStore } from '~~/store/search';
const { getHomePage } = usePageStore();
const searchStore = useSearchStore();
const isSearchBarOpen = computed(() => searchStore.isSearchBarOpen);

await useAsyncData(getHomePage);
</script>
