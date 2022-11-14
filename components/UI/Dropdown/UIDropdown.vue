<template>
  <div ref="wrapper" class="relative inline-flex">
    <div class="inline-flex w-full items-center">
      <slot-listener @click="onToggle">
        <slot name="trigger">
          <UIButton class="w-full justify-between" :color="color" :size="size" :outline="outline">
            {{ text }}
            <template v-if="!hideIcon" #suffix>
              <svg
                class="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </template>
          </UIButton>
        </slot>
      </slot-listener>
    </div>
    <transition :name="transitionName">
      <div v-if="visible" ref="content" :style="contentStyles" :class="[contentClasses, listClasses]">
        <slot-listener @click="onHide">
          <slot />
        </slot-listener>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';
import type { PropType } from 'vue';
import { onClickOutside } from '@vueuse/core';
import SlotListener from '@/components/utils/SlotListener/SlotListener.vue';
import { ButtonSize, ButtonVariant } from '../Button/types';
import { useDropdownClasses } from './composables/useDropdownClasses';
import type { DropdownPlacement } from './types';

const visible = ref(false);

const onShow = () => (visible.value = true);
const onHide = () => (visible.value = false);
const onToggle = () => (visible.value = !visible.value);

const props = defineProps({
  color: {
    type: String as PropType<ButtonVariant>,
    default: 'dark',
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'md',
  },
  placement: {
    type: String as PropType<DropdownPlacement>,
    default: 'bottom',
  },
  text: {
    type: String,
    default: '',
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  listClasses: {
    type: String,
    default: '',
  },
  transition: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
});

const placementTransitionMap: Record<DropdownPlacement, string> = {
  bottom: 'to-bottom',
  left: 'to-left',
  right: 'to-right',
  top: 'to-top',
};

const transitionName = computed(() => {
  if (props.transition === null) return placementTransitionMap[props.placement];
  return props.transition;
});

const content = ref<HTMLDivElement>();
const wrapper = ref<HTMLDivElement>();

const { contentClasses, contentStyles } = useDropdownClasses({
  placement: toRef(props, 'placement'),
  visible,
  contentRef: content,
});

onClickOutside(wrapper, () => {
  if (!visible.value) return;
  visible.value = false;
});
</script>

<style scoped src="./Dropdown.css"></style>
