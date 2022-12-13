<template>
  <div
    class="relative flex h-5 w-9 cursor-pointer items-center rounded-[40px] bg-tertiary-500"
    @click="isToggle = !isToggle">
    <div
      class="absolute h-4 w-4 rounded-full bg-white transition-all"
      :class="isToggle ? 'left-[18px]' : 'left-0.5'"></div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

const isToggle: Ref<boolean> = ref(false);
</script>
