<script lang="ts" setup>
import { computed, ComputedRef, PropType, ref, Ref, resolveComponent } from 'vue';
import type { ClipCategory, clipContainer, Clip, clipSearchResult } from '~/components/Clip/types';
import { usePageStore } from '~/store/page';
const pageStore = usePageStore();
import { useGlobalStore } from '~/store/global';
const globalStore = useGlobalStore();
const globalData = computed(() => globalStore.globalData);
// const clips: ComputedRef<Clip[]> = computed(() => globalStore.favorite_clips);
import { useNuxtApp } from '#app';
const { vueApp } = useNuxtApp();

const categories: ComputedRef<ClipCategory[]> = computed(() => pageStore?.homePageData?.clip_categories || []);
const selectedCategory: Ref<ClipCategory> = ref(null);
const clips: Ref<Clip[]> = ref([]);
const loading: Ref<boolean> = ref(false);

await selectCategory(categories.value[0]);

async function selectCategory(category: ClipCategory) {
  selectedCategory.value = { ...category };
  await setClipsByCategory(category.handle);
}

async function setClipsByCategory(categoryHandle: string) {
  loading.value = true;
  try {
    const response: clipSearchResult = await vueApp.$api.clip.exploreClips({ 'parent_category[]': categoryHandle });
    clips.value = response._data.data.map((clip: clipContainer) => clip.clip);
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
}

const nuxtLink = resolveComponent('NuxtLink');
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
              :key="category?.handle"
              :is-active="selectedCategory?.handle == category?.handle"
              @click="selectCategory(category)">
              {{ category?.name }}
            </UICategoryPill>
          </div>
        </div>
        <div class="mt-12 flex-1 overflow-hidden xl:mt-0 xl:ml-[50px]">
          <div v-if="loading" class="my-16 flex justify-center">
            <UISpinner size="12" />
          </div>
          <UICarousel v-else :items-per-row="2" :items="clips" :breakpoints="{ xs: 1, lg: 2 }">
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
           <NuxtLink to='/explore-clips'>Explore more clips</NuxtLink>
            <template #suffix>
              <UIIcon icon="icon-arrow-right text-xl" />
            </template>
          </UIButton>
        </div>
      </div>
    </UIContainer>
  </div>
</template>
