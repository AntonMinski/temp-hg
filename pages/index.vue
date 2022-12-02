<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import type { HaggadahWrapper } from '~/components/Global/Haggadah/types';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { usePageStore } from '~/store/page';
import { useAsyncData } from '#app';
const pageStore = usePageStore();
const { homePageData } = storeToRefs(pageStore);

await useAsyncData(pageStore.getHomePage);

// Haggadahs Data
const haggadahs: HaggadahWrapper[] = homePageData.value?.favorite_haggadahs?.slice(0, 6) || [];

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

    <GlobalClipSectionFavourites />

    <GlobalContributorSectionTop />

    <GlobalEventSectionTop />

    <GlobalBannerHaggadahAndClips />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>
