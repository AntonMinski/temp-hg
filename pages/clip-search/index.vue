<template>
  <ExploreClipsBase
    v-if="mode === 'base'"
    :popular-categories="popularCategories"
    @search="getPageData"
    @getClipsByCategory="getClipsByCategory">
    <template #filterGroup>
      <UICard
        class="[-50px] mt-16"
        variant="horizontal-full"
        content-classes="flex flex-col items-center w-full !p-6 !overflow-visible">
        <div id="filter-heading" class="mb-6 flex items-center">
          <img src="~/assets/images/clips-filter.png" alt="Filter clips" />
          <span class="ml-1.5">Filter clips</span>
        </div>
        <div
          id="filter-dropdown-group"
          class="flex-wap mt-6 flex w-full flex-col flex-wrap items-center justify-around lg:flex-row">
          <UIFilterDropdown
            class="flex-grow px-2"
            text="Haggadah Section"
            :items="haggadahSections"
            v-model="selectedHaggadahSections" />
          <UIFilterDropdown
            class="flex-grow px-2"
            text="Clip Categories"
            :items="categories"
            v-model="selectedCategories"
            v-model:child="selectedChildCategories"
            menu-type="group" />
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
    </template>
  </ExploreClipsBase>
</template>

<script lang="ts" setup>
import { DropdownItem, DropdownItemParent } from '~/components/UI/Dropdown/types';

type Mode = 'base' | 'group' | 'keyword';
type MediaType = {
  name: string;
  handle: string;
};

import { computed, onBeforeMount, ref, Ref } from 'vue';
import type { clipSearchResult, Clip, ClipCategory } from '~/components/Global/Clip/types';
import { useAsyncData, useNuxtApp, useRoute } from '#app';
import { ClipCategoryParent, clipSearchParams, HaggadahSection } from '~/components/Global/Clip/types';
const route = useRoute();
const { vueApp } = useNuxtApp();

const loading: Ref<boolean> = ref(true);
const clips: Ref<Clip[]> = ref([]);
const categories: Ref<ClipCategoryParent[]> = ref([]);
const popularCategories: Ref<ClipCategory[]> = ref([]);
const haggadahSections: Ref<HaggadahSection[]> = ref([]);
const mediaTypes: Ref<MediaType[]> = ref([
  { name: 'Text', handle: 'text' },
  { name: 'Video', handle: 'video' },
  { name: 'Audio', handle: 'audio' },
]);
const selectedMediaTypes: Ref<string[]> = ref([]);
const selectedCategories: Ref<string[]> = ref([]);
const selectedChildCategories: Ref<string[]> = ref([]);
const selectedHaggadahSections: Ref<string[]> = ref([]);

async function getClipsByCategory(categoryHandle: string) {
  await getClips({ 'parent_category[]': categoryHandle });
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
  function prepareQueryParent(
    itemsToFilter: DropdownItem[] | DropdownItemParent[],
    selectedItems: string[],
    key: string
  ): void {
    itemsToFilter
      .filter((item) => selectedItems.includes(item.handle))
      .map((item) => item.handle)
      .map((handle) => addToQuery(key, handle));
  }
  function prepareQueryChild(itemsToFilter: DropdownItemParent[], selectedItems: string[], key: string): void {
    itemsToFilter
      .map((item) => item.child)
      .flat()
      .filter((item) => selectedItems.includes(item.handle))
      .map((item) => item.handle)
      .map((handle) => addToQuery(key, handle));
  }

  prepareQueryParent(haggadahSections.value, selectedHaggadahSections.value, 'haggadah_section[]');
  prepareQueryParent(categories.value, selectedCategories.value, 'parent_category[]');
  prepareQueryChild(categories.value, selectedChildCategories.value, 'child_category[]');
  prepareQueryParent(mediaTypes.value, selectedMediaTypes.value, 'media_type[]');

  await getClips(searchOptions);
}

function resetFilters() {
  selectedHaggadahSections.value = [];
  selectedCategories.value = [];
  selectedMediaTypes.value = [];
}
const hasFilters = computed(() => {
  return selectedHaggadahSections.value.length || selectedCategories.value.length || selectedMediaTypes.value.length;
});

async function getCategories() {
  loading.value = true;

  const response = await vueApp.$api.clip.getClipCategories();
  categories.value = response._data.data;

  loading.value = false;
}

async function getClips(searchOptions: clipSearchParams | string): Promise<clipSearchResult> {
  loading.value = true;

  const response: clipSearchResult = await vueApp.$api.clip.exploreClips(searchOptions);
  clips.value = response._data.data.clips?.map((item) => item.clip) || [];

  loading.value = false;
  return response;
}

async function getPageData(): Promise<clipSearchResult> {
  setMode();
  const searchOptions = {
    key: route.query.key as string,
    'media_type[]': (route.query.media_type as string) || '',
    'parent_category[]': (route.query.parent_category as string) || '',
    'children_category[]': (route.query.children_category as string) || '',
    'haggadah_section[]': (route.query.haggadah_section as string) || '',
    sort: route.query.sort as 'r' | 'p',
  };
  const clipsResponse: clipSearchResult = await getClips(searchOptions);
  return clipsResponse;
}

async function getInitialPageData() {
  const [, clipsResponse] = await Promise.all([getCategories(), getPageData()]);
  haggadahSections.value = clipsResponse._data.data.filter_clips.haggadah_sections;
  popularCategories.value = [...clipsResponse._data.data.popular_categories];
}
// await useAsyncData(getInitialPageData);
// later will be changed to useAsyncData
onBeforeMount(getInitialPageData);

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
