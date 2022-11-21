<script lang="ts" setup>
interface Props {
  route: string;
  title: string;
  titleClass: string;
  text: string;
  linkText: string;
  bgSvg?: string;
  bgSvgClass?: string;
  iconSvg?: string;
  iconSvgClass?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl bg-gray-50 p-[50px] dark:bg-gray-700 xl:p-[100px]">
    <img v-if="bgSvg" :src="bgSvg" class="absolute z-0" :class="bgSvgClass" />
    <img v-if="iconSvg" :src="iconSvg" class="absolute z-0" :class="iconSvgClass" />
    <div class="relative z-10">
      <UIHeading :level="4" class="text-3xl xl:text-4xl" :class="titleClass"> {{ title }} </UIHeading>
      <p class="mt-[7px] text-gray-700 dark:text-gray-100">
        {{ text }}
      </p>

      <NuxtLink :to="route" class="mt-[22px] flex items-center text-secondary-500 hover:text-secondary-600">
        {{ linkText }}
        <UIIcon icon="icon-arrow-right-curve" class="ml-1.5 text-[26px]" />
      </NuxtLink>
    </div>
  </div>
</template>
