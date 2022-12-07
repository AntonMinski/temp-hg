<template>
  <UIContainer>
    <div class="mt-[105px] mb-[95px] flex flex-col items-center justify-center py-[115px]">
      <img :src="restrictedAccessIcon" alt="Restricted access icon" class="h-auto w-[180px]" />
      <UIHeading :level="3" class="mt-[39px] !text-3xl !leading-[45px] text-tertiary-600">
        Access restricted for this Haggadah
      </UIHeading>
      <p class="mt-[5px] text-lg text-gray-800">This Haggadah is private and require access from the contributor.</p>
      <div class="mt-[39px]">
        <UIButton color="gray" class="!leading-[27px] hover:bg-gray-700">Request access</UIButton>
      </div>
    </div>
  </UIContainer>
</template>

<script lang="ts" setup>
const restrictedAccessIcon = (await import('@/assets/svg/Eye.svg')).default;
</script>
