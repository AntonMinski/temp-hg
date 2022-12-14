<template>
  <div class="shadow-3xl m-auto rounded-lg bg-white py-[51px] px-[71px]" :class="width">
    <img :src="sentEmailIcon" class="mx-auto" />
    <UIHeading :level="3" class="mt-3 text-center !text-3xl !leading-[45px] text-gray-900">{{ title }}</UIHeading>
    <p class="mx-auto mb-2.5 max-w-[453px] text-center text-base leading-6 text-gray-700">
      {{ message }}
    </p>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const sentEmailIcon = (await import('@/assets/svg/sent-email-icon.svg')).default;
defineProps({
  title: {
    type: String,
    default: 'Email Sent',
  },
  message: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'max-w-[595px]',
  },
});
</script>
