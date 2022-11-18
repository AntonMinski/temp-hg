<script lang="ts" setup>
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

const sizes: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
};

const size = computed<string>(() => sizes[props.size]);
</script>

<template>
  <div class="mt-5 inline-flex items-center space-x-2">
    <span
      v-if="initials"
      class="flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs uppercase leading-none text-gray-900"
      :class="initialsBgColor">
      {{ initials }}
    </span>
    <img v-else-if="avatar" :src="avatar" :alt="name" class="h-7 w-7" />
    <span class="flex flex-wrap items-center font-semibold text-gray-600 dark:text-gray-300" :class="size">
      <span class="mr-1">{{ text }} by </span>
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{ name }}</span>
    </span>
  </div>
</template>
