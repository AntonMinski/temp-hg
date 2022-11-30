<script lang="ts" setup>
import { computed, ComputedRef, ref, Ref } from 'vue';
import type { ClipCategory, clipContainer, Clip, clipSearchResult } from '~/components/Clip/types';
import { usePageStore } from '~/store/page';
const pageStore = usePageStore();
import { useGlobalStore } from '~/store/global';
const globalStore = useGlobalStore();
const globalData = computed(() => globalStore.globalData);
import { useNuxtApp } from '#app';
const { vueApp } = useNuxtApp();

const clips: Ref<Clip[]> = ref([]);

const categories: ComputedRef<ClipCategory[]> = computed(() => {
  const categories = pageStore?.homePageData?.clip_categories;
  if (categories.length) {
    setCategory(categories[0]);

    /* DELETE when the API search by category is fixed */
    clips.value = pageStore?.homePageData?.favorite_clips.map((clip: clipContainer) => clip.clip);
  }
  return categories;
});
const selectedCategory: Ref<ClipCategory> = ref(null);

async function setClips(categoryHandle: string) {
  /* UNCOMMENT when the API search by category is fixed */
  // const response: clipSearchResult = await vueApp.$api.clip.exploreClips({ 'category[]': categoryHandle });
  // clips.value = response._data.data.searched_clips.map((clip: clipContainer) => clip.clip);
}

async function setCategory(category: ClipCategory) {
  selectedCategory.value = category;
  await setClips(category.handle);
}
</script>

<template>
  <div id="favourite-clips" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="mb-[65px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <GlobalClipIcon />

          <UIHeading :level="3" class="text-4xl"> {{ globalData?.headings?.clips_description }} </UIHeading>
        </div>

        <UISearch
          rules="required|min:2"
          redirect-address="/explore-clips"
          query-key="key"
          placeholder="Search clips by keyword or topic" />
      </div>

      <div class="w-full items-start xl:flex">
        <div class="flex w-full flex-shrink-0 flex-row overflow-x-auto xl:w-[211px] xl:flex-col">
          <div class="flex flex-row flex-nowrap space-x-4 xl:flex-col xl:space-x-0 xl:space-y-[15px]">
            <UICategoryPill
              v-for="category in categories"
              :key="category"
              :is-active="selectedCategory?.handle == category?.handle"
              @click="setCategory(category)">
              {{ category?.name }}
            </UICategoryPill>
          </div>
        </div>
        <div class="mt-12 flex-1 overflow-hidden xl:mt-0 xl:ml-[50px]">
          <UICarousel :items-per-row="2" :items="clips" :breakpoints="{ xsm: 1, lg: 2 }">
            <template v-slot:slide="slide">
              <GlobalClipCard
                :handle="slide.item.handle"
                :type="slide.item.cliptype"
                :section-title="slide.item.clip_section"
                :title="slide.item.title"
                :src="slide.item.image"
                :text="slide.item.covertext"
                :contributor-name="slide.item.author"
                :contributor-initials="slide.item.author_initials"
                :contributor-avatar="null"
                :downloads-count="slide.item.downloads"
                :likes-count="slide.item.likes"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']"
                :is-added-to-bookmarks="slide.item.is_bookmarked !== '0'" />
            </template>
          </UICarousel>

          <UIButton class="mx-auto mt-[92px] !flex" color="dark" size="xl">
            Explore more clips
            <template #suffix>
              <UIIcon icon="icon-arrow-right text-xl" />
            </template>
          </UIButton>
        </div>
      </div>
    </UIContainer>
  </div>
</template>
