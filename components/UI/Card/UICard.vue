<template>
  <component :is="wrapperType" :href="href" class="flex flex-col" :class="cardClasses">
    <img
      v-if="imgSrc"
      class="h-[15.875rem] h-auto max-h-[254px] object-cover w-full rounded-t-lg"
      :class="horizontalImageClasses"
      :src="imgSrc"
      :alt="imgAlt" />
    <div class="flex flex-1 flex-col overflow-hidden" :class="contentClasses">
      <slot />
    </div>
  </component>
</template>
<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import type { PropType } from 'vue';
import { useCardsClasses } from './composables/useCardClasses';
import type { CardsVariant } from './types';

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  imgAlt: {
    type: String,
    default: '',
  },
  imgSrc: {
    type: String,
    default: '',
  },
  variant: {
    type: String as PropType<CardsVariant>,
    default: 'default',
  },
  contentClasses: {
    type: String,
    default: 'p-5',
  },
});

const { cardClasses, horizontalImageClasses } = useCardsClasses(toRefs(props));
const wrapperType = computed(() => (props.href ? 'a' : 'div'));
</script>
