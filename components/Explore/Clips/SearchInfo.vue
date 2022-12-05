<template>
  <UIHeading :level="state.searchInfoHeadingLevel" class="mt-5">
    <template v-if="state.searchInfoHeadingParts?.length">
      <template v-for="{ key, value } in state.searchInfoHeadingParts">
        {{ key }}<span class="ml-2 text-center text-secondary-500">{{ value }}</span>
      </template>
    </template>
    <template v-else>
      <span class="ml-2 text-center text-secondary-500">All clips</span>
    </template>
  </UIHeading>
</template>

<script lang="ts" setup>
const props = defineProps({
  state: {
    type: Object,
  },
});
</script>
