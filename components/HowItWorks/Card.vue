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
      class="mb-14 shadow-[0_100px_80px_rgba(0,0,0,0.07),0_41.7776px_33.4221px_rgba(0,0,0,0.0503198),0_22.3363px_17.869px_rgba(0,0,0,0.0417275),0_12.5216px_10.0172px_rgba(0,0,0,0.035),0_6.6501px_5.32008px_rgba(0,0,0,0.0282725),0_2.76726px_2.21381px_rgba(0,0,0,0.0196802)]" />

    <UIBadge class="mb-5 uppercase">{{ label }}</UIBadge>

    <UIHeading :level="6" class="mb-2 text-white">
      {{ title }}
    </UIHeading>

    <p>{{ paragraph }}</p>
  </div>
</template>
