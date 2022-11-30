<template>
  <div>
    <ExploreHaggadahsMain
      v-if="mode === 'main'"
      v-model:loading="loading"
      v-model:search-string="searchString"
      :popular-categories="popularCategories"
      @search="searchHaggadahs"
      @getHaggadahsByCategory="getHaggadahsByCategory"
      @getHaggadahsBySection="getHaggadahsBySection" />

    <ExploreHaggadahsSearchResults
      v-if="mode !== 'main'"
      v-model:loading="loading"
      v-model:loading-more="loadingMore"
      v-model:search-string="searchString"
      v-model:current-sorting="currentSorting"
      :haggadahs="haggadahs"
      :mode="mode"
      :search-keyword="route.query.key || ''"
      :search-keyword-display="searchKeywordDisplay"
      :search-filters="searchFilters"
      :meta="meta"
      @search="searchHaggadahs"
      @sort="setSorting"
      @loadMore="loadMoreHaggadahs" />

    <div class="py-20">
      <GlobalBannerHaggadah variant="horizontal" />
    </div>

    <GlobalHaggadahSectionFavourites v-if="mode === 'keyword'" />

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onBeforeMount, onMounted, ref, Ref } from 'vue';
import type {
  Haggadah,
  Mode,
  HaggadahsSorting,
  haggadahSearchParams,
  HaggadahSection,
} from '~/components/Global/Haggadah/types';
import { useAsyncData, useNuxtApp, useRoute, useRouter } from '#app';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { haggadahContainer } from '~/components/Global/Haggadah/types';
const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();

const meta = ref({});
const searchString = ref('');
const searchKeywordDisplay = ref('');
const loading: Ref<boolean> = ref(false);
const loadingMore: Ref<boolean> = ref(false);
const currentSorting: Ref<HaggadahsSorting> = ref('p');
const haggadahs: Ref<Haggadah[]> = ref([]);
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

async function getCategories() {
  loading.value = true;
  const response = await vueApp.$api.haggadah.getHaggadahCategories();
  loading.value = false;
  return response;
}

async function getHaggadahsByCategory(categoryHandle: string) {
  mode.value = 'topics';
  selectedCategories.value = [categoryHandle];
  const query = { 'parent_category[]': categoryHandle, page: '1' };
  await router.push({ query });
  await getHaggadahs(query);
}

async function getPageData() {
  loading.value = true;
  const response = await vueApp.$api.haggadah.getHaggadahsPageData();
  loading.value = false;
  return response;
}

async function fetchHaggadahs(searchOptions: haggadahSearchParams | string) {
  const response = await vueApp.$api.haggadah.exploreHaggadahs(searchOptions);
  return response;
}

async function getHaggadahs(searchOptions: haggadahSearchParams | string) {
  loading.value = true;
  if (typeof searchOptions !== 'string') {
    searchOptions.page = searchOptions.page || 1;
    searchOptions.sort = searchOptions.sort || currentSorting.value || 'p';
  }
  const response = await fetchHaggadahs(searchOptions);
  haggadahs.value = [...response._data.data.map((item) => item.haggadah)];
  meta.value = { ...response._data.meta };
  loading.value = false;
}

async function searchHaggadahs(): Promise<void> {
  searchKeywordDisplay.value = searchString.value;
  mode.value = 'keyword';
  await getHaggadahs(route.query);
}

async function loadMoreHaggadahs() {
  loadingMore.value = true;
  const currentPage = route.query.page ? parseInt(route.query.page as string) : 1;
  await router.push({
    query: {
      ...route.query,
      page: currentPage + 1,
    },
  });
  const response = await fetchHaggadahs({
    ...route.query,
    page: currentPage + 1,
  });
  haggadahs.value.push(...response._data.data.map((item: haggadahContainer) => item.haggadah));
  meta.value = { ...response._data.meta };
  loadingMore.value = false;
}

async function setSorting() {
  await getHaggadahs(route.query);
}

async function getHaggadahsBySection(sectionHandle: string) {
  selectedHaggadahSections.value = [sectionHandle];
  mode.value = 'topics';
  await getHaggadahs(route.query);
}

async function getInitialPageData() {
  const initialMode: Mode = getMode() as Mode;
  const initialSort: HaggadahsSorting = (route.query.sort as HaggadahsSorting) || 'p';
  let initialHaggadahs: Haggadah[] = [];
  let initialMeta = {};
  if (initialMode !== 'main') {
    const response = await fetchHaggadahs({ ...route.query, sort: initialSort });
    initialHaggadahs = [...response._data.data.map((item) => item.haggadah)];
    initialMeta = { ...response._data.meta };
  }

  const [categoriesResponse, dataResponse] = await Promise.all([getCategories(), getPageData()]);
  const categories: HaggadahCategory[] = categoriesResponse._data.data;
  const haggadahSections: HaggadahSection[] = dataResponse._data.data.filter_haggadahs.haggadah_sections;
  const popularCategories: HaggadahCategory[] = [...dataResponse._data.data.popular_categories];
  // const mediaTypes = [...dataResponse._data.data.media_types];
  const metaTags = { ...dataResponse._data.data.meta_tags };
  const initialData = {
    initialMode,
    initialSort,
    initialHaggadahs,
    initialMeta,
    categories,
    haggadahSections,
    popularCategories,
    metaTags,
  };
  return initialData;
}
const { data: initialData } = await useAsyncData(getInitialPageData);
const {
  initialMode,
  initialSort,
  initialHaggadahs,
  initialMeta,
  categories,
  haggadahSections,
  popularCategories,
  metaTags,
} = initialData.value;

const mode = ref<Mode>('main');
mode.value = initialMode;
currentSorting.value = initialSort;
searchString.value = route.query.key as string;
haggadahs.value = [...initialHaggadahs];
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
