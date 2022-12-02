<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <GlobalClipIcon />
        <UIHeading :level="2" class="mt-5">Explore Haggadah Clips</UIHeading>
        <UISearch
          v-model:search-string="searchString"
          rules="required|min:2"
          redirect-address="/explore-haggadahs"
          query-key="key"
          placeholder="Search Haggadahs by keyword or topics"
          size="large"
          class="mt-[25px]"
          :redirect="false"
          @search="emit('search')" />

        <div class="mt-[50px] flex flex-col items-center">
          <span class="text-sm leading-none text-gray-500"> Popular topics </span>

          <div class="mt-[22px] flex flex-wrap space-x-1.5">
            <UIBadge
              v-for="category in popularCategories"
              :key="category.handle"
              size="md"
              type="tertiary-reverse"
              @click="emit('getHaggadahsByCategory', category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>

        <slot name="filterGroup" />
      </UIContainer>
    </div>

    <div class="bg-secondary-500 pt-[140px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <UIHeading :level="4" class="!text-white">Our Favourites Haggadahs</UIHeading>

        <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GlobalHaggadahCard
            v-for="(item, n) in favoriteHaggadahs"
            :key="n"
            route="#"
            :img-src="item.haggadah.haggadah_image"
            :title="item.haggadah.title"
            :slug="item.haggadah.handle"
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
            :read-time="item.haggadah.reading_length || 10"
            :contributor-name="item.haggadah.author"
            :contributor-initials="item.haggadah.author_initials"
            :contributor-avatar="null"
            :language-tags="['Trending', 'Humanity']"
            :topic-tags="['Trending', 'Humanity']"
            :completed-progress="50"
            :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
            :is-added-to-bookmark="item.haggadah.is_bookmarked !== '0'"
            :is-liked="item.haggadah.is_liked !== '0'"
            :download-url="item.haggadah.download_url" />
        </div>

        <UIButton class="mx-auto mt-[90px] !flex" color="link" size="lg">
          View more favourite haggadahs
          <template #suffix>
            <UIIcon icon="icon-arrow-right text-xl" />
          </template>
        </UIButton>
      </UIContainer>
    </div>

    <div class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <template v-if="loading">
      <div class="my-16 flex justify-center">
        <UISpinner size="12" />
      </div>
    </template>

    <template v-else>
      <div class="pb-[51px]">
        <UIContainer>
          <div v-for="(section, key) in haggadahsBySections" class="py-[70px]">
            <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
              <div>
                <UIHeading :level="5">
                  Clips in <span class="text-secondary-500">{{ key }}</span>
                </UIHeading>
                <span class="mt-1 block"> {{ section.total }} Haggadahs • Curated by </span>
              </div>
              <NuxtLink
                to="#"
                class="ml-4 flex-shrink-0">
                Show all</NuxtLink
              >
            </div>

            <div class="mt-[50px]">
              <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                <GlobalHaggadahCard
                  v-for="({ haggadah }, key) in section.books"
                  :key="key"
                  route="#"
                  :img-src="haggadah.haggadah_image"
                  :title="haggadah.title"
                  :slug="haggadah.handle"
                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
                  :read-time="haggadah.reading_length || 10"
                  :contributor-name="haggadah.author"
                  :contributor-initials="haggadah.author_initials"
                  :contributor-avatar="null"
                  :language-tags="['Trending', 'Humanity']"
                  :topic-tags="['Trending', 'Humanity']"
                  :completed-progress="50"
                  :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
                  :is-added-to-bookmark="haggadah.is_bookmarked !== '0'"
                  :is-liked="haggadah.is_liked !== '0'"
                  :download-url="haggadah.download_url" />
              </div>
            </div>
          </div>
        </UIContainer>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { useAsyncData, useNuxtApp, useRouter } from '#app';

import { DropdownItem } from '~/components/UI/Dropdown/types';
const { vueApp } = useNuxtApp();
const router = useRouter();


const props = defineProps({
  popularCategories: {
    type: Array as PropType<DropdownItem[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  searchString: {
    type: String,
    default: '',
  },
  favoriteHaggadahs: {
    type: Array,
    required: true,
  },

});
const emit = defineEmits([
  'search',
  'getHaggadahsByCategory',
  'update:searchString',
  'update:loading',
  'getClipsBySection',
]);
const searchString = useVModel(props, 'searchString', emit);
const loading = useVModel(props, 'loading', emit);

async function getTrendingHaggadahsSection() {
  const response = await vueApp.$api.book.getBooksTrendingSection();
  const haggadahs = {...response._data.data.trending};
  return haggadahs
}
const {data: initialHaggadahsBySections } = await useAsyncData(getTrendingHaggadahsSection);

const haggadahsBySections = ref({ ...initialHaggadahsBySections.value});

function getHaggadahsByTopic(category: string) {
  emit('getHaggadahsByCategory', category);
}

</script>
