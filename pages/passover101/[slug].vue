<template>
  <span>Test</span>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { getPageDataComposable } from '~/composables/getPageData';

const route = useRoute();
await getPageDataComposable(route.path);
</script>
