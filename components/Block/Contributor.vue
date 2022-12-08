<script lang="ts" setup>
import { computed } from 'vue';
import { useAsyncData } from '#app';

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
  text: 'Contributed by',
  size: 'md',
});

const colorOptions: string[] = [
  'bg-primary-500',
  'bg-accent-yellow-500',
  'bg-secondary-300',
  'bg-tertiary-500',
  'bg-blue-300',
  'bg-teal-500',
  'bg-success-500',
  'bg-danger-400',
  'bg-pink-500',
];
// const { data: color } = await useAsyncData(async () => {
//   const randomColor = colorOptions[Math.round(Math.random() * (colorOptions.length - 1))];
//   return randomColor;
// });
const initialsColor = colorOptions[Math.round(Math.random() * (colorOptions.length - 1))];
// const initialsColor = props.initialsBgColor || randomColor;
// const initialsColor = color.value;

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
  <div class="inline-flex items-center space-x-2">
    <span
      v-if="initials"
      class="flex flex-none items-center justify-center rounded-full uppercase leading-none text-gray-900"
      :class="initialsColor + ' ' + imageSize + ' ' + imageTextSize">
      {{ initials }}
    </span>
    <img v-else-if="avatar" :src="avatar" :alt="name" :class="imageSize" />
    <div>
      <slot name="heading">
        <span
          v-if="name"
          class="flex flex-wrap items-center font-semibold text-gray-600 dark:text-gray-300"
          :class="size">
          <span class="mr-1">{{ text }}</span>
          <span class="font-semibold text-gray-900 dark:text-gray-100">{{ name }}</span>
        </span>
      </slot>
      <slot name="details" />
    </div>
  </div>
</template>
