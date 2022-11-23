<template>
  <div class="w-full p-20">
    <div class="flex flex-col items-center">
      <img src="~/assets/images/clips-search.png" alt="Search Clips" class="mb-4 h-auto w-17.5" />
      <UIHeading :level="2" class="mb-2 text-center"> Explore Haggadah Clips </UIHeading>
      <UISearch
        class="mt-4"
        rules="required|min:2"
        redirect-address="/clip-search"
        query-key="key"
        placeholder="Search community clips by type, category or keyword" />

      <span class="mt-12 mb-5 text-center">Popular categories</span>
      <div class="mb-2.5 flex flex-wrap justify-center">
        <UIBadge
          v-for="category in categories"
          :key="category.handle"
          class="my-2 mr-2"
          size="md"
          type="tertiary-reverse"
          @click="getClipsByCategory(category.handle)">
          {{ category.name }}
        </UIBadge>
      </div>
      <UICard
        class="mt-16"
        variant="horizontal-full"
        content-classes="flex flex-col items-center w-full !p-6 !overflow-visible">
        <div id="filter-heading" class="mb-6 flex items-center">
          <img src="~/assets/images/clips-filter.png" alt="Filter clips" />
          <span class="ml-1.5">Filter clips</span>
        </div>
        <div id="filter-dropdown-group" class="mt-6 flex w-full flex-col items-center justify-around lg:flex-row">
          <UIFilterDropdown
            class="flex-grow px-2"
            text="Haggadah Section"
            :items="haggadahSections"
            v-model="selectedHaggadahSections" />
          <UIFilterDropdown
            class="flex-grow px-2"
            text="Clip Categories"
            :items="categories"
            v-model="selectedCategories" />
          <UIFilterDropdown class="flex-grow px-2" text="Media Type" :items="mediaTypes" v-model="selectedMediaTypes" />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
type Mode = 'base' | 'group' | 'keyword';
type MediaType = {
  name: string;
  handle: string;
};

import { computed, onBeforeMount, ref, Ref } from 'vue';
import type { clipSearchResult, Clip, ClipCategory } from '~/components/Global/Clip/types';
import { useAsyncData, useNuxtApp, useRoute } from '#app';
import { clipSearchParams, HaggadahSection } from '~/components/Global/Clip/types';
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
</script>
