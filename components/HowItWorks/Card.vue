<script lang="ts" setup>
interface Props {
  title: string;
  paragraph: string;
  image: string;
  label: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <img
      :src="image"
      :alt="label"
      class="mb-14" />

    <UIBadge class="mb-5 uppercase">{{ label }}</UIBadge>

    <UIHeading :level="6" class="mb-2 !text-white">
      {{ title }}
    </UIHeading>

    <p>{{ paragraph }}</p>
  </div>
</template>
