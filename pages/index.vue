<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import type { HaggadahWrapper } from '~/components/Global/Haggadah/types';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { usePageStore } from '~/store/page';
import { useAsyncData, useNuxtApp } from '#app';
const pageStore = usePageStore();
const { homePageData } = storeToRefs(pageStore);
const { vueApp } = useNuxtApp();

await useAsyncData(pageStore.getHomePage);

// Haggadahs Data
// const haggadahs: HaggadahWrapper[] = homePageData.value?.favorite_haggadahs?.slice(0, 6) || [];

// temp
async function getData() {
  let haggadahs = [];
  let clips = [];
  try {
    const [haggadahResponse, clipsResponse] = await Promise.all([
      vueApp.$api.book.getBooksData(),
      vueApp.$api.clip.getClipsPageData(),
    ]);
    haggadahs = haggadahResponse?._data?.data?.favorite_haggadahs || [];
    clips = clipsResponse?._data?.data?.favourite_clips?.map((item) => item.clip) || [];
  } catch (error) {
    console.log(error);
  }
  return { haggadahs, clips };
}
const { data: initialData } = await useAsyncData(getData);
const { haggadahs, clips } = initialData.value;

// Meta
const metaObject = getMetaObject(homePageData.value?.meta_tags);
useHead({
  title: homePageData.value?.meta_tags?.title,
  meta: metaObject,
});
</script>

<template>
  <div>
    <HeroMain />

    <HowItWorksMain />

    <GlobalHaggadahSectionFavourites :haggadahs="haggadahs" />

    <GlobalClipSectionFavourites :clips="clips" />

    <GlobalContributorSectionTop />

    <GlobalEventSectionTop />

    <GlobalBannerHaggadahAndClips />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>
