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
            <UIButton
              color="light"
              class="w-full border !bg-transparent text-white hover:!bg-white hover:text-gray-900">
              View Profile
            </UIButton>
          </div>
        </div>
      </UIContainer>
    </div>
    <div class="pt-[100px]">
      <UIContainer>
        <div class="flex items-center justify-between">
          <UIHeading :level="3" class="!text-3xl">
            Other Haggadahs by <span class="text-secondary-500">Esther Kustanowitz</span>
          </UIHeading>
          <UIButton class="!p-0 !text-sm !leading-[21px] text-gray-700">Show all</UIButton>
        </div>
        <div class="mt-[61px]">
          <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalHaggadahCard
              v-for="item in haggadahs"
              :key="item"
              route="#"
              :img-src="haggadahsCardImage"
              title="10 Minute Dayenu Seder"
              :slug="`haddahs-${item}`"
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
              :read-time="10"
              contributor-name="Haggadahs"
              contributor-initials="HD"
              :contributor-avatar="null"
              :topic-tags="['Trending', 'Humanity']"
              :is-added-to-bookmark="false"
              :is-owner="false"
              :is-liked="false" />
          </div>
        </div>
      </UIContainer>
    </div>
    <div class="pt-[83px] pb-[100px]">
      <UIContainer>
        <div class="flex items-center justify-between">
          <UIHeading :level="4" class="!text-[26px] !leading-[31px]">Similar Topic Related Haggadahs</UIHeading>
          <UIButton class="!p-0 !text-sm !leading-[21px] text-gray-700">Show all</UIButton>
        </div>
        <div class="mt-[34px]">
          <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-1 lg:grid-cols-3">
            <GlobalHaggadahCard
              v-for="item in haggadahs"
              :key="item"
              route="#"
              :img-src="haggadahsCardImage"
              title="10 Minute Dayenu Seder"
              :slug="`haddahs-${item}`"
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
              :read-time="10"
              contributor-name="Haggadahs"
              contributor-initials="HD"
              :contributor-avatar="null"
              :topic-tags="['Trending', 'Humanity']"
              :is-added-to-bookmark="false"
              :is-owner="false"
              :is-liked="false" />
          </div>
        </div>
      </UIContainer>
      <GlobalSharedModal />
    </div>
  </div>
</template>

<script lang="ts" setup>
const haggadahs = [...Array(3).keys()];
const Avatar = (await import('@/assets/images/avatar.png')).default;
const haggadahsCardImage = (await import('@/assets/images/haggadah-card-image.png')).default;
</script>
