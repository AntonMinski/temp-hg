<template>
  <div>
    <ExploreClipsMain
      v-if="state.mode === 'main'"
      :popular-categories="state.popularCategories"
      :favorite-clips="favoriteClips"
      v-model:loading="state.loading"
      v-model:search-string="state.searchString"
      @search="searchItems"
      @getClipsByCategory="getItemsByCategory"
      @getClipsBySection="getItemsBySection"
      @viewAll="viewMore">
      <template #filterGroup>
        <UIFilterGroup
          group-heading="Filter clips"
          page-address="/explore-clips"
          dropdown1-text="Haggadah Section"
          dropdown2-text="Clip Categories"
          dropdown3-text="MediaType"
          :dropdown1-items="state.haggadahSections"
          :dropdown2-items="state.categories"
          :dropdown3-items="state.mediaTypes"
          v-model:dropdown1-selected="state.selectedHaggadahSections"
          v-model:dropdown2-selected="state.selectedCategories"
          v-model:dropdown3-selected="state.selectedMediaTypes"
          v-model:dropdown2-selected-child="state.selectedChildCategories"
          @applyFilters="getItemsByFilters"
          @clearFilters="clearFilters" />
      </template>
    </ExploreClipsMain>

    <ExploreClipsSearchResults
      v-if="state.mode !== 'main'"
      :clips="state.clipsOrHaggadahs"
      :mode="state.mode"
      :search-keyword="route.query.key || ''"
      :search-keyword-display="state.searchKeywordDisplay"
      :search-filters="state.searchFilters"
      :meta="state.meta"
      v-model:loading="state.loading"
      v-model:loading-more="state.loadingMore"
      v-model:search-string="state.searchString"
      v-model:current-sorting="state.currentSorting"
      :state="state"
      @search="searchItems"
      @sort="setSorting"
      @loadMore="loadMoreItems">
      <template #filterGroup>
        <UIFilterGroup
          group-heading="Filter clips"
          page-address="/explore-clips"
          dropdown1-text="Haggadah Section"
          dropdown2-text="Clip Categories"
          dropdown3-text="MediaType"
          :dropdown1-items="state.haggadahSections"
          :dropdown2-items="state.categories"
          :dropdown3-items="state.mediaTypes"
          v-model:dropdown1-selected="state.selectedHaggadahSections"
          v-model:dropdown2-selected="state.selectedCategories"
          v-model:dropdown3-selected="state.selectedMediaTypes"
          v-model:dropdown2-selected-child="state.selectedChildCategories"
          @applyFilters="getItemsByFilters"
          @clearFilters="clearFilters" />
      </template>
    </ExploreClipsSearchResults>

    <div v-if="state.mode !== 'main'" class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>

<script lang="ts" setup>
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

async function getCategories() {
  loading.value = true;
  const response = await vueApp.$api.clip.getClipCategories();
  loading.value = false;
  return response;
}

async function getPageData() {
  loading.value = true;
  const response = await vueApp.$api.clip.getClipsPageData();
  loading.value = false;
  return response;
}

async function fetchClips(searchOptions: clipSearchParams | string) {
  const response = await vueApp.$api.clip.exploreClips(searchOptions);
  return {
    items: response._data.data.map((item) => item.clip),
    meta: { ...response._data.meta },
  };
}

async function getInitialPageData() {
  const initialMode: Mode = useMode() as Mode || 'main';
  const initialSort: ClipsSorting = (route.query.sort as ClipsSorting) || 'p';
  let initialClips: Clip[] = [];
  let initialMeta = {};
  let categories: ClipCategory[] = [];
  let haggadahSections: HaggadahSection[];
  let popularCategories: ClipCategory[];
  let favoriteClips: Clip[];
  let metaTags = {};
  try {
    if (initialMode !== 'main') {
      const { items, meta } = await fetchClips({ ...route.query, sort: initialSort });
      initialClips = [...items];
      initialMeta = { ...meta };
    }

    const [categoriesResponse, dataResponse] = await Promise.all([getCategories(), getPageData()]);
    categories = categoriesResponse._data.data;
    haggadahSections = dataResponse._data.data.filter_clips.haggadah_sections;
    popularCategories = [...dataResponse._data.data.popular_categories];
    favoriteClips = [...dataResponse._data.data.favourite_clips.map((item) => item.clip)] || [];
    // const mediaTypes = [...dataResponse._data.data.media_types];
    metaTags = { ...dataResponse._data.data.meta_tags };
  } catch (error) {
    console.log(error);
  }
  const initialData = {
    initialMode,
    initialSort,
    initialClips,
    initialMeta,
    categories,
    haggadahSections,
    popularCategories,
    favoriteClips,
    metaTags,
  };
  return initialData;
}
const { data: initialData  } = await useAsyncData(getInitialPageData);
let {
  initialMode,
  initialSort,
  initialClips,
  initialMeta,
  categories,
  haggadahSections,
  popularCategories,
  favoriteClips,
  metaTags,
} = initialData.value;
const {
  state,
  searchFilters,
  getItemsByFilters,
  getItemsByCategory,
  searchItems,
  getItems,
  loadMoreItems,
  setSorting,
  getItemsBySection,
  clearFilters,
  viewMore,
} = useClipOrHaggadah(
  initialMode,
  initialSort,
  initialClips,
  initialMeta,
  categories,
  haggadahSections,
  popularCategories,
  fetchClips
);

// Meta
const metaObject = getMetaObject(metaTags);
useHead({
  title: metaTags?.title,
  meta: metaObject,
});
</script>
