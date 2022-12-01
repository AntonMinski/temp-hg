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
      @getHaggadahsBySection="getItemsBySection" />

    <ExploreHaggadahsSearchResults
      v-if="state.mode !== 'main'"
      v-model:loading="loading"
      v-model:loading-more="state.loadingMore"
      v-model:search-string="state.searchString"
      v-model:current-sorting="state.currentSorting"
      :haggadahs="state.clipsOrHaggadahs"
      :mode="state.mode"
      :search-keyword="route.query.key || ''"
      :search-keyword-display="state.searchKeywordDisplay"
      :search-filters="state.searchFilters"
      :meta="state.meta"
      @search="searchItems"
      @sort="setSorting"
      @loadMore="loadMoreItems" />

    <div class="py-20">
      <GlobalBannerHaggadah variant="horizontal" />
    </div>

    <GlobalHaggadahSectionFavourites v-if="state.mode === 'keyword'" />

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>

<script lang="ts" setup>
import type { Haggadah, HaggadahsSorting, haggadahSearchParams } from '~/components/Global/Haggadah/types';
import type { Clip, ClipCategory, Mode, ClipsSorting } from '~/components/Global/Clip/types';
import type { clipSearchParams, HaggadahSection } from '~/components/Global/Clip/types';
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
    meta: { ...response._data.data.meta },
  };
}

async function getInitialPageData() {
  const initialMode: Mode = useMode() as Mode;
  const initialSort: HaggadahsSorting = (route.query.sort as HaggadahsSorting) || 'r';
  let initialHaggadahs: Haggadah[] = [];
  let initialMeta = {};
  if (initialMode !== 'main') {
    const { items, meta } = await fetchHaggadahs({ ...route.query, sort: initialSort });
    initialHaggadahs = items;
    initialMeta = { ...meta };
  }
  const dataResponse = await getPageData();
  const popularTopics = dataResponse._data.data.popular_topics.map((item) => {
    return {
      name: item,
      handle: item.toLowerCase().replace(/ /g, '-'),
    };
  });
  const favoriteHaggadahs = dataResponse._data.data.favorite_haggadahs;
  const metaTags = { ...dataResponse._data.data.meta_tags };
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
const { data: initialData } = await useAsyncData(getInitialPageData);
const { initialMode, initialSort, initialHaggadahs, initialMeta, popularTopics, favoriteHaggadahs, metaTags } =
  initialData.value;

const { state, getItemsByCategory, searchItems, getItems, loadMoreItems, setSorting, getItemsBySection } =
  useClipOrHaggadah(initialMode, initialSort, initialHaggadahs, initialMeta, [], [], popularTopics, fetchHaggadahs);

function getHaggadahsByCategory(category) {
  console.log('here');
  getItemsByCategory(category);
}
// Meta
const metaObject = getMetaObject(metaTags);
useHead({
  title: metaTags?.title,
  meta: metaObject,
});
</script>
