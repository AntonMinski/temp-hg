<template>
    <div class="text-center">
      There was an error 😱
      <h1>{{ title }}</h1>
      <NuxtLink to="/">
        Navigate home
      </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, PropType } from "vue";
import type { nuxtError } from '@/plugins/types/error';

// layout
definePageMeta({
  layout: 'error',
});

const props = defineProps({
  error: Object as PropType<nuxtError>,
})

const title = computed<string>(() => props.error.statusMessage || props.error.toString() || 'Sorry, some error occurred' );
</script>
