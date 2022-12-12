<template>
  <div>
    <ExploreHaggadahsMain
      v-if="state.mode === 'main'"
      v-model:loading="loading"
      v-model:search-string="state.searchString"
      :popular-categories="state.popularCategories"
      :favorite-haggadahs="favoriteHaggadahs"
      @search="state.searchItems"
      @getHaggadahsByCategory="state.getItemsByCategory"
      @viewAll="state.viewMore" />

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
      :search-filters="searchFilters"
      :meta="state.meta"
      :popular-categories="state.popularCategories"
      :search-topic="state.selectedCategories.toString()"
      :state="state"
      @search="state.searchItems"
      @sort="state.setSorting"
      @loadMore="state.loadMoreItems"
      @getItemsByCategory="state.getItemsByCategory" />
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
import type { Mode } from '~/components/Explore/types';
import { ref, Ref } from 'vue';
import { useAsyncData, useNuxtApp, useRoute, useRouter } from '#app';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();
import { useMode } from '~/components/Explore/Composables/useMode';
import { Type, useClipOrHaggadah } from '~/components/Explore/Composables/useClipOrHaggadah';

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

async function fetchHaggadahsByAuthor(searchOptions: haggadahSearchParams) {
  const response = await vueApp.$api.book.getBooksByAuthor(searchOptions.contributor);
  return {
    items: response._data.data.map((item) => item.book),
    meta: { ...response._data.meta },
    name: response._data.name,
    handle: response._data.handle,
  };
}

async function getInitialPageData() {
  console.log(route.query);
  const initialMode: Mode = (route.query.mode || useMode()) as Mode || 'main';
  const initialSort: HaggadahsSorting = (route.query.sort as HaggadahsSorting) || 'r';
  let initialHaggadahs: Haggadah[] = [];
  let initialMeta = {};
  let contributorName = '';
  let contributorHandle = '';
  let popularCategories = [];
  let favoriteHaggadahs: Haggadah[] = [];
  let metaTags = {};
  try {
    if (initialMode === 'contributor') {
      const { items, meta, name, handle } = await fetchHaggadahsByAuthor({ ...route.query, sort: initialSort });
      initialHaggadahs = items;
      initialMeta = { ...meta };
      contributorName = name;
      contributorHandle = handle;
    } else if (initialMode !== 'main') {
      const { items, meta } = await fetchHaggadahs({ ...route.query, sort: initialSort });
      initialHaggadahs = items;
      initialMeta = { ...meta };
    }

    const dataResponse = await getPageData();
    popularCategories = dataResponse?._data?.data?.popular_topics || [];
    favoriteHaggadahs = dataResponse?._data?.data?.favorite_book.map((item: HaggadahWrapper) => item.book) || [];
    metaTags = { ...dataResponse?._data?.data?.meta_tags } || {};
  } catch (error) {
    console.error('error', error);
  }
  const serverData = {
    initialMode,
    initialSort,
    initialHaggadahs,
    initialMeta,
    popularCategories,
    favoriteHaggadahs,
    metaTags,
    contributorName,
    contributorHandle,
  };
  return serverData;
}
const { data: serverData, error } = await useAsyncData(getInitialPageData);
if (error) {
  console.error('error', error);
}
// const { initialMode, initialSort, initialHaggadahs, initialMeta, popularTopics, favoriteHaggadahs, metaTags, contributorName, contributorHandle } =
//   serverData.value;

const initialData = {
  ...serverData.value,
  fetchClipsOrHaggadahs: fetchHaggadahs,
  type: 'haggadah' as Type,
};
const favoriteHaggadahs = initialData.favoriteHaggadahs;

const { state, searchFilters } = useClipOrHaggadah(initialData);

function getHaggadahsByCategory(category) {
  state.getItemsByCategory(category);
}
// Meta
const metaObject = getMetaObject(initialData.metaTags);
useHead({
  title: initialData.metaTags?.title,
  meta: metaObject,
});
</script>
