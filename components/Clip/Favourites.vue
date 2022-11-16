<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import type { ClipCategory, clipContainer, Clip, clipSearchResult } from '~/components/Clip/types';
import { useHomeStore } from '~/store/home';
import { computed, ComputedRef, ref, Ref } from 'vue';
const homeStore = useHomeStore();
const { vueApp } = useNuxtApp();

const clips: Ref<Clip[]> = ref([]);

const categories: ComputedRef<ClipCategory[]> = computed(() => {
  const categories = homeStore?.homePageData?.clip_categories;
  if (categories.length) {
    setCategory(categories[0]);

    /* DELETE when the API search by category is fixed */
    clips.value = homeStore?.homePageData?.favorite_clips.map((clip: clipContainer) => clip.clip);
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
          <UIIcon icon="icon-media-image-f" shape="square" class="bg-gradient3 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> Our Favourites Clips </UIHeading>
        </div>

        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search clips by keyword or topic" />
      </div>

      <div class="w-full items-start xl:flex">
        <div class="flex w-full flex-shrink-0 flex-row overflow-x-auto xl:w-[211px] xl:flex-col">
          <div class="flex flex-row flex-nowrap space-x-4 xl:flex-col xl:space-x-0 xl:space-y-[15px]">
            <BlockCategoryPill
              v-for="category in categories"
              :key="category"
              :is-active="selectedCategory?.handle == category?.handle"
              @click="setCategory(category)">
              {{ category?.name }}
            </BlockCategoryPill>
          </div>
        </div>
        <div class="mt-12 flex-1 overflow-hidden xl:mt-0 xl:ml-[50px]">
          <Carousel
            :items-to-show="1"
            snap-align="center"
            :breakpoints="{
              640: { itemsToShow: 2, snapAlign: 'start' },
              1024: { itemsToShow: 2.6, snapAlign: 'start' },
              1280: { itemsToShow: 2.2, snapAlign: 'start' },
            }">
            <Slide v-for="(clip, key) in clips" :key="key">
              <ClipCard
                :handle="clip.handle"
                :type="clip.cliptype"
                :section-title="clip.clip_section"
                :title="clip.title"
                :src="clip.image"
                :text="clip.body"
                :contributor-name="clip.author"
                :contributor-avatar="null"
                :downloads-count="clip.downloads"
                :likes-count="clip.likes"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']"
                :is-added-to-bookmarks="clip.is_bookmarked !== '0'" />
            </Slide>

            <template #addons>
              <Pagination />
            </template>
          </Carousel>

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
