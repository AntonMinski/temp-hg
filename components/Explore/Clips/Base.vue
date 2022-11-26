<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <GlobalClipIcon />
        <UIHeading :level="2" class="mt-5">Explore Haggadah Clips</UIHeading>
        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search community clips by type, category or keyword"
          size="large"
          class="mt-[25px]"
          :redirect="false"
          @search="emit('search')" />

        <div class="mt-[50px]">
          <span class="text-sm leading-none text-gray-500"> Popular categories </span>

          <div class="mt-[22px] flex flex-wrap space-x-1.5">
            <UIBadge
              v-for="category in popularCategories"
              :key="category.handle"
              size="md"
              type="tertiary-reverse"
              @click="emit('getClipsByCategory', category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>

        <slot name="filterGroup" />
      </UIContainer>
    </div>

    <div class="bg-secondary-500 pt-[140px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <UIHeading :level="4" class="!text-white">Our Favourites Clips</UIHeading>

        <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GlobalClipCard
            v-for="(clip, key) in favoriteClips"
            :key="key"
            :handle="clip.handle"
            :type="clip.cliptype"
            :section-title="clip.clip_section"
            :title="clip.title"
            :src="clip.image"
            :text="clip.body"
            :contributor-name="clip.author"
            :contributor-initials="clip.author_initials"
            :contributor-avatar="null"
            :downloads-count="clip.downloads"
            :likes-count="clip.likes"
            :language-tags="['English', 'Hebrew']"
            :topic-tags="['Chad Gadya', 'Dayenu']"
            :is-added-to-bookmarks="clip.is_bookmarked !== '0'" />
        </div>

        <UIButton class="mx-auto mt-[90px] !flex" color="link" size="lg">
          View more favourite clips
          <template #suffix>
            <UIIcon icon="icon-arrow-right text-xl" />
          </template>
        </UIButton>
      </UIContainer>
    </div>

    <div class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <div class="pb-[51px]">
      <UIContainer>
        <div v-for="(sectionValue, sectionName) in clipsBySections" class="py-[70px]">
          <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div>
              <UIHeading :level="5">
                Clips in <span class="text-secondary-500">{{ sectionName }}</span>
              </UIHeading>
              <span class="mt-1 block"> {{ sectionValue.total }} Clips • Curated by </span>
            </div>
            <NuxtLink to="#" class="ml-4 flex-shrink-0">Show all</NuxtLink>
          </div>

          <div class="mt-[50px]">
            <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlobalClipCard
                v-for="({ clip }, key) in sectionValue.clips"
                :key="key"
                :handle="clip.handle"
                :type="clip.cliptype"
                :section-title="clip.clip_section"
                :title="clip.title"
                :src="clip.image"
                :text="clip.body"
                :contributor-name="clip.author"
                :contributor-initials="clip.author_initials"
                :contributor-avatar="null"
                :downloads-count="clip.downloads"
                :likes-count="clip.likes"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']"
                :is-added-to-bookmarks="clip.is_bookmarked !== '0'" />
            </div>
          </div>
        </div>
      </UIContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from 'vue';
import { Clip, ClipCategory, ClipsSectionsPreview } from '~/components/Global/Clip/types';
import { useAsyncData, useNuxtApp } from '#app';
const { vueApp } = useNuxtApp();

import { usePageStore } from '~/store/page';
const pageStore = usePageStore();
const favoriteClips: ComputedRef<Clip[]> = computed(
  () => pageStore.homePageData?.favorite_clips?.slice(0, 6).map((clipWrapper) => clipWrapper.clip) || []
);

const props = defineProps({
  popularCategories: {
    type: Array as PropType<ClipCategory[]>,
    required: true,
  },
});
const emit = defineEmits(['search', 'getClipsByCategory']);

// const clipsBySections: Ref<ClipsSectionsPreview> = ref({});

async function fetchClipsSectionsPreview() {
  const response = await vueApp.$api.clip.getClipsSectionsPreview();
  const clipsBySections = {...response._data.data.sections}
  return clipsBySections as ClipsSectionsPreview;
}

const { data: clipsBySections } = await useAsyncData(fetchClipsSectionsPreview);
</script>
