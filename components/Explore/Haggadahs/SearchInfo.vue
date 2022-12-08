<template>
  <UIHeading level="2" class="mt-5">
    <template v-if="mode === 'keyword'">
      For search keyword<span class="ml-2 text-center text-secondary-500">{{ searchKeyword }}</span>
    </template>
    <template v-else-if="mode === 'topics'">
      For topic<span class="ml-2 text-center text-secondary-500">{{ capitalizeFirstLetter(searchTopic) }}</span>
    </template>
    <template v-else-if="mode === 'favorite'">
    </template>
  </UIHeading>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { Mode } from '~/components/Global/Haggadah/types';
import { capitalizeFirstLetter } from '~/composables/capitalize';

const props = defineProps({
  mode: {
    type: String as PropType<Mode>,
  },
  searchKeyword: {
    type: String,
    default: '',
  },
  searchTopic: {
    type: String,
    default: '',
  },
});
</script>
