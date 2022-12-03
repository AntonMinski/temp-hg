<template>
  <UIContainer class="py-[95px]">
    <div class="flex justify-between">
      <div class="flex max-w-[678px] gap-x-[26px] align-baseline">
        <div>
          <UIIcon icon="icon-book-f" shape="square" class="flex bg-gradient2 p-[15px] text-[40px] shadow-md" />
        </div>
        <div>
          <span class="block text-lg font-bold leading-none text-gray-600">Haggadahs</span>
          <UIHeading :level="2" class="text-[48px] leading-[72px] !text-gray-900">Comedy Seder</UIHeading>
          <p class="font-normal leading-6 text-gray-800">
            Our favorite clips for a not-so-serious Passover Seder. Parodies, skits, jokes and more!
          </p>
          <div class="flex items-center gap-x-5">
            <div class="mt-3.5 flex items-center space-x-2">
              <UIIcon icon="icon-book-o" class="text-lg text-secondary-600" />
              <span class="text-sm font-semibold leading-[21px] text-gray-600 dark:text-gray-100">10 minutes read</span>
            </div>
            <div class="mt-3.5 flex items-center space-x-2">
              <UIIcon icon="icon-like" class="text-lg text-primary-700" />
              <span class="text-sm font-semibold leading-[21px] text-gray-600 dark:text-gray-100">Give a Like</span>
            </div>
          </div>
          <div class="flex items-center gap-[18px]">
            <div>
              <UITags
                :tags="topics"
                type="tertiary"
                outline
                tag-class="h-[22px] py-[5px] px-2"
                class="mt-6 gap-[3px]" />
            </div>
            <div>
              <UITags
                :tags="categories"
                type="accent-yellow"
                size="md"
                tag-class="h-[26px] py-1.5 px-3 !text-gray-700"
                class="mt-6 gap-[3px]" />
            </div>
          </div>
          <div class="mt-3.5 pt-[15px]">
            <UIHeading :level="6" class="text-[16px] leading-[24px] !text-gray-600">Note</UIHeading>
            <p class="font-normal leading-6 text-gray-800">
              Lorem ipsum dolor sit amet consectetur. Neque erat ipsum posuere et cras netus lorem.
            </p>
          </div>
        </div>
      </div>
      <div class="flex w-full max-w-[398px] flex-col justify-center">
        <UIButton gradient="gradient1" class="h-[55px] text-lg">
          <UIIcon icon="icon-document" class="mr-2.5" /> Customize this Haggadah
        </UIButton>
        <UIButton class="mt-[18px]" color="dark" outline>
          <UIIcon icon="icon-edit" class="mr-2.5" /> Edit Haggadah
        </UIButton>
        <BlockActionButtons :group="false" :index="1" class="mt-[30px]" />
      </div>
    </div>
  </UIContainer>
</template>

<script lang="ts" setup>
const topics = ['Trending', 'Humanity'];
const categories = ['Chad Gadya', 'Dayenu'];
</script>
