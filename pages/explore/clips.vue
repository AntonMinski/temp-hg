<template>
  <div>
    <ExploreClipsMain
      v-if="mode === 'base'"
      v-model:loading="loading"
      v-model:search-string="searchString"
      :popular-categories="popularCategories"
      @search="searchClips('keyword')"
      @getClipsByCategory="getClipsByCategory">
      <template #filterGroup>
        <UIFilterGroup
          v-model:dropdown1-selected="selectedHaggadahSections"
          v-model:dropdown2-selected="selectedCategories"
          v-model:dropdown3-selected="selectedMediaTypes"
          v-model:dropdown2-selected-child="selectedChildCategories"
          group-heading="Filter clips"
          page-address="/explore/clips"
          dropdown1-text="Haggadah Section"
          dropdown2-text="Clip Categories"
          dropdown3-text="MediaType"
          :dropdown1-items="haggadahSections"
          :dropdown2-items="categories"
          :dropdown3-items="mediaTypes"
          @applyFilters="getClipsByFilters" />
      </template>
    </ExploreClipsMain>

    <ExploreClipsSearchResults
      v-if="mode !== 'base'"
      v-model:loading="loading"
      v-model:loading-more="loadingMore"
      v-model:search-string="searchString"
      :clips="clips"
      :mode="mode"
      :search-keyword="route.query.key || ''"
      :search-filters="searchFilters"
      :meta="meta"
      @search="searchClips('keyword')"
      @sort="searchClips"
      @loadMore="loadMoreClips">
      <template #filterGroup>
        <UIFilterGroup
          v-model:dropdown1-selected="selectedHaggadahSections"
          v-model:dropdown2-selected="selectedCategories"
          v-model:dropdown3-selected="selectedMediaTypes"
          v-model:dropdown2-selected-child="selectedChildCategories"
          group-heading="Filter clips"
          page-address="/explore/clips"
          dropdown1-text="Haggadah Section"
          dropdown2-text="Clip Categories"
          dropdown3-text="MediaType"
          :dropdown1-items="haggadahSections"
          :dropdown2-items="categories"
          :dropdown3-items="mediaTypes"
          @applyFilters="getClipsByFilters" />
      </template>
    </ExploreClipsSearchResults>

    <div v-if="mode !== 'base'" class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onBeforeMount, onMounted, ref, Ref } from 'vue';
import type { DropdownItem, DropdownItemParent } from '~/components/UI/Dropdown/types';
import type {
  clipSearchResult,
  Clip,
  ClipCategory,
  MediaType,
  Mode,
  ClipCategoryParent,
  clipSearchParams,
  HaggadahSection,
} from '~/components/Global/Clip/types';
import { useAsyncData, useNuxtApp, useRoute, useRouter } from '#app';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();

const meta = ref({});
const searchString = ref('');
const loading: Ref<boolean> = ref(false);
const loadingMore: Ref<boolean> = ref(false);
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
  mode.value = 'group';
  loading.value = true;

  let searchOptions: string = '';
  const query = {};

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

  prepareQueryParent(haggadahSections, selectedHaggadahSections.value, 'haggadah_section[]');
  prepareQueryParent(categories, selectedCategories.value, 'parent_category[]');
  prepareQueryChild(categories, selectedChildCategories.value, 'child_category[]');
  prepareQueryParent(mediaTypes.value, selectedMediaTypes.value, 'media_type[]');
  addToQuery('page', '1');

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
  mode.value = 'group';
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
  }
  const response = await fetchClips(searchOptions);
  clips.value = [...response._data.data.map((item) => item.clip)];
  meta.value = { ...response._data.meta };
  loading.value = false;
}

async function searchClips(newMode = ''): Promise<void> {
  if (newMode) {
    mode.value = newMode as Mode;
  } else {
    mode.value = getMode() as Mode;
  }
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
  clips.value.push(...response._data.data.map((item) => item.clip));
  meta.value = { ...response._data.meta };
  loadingMore.value = false;
}

async function getInitialPageData() {
  const initialMode = getMode() as Mode;
  let initialClips = [];
  let initialMeta = {};
  if (initialMode !== 'base') {
    const response = await fetchClips(route.query);
    initialClips = [...response._data.data.map((item) => item.clip)];
    initialMeta = { ...response._data.meta };
  }

  const [categoriesResponse, dataResponse] = await Promise.all([getCategories(), getPageData()]);
  const categories = categoriesResponse._data.data;
  const haggadahSections = dataResponse._data.data.filter_clips.haggadah_sections;
  const popularCategories = [...dataResponse._data.data.popular_categories];
  // const mediaTypes = [...dataResponse._data.data.media_types];
  const metaTags = { ...dataResponse._data.data.meta_tags };
  const initialData = {
    initialMode,
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
const { initialMode, initialClips, initialMeta, categories, haggadahSections, popularCategories, metaTags } =
  initialData.value;

const mode = ref<Mode>('base');
mode.value = initialMode;
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
    return 'group';
  } else {
    return 'base';
  }
}

// Meta
const metaObject = getMetaObject(metaTags);
useHead({
  title: metaTags?.title,
  meta: metaObject,
});
</script>
