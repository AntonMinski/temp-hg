<script lang="ts" setup>
type CategoryPillActiveColor = 'primary' | 'secondary' | 'tertiary';
type CategoryPillSize = 'sm' | 'md';

interface Props {
  isActive: boolean;
  activeColor?: CategoryPillActiveColor;
  size?: CategoryPillSize;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  activeColor: 'primary',
  size: 'md',
});

const activeColors: Record<CategoryPillActiveColor, string> = {
  primary: 'bg-gradient1 dark:!text-gray-800',
  secondary: '!bg-secondary-500',
  tertiary: '!bg-tertiary-500',
};

const activeColor = computed<string>(() => activeColors[props.activeColor]);

const sizes: Record<CategoryPillSize, string> = {
  sm: 'h-[37px] px-3 text-sm font-semibold',
  md: 'h-10 px-5 font-semibold',
};

const size = computed<string>(() => sizes[props.size]);
</script>

<template>
  <UIButton :class="[isActive ? activeColor : null, size]" color="light" :size="size" pill >
    <slot />
  </UIButton>
</template>
