<template>
  <div class="pt-32">
    <UIContainer>
      <div class="text-center">
        <span class="text-2xl font-semibold text-gray-800">
          <span class="text-secondary-500">04</span> results found
        </span>
        <UIHeading :level="2" class="!text-4xl !leading-[54px] text-gray-900">
          For search keyword <span class="text-secondary-500">Comedy</span>
        </UIHeading>
        <div class="mt-[54px] flex justify-center">
          <UIBadge
            v-for="tag in tags"
            :key="tag"
            type="gray"
            class="mr-[5px] mb-[5px] !rounded-full !px-[25px] !py-2 text-base"
            :class="tag === 'Everything' ? '!bg-gradient1 !text-white' : '!bg-gray-100 !text-gray-600'"
            size="lg">
            {{ tag }}
          </UIBadge>
        </div>
      </div>
      <div class="mt-[100px]">
        <UIHeading :level="3" class="!text-4xl text-gray-900">
          <UIIcon icon="icon-book-f" shape="square" class="mr-[15px] bg-gradient2 shadow-md" />Haggadahs
        </UIHeading>
        <div class="mt-[26px]">
          <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalHaggadahCard
              v-for="item in items"
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
        <div class="text-center">
          <UIButton class="mx-auto mt-[55px] !px-[45px] !py-3.5" size="lg" color="dark">
            See more haggadahs results <UIIcon icon="icon-arrow-right" size="4" class="ml-2" />
          </UIButton>
        </div>
      </div>
      <div class="mt-20 mb-20">
        <UIHeading :level="3" class="!text-4xl text-gray-900">
          <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Clips
        </UIHeading>
        <div class="mt-[26px]">
          <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalClipCard
              v-for="item in items"
              :key="item"
              handle=""
              type="image"
              section-title="Maggid - Beginning"
              title="Sunflower Seeds On My Seder Plate"
              :src="haggadahsCardImage"
              text=""
              contributor-name="Alison Laichter"
              contributor-initials="AL"
              :contributor-avatar="null"
              :downloads-count="2000"
              :likes-count="10000"
              :language-tags="['English', 'Hebrew']"
              :topic-tags="['Chad Gadya', 'Dayenu']"
              :is-added-to-bookmarks="false"
              class="mx-2" />
          </div>
        </div>
        <div class="text-center">
          <UIButton class="mx-auto mt-[55px] !px-[45px] !py-3.5" size="lg" color="dark">
            See more clips results <UIIcon icon="icon-arrow-right" size="4" class="ml-2" />
          </UIButton>
        </div>
      </div>
    </UIContainer>
  </div>
</template>

<script lang="ts" setup>
const tags = ['Everything', 'haggadahs', 'Clips', 'Events', 'Helpcenter', 'Other'];
const items = [...Array(3).keys()];
const haggadahsCardImage = (await import('@/assets/images/haggadah-card-image.png')).default;
</script>
