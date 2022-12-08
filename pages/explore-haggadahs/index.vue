<template>
  <div>
    <ExploreHaggadahsMain
      v-if="state.mode === 'main'"
      v-model:loading="loading"
      v-model:search-string="state.searchString"
      :popular-categories="state.popularCategories"
      :favorite-haggadahs="favoriteHaggadahs"
      @search="searchItems"
      @getHaggadahsByCategory="getItemsByCategory"
      @viewAll="viewMore" />

    <ExploreHaggadahsSearchResults
      v-if="state.mode !== 'main'"
      v-model:loading="state.loading"
      v-model:loading-more="state.loadingMore"
      v-model:search-string="state.searchString"
      v-model:current-sorting="state.currentSorting"
      :haggadahs="state.clipsOrHaggadahs"
      :mode="state.mode"
      :search-keyword="route.query.key || ''"
      :search-keyword-display="state.searchKeywordDisplay"
      :search-filters="state.searchFilters"
      :meta="state.meta"
      :popular-categories="state.popularCategories"
      :search-topic="state.selectedCategories.toString()"
      :state="state"
      @search="searchItems"
      @sort="setSorting"
      @loadMore="loadMoreItems"
      @getItemsByCategory="getItemsByCategory" />

    />

    <div v-if="state.mode !== 'main'" class="py-20">
      <GlobalBannerHaggadah variant="horizontal" />
    </div>

    <GlobalHaggadahSectionFavourites v-if="state.mode === 'keyword'" :haggadahs="favoriteHaggadahs" />

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>

<script lang="ts" setup>
import type {
  Haggadah,
  HaggadahsSorting,
  haggadahSearchParams,
  HaggadahWrapper,
} from '~/components/Global/Haggadah/types';
import type { Mode } from '~/components/Global/Clip/types';
import { ref, Ref } from 'vue';
import { useAsyncData, useNuxtApp, useRoute, useRouter } from '#app';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();
import { useMode } from '~/components/Explore/Composables/useMode';
import { useClipOrHaggadah } from '~/components/Explore/Composables/useClipOrHaggadah';

const loading: Ref<boolean> = ref(false);

async function getPageData() {
  loading.value = true;
  const response = await vueApp.$api.book.getBooksData();
  loading.value = false;
  return response;
}

async function fetchHaggadahs(searchOptions: haggadahSearchParams | string) {
  const response = await vueApp.$api.book.exploreBooks(searchOptions);
  return {
    items: response._data.data.map((item) => item.book),
    meta: { ...response._data.meta },
  };
}

async function getInitialPageData() {
  const initialMode: Mode = useMode() as Mode;
  const initialSort: HaggadahsSorting = (route.query.sort as HaggadahsSorting) || 'r';
  let initialHaggadahs: Haggadah[] = [];
  let initialMeta = {};
  let popularTopics = [];
  let favoriteHaggadahs: Haggadah[] = [];
  let metaTags = {};
  try {
    if (initialMode !== 'main') {
      const { items, meta } = await fetchHaggadahs({ ...route.query, sort: initialSort });
      initialHaggadahs = items;
      initialMeta = { ...meta };
    }

    const dataResponse = await getPageData();
    popularTopics = dataResponse?._data?.data?.popular_topics || [];
    favoriteHaggadahs =
      dataResponse?._data?.data?.favorite_book.map((item: HaggadahWrapper) => item.book) || [];
    metaTags = { ...dataResponse?._data?.data?.meta_tags } || {};
  } catch (error) {
    console.log('error', error);
  }
  const initialData = {
    initialMode,
    initialSort,
    initialHaggadahs,
    initialMeta,
    popularTopics,
    favoriteHaggadahs,
    metaTags,
  };
  return initialData;
}
const { data: initialData, error } = await useAsyncData(getInitialPageData);
if (error) {
  console.log('error', error);
}
const { initialMode, initialSort, initialHaggadahs, initialMeta, popularTopics, favoriteHaggadahs, metaTags } =
  initialData.value;

const { state, getItemsByCategory, searchItems, getItems, loadMoreItems, setSorting, getItemsBySection, viewMore } =
  useClipOrHaggadah(
    initialMode,
    initialSort,
    initialHaggadahs,
    initialMeta,
    [],
    [],
    popularTopics,
    fetchHaggadahs,
    'haggadah'
  );

function getHaggadahsByCategory(category) {
  getItemsByCategory(category);
}
// Meta
const metaObject = getMetaObject(metaTags);
useHead({
  title: metaTags?.title,
  meta: metaObject,
});
</script>
