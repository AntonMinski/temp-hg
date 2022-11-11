<template>
  <div class="text-center">
    There was an error 😱
    <h1>{{ title }}</h1>
    <NuxtLink to="/"> Navigate home </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

// layout
definePageMeta({
  layout: 'error',
});

const props = defineProps({
  error: Object as PropType<NuxtError>,
});

const title = computed<string>(
  () => props.error.statusMessage || props.error.toString() || 'Sorry, some error occurred'
);
</script>
