<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <GlobalClipIcon />
        <UIHeading :level="2" class="mt-5">Explore Haggadah Clips</UIHeading>
        <UISearch
          rules="required|min:2"
          redirect-address="/explore-clips"
          query-key="key"
          placeholder="Search community clips by type, category or keyword"
          size="large"
          class="mt-[25px]"
          :redirect="false"
          v-model:search-string="searchString"
          @search="emit('search')" />

        <div class="mt-[50px] flex flex-col items-center">
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
            :text="clip.covertext"
            :contributor-name="clip.author"
            :contributor-initials="clip.author_initials"
            :contributor-avatar="null"
            :downloads-count="clip.downloads"
            :likes-count="clip.likes"
            :language-tags="['English', 'Hebrew']"
            :topic-tags="['Chad Gadya', 'Dayenu']"
            :is-added-to-bookmarks="clip.is_bookmarked !== '0'" />
        </div>

        <UIButton @click="emit('viewAll')" class="mx-auto mt-[90px] !flex" color="link" size="lg">
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

    <template v-if="loading">
      <div class="my-16 flex justify-center">
        <UISpinner size="12" />
      </div>
    </template>

    <template v-else>
      <div class="pb-[51px]">
        <UIContainer>
          <div v-for="section in clipsBySections" class="py-[70px]">
            <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
              <div>
                <UIHeading :level="5">
                  Clips in <span class="text-secondary-500">{{ section.name }}</span>
                </UIHeading>
                <span class="mt-1 block"> {{ section.total }} Clips • Curated by </span>
              </div>
              <NuxtLink
                :to="`/explore-clips?haggadah_section[]=${section.handle}`"
                class="ml-4 flex-shrink-0"
                @click="getClipsBySection(section.handle)">
                Show all</NuxtLink
              >
            </div>

            <div class="mt-[50px]">
              <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                <GlobalClipCard
                  v-for="({ clip }, key) in section.clips"
                  :key="key"
                  :handle="clip.handle"
                  :type="clip.cliptype"
                  :section-title="clip.clip_section"
                  :title="clip.title"
                  :src="clip.image"
                  :text="clip.covertext"
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
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from 'vue';
import { Clip, ClipCategory, ClipSection } from '~/components/Global/Clip/types';
import { useAsyncData, useNuxtApp, useRouter } from '#app';
const { vueApp } = useNuxtApp();
const router = useRouter();

import { usePageStore } from '~/store/page';
import { useVModel } from '@vueuse/core';
const pageStore = usePageStore();
const favoriteClips: ComputedRef<Clip[]> = computed(
  () => pageStore.homePageData?.favorite_clips?.slice(0, 6).map((clipWrapper) => clipWrapper.clip) || []
);

const props = defineProps({
  popularCategories: {
    type: Array as PropType<ClipCategory[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  searchString: {
    type: String,
    default: '',
  },
});
const emit = defineEmits([
  'search',
  'getClipsByCategory',
  'viewAll',
  'update:searchString',
  'update:loading',
  'getClipsBySection',
]);
const searchString = useVModel(props, 'searchString', emit);
const loading = useVModel(props, 'loading', emit);

const clipsBySections: Ref<ClipSection[]> = ref([]);

// async function fetchClipsSectionsPreview() {
//   const response = await vueApp.$api.clip.getClipsSectionsPreview();
//   const clipsBySections = { ...response._data.data.sections };
//   return clipsBySections as ClipSection[];
// }
// const { data: clipsBySections } = await useAsyncData(fetchClipsSectionsPreview);

async function fetchClipsSectionsPreview() {
  loading.value = true;
  const response = await vueApp.$api.clip.getClipsSectionsPreview();
  clipsBySections.value = [...response._data.data.sections];
  loading.value = false;
}
onMounted(fetchClipsSectionsPreview);

async function getClipsBySection(sectionHandle: string) {
  await router.push({ query: { 'haggadah_section[]': sectionHandle } });
  emit('getClipsBySection', sectionHandle);
}
</script>
