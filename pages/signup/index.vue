<template>
  <div class="flex !min-h-[calc(100vh-70px)] bg-[#FF7C5C] pt-[80px] pb-[80px]">
    <img :src="signUpIcon" class="fixed left-[63px] bottom-[66px]" />
    <div class="m-auto">
      <GlobalFormsSignup />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports';

const signUpIcon = (await import('@/assets/svg/sign-up-icon.svg')).default;

definePageMeta({ layout: 'auth' });
</script>
