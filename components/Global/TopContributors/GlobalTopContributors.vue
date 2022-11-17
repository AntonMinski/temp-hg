<template>
  <GlobalTopContributorsCard
    v-for="(contributor, key) in contributorsData"
    :key="key"
    :name="contributor.data.name"
    :handle="contributor.data.handle"
    :user_image="contributor.data.user_image"
    :total_followers="contributor.data.total_followers"
    :total_books="contributor.data.total_books"
    :total_clips="contributor.data.total_clips"></GlobalTopContributorsCard>
</template>

<script lang="ts" setup>
import type { Contributor } from './types';
import { useHomeStore } from '~/store/home';
import { computed, ComputedRef } from 'vue';
const homeStore = useHomeStore();

const contributorsData: ComputedRef<Contributor[]> = computed(() => homeStore?.homePageData?.top_contributors);

async function showAll() {
  await navigateTo('/contributors');
}
</script>
g
