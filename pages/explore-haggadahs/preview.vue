<template>
  <div>
    <ExploreHaggadahsPreviewHeader />
    <div class="bg-tertiary-500 py-6">
      <UIContainer>
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="mr-3">
              <img :src="Avatar" alt="Avatar" class="h-12 w-12" />
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-xs text-white">Contributed by</span>
              <UIHeading :level="6" class="!text-white">Esther Kustanowitz</UIHeading>
              <span class="text-xs text-white">212 Followers • 12 Haggadahs • 26 Clips</span>
            </div>
          </div>
          <div class="flex w-[411px] items-center">
            <UIButton class="mr-4 w-full bg-accent-yellow-500 text-gray-900 hover:bg-accent-yellow-600">
              Follow Contributor
            </UIButton>
            <UIButton color="light" class="w-full border bg-transparent text-white hover:bg-white hover:text-gray-900">
              View Profile
            </UIButton>
          </div>
        </div>
      </UIContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
const Avatar = (await import('@/assets/images/avatar.png')).default;
</script>
