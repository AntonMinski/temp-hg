<template>
  <component :is="wrapperType" :class="badgeClasses" :href="href">
    <slot name="icon" />
    <slot name="default" />
  </component>
</template>
<script lang="ts" setup>
import { computed, toRefs, useSlots } from 'vue';
import type { PropType } from 'vue';
import type { BadgeType, BadgeSize } from './types';
import { useBadgeClasses } from './composables/useBadgeClasses';

const props = defineProps({
  type: {
    type: String as PropType<BadgeType>,
    default: 'primary',
  },
  size: {
    type: String as PropType<BadgeSize>,
    default: 'sm',
  },
  href: {
    type: String,
    default: null,
  },
  outline: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const isContentEmpty = computed(() => !slots.default);
const wrapperType = computed(() => (props.href ? 'a' : 'span'));

const { badgeClasses } = useBadgeClasses(toRefs(props), { isContentEmpty });
</script>
