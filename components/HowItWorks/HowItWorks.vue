<script lang="ts" setup>
import { computed, Ref, ref, onMounted, ComputedRef, onBeforeUnmount } from 'vue';

const nuxtLink = resolveComponent('NuxtLink');
const bgImage = (await import('@/assets/images/how-it-works-bg.png')).default;

import { createHaggadah } from './composables/createHaggadah';

// Video
const modalOpen: Ref<boolean> = ref(false);
function onToggleModal(): void {
  modalOpen.value = !modalOpen.value;
}
const runtimeConfig = useRuntimeConfig();
const videoSrc = runtimeConfig.public.homePageVideoSrc;

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

    <Container class="flex flex-col space-y-24 py-28">
      <div class="flex flex-col items-center">
        <Heading :level="3" class="mb-1 text-white"> How it works </Heading>

        <p class="text-lg">We have made it simple with three easy steps</p>
      </div>

      <div class="flex items-center space-x-16">
        <HowItWorksCard
          :step="1"
          title="Start with pre-defined templates"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac." />

        <HowItWorksCard
          :step="2"
          title="Add or edit Haggadah sections"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac." />

        <HowItWorksCard
          :step="3"
          title="Print or share online"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac." />
      </div>

      <div class="mx-auto inline-flex items-center space-x-10">
        <Button :tag="nuxtLink" to="#" size="xl" color="link" class="py-4" @click="createHaggadah">
          Make your Haggadah
          <template #suffix>
            <span class="icon-arrow-right text-xl leading-none"></span>
          </template>
        </Button>

        <NuxtLink
          to="#"
          class="inline-flex items-center text-lg font-bold text-accent-yellow-500"
          @click="onToggleModal">
          <Icon
            icon="icon-play"
            shape="circle"
            class="mr-3 h-[47px] w-[47px] bg-accent-yellow-500 px-2.5 py-2.5 !text-gray-700 shadow-md" />
          Watch the video
        </NuxtLink>
      </div>
    </Container>
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
