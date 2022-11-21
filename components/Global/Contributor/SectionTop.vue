<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import type { Contributor } from './types';
import { useHomeStore } from '~/store/home';
const homeStore = useHomeStore();

const contributorsData: ComputedRef<Contributor[]> = computed(() => homeStore?.homePageData?.top_contributors);

async function showAll() {
  await navigateTo('/contributors');
}
</script>

<template>
  <div id="top_contributors" class="bg-tertiary-500 dark:bg-tertiary-800">
    <UIContainer class="!max-w-[1080px] py-20">
      <div class="flex items-center justify-between">
        <UIHeading :level="5" class="text-[30px] !text-white"> Follow our top contributors </UIHeading>

        <NuxtLink to="#" class="text-sm font-semibold text-white"> Show All </NuxtLink>
      </div>

      <div class="mt-[53px]">
        <Carousel
          :items-to-show="1"
          snap-align="center"
          :breakpoints="{
            480: { itemsToShow: 2, snapAlign: 'start' },
            768: { itemsToShow: 3, snapAlign: 'start' },
            1152: { itemsToShow: 4, snapAlign: 'start' },
          }">
          <Slide v-for="(contributor, key) in contributorsData" :key="key" class="xl:!px-[7.5px]">
            <GlobalContributorCard
              :name="contributor.data.name"
              :handle="contributor.data.handle"
              :user-image="contributor.data.user_image"
              :total-followers="contributor.data.total_followers"
              :total-books="contributor.data.total_books"
              :total-clips="contributor.data.total_clips"
              :following="false" />
          </Slide>

          <template #addons>
            <Pagination class="!mt-[53px]" />
          </template>
        </Carousel>
      </div>
    </UIContainer>
  </div>
</template>

<style>
#top_contributors .carousel__pagination-button:hover::after {
  @apply !bg-primary-500;
}

#top_contributors .carousel__pagination-button--active::after {
  @apply !bg-primary-500;
}
</style>
