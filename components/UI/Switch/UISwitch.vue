<template>
  <div
    class="relative flex h-5 w-9 cursor-pointer items-center rounded-[40px]"
    :class="isToggle ? 'bg-tertiary-500' : 'bg-gray-300'"
    @click="change()">
    <div
      class="absolute h-4 w-4 rounded-full bg-white transition-all"
      :class="isToggle ? 'left-[18px]' : 'left-0.5'"></div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
});

const isToggle: Ref<boolean> = ref(props.checked || false);
const emit = defineEmits(['change']);

const change = () => {
  isToggle.value = !isToggle.value;
  emit('change');
};
</script>
