<script lang="ts" setup>
import { computed } from 'vue';

type Size = 'sm' | 'md';

interface Props {
  initials?: string;
  initialsBgColor?: string;
  avatar?: string;
  name: string;
  text?: string;
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
  initialsBgColor: 'bg-primary-500',
  text: 'Contributed',
  size: 'md',
});

const imageTextSizes: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

const sizes: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};
const spanSizes: Record<Size, string> = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
};

const size = computed<string>(() => sizes[props.size]);
const spanSize = computed<string>(() => spanSizes[props.size]);
const imageTextSize = computed<string>(() => imageTextSizes[props.size]);
</script>

<template>
  <div class="mt-5 inline-flex items-center space-x-2">
    <span
      v-if="initials"
      class="flex flex-none items-center justify-center rounded-full uppercase leading-none text-gray-900"
      :class="initialsBgColor + ' ' + spanSize + ' ' + imageTextSize">
      {{ initials }}
    </span>
    <img v-else-if="avatar" :src="avatar" :alt="name" class="h-7 w-7" />
    <span class="flex flex-wrap items-center font-semibold text-gray-600 dark:text-gray-300" :class="size">
      <span class="mr-1">{{ text }} by </span>
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{ name }}</span>
    </span>
  </div>
</template>
