<template>
  <div class="flex !min-h-[calc(100vh-70px)] bg-tertiary-500 pt-[80px] pb-[80px]">
    <img :src="signInScreenIcon" class="invisible fixed left-[80px] bottom-[73px] max-w-[126px] lg:visible" />
    <div class="m-auto">
      <AuthLogin />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { definePageMeta } from '#imports';

const signInScreenIcon = (await import('@/assets/svg/login-screen-icon.svg')).default;

definePageMeta({ layout: 'auth' });
</script>
