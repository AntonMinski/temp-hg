<template>
  <div class="my-px flex h-[40px] w-full items-center hover:bg-tertiary-50" :class="{ 'bg-tertiary-50': selected }">
    <input
      v-if="type !== 'text'"
      type="checkbox"
      v-model="selected"
      class="ml-4 mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0"
      :class="checkboxClasses" />
    <span :key="key" class="text-sm !text-gray-900" :class="spanClasses">{{ item.name }}</span>
  </div>
  <slot name="child" />
</template>
<script lang="ts" setup>
import { DropdownItem, MenuGrouping, MenuType } from './types';
import { computed, PropType, Ref, ref } from 'vue';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  item: {
    type: Object as PropType<DropdownItem>,
  },
  type: {
    type: String as PropType<MenuType>,
    default: 'checkbox',
  },
  grouping: {
    type: String as PropType<MenuGrouping>,
    default: 'parent',
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

const spanClasses = computed(() => {
  let classes = '';
  if (props.type === 'group' && props.grouping === 'parent') {
    classes += 'font-semibold';
  }
  if (selected.value) {
    classes += ' text-primary-500';
  }
  return classes;
});
const checkboxClasses = computed(() => {
  if (props.type === 'group' && props.grouping === 'child') {
    return 'ml-6';
  }
});
</script>
