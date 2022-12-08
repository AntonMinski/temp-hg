<template>
  <UIHeading :level="2" class="mt-5">
    <template v-if="state.mode === 'keyword'">
      For search keyword<span class="ml-2 text-center text-secondary-500">{{ state.searchKeywordDisplay }}</span>
    </template>
    <template v-else-if="state.mode === 'topics'">
      For topic<span class="ml-2 text-center text-secondary-500">{{ capitalizeFirstLetter(state.selectedCategories.toString()) }}</span>
    </template>
    <template v-else-if="state.mode === 'contributor'">
      By Contributor<span class="ml-2 text-center text-secondary-500">{{ state.contributorHandle }}</span>
    </template>
    <template v-else-if="state.mode === 'favorite'">
    </template>
  </UIHeading>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { capitalizeFirstLetter } from '~/composables/capitalize';
import { State } from '~/components/Explore/Composables/useClipOrHaggadah';

const props = defineProps({
  state: {
    type: Object as PropType<State>,
  },
});
</script>
