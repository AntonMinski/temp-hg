<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ref } from 'vue';

interface Props {
  index: string | number | symbol;
  group?: boolean;
  bookmark?: boolean;
  download?: boolean;
  share?: boolean;
  isAddedToBookmark?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  group: true,
  bookmark: true,
  download: true,
  share: true,
  isAddedToBookmark: false,
});

const emit = defineEmits(['update:isAddedToBookmark', 'add-to-bookmark', 'remove-from-bookmark', 'download', 'share']);

function handleAddToBookmark(): void {
  if (!props.isAddedToBookmark) {
    emit('add-to-bookmark');
  } else {
    emit('remove-from-bookmark');
  }
}
</script>

<template>
  <UIButtonGroup :class="{ 'space-x-2.5': !group }">
    <UIButton
      v-if="bookmark"
      class="!h-auto !p-2.5"
      :class="[
        isAddedToBookmark
          ? 'border-tertiary-300 bg-tertiary-500'
          : 'hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400',
        { '!rounded-r-lg !border-r !py-0': !group },
      ]"
      color="link"
      outline
      :data-tooltip-target="`tooltip-bookmark-${String(index)}`"
      @click="handleAddToBookmark">
      <span class="flex h-full" :class="group ? 'items-center' : 'items-stretch'">
        <span
          v-if="!group"
          class="mr-2.5 flex items-center border-r border-gray-300 py-2.5 pl-1.5 pr-4 text-sm !leading-none dark:border-gray-700">
          Bookmark
        </span>
        <UIIcon
          :icon="isAddedToBookmark ? 'icon-bookmark-remove' : 'icon-bookmark-add'"
          class="!text-base"
          :class="{ 'py-2.5': !group }" />
      </span>
    </UIButton>
    <UITooltip v-if="group" :id="`tooltip-bookmark-${String(index)}`">
      {{ isAddedToBookmark ? 'Remove Bookmark' : 'Add to Bookmark' }}
    </UITooltip>

    <UIButton
      v-if="download"
      class="!h-auto !p-2.5 hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400"
      :class="{ '!rounded-lg !border-r !py-0': !group }"
      color="link"
      :data-tooltip-target="`tooltip-download-${String(index)}`"
      outline
      @click="emit('download')">
      <span class="flex h-full" :class="group ? 'items-center' : 'items-stretch'">
        <span
          v-if="!group"
          class="mr-2.5 flex items-center border-r border-gray-300 py-2.5 pl-1.5 pr-4 text-sm !leading-none dark:border-gray-700">
          Download
        </span>
        <UIIcon icon="icon-download" class="!text-base" :class="{ 'py-2.5': !group }" />
      </span>
    </UIButton>
    <UITooltip v-if="group" :id="`tooltip-download-${String(index)}`"> Download </UITooltip>

    <UITooltip v-if="group" :id="`tooltip-share-${String(index)}`"> Share </UITooltip>
    <UIButton
      v-if="share"
      class="!h-auto !p-2.5 hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400"
      :class="{ '!rounded-l-lg !py-0': !group }"
      color="link"
      :data-tooltip-target="`tooltip-share-${String(index)}`"
      outline
      @click="emit('share')">
      <span class="flex h-full" :class="group ? 'items-center' : 'items-stretch'">
        <span
          v-if="!group"
          class="mr-2.5 flex items-center border-r border-gray-300 py-2.5 pl-1.5 pr-4 text-sm !leading-none dark:border-gray-700">
          Share
        </span>
        <UIIcon icon="icon-share" class="!text-base" :class="{ 'py-2.5': !group }" />
      </span>
    </UIButton>
  </UIButtonGroup>
</template>
