<script lang="ts" setup>
import type { Event, EventCategory } from './types';
import { computed, ComputedRef } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import { usePageStore } from '~/store/page';
const pageStore = usePageStore();
import { useGlobalStore } from '~/store/global';
const globalStore = useGlobalStore();
const globalData = computed(() => globalStore.globalData);

const events: ComputedRef<Event[]> = computed(() => pageStore?.homePageData?.events);
const categories: ComputedRef<EventCategory[]> = computed(() => pageStore?.homePageData?.event_categories.slice(0, 5));

async function navigateEvents(searchBy) {
  // Not implemented yet
}

const locations = ['San Francisco', 'Chicago', 'New York', 'Los Angelss', 'more...'];
const topics = ['Cooking', 'Seder', 'Karaoke', 'more...'];

const noApiDataText = 'No Api Data No Api Data No Api Data No Api Data No Api Data No Api Data No Api Data';
</script>

<template>
  <div id="upcoming-events" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="items-center justify-between space-y-12 lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <UIIcon icon="icon-calendar-f" shape="square" class="bg-gradient1 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> {{ globalData?.headings?.events_description }} </UIHeading>
        </div>

        <UISearch
          rules="required"
          redirect-address="/event-search"
          query-key="key"
          placeholder="Search events by topic, location or keyword" />
      </div>

      <div class="mt-7 flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <div class="inline-flex items-center space-x-[15px]">
          <span>See Events in</span>
          <NuxtLink
            v-for="location in categories"
            :key="location.handle"
            to="#"
            class="font-semibold text-secondary-500 hover:text-secondary-700">
            {{ location.area }}
          </NuxtLink>
        </div>

        <div class="inline-flex items-center space-x-[15px]">
          <span>See in Topics</span>
          <NuxtLink v-for="topic in topics" :key="topic" to="#" class="font-semibold text-gray-800 dark:text-white">
            {{ topic }}
          </NuxtLink>
        </div>
      </div>

      <div class="mt-[70px]">
        <Carousel
          :items-to-show="1"
          snap-align="center"
          :breakpoints="{ 1280: { itemsToShow: 2, snapAlign: 'start' } }">
          <Slide v-for="event in events" :key="event.title" class="xl:!px-[17.5px]">
            <GlobalEventCard
              :col="6"
              :text="noApiDataText"
              :contributor-name="event.host"
              :contributor-initials="event.host_initials"
              :contributor-avatar="null"
              :user-tags="['Fitness', 'Outdoor']"
              :total-attendees="0"
              :attendees-count="0"
              :is-attending="false"
              :type="event.type"
              :title="event.title"
              :src="event.cover_image"
              :language-tags="['English', 'Hebrew']"
              :topic-tags="['Chad Gadya', 'Dayenu']"
              :host="event.host"
              section-title="No Api data yet"
              :image-src="event.cover_image"
              :date="event.scheduled_at"
              :location="event.venue"
              :durationl="event.duration"
              :category="event.category" />
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
