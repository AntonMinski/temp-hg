<script lang="ts" setup>
import { PropType } from 'vue';

interface ListItem {
  icon: string;
  label: string;
  class?: string;
  action?: Function;
}

const defaultListItems = [
    {
      icon: 'edit',
      label: 'Edit',
      action: () => console.log('Edit'),
    },
    {
      icon: 'duplicate',
      label: 'Remake',
    },
    {
      icon: 'link',
      label: 'Copy Link',
    },
    {
      icon: 'share',
      label: 'Share',
    },
    {
      icon: 'export',
      label: 'Export',
      class: ' ',
    },
    {
      icon: 'delete',
      label: 'Delete',
      class: 'text-danger-500',
    },
];

const props = defineProps({
  listItems: {
    type: Array as PropType<ListItem[]>,
    required: false,
  },
});

const computedListItems = computed(() => props.listItems || defaultListItems);
</script>

<template>
  <UIListGroup>
    <UIListGroupItem
      v-for="(item, key) in computedListItems"
      :key="key"
      :class="item.class || 'border-none'"
      @click="item.action">
      <template #prefix> <UIIcon :icon="`icon-${item.icon} text-lg`" /> </template>
      <span class="mt-0.5">{{ item.label }}</span>
    </UIListGroupItem>
  </UIListGroup>
</template>
