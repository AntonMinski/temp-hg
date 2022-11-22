<script lang="ts" setup>
import type { Haggadah } from '~/components/Global/Haggadah/types';
import { getMetaObject } from '~/composables/meta';
import { useHomeStore } from '~/store/home';
import { useHead } from '#head';
import { storeToRefs } from 'pinia';
const homeStore = useHomeStore();
const { homePageData } = storeToRefs(homeStore);

// Haggadahs Data
const haggadahs: Haggadah[] = homePageData.value?.favorite_haggadahs?.slice(0, 6);

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

    <GlobalPassoverAndSupportBanner />
  </div>
</template>
