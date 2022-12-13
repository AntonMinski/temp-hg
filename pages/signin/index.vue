<template>
  <div class="relative bg-tertiary-500 pt-[120px] pb-36">
    <img :src="signinScreenIcon" class="invisible absolute left-[80px] bottom-[73px] max-w-[126px] lg:visible" />
    <FormsLogin />
  </div>
</template>

<script lang="ts" setup>
const signinScreenIcon = (await import('@/assets/svg/login-screen-icon.svg')).default;
</script>
