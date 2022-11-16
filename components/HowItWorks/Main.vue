<script lang="ts" setup>
import { computed, Ref, ref, onMounted, ComputedRef, onBeforeUnmount } from 'vue';
import type { HowItWorksData, Step } from './types';
import { useHomeStore } from '~/store/home';
const homeStore = useHomeStore();

const nuxtLink = resolveComponent('NuxtLink');
const bgImage = (await import('@/assets/images/how-it-works-bg.png')).default;

import { createHaggadah } from './composables/createHaggadah';

// Data
const storeData: ComputedRef<HowItWorksData> = computed(() => homeStore.homePageData?.how_it_works_arr);

// Video
const modalOpen: Ref<boolean> = ref(false);
function onToggleModal(): void {
  modalOpen.value = !modalOpen.value;
}
const runtimeConfig = useRuntimeConfig();
const videoSrc = storeData?.value?.youtube_video_link || runtimeConfig.public.homePageVideoSrc;

// Resize event
const resizeEvent = ref(1);
function resizeListener(): void {
  resizeEvent.value += 1;
}
onMounted(() => {
  window.addEventListener('resize', resizeListener);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeListener);
});
// Height and width
const videoWidth: ComputedRef<number> = computed(() => {
  resizeEvent.value++;
  if (window.innerWidth < 1960) {
    return window.innerWidth - 40;
  }
  return 1920;
});
const videoHeight = computed(() => {
  return videoWidth.value * 0.5625;
});
</script>

<template>
  <div
    class="relative overflow-hidden bg-tertiary-500 bg-right-bottom bg-no-repeat text-white dark:bg-tertiary-900"
    :style="`background-image: url(${bgImage})`">
    <img src="~/assets/svg/Eye.svg" class="absolute bottom-0.5 -right-8 rotate-[-15.69deg]" />

    <UIContainer class="flex flex-col space-y-24 py-28">
      <div class="flex flex-col items-center">
        <UIHeading :level="3" class="mb-1 text-white">{{ storeData?.title }}</UIHeading>

        <p class="text-lg">{{ storeData?.tagline }}</p>
      </div>

      <div class="flex items-center space-x-16">
        <HowItWorksCard
          v-for="(step, key) in storeData?.steps"
          :title="step.title"
          :paragraph="step.description"
          :image="step.image"
          :label="step.label"
          :key="key" />
      </div>

      <div class="mx-auto inline-flex items-center space-x-10">
        <UIButton :tag="nuxtLink" to="#" size="xl" color="link" class="py-4" @click="createHaggadah">
          Make your Haggadah
          <template #suffix>
            <span class="icon-arrow-right text-xl leading-none"></span>
          </template>
        </UIButton>

        <NuxtLink
          to="#"
          class="inline-flex items-center text-lg font-bold text-accent-yellow-500"
          @click="onToggleModal">
          <UIIcon
            icon="icon-play"
            shape="circle"
            class="mr-3 h-[47px] w-[47px] bg-accent-yellow-500 px-2.5 py-2.5 !text-gray-700 shadow-md" />
          Watch the video
        </NuxtLink>
      </div>
    </UIContainer>
  </div>
  <transition name="fade">
    <div v-if="modalOpen" class="fixed top-0 z-20">
      <div class="absolute inset-0 z-0 h-screen w-screen bg-black opacity-70"></div>
      <div @click.self="onToggleModal" class="relative z-0 flex h-screen w-screen">
        <div class="mx-auto my-auto flex flex-col shadow-lg">
          <span
            @click="onToggleModal"
            class="icon-close ml-auto text-4xl text-gray-100 transition-all hover:scale-110 hover:cursor-pointer"></span>
          <iframe
            :width="videoWidth"
            :height="videoHeight"
            :src="videoSrc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>
