<template>
  <div
    class="flex h-[40px] w-full items-center hover:bg-tertiary-50 my-px"
    :class="{ 'bg-tertiary-50': item.selected }">
    <input
      v-if="type === 'checkbox'"
      type="checkbox"
      v-model="selected"
      class="ml-4 mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0" />
    <span :key="key" class="text-sm" :class="{ 'text-tertiary-700': item.selected }">{{ item.name }}</span>
  </div>
</template>
<script lang="ts" setup>
import { DropdownItem } from './types';
import { computed, PropType, Ref, ref } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  item: {
    type: Object as PropType<DropdownItem>,
  },
  type: {
    type: String as PropType<'text' | 'checkbox' | 'group'>,
    default: 'checkbox',
  },
  modelValue: {
    type: Array as PropType<string[]>,
  },
});
const key: Ref<number> = ref(0);

const selected = computed({
  get: () => selectedItems.value.includes(props.item.handle),
  set: (value) => {
    if (value) {
      selectedItems.value.push(props.item.handle);
    } else {
      selectedItems.value = selectedItems.value.filter((item) => item !== props.item.handle);
    }
    // key.value++;
  },
});

const emit = defineEmits(['update:modelValue']);
const selectedItems: Ref<string[]> = useVModel(props, 'modelValue', emit);
</script>
