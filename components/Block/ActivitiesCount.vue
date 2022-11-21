<template>
  <div class="inline-flex items-center space-x-1.5">
    <UIIcon :icon="icon" class="text-secondary-500" />
    <span class="text-sm font-semibold">{{ count }} {{ action }}{{ ending }}</span>
  </div>
</template>
<script lang='ts' setup>
import { computed, ComputedRef, PropType } from 'vue';

type actionType = 'download' | 'view' | 'like' | 'comment'
const props = defineProps({
  count: {
    type: [Number, String],
    required: true,
  },
  action: {
    type: String as PropType<actionType>,
    required: true,
  },
});

const icon: ComputedRef<string> = computed(() => {
  switch (props.action) {
    case 'download':
      return 'icon-download';
    case 'view':
      return 'icon-eye';
    case 'like':
      return 'icon-heart';
    case 'comment':
      return 'icon-comment';
    default:
      return 'icon-download';
  }
});

const ending = computed(() => {
  if (props.count == 1) {
    return '';
  }
  return 's';
});
</script>

