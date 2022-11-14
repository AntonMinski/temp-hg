<script lang="ts" setup>
import { BadgeSize, BadgeType } from '~/components/UI/Badge/types';

interface Props {
  tags: string[];
  type?: BadgeType;
  size?: BadgeSize;
  outline?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 'sm',
  outline: false,
});
</script>

<template>
  <div class="mt-5 flex flex-wrap items-center">
    <UIBadge v-for="tag in tags" :key="tag" :type="type" :size="size" class="mr-[5px] mb-[5px]" :outline="outline">
      {{ tag }}
    </UIBadge>
  </div>
</template>
