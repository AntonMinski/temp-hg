<script lang="ts" setup>
type TooltipVariant = 'primary' | 'secondary' | 'gray';
type TooltipSize = 'sm' | 'default';

interface Props {
  color?: TooltipVariant;
  size?: TooltipSize;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'gray',
  size: 'default',
});

const colors: Record<TooltipVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  gray: 'bg-gray-700',
};

const sizes: Record<TooltipSize, string> = {
  sm: 'text-xs px-3 py-2',
  default: 'text-sm px-3 py-2.5',
};

const color = computed<string>(() => colors[props.color]);
const size = computed<string>(() => sizes[props.size]);
</script>

<template>
  <div
    role="tooltip"
    class="tooltip invisible absolute z-10 inline-block rounded-lg font-semibold !leading-none text-white opacity-0 shadow-sm transition-opacity duration-300"
    :class="[color, size]">
    <slot />
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>
