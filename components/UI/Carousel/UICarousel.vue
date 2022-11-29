<template>
  <div v-if="itemsPerRow" class="flex flex-col justify-center">
    <div id="slide" class="overflow-unset flex flex-nowrap transition-all duration-500" :style="translateX">
      <div v-for="item in items" :key="item" class="flex justify-center" :style="slideWidthStyle">
        <slot name="slide" v-bind:item="item" />
      </div>
    </div>
    <div id="pagination" class="mt-12 flex items-center justify-center">
      <slot name="pagination">
        <button
          class="carousel__pagination-button"
          :class="{ 'carousel__pagination-button--active': activeSlide === number }"
          v-for="number in paginationLength"
          :key="number"
          @click="activeSlide = number" />
      </slot>
    </div>
  </div>
  <div class="my-40 flex justify-center" v-else>
    <UISpinner size="12" />
  </div>

</template>
<script lang="ts" setup>
import { computed, onBeforeMount, onMounted, PropType, Ref, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

const props = defineProps({
  items: Array,
  itemsPerRow: {
    type: Number,
    default: 2,
  },
  duration: {
    type: Number as PropType<75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000>,
    default: 500,
  },
  breakpoints: {
    type: Object as PropType<{ [key: number]: number }>,
  },
});

const key = ref(0);
// useEventListener(window, 'resize', () => {
//   key.value++;
// });

onMounted(() => {
  getItemsPerRow();
  window.addEventListener('resize', () => {
    getItemsPerRow();
  });
});

function getItemsPerRow() {
  if (props.breakpoints) {
    const breakpoints = Object.keys(props.breakpoints).map((key) => parseInt(key));
    const windowWidth = window.innerWidth;
    const items = breakpoints.filter((breakpoint) => windowWidth >= breakpoint);
    const breakpoint = Math.max(...items);
    if (breakpoint || breakpoint === 0) {
      itemsPerRow.value = props.breakpoints[breakpoint];
    }
  } else {
    itemsPerRow.value = props.itemsPerRow;
  }
}
const itemsPerRow = ref(null);

const paginationLength = computed(() => Math.ceil(props.items.length / itemsPerRow.value || 2));
const spacingStyle = computed(() => `padding: ${2 / itemsPerRow.value || 2}rem`);
const slideWidthStyle = computed(() => `min-width: ${100 / itemsPerRow.value || 2}%`);
const activeSlide = ref(1);
const translateX = computed(() => `transform: translateX(-${(activeSlide.value - 1) * 100}%)`);
</script>
