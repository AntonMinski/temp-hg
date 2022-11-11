<script lang="ts" setup>
interface Props {
  to: object | string;
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink :to="to" class="flex w-full items-center space-x-5 rounded-lg border border-gray-300 p-5 pr-20 md:w-auto">
    <Icon :icon="icon" shape="square" :class="iconBgColor" />

    <div>
      <span class="mb-0.5 block text-sm font-semibold text-gray-500">{{ subtitle }}</span>
      <Heading :level="6">{{ title }}</Heading>
    </div>
  </NuxtLink>
</template>
