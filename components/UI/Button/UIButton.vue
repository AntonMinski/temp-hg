<template>
  <flowbite-themable-child
    :tag="tag"
    :apply="appliableTheme"
    class="justify-center space-x-2.5"
    :class="wrapperClasses"
    :disabled="disabled">
    <div v-if="!isOutlineGradient && ($slots.prefix || loadingPrefix)" class="-mt-0.5 inline-flex">
      <!--automatically add mr class if slot provided or loading -->
      <UISpinner v-if="loadingPrefix" :color="spinnerColor" :size="spinnerSize" />
      <slot v-else name="prefix" />
    </div>

    <span :class="spanClasses">
      <div v-if="isOutlineGradient && ($slots.prefix || loadingPrefix)" class="-mt-0.5 inline-flex">
        <!--if outline gradient - need to place slots inside span -->
        <UISpinner v-if="loadingPrefix" :color="spinnerColor" :size="spinnerSize" />
        <slot v-else name="prefix" />
      </div>

      <slot />

      <div v-if="isOutlineGradient && ($slots.suffix || loadingSuffix)" class="-mt-0.5 inline-flex">
        <!--if outline gradient - need to place slots inside span -->
        <UISpinner v-if="loadingSuffix" :color="spinnerColor" :size="spinnerSize" />
        <slot v-else name="suffix" />
      </div>
    </span>

    <div v-if="!isOutlineGradient && ($slots.suffix || loadingSuffix)" class="-mt-0.5 inline-flex">
      <!--automatically add ml class if slot provided or loading -->
      <UISpinner v-if="loadingSuffix" :color="spinnerColor" :size="spinnerSize" />
      <slot v-else name="suffix" />
    </div>
  </flowbite-themable-child>
</template>
<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import type { PropType } from 'vue';
import { useButtonClasses } from './composables/useButtonClasses';
import { useButtonSpinner } from './composables/useButtonSpinner';
import type { ButtonGradient, ButtonMonochromeGradient, ButtonSize, ButtonVariant } from './types';
import FlowbiteThemableChild from '~/components/utils/FlowbiteThemable/components/FlowbiteThemableChild/FlowbiteThemableChild.vue';

import type { ThemableChildrenApply } from '~/components/utils/FlowbiteThemable/components/FlowbiteThemableChild/types';
const props = defineProps({
  tag: {
    type: [String, Object],
    default: 'button',
  },
  color: {
    type: String as PropType<ButtonVariant>,
    default: 'primary',
  },
  gradient: {
    type: [String, null] as PropType<ButtonGradient | null>,
    default: null,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md',
  },
  shadow: {
    type: [String, null] as PropType<ButtonMonochromeGradient | '' | null>,
    default: null,
  },
  pill: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingPosition: {
    type: String as PropType<'suffix' | 'prefix'>,
    default: 'prefix',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isOutlineGradient = computed(() => props.outline && props.gradient);

const loadingPrefix = computed(() => props.loading && props.loadingPosition === 'prefix');
const loadingSuffix = computed(() => props.loading && props.loadingPosition === 'suffix');

const { wrapperClasses, spanClasses } = useButtonClasses(toRefs(props));
const { color: spinnerColor, size: spinnerSize } = useButtonSpinner(toRefs(props));

const appliableTheme = computed<ThemableChildrenApply[]>(() => {
  if (['alternative', 'light'].includes(props.color)) return [];
  return ['background', 'hover', 'focus'];
});
</script>
