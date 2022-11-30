<template>
  <div>
    <ExploreClipsMain
      v-if="mode === 'main'"
      :popular-categories="popularCategories"
      v-model:loading="loading"
      v-model:search-string="searchString"
      @search="searchClips"
      @getClipsByCategory="getClipsByCategory"
      @getClipsBySection="getClipsBySection">
      <template #filterGroup>
        <UIFilterGroup
          group-heading="Filter clips"
          page-address="/explore-clips"
          dropdown1-text="Haggadah Section"
          dropdown2-text="Clip Categories"
          dropdown3-text="MediaType"
          :dropdown1-items="haggadahSections"
          :dropdown2-items="categories"
          :dropdown3-items="mediaTypes"
          v-model:dropdown1-selected="selectedHaggadahSections"
          v-model:dropdown2-selected="selectedCategories"
          v-model:dropdown3-selected="selectedMediaTypes"
          v-model:dropdown2-selected-child="selectedChildCategories"
          @applyFilters="getClipsByFilters"
          @clearFilters="clearFilters" />
      </template>
    </ExploreClipsMain>

    <ExploreClipsSearchResults
      v-if="mode !== 'main'"
      :clips="clips"
      :mode="mode"
      :search-keyword="route.query.key || ''"
      :search-keyword-display="searchKeywordDisplay"
      :search-filters="searchFilters"
      :meta="meta"
      v-model:loading="loading"
      v-model:loading-more="loadingMore"
      v-model:search-string="searchString"
      v-model:current-sorting="currentSorting"
      @search="searchClips"
      @sort="setSorting"
      @loadMore="loadMoreClips">
      <template #filterGroup>
        <UIFilterGroup
          group-heading="Filter clips"
          page-address="/explore-clips"
          dropdown1-text="Haggadah Section"
          dropdown2-text="Clip Categories"
          dropdown3-text="MediaType"
          :dropdown1-items="haggadahSections"
          :dropdown2-items="categories"
          :dropdown3-items="mediaTypes"
          v-model:dropdown1-selected="selectedHaggadahSections"
          v-model:dropdown2-selected="selectedCategories"
          v-model:dropdown3-selected="selectedMediaTypes"
          v-model:dropdown2-selected-child="selectedChildCategories"
          @applyFilters="getClipsByFilters"
          @clearFilters="clearFilters" />
      </template>
    </ExploreClipsSearchResults>

    <div v-if="mode !== 'main'" class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem, DropdownItemParent } from '~/components/UI/Dropdown/types';
import type {
  clipSearchResult,
  Clip,
  ClipCategory,
  MediaType,
  Mode,
  ClipsSorting,
} from '~/components/Global/Clip/types';
import type { ClipCategoryParent, clipSearchParams, HaggadahSection } from '~/components/Global/Clip/types';
import { computed, ComputedRef, onBeforeMount, onMounted, ref, Ref } from 'vue';
import { useAsyncData, useNuxtApp, useRoute, useRouter } from '#app';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { clipContainer } from '~/components/Global/Clip/types';
const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();

const meta = ref({});
const searchString = ref('');
const searchKeywordDisplay = ref('');
const loading: Ref<boolean> = ref(false);
const loadingMore: Ref<boolean> = ref(false);
const currentSorting: Ref<ClipsSorting> = ref('p');
const clips: Ref<Clip[]> = ref([]);
const mediaTypes: Ref<MediaType[]> = ref([
  { name: 'Text', handle: 'text' },
  { name: 'Video', handle: 'video' },
  { name: 'Audio', handle: 'audio' },
]);
const selectedMediaTypes: Ref<string[]> = ref([]);
const selectedCategories: Ref<string[]> = ref([]);
const selectedChildCategories: Ref<string[]> = ref([]);
const selectedHaggadahSections: Ref<string[]> = ref([]);

const searchFilters: ComputedRef<string> = computed(() =>
  [
    ...selectedMediaTypes.value,
    ...selectedCategories.value,
    ...selectedChildCategories.value,
    ...selectedHaggadahSections.value,
  ].join(', ')
);

async function getClipsByFilters() {
  loading.value = true;
  mode.value = searchString.value ? 'keyword' : 'topics';
  searchKeywordDisplay.value = searchString.value;

  let searchOptions: string = '';
  let query = {};

  function addToQuery(key: string, value: string) {
    if (searchOptions) {
      searchOptions += '&';
    } else {
      searchOptions += '?';
    }
    searchOptions += `${key}=${value}`;
    query[key] = value;
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
  addToQuery('key', searchString.value);
  prepareQueryParent(haggadahSections, selectedHaggadahSections.value, 'haggadah_section[]');
  prepareQueryParent(categories, selectedCategories.value, 'parent_category[]');
  prepareQueryChild(categories, selectedChildCategories.value, 'child_category[]');
  prepareQueryParent(mediaTypes.value, selectedMediaTypes.value, 'media_type[]');
  addToQuery('page', '1');
  addToQuery('sort', currentSorting.value);

  await router.push({ query });

  await getClips(searchOptions);
}

async function getCategories() {
  loading.value = true;
  const response = await vueApp.$api.clip.getClipCategories();
  loading.value = false;
  return response;
}

async function getClipsByCategory(categoryHandle: string) {
  mode.value = 'topics';
  selectedCategories.value = [categoryHandle];
  const query = { 'parent_category[]': categoryHandle, page: '1' };
  await router.push({ query });
  await getClips(query);
}

async function getPageData() {
  loading.value = true;
  const response = await vueApp.$api.clip.getClipsPageData();
  loading.value = false;
  return response;
}

async function fetchClips(searchOptions: clipSearchParams | string) {
  const response = await vueApp.$api.clip.exploreClips(searchOptions);
  return response;
}

async function getClips(searchOptions: clipSearchParams | string) {
  loading.value = true;
  if (typeof searchOptions !== 'string') {
    searchOptions.page = searchOptions.page || 1;
    searchOptions.sort = searchOptions.sort || currentSorting.value || 'p';
  }
  const response = await fetchClips(searchOptions);
  clips.value = [...response._data.data.map((item) => item.clip)];
  meta.value = { ...response._data.meta };
  loading.value = false;
}

async function searchClips(): Promise<void> {
  searchKeywordDisplay.value = searchString.value;
  mode.value = 'keyword';
  await getClips(route.query);
}

async function loadMoreClips() {
  loadingMore.value = true;
  const currentPage = route.query.page ? parseInt(route.query.page as string) : 1;
  await router.push({
    query: {
      ...route.query,
      page: currentPage + 1,
    },
  });
  const response = await fetchClips({
    ...route.query,
    page: currentPage + 1,
  });
  clips.value.push(...response._data.data.map((item: clipContainer) => item.clip));
  meta.value = { ...response._data.meta };
  loadingMore.value = false;
}

async function setSorting() {
  await getClips(route.query);
}

async function getClipsBySection(sectionHandle: string) {
  selectedHaggadahSections.value = [sectionHandle];
  mode.value = 'topics';
  await getClips(route.query);
}

async function clearFilters() {
  loading.value = true;
  if (mode.value === 'keyword' && searchString.value) {
    await router.push({ query: { key: searchString.value } });
    await getClips({ key: searchString.value, page: 1 });
  } else if (mode.value === 'topics') {
    mode.value = 'main';
    await router.push({ query: {} });
    loading.value = false;
    // await getClips({ page: 1 });
  }
}

async function getInitialPageData() {
  const initialMode: Mode = getMode() as Mode;
  const initialSort: ClipsSorting = (route.query.sort as ClipsSorting) || 'p';
  let initialClips: Clip[] = [];
  let initialMeta = {};
  if (initialMode !== 'main') {
    const response = await fetchClips({ ...route.query, sort: initialSort });
    initialClips = [...response._data.data.map((item) => item.clip)];
    initialMeta = { ...response._data.meta };
  }

  const [categoriesResponse, dataResponse] = await Promise.all([getCategories(), getPageData()]);
  const categories: ClipCategory[] = categoriesResponse._data.data;
  const haggadahSections: HaggadahSection[] = dataResponse._data.data.filter_clips.haggadah_sections;
  const popularCategories: ClipCategory[] = [...dataResponse._data.data.popular_categories];
  // const mediaTypes = [...dataResponse._data.data.media_types];
  const metaTags = { ...dataResponse._data.data.meta_tags };
  const initialData = {
    initialMode,
    initialSort,
    initialClips,
    initialMeta,
    categories,
    haggadahSections,
    popularCategories,
    metaTags,
  };
  return initialData;
}
const { data: initialData } = await useAsyncData(getInitialPageData);
let { initialMode, initialSort, initialClips, initialMeta, categories, haggadahSections, popularCategories, metaTags } =
  initialData.value;

const mode = ref<Mode>('main');
mode.value = initialMode;
currentSorting.value = initialSort;
searchString.value = route.query.key as string;
clips.value = [...initialClips];
meta.value = { ...initialMeta };

function getMode(): string {
  if (route.query.key) {
    return 'keyword';
  } else if (
    route.query['parent_category[]'] ||
    route.query['children_category[]'] ||
    route.query['haggadah_section[]']
  ) {
    return 'topics';
  } else {
    return 'main';
  }
}

// Meta
const metaObject = getMetaObject(metaTags);
useHead({
  title: metaTags?.title,
  meta: metaObject,
});
</script>
