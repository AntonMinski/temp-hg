<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
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
  {
    type: 'video',
    sectionTitle: 'Koreich',
    title: 'Step-By-Step Seder: Step 10, Koreich',
    src: '/_nuxt/assets/images/clip-image.png',
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
  <div id="favourite-clips" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="mb-[65px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <UIIcon icon="icon-media-image-f" shape="square" class="bg-gradient3 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> Our Favourites Clips </UIHeading>
        </div>

        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search clips by keyword or topic" />
      </div>

      <div class="w-full items-start xl:flex">
        <div class="flex w-full flex-shrink-0 flex-row overflow-x-auto xl:w-[211px] xl:flex-col">
          <div class="flex flex-row flex-nowrap space-x-4 xl:flex-col xl:space-x-0 xl:space-y-[15px]">
            <BlockCategoryPill
              v-for="category in categories"
              :key="category"
              :is-active="selectedCategory == category"
              @click="selectedCategory = category">
              {{ category }}
            </BlockCategoryPill>
          </div>
        </div>
        <div class="mt-12 flex-1 overflow-hidden xl:mt-0 xl:ml-[50px]">
          <Carousel
            :items-to-show="1"
            snap-align="center"
            :breakpoints="{
              640: { itemsToShow: 2, snapAlign: 'start' },
              1024: { itemsToShow: 2.6, snapAlign: 'start' },
              1280: { itemsToShow: 2.2, snapAlign: 'start' },
            }">
            <Slide v-for="clip in clips" :key="clip.title">
              <ClipCard
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
            </Slide>

            <template #addons>
              <Pagination />
            </template>
          </Carousel>

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
