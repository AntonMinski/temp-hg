<script lang="ts" setup>
import { computed } from 'vue';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  initials?: string;
  initialsBgColor?: string;
  avatar?: string;
  name?: string;
  text?: string;
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
  initialsBgColor: 'bg-primary-500',
  text: 'Contributed by',
  size: 'md',
});

const sizes: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const imageSizs: Record<Size, string> = {
  sm: 'h-7 w-7',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

const imageTextSizes: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base font-semibold',
};

const size = computed<string>(() => sizes[props.size]);
const imageSize = computed<string>(() => imageSizs[props.size]);
const imageTextSize = computed<string>(() => imageTextSizes[props.size]);
</script>

<template>
  <div class="mt-5 inline-flex items-center space-x-2">
    <span
      v-if="initials"
      class="flex flex-none items-center justify-center rounded-full uppercase leading-none text-gray-900"
      :class="initialsBgColor + ' ' + imageSize + ' ' + imageTextSize">
      {{ initials }}
    </span>
    <img v-else-if="avatar" :src="avatar" :alt="name" :class="imageSize" />
    <span v-if="name" class="flex flex-wrap items-center font-semibold text-gray-600 dark:text-gray-300" :class="size">
      <span class="mr-1">{{ text }}</span>
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{ name }}</span>
    </span>
  </div>
</template>
