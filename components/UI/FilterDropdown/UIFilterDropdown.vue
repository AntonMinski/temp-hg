<template>
  <UIDropdown
    text="Haggadah Section"
    color="gray"
    class="my-2 w-[350px] max-w-[50%] !border-gray-200"
    outline
    keep-open>
    <template #trigger>
      <UIButton
        class="w-full justify-between !rounded-full"
        prop-span-classes="truncate !block"
        color="gray"
        size="md"
        :outline="reverseStyles">
        {{ text }}
        <span class="text-accent-yellow-500">&nbsp;{{ selectedItemsPreview }}</span>
        <template #suffix>
          <UIIcon v-if="selectedParentItems.length" class="mr-1" icon="icon-cancel-f" @click.stop="resetFilter" />
          <UIIcon icon="icon-arrow-down" />
        </template>
      </UIButton>
    </template>
    <template #default>
      <UICard class="min-w-[250px] py-1" content-classes="p-0">
        <UIDropdownMenuItem
          v-for="parentItem in items"
          :key="parentItem.handle"
          :item="parentItem"
          v-model="selectedParentItems"
          :type="menuType">
          <template #child>
            <UIDropdownMenuItem
              v-for="childItem in parentItem.child"
              :key="childItem.handle"
              :item="childItem"
              v-model="selectedChildItems"
              :type="menuType"
              grouping="child">
            </UIDropdownMenuItem>
          </template>
        </UIDropdownMenuItem>
      </UICard>
    </template>
  </UIDropdown>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, PropType, Ref } from 'vue';
import { DropdownItem, DropdownItemParent, MenuType } from '~/components/UI/Dropdown/types';
import { useVModel } from '@vueuse/core';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  items: {
    type: Array as PropType<DropdownItem[] | DropdownItemParent[]>,
  },
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  child: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  menuType: {
    type: String as PropType<MenuType>,
    default: 'checkbox',
  },
});
const emit = defineEmits(['update:modelValue', 'update:child']);
const selectedParentItems: Ref<string[]> = useVModel(props, 'modelValue', emit);
const selectedChildItems: Ref<string[]> = useVModel(props, 'child', emit);

const selectedItemsPreview: ComputedRef<string> = computed(() => {
  const parents = selectedParentItems.value.map(
    (selectedItem) => props.items.find((item) => item.handle === selectedItem).name
  );
  const children = selectedChildItems.value.map(
    (selectedItem) =>
      props.items
        .map((item) => item.child)
        .flat()
        .find((item) => item.handle === selectedItem).name
  );
  return [...parents, ...children].join(', ');
});

function resetFilter(): void {
  selectedParentItems.value = [];
  selectedChildItems.value = [];
}

const reverseStyles: ComputedRef<Boolean> = computed(() => {
  return !selectedParentItems.value.length && !selectedChildItems.value.length;
});
</script>
