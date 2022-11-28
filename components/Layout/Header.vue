<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import { createHaggadah } from '~/components/HowItWorks/composables/createHaggadah';
import type { HeaderItem } from '~/components/Layout/types';
import { useGlobalStore } from '~/store/global';
const globalStore = useGlobalStore();
const globalData = computed(() => globalStore.globalData);

const logoUrl = computed(() => globalData?.value?.logo || '/_nuxt/assets/svg/logo.svg');
const darkLogoUrl = computed(() => globalData?.value?.dark_logo || '/_nuxt/assets/svg/logo-light.svg');

const headerItems: ComputedRef<HeaderItem[]> = computed(() => {
  if (globalData?.value?.header_menu_items?.length) {
    return globalData?.value?.header_menu_items?.map((item) => {
      item.handle = item.handle === '0' ? '#' : item.handle;
      return item;
    });
  } else {
    return defaultHeaders;
  }
});

// Temporarily
headerItems.value[1].handle = '/clips';

const defaultHeaders = [
  {
    label: 'Explore Haggadahs',
    handle: '#',
  },
  {
    label: 'Explore Clips',
    handle: '#',
  },
  {
    label: 'Events',
    handle: '#',
  },
  {
    label: 'Passover 101',
    handle: '#',
  },
  {
    label: 'Support us',
    handle: '#',
    imageSrc: '~/assets/svg/heart.svg',
  },
];
</script>

<template>
  <header>
    <nav class="fixed top-0 left-0 z-20 w-full bg-white py-2.5 dark:bg-gray-900">
      <UIContainer class="flex flex-wrap items-center justify-between">
        <NuxtLink to="/" class="flex items-center">
          <img :src="logoUrl" class="mr-3 block h-6 dark:hidden sm:h-9" alt="Haggadot Logo" />
          <img :src="darkLogoUrl" class="mr-3 hidden h-6 dark:block sm:h-9" alt="Haggadot Logo" />
        </NuxtLink>
        <div class="flex md:order-2">
          <UIButton size="sm" color="link" class="mr-1">
            <template #prefix>
              <span class="icon-password text-base font-normal leading-none"></span>
            </template>
            Login
          </UIButton>
          <UIButton size="sm" color="secondary" class="mr-1" @click="createHaggadah">
            Create Haggadah
            <template #suffix>
              <span class="icon-book-f text-base leading-none"></span>
            </template>
          </UIButton>
          <UIButton size="sm" color="link">
            <span class="icon-search text-lg leading-none"></span>
          </UIButton>
          <UIButton
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </UIButton>
        </div>
        <div id="navbar-sticky" class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:font-medium md:dark:bg-gray-900">
            <UINavLink v-for="(item, key) in headerItems" :key="key" :to="item.handle">
              <span>{{ item.label }}</span>
              <img v-if="item.imageSrc" :src="item.imageSrc" class="h-4 w-4" />
            </UINavLink>
          </ul>
        </div>
      </UIContainer>
    </nav>
  </header>
</template>
