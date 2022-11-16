<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
const avatarSrc = (await import('@/assets/images/avatar.png')).default;

const events = [
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Dayenu With English Hebrew And Transliteration',
    src: '/_nuxt/assets/images/clip-image.png',
  },
  {
    type: 'video',
    sectionTitle: 'Koreich',
    title: 'Step-By-Step Seder: Step 10, Koreich',
    src: '/_nuxt/assets/images/clip-image.png',
  },
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Dayenu With English Hebrew And Transliteration 2',
    src: '/_nuxt/assets/images/clip-image.png',
  },
  {
    type: 'video',
    sectionTitle: 'Koreich',
    title: 'Step-By-Step Seder: Step 10, Koreich 2',
    src: '/_nuxt/assets/images/clip-image.png',
  },
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Dayenu With English Hebrew And Transliteration 3',
    src: '/_nuxt/assets/images/clip-image.png',
  },
  {
    type: 'video',
    sectionTitle: 'Koreich',
    title: 'Step-By-Step Seder: Step 10, Koreich 3',
    src: '/_nuxt/assets/images/clip-image.png',
  },
];
</script>

<template>
  <div id="upcoming-events" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="mb-[65px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <UIIcon icon="icon-calendar-f" shape="square" class="bg-gradient1 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> Upcoming Events </UIHeading>
        </div>

        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search events by topic, location or keyword" />
      </div>
      <div class="mt-12">
        <Carousel :items-to-show="2" snap-align="start">
          <Slide v-for="event in events" :key="event.title" class="pr-[35px]">
            <UpcomingEventsCard
              :col="6"
              route="#"
              :type="event.type"
              :section-title="event.sectionTitle"
              :title="event.title"
              :src="event.src"
              contributor-name="Haggadot"
              :contributor-avatar="avatarSrc"
              :language-tags="['English', 'Hebrew']"
              :topic-tags="['Chad Gadya', 'Dayenu']" />
          </Slide>

          <template #addons>
            <Pagination class="!mt-[35px]" />
          </template>
        </Carousel>

        <UIButton class="mx-auto mt-[92px] !flex" color="dark" size="xl">
          View All Upcoming Events
          <template #suffix>
            <UIIcon icon="icon-arrow-right text-xl" />
          </template>
        </UIButton>
      </div>
    </UIContainer>
  </div>
</template>
