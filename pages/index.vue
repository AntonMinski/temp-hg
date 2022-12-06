<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { usePageStore } from '~/store/page';
import { useAsyncData, useNuxtApp } from '#app';
const pageStore = usePageStore();
const { homePageData } = storeToRefs(pageStore);
const { vueApp } = useNuxtApp();

await useAsyncData(pageStore.getHomePage);


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

    <GlobalHaggadahSectionFavourites />

    <GlobalClipSectionFavourites />

    <GlobalContributorSectionTop />

    <GlobalEventSectionTop />

    <GlobalBannerHaggadahAndClips />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>
