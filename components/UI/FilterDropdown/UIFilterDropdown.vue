<template>
  <UIDropdown text="Haggadah Section" color="gray" class="my-2 w-[350px] !border-gray-200" outline keep-open>
    <template #trigger>
      <UIButton class="w-full max-w-[350px] justify-between !rounded-full" color="gray" size="md" :outline="!selectedItems.length">
        {{ text }}
        <template #suffix>
          <UIIcon icon="icon-arrow-down" />
        </template>
      </UIButton>
    </template>
    <template #default>
      <UICard class="min-w-[250px] py-1" content-classes="p-0">
        <UIDropdownMenuItem v-for="item in items" :key="item.handle" :item="item" v-model="selectedItems" />
      </UICard>
    </template>
  </UIDropdown>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, PropType, Ref } from 'vue';
import { DropdownItem } from '~/components/UI/Dropdown/types';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  items: {
    type: Array as PropType<DropdownItem[]>,
  },
  modelValue: {
    type: Array as PropType<string[]>,
  },
});
const emit = defineEmits(['update:modelValue']);
const selectedItems: Ref<string[]> = useVModel(props, 'modelValue', emit);

const reverseStyles: ComputedRef<boolean> = computed(() => {
  return !!selectedItems.value.length;
});
</script>
