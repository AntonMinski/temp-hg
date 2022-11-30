<template>
  <UICard
    class="relative z-50 mb-[-50px] mt-16"
    variant="horizontal-full"
    content-classes="flex flex-col items-center w-full !p-6 !overflow-visible">
    <div id="filter-heading" class="mb-6 flex items-center">
      <img src="~/assets/images/clips-filter.png" alt="Filter clips" />
      <span class="ml-1.5">{{ groupHeading }}</span>
    </div>
    <div
      id="filter-dropdown-group"
      class="flex-wap mt-6 flex w-full flex-col flex-wrap items-center justify-around lg:flex-row">
      <UIFilterDropdown
        v-model="dropdown1Selected"
        v-model:child="dropdown1SelectedChild"
        class="flex-grow px-2"
        :text="dropdown1Text"
        :items="dropdown1Items" />

      <UIFilterDropdown
        v-model="dropdown2Selected"
        v-model:child="dropdown2SelectedChild"
        class="flex-grow px-2"
        :text="dropdown2Text"
        :items="dropdown2Items"
        menu-type="group" />
      <UIFilterDropdown
        v-model="dropdown3Selected"
        v-model:child="dropdown3SelectedChild"
        class="flex-grow px-2"
        :text="dropdown3Text"
        :items="dropdown3Items" />
      <UIButton
        gradient="gradient1"
        class="mx-2 !mt-2 flex min-w-[128px] items-center lg:mt-0"
        size="md"
        @click="emit('applyFilters')"
        >Apply filter</UIButton
      >
      <UIButton
        v-if="hasFilters"
        class="mx-2 !mt-2 flex min-w-[128px] items-center lg:mt-0"
        size="md"
        @click="clearFilters"
        >Clear</UIButton
      >
    </div>
  </UICard>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useRouter } from '#app';

const props = defineProps({
  groupHeading: {
    type: String,
    required: true,
  },
  pageAddress: {
    type: String,
    required: true,
  },
  dropdown1Text: {
    type: String,
    required: true,
  },
  dropdown2Text: {
    type: String,
    required: true,
  },
  dropdown3Text: {
    type: String,
    required: true,
  },
  dropdown1Items: {
    type: Array,
    required: true,
  },
  dropdown2Items: {
    type: Array,
    required: true,
  },
  dropdown3Items: {
    type: Array,
    required: true,
  },
  dropdown1Selected: {
    type: Array,
    required: true,
  },
  dropdown2Selected: {
    type: Array,
    required: true,
  },
  dropdown3Selected: {
    type: Array,
    required: true,
  },
  dropdown1SelectedChild: {
    type: Array,
    default: () => [],
  },
  dropdown2SelectedChild: {
    type: Array,
    default: () => [],
  },
  dropdown3SelectedChild: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'update:dropdown1Selected',
  'update:dropdown2Selected',
  'update:dropdown3Selected',
  'update:dropdown1SelectedChild',
  'update:dropdown2SelectedChild',
  'update:dropdown3SelectedChild',
  'applyFilters',
  'clearFilters',
]);
const dropdown1Selected = useVModel(props, 'dropdown1Selected', emit);
const dropdown2Selected = useVModel(props, 'dropdown2Selected', emit);
const dropdown3Selected = useVModel(props, 'dropdown3Selected', emit);
const dropdown1SelectedChild = useVModel(props, 'dropdown1SelectedChild', emit);
const dropdown2SelectedChild = useVModel(props, 'dropdown2SelectedChild', emit);
const dropdown3SelectedChild = useVModel(props, 'dropdown3SelectedChild', emit);

function clearFilters(): void {
  dropdown1Selected.value = [];
  dropdown2Selected.value = [];
  dropdown3Selected.value = [];
  dropdown1SelectedChild.value = [];
  dropdown2SelectedChild.value = [];
  dropdown3SelectedChild.value = [];
  emit('clearFilters');
}

async function applyFilters(): Promise<void> {
  emit('applyFilters');
}

const hasFilters: ComputedRef<Boolean> = computed(() => {
  return (
    dropdown1Selected.value.length > 0 ||
    dropdown2Selected.value.length > 0 ||
    dropdown3Selected.value.length > 0 ||
    dropdown1SelectedChild.value.length > 0 ||
    dropdown2SelectedChild.value.length > 0 ||
    dropdown3SelectedChild.value.length > 0
  );
});
</script>
