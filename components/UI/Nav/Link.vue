<template>
  <li>
    <NuxtLink :to="to" class="flex items-center space-x-1.5 bg-transparent py-2 pr-4 pl-3 md:p-0" aria-current="page">
      <slot />
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
    default: '#',
  },
});
</script>
