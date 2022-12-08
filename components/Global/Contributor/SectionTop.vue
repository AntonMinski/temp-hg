<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import type { Contributor, ContributorWrapper } from './types';
import { useGlobalStore } from '~/store/global';
import { navigateTo } from '#app';
const globalStore = useGlobalStore();
const globalData = computed(() => globalStore.globalData);

const contributorsData: ComputedRef<ContributorWrapper[]> = computed(() => globalData.value?.top_contributors);

if (!contributorsData.value?.length) {
  console.error('no contributors fetched from the API')
}

async function showAll() {
  await navigateTo('/contributors');
}
</script>

<template>
  <div id="top_contributors" class="bg-tertiary-500 dark:bg-tertiary-800">
    <UIContainer v-if='contributorsData?.length' class="py-20">
      <div class="mx-auto !max-w-[1080px] overflow-hidden">
        <div class="flex items-center justify-between">
          <UIHeading :level="5" class="text-[30px] !text-white">
            {{ globalData?.headings?.contributor_description }}
          </UIHeading>

          <NuxtLink to="#" class="text-sm font-semibold text-white"> Show All </NuxtLink>
        </div>

        <div class="mt-[53px]">
          <UICarousel :items-per-row="1" :items="contributorsData" :breakpoints="{ xs: 1, sm: 2, md: 3, lg: 4 }">
            <template v-slot:slide="slide">
              <div class="mx-2">
                <GlobalContributorCard
                  :name="slide.item.data.name"
                  :handle="slide.item.data.handle"
                  :user-image="slide.item.data.user_image"
                  :total-followers="slide.item.data.total_followers"
                  :total-books="slide.item.data.total_books"
                  :total-clips="slide.item.data.total_clips"
                  :following="false" />
              </div>
            </template>
          </UICarousel>
        </div>
      </div>
    </UIContainer>
  </div>
</template>
