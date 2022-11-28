<script lang="ts" setup>
import { Ref, computed, onBeforeMount, ref } from 'vue';
import type { clipSearchResult, Clip, ClipCategory } from '~/components/Global/Clip/types';
import { useNuxtApp, useRoute } from '#app';
import { clipSearchParams, HaggadahSection } from '~/components/Global/Clip/types';

type Mode = 'base' | 'group' | 'keyword';
type MediaType = {
  name: string;
  handle: string;
};
const route = useRoute();
const { vueApp } = useNuxtApp();

const loading: Ref<boolean> = ref(true);
const clips: Ref<Clip[]> = ref([]);
const categories: Ref<ClipCategory[]> = ref([]);
const haggadahSections: Ref<HaggadahSection[]> = ref([]);
const mediaTypes: Ref<MediaType[]> = ref([
  { name: 'Text', handle: 'text' },
  { name: 'Video', handle: 'video' },
  { name: 'Audio', handle: 'audio' },
]);
const selectedMediaTypes: Ref<String[]> = ref([]);
const selectedCategories: Ref<string[]> = ref([]);
const selectedHaggadahSections: Ref<string[]> = ref([]);

async function getClipsByCategory(categoryHandle: string) {
  await getClips({ 'parent_category[]': categoryHandle }, 'group');
}

async function getClipsByFilters() {
  let searchOptions: string = '';
  function addToQuery(key: string, value: string) {
    if (searchOptions) {
      searchOptions += '&';
    } else {
      searchOptions += '?';
    }
    searchOptions += `${key}=${value}`;
  }

  haggadahSections.value
    .filter((item) => selectedHaggadahSections.value.includes(item.handle))
    .map((item) => item.handle)
    .map((handle) => addToQuery('haggadah_section[]', handle));

  categories.value
    .filter((item) => selectedCategories.value.includes(item.handle))
    .map((item) => item.handle)
    .map((handle) => addToQuery('parent_category[]', handle));

  mediaTypes.value
    .filter((item) => selectedMediaTypes.value.includes(item.handle))
    .map((item) => item.handle)
    .map((handle) => addToQuery('media_type[]', handle));

  await getClips(searchOptions, 'group');
}

function resetFilters() {
  selectedHaggadahSections.value = [];
  selectedCategories.value = [];
  selectedMediaTypes.value = [];
}
const hasFilters = computed(() => {
  return selectedHaggadahSections.value.length || selectedCategories.value.length || selectedMediaTypes.value.length;
});

async function getClips(searchOptions: clipSearchParams | string, modeValue: Mode) {
  loading.value = true;

  const response: clipSearchResult = await vueApp.$api.clip.exploreClips(searchOptions);
  clips.value = response._data.data.clips.map((item) => item.clip);
  haggadahSections.value = response._data.data.filter_clips.haggadah_sections;

  mode.value = modeValue;
  loading.value = false;
}
async function getPopularCategories() {
  const response = await vueApp.$api.clip.getPopularClipCategories();
  categories.value = [...response._data.clip_categories];
}
async function getPageData() {
  loading.value = true;
  setMode();
  const searchOptions = {
    key: route.query.key as string,
    'media_type[]': (route.query.media_type as string) || '',
    'parent_category[]': (route.query.parent_category as string) || '',
    'children_category[]': (route.query.children_category as string) || '',
    'haggadah_section[]': (route.query.haggadah_section as string) || '',
    sort: route.query.sort as 'r' | 'p',
  };
  await Promise.all([getClips(searchOptions, 'base'), getPopularCategories()]);
  loading.value = false;
}
// await useAsyncData(getPageData);
onBeforeMount(getPageData);

const mode = ref<Mode>('base');
function setMode() {
  if (route.query.key) {
    mode.value = 'keyword';
  } else if (route.query.parent_category || route.query.children_category || route.query.haggadah_section) {
    mode.value = 'group';
  } else {
    mode.value = 'base';
  }
}

const sections = ['Introduction', 'Kadesh'];
</script>

<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <GlobalClipIcon />
        <UIHeading :level="2" class="mt-5">Explore Haggadah Clips</UIHeading>
        <UISearch
          rules="required"
          redirect-address="/clip-search"
          query-key="haggadah"
          placeholder="Search community clips by type, category or keyword"
          size="large"
          class="mt-[25px]" />

        <div class="mt-[50px]">
          <span class="text-sm leading-none text-gray-500"> Popular categories </span>

          <div class="mt-[22px] flex flex-wrap space-x-1.5">
            <UIBadge
              v-for="category in categories"
              :key="category.handle"
              size="md"
              type="tertiary"
              @click="getClipsByCategory(category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>

        <UICard
          class="mt-16 mb-[-50px]"
          variant="horizontal-full"
          content-classes="flex flex-col items-center w-full !p-6 !overflow-visible">
          <div id="filter-heading" class="flex items-center">
            <UIIcon icon="icon-filter" class="text-lg" />
            <span class="ml-1.5">Filter clips</span>
          </div>
          <div id="filter-dropdown-group" class="mt-6 flex w-full flex-col items-center justify-around lg:flex-row">
            <UIFilterDropdown
              v-model="selectedHaggadahSections"
              class="flex-grow px-2"
              text="Haggadah Section"
              :items="haggadahSections" />
            <UIFilterDropdown
              v-model="selectedCategories"
              class="flex-grow px-2"
              text="Clip Categories"
              :items="categories" />
            <UIFilterDropdown
              v-model="selectedMediaTypes"
              class="flex-grow px-2"
              text="Media Type"
              :items="mediaTypes" />
            <UIButton
              gradient="gradient1"
              class="mx-2 mt-2 flex min-w-[128px] items-center lg:mt-0"
              size="md"
              @click="getClipsByFilters"
              >Apply filter</UIButton
            >
            <UIButton
              v-if="hasFilters"
              class="mx-2 mt-2 flex min-w-[128px] items-center lg:mt-0"
              size="md"
              @click="resetFilters"
              >Clear</UIButton
            >
          </div>
        </UICard>
      </UIContainer>
    </div>

    <div class="bg-secondary-500 pt-[140px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <UIHeading :level="4" class="!text-white">Our Favourites Clips</UIHeading>

        <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GlobalClipCard
            v-for="(clip, key) in clips.slice(0, 6)"
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
        <div v-for="section in sections" :key="section" class="py-[70px]">
          <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div>
              <UIHeading :level="5">
                Clips in <span class="text-secondary-500">{{ section }}</span>
              </UIHeading>
              <span class="mt-1 block"> 98 Clips • Curated by Haggadot </span>
            </div>
            <NuxtLink to="#" class="ml-4 flex-shrink-0">Show all</NuxtLink>
          </div>

          <div class="mt-[50px]">
            <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlobalClipCard
                v-for="(clip, key) in clips.slice(0, 3)"
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
