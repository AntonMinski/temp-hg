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
          class="carousel-bullet bg-gray-200 rounded-full w-[13px] h-[13px] mx-[5px] "
          :class="{ 'carousel-bullet !bg-secondary-500': activeSlide === number }"
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
import { computed, ComputedRef, onBeforeUnmount, onMounted, PropType, Ref, ref } from 'vue';
type ScreenSize = 'xsm' | 'sm' | 'md' | 'lg' | 'xl';

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
    type: Object as PropType<{ [key in ScreenSize]: number }>,
  },
});

const key = ref(0);
onMounted(() => {
  getItemsPerRow();
  window.addEventListener('resize', getItemsPerRow);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', getItemsPerRow);
});

const defaultBreakpoints = {
  xsm: 1,
  sm: 1,
  md: 1,
  lg: 2,
  xl: 2,
};

const breakpointValues = {
  xsm: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

function getItemsPerRow() {
  const breakpoints = Object.keys(props.breakpoints).length ? props.breakpoints : defaultBreakpoints;
  const windowWidth = window.innerWidth;
  let activeBreakpoint = 'xsm';
  for (const breakpoint in breakpoints) {
    if (breakpointValues[breakpoint] <= windowWidth) {
      activeBreakpoint = breakpoint;
    }
  }
  itemsPerRow.value = breakpoints[activeBreakpoint];
}

const itemsPerRow = ref(null);

const paginationLength: ComputedRef<number> = computed(() => props.items.length ? Math.ceil(props.items.length / itemsPerRow.value || 2) : 0);
const spacingStyle: ComputedRef<string> = computed(() => `padding: ${2 / itemsPerRow.value || 2}rem`);
const slideWidthStyle: ComputedRef<string> = computed(() => `min-width: ${100 / itemsPerRow.value || 2}%`);
const activeSlide: Ref<number> = ref(1);
const translateWidth: ComputedRef<number> = computed(() => Math.floor(itemsPerRow.value) * 100 / itemsPerRow.value);
const translateX: ComputedRef<string> = computed(() => `transform: translateX(-${(activeSlide.value - 1) * translateWidth.value}%)`);
</script>
