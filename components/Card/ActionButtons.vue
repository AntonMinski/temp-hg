<script lang="ts" setup>
import { useVModel } from '@vueuse/core';

interface Props {
  index: string | number | symbol;
  isAddedToBookmark: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isAddedToBookmark: false,
});
const emit = defineEmits(['update:isAddedToBookmark']);

const isAddedToBookmark = useVModel(props, 'isAddedToBookmark', emit);

function handleAddToBookmark(): void {
  isAddedToBookmark.value = !isAddedToBookmark.value;
}
</script>

<template>
  <UIButtonGroup>
    <UIButton
      class="!h-auto !p-2.5"
      :class="
        isAddedToBookmark
          ? 'border-tertiary-300 bg-tertiary-500'
          : 'hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400'
      "
      color="link"
      outline
      :data-tooltip-target="`tooltip-bookmark-${String(index)}`"
      @click="handleAddToBookmark">
      <UIIcon :icon="isAddedToBookmark ? 'icon-bookmark-remove' : 'icon-bookmark-add'" class="!text-base" />
    </UIButton>
    <UITooltip :id="`tooltip-bookmark-${String(index)}`">
      {{ isAddedToBookmark ? 'Remove Bookmark' : 'Add to Bookmark' }}
    </UITooltip>

    <UIButton
      class="!h-auto !p-2.5 hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400"
      color="link"
      :data-tooltip-target="`tooltip-download-${String(index)}`"
      outline>
      <UIIcon icon="icon-download" class="!text-base" />
    </UIButton>
    <UITooltip :id="`tooltip-download-${String(index)}`"> Download </UITooltip>

    <UITooltip :id="`tooltip-share-${String(index)}`"> Share </UITooltip>
    <UIButton
      class="!h-auto !p-2.5 hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400"
      color="link"
      :data-tooltip-target="`tooltip-share-${String(index)}`"
      outline>
      <UIIcon icon="icon-share" class="!text-base" />
    </UIButton>
  </UIButtonGroup>
</template>
