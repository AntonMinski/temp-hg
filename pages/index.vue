<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import type { Haggadah } from '~/components/Haggadah/types';
import { useHomeStore } from '~/store/home';
const homeStore = useHomeStore();

// Haggadahs Data
const haggadahs: ComputedRef<Haggadah[]> = computed(() => homeStore.homePageData.favorite_haggadahs?.slice(0, 6));
</script>

<template>
  <div>
    <HeroMain />

    <HowItWorksMain />

    <GlobalHaggadahFavourites :haggadahs="haggadahs" />

    <GlobalClipFavourites />

    <GlobalUpcomingEvents />

    <GlobalTopContributors />
  </div>
</template>
