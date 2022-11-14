<script lang="ts" setup>
const avatarSrc = (await import('@/assets/images/avatar.png')).default;

const categories = ['Identity', 'Wellness', 'Culture', 'Food', 'Entertainment', 'Jewish Movements'];
const selectedCategory = ref(categories[0]);

const clips = [
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Dayenu With English Hebrew And Transliteration',
    text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, aliquid odit consequuntur rerum et nulla natus pariatur ducimus eligendi iusto blanditiis libero ab optio vitae minus dicta. Eveniet, distinctio quaerat!',
  },
  {
    type: 'video',
    sectionTitle: 'Koreich',
    title: 'Step-By-Step Seder: Step 10, Koreich',
    src: '/_nuxt/assets/images/clip-image.png',
  },
];
</script>

<template>
  <div id="favourite-haggadahs" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="mb-[65px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <UIIcon icon="icon-media-image-f" shape="square" class="bg-gradient3 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> Our Favourites Clips </UIHeading>
        </div>

        <UIInput placeholder="Search clips by keyword or topic" class="h-11.5 !rounded-full lg:w-134 lg:pl-5.5">
          <template #suffix>
            <UIButton gradient="gradient1" class="h-8 w-8" square pill>
              <UIIcon icon="icon-search" class="!text-sm !text-gray-900" />
            </UIButton>
          </template>
        </UIInput>
      </div>

      <div class="w-full items-start md:flex">
        <div class="flex w-full flex-shrink-0 flex-row overflow-x-auto md:w-[211px] md:flex-col">
          <div class="flex flex-row flex-nowrap space-x-4 md:flex-col md:space-x-0 md:space-y-[15px]">
            <BlockCategoryPill
              v-for="category in categories"
              :key="category"
              :is-active="selectedCategory == category"
              @click="selectedCategory = category">
              {{ category }}
            </BlockCategoryPill>
          </div>
        </div>
        <div class="mt-12 flex flex-1 flex-col justify-center overflow-hidden md:mt-0 md:ml-[50px]">
          <div class="flex overflow-x-auto">
            <div class="flex flex-nowrap space-x-[19px]">
              <ClipCard
                v-for="clip in clips"
                :key="clip.title"
                route="#"
                :type="clip.type"
                :section-title="clip.sectionTitle"
                :title="clip.title"
                :src="clip.src"
                :text="clip.text"
                contributor-name="Haggadot"
                :contributor-avatar="avatarSrc"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']" />
            </div>
          </div>

          <UIButton class="mx-auto mt-[92px] !flex" color="dark" size="xl">
            Explore more clips
            <template #suffix>
              <UIIcon icon="icon-arrow-right text-xl" />
            </template>
          </UIButton>
        </div>
      </div>
    </UIContainer>
  </div>
</template>
