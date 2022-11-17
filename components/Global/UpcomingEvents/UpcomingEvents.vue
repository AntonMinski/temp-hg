<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
const avatarSrc = (await import('@/assets/images/avatar.png')).default;

const events = [
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Outdoor Yoga at Golden Gate Park',
    src: '/_nuxt/assets/images/clip-image.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officiis cupiditate possimus necessitatibus incidunt, praesentium et veritatis omnis aliquid nam dignissimos in odit numquam inventore eaque dolor animi qui suscipit.',
    day: 'Wednesday',
    date: 'May 31',
    time: '2:00 pm - 4:00 pm (EDT)',
    location: 'Golden Gate Park • San Francisco, CA',
    contributorName: 'Custom & Craft',
    contributorInitials: 'CC',
    totalAttendees: 11,
    attendeesCount: 9,
    isAttending: false,
  },
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Outdoor Yoga at Golden Gate Park',
    src: '/_nuxt/assets/images/clip-image.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officiis cupiditate possimus necessitatibus incidunt, praesentium et veritatis omnis aliquid nam dignissimos in odit numquam inventore eaque dolor animi qui suscipit.',
    day: 'Wednesday',
    date: 'May 31',
    time: '2:00 pm - 4:00 pm (EDT)',
    location: 'Golden Gate Park • San Francisco, CA',
    contributorName: 'Custom & Craft',
    contributorInitials: 'CC',
    totalAttendees: 11,
    attendeesCount: 9,
    isAttending: true,
  },
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Outdoor Yoga at Golden Gate Park',
    src: '/_nuxt/assets/images/clip-image.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officiis cupiditate possimus necessitatibus incidunt, praesentium et veritatis omnis aliquid nam dignissimos in odit numquam inventore eaque dolor animi qui suscipit.',
    day: 'Wednesday',
    date: 'May 31',
    time: '2:00 pm - 4:00 pm (EDT)',
    location: 'Golden Gate Park • San Francisco, CA',
    contributorName: 'Custom & Craft',
    contributorInitials: 'CC',
    totalAttendees: 11,
    attendeesCount: 9,
    isAttending: false,
  },
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Outdoor Yoga at Golden Gate Park',
    src: '/_nuxt/assets/images/clip-image.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officiis cupiditate possimus necessitatibus incidunt, praesentium et veritatis omnis aliquid nam dignissimos in odit numquam inventore eaque dolor animi qui suscipit.',
    day: 'Wednesday',
    date: 'May 31',
    time: '2:00 pm - 4:00 pm (EDT)',
    location: 'Golden Gate Park • San Francisco, CA',
    contributorName: 'Custom & Craft',
    contributorInitials: 'CC',
    totalAttendees: 11,
    attendeesCount: 9,
    isAttending: false,
  },
  {
    type: 'text',
    sectionTitle: 'Maggid - Beginning',
    title: 'Outdoor Yoga at Golden Gate Park',
    src: '/_nuxt/assets/images/clip-image.png',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officiis cupiditate possimus necessitatibus incidunt, praesentium et veritatis omnis aliquid nam dignissimos in odit numquam inventore eaque dolor animi qui suscipit.',
    day: 'Wednesday',
    date: 'May 31',
    time: '2:00 pm - 4:00 pm (EDT)',
    location: 'Golden Gate Park • San Francisco, CA',
    contributorName: 'Custom & Craft',
    contributorInitials: 'CC',
    totalAttendees: 11,
    attendeesCount: 9,
    isAttending: false,
  },
];

const locations = ['San Francisco', 'Chicago', 'New York', 'Los Angelss', 'more...'];
const topics = ['Cooking', 'Seder', 'Karaoke', 'more...'];
</script>

<template>
  <div id="upcoming-events" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="items-center justify-between space-y-12 lg:flex lg:space-y-0">
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

      <div class="mt-6.5 flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <div class="inline-flex items-center space-x-[15px]">
          <span>See Events in</span>
          <NuxtLink
            v-for="location in locations"
            :key="location"
            to="#"
            class="font-semibold text-secondary-500 hover:text-secondary-700">
            {{ location }}
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
            <GlobalUpcomingEventsCard
              :col="6"
              route="#"
              :section-title="event.sectionTitle"
              :title="event.title"
              :src="event.src"
              :text="event.text"
              :day="event.day"
              :date="event.date"
              :time="event.time"
              :location="event.location"
              :contributor-name="event.contributorName"
              :contributor-initials="event.contributorInitials"
              :contributor-avatar="avatarSrc"
              :user-tags="['Fitness', 'Outdoor']"
              :total-attendees="event.totalAttendees"
              :attendees-count="event.attendeesCount"
              :is-attending="event.isAttending" />
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
