<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <UIIcon icon="icon-book-f" shape="square" class="bg-gradient2 shadow-md" />
        <UIHeading :level="1" class="mt-5 text-center text-[3rem]">Explore Passover Haggadahs</UIHeading>
        <UISearch
          v-model:search-string="searchString"
          rules="required"
          redirect-address="/explore-haggadahs"
          query-key="key"
          placeholder="Search Haggadahs by keyword or topics"
          size="large"
          class="mt-[25px]"
          :redirect="false"
          @search="emit('search')" />
        <div class="mt-[45px] text-center">
          <span class="text-sm leading-none text-gray-900"> Popular topics </span>
          <div class="mt-[22px] flex flex-wrap justify-center space-x-1.5">
            <UIBadge
              v-for="category in popularCategories"
              :key="category.handle"
              size="md"
              type="accent-yellow"
              class="mb-1.5 md:mb-0"
              @click="emit('getHaggadahsByCategory', category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>
      </UIContainer>
    </div>

    <div
      id="favourite-haggadahs-carousel"
      class="mt-[90px] bg-tertiary-500 pt-[80px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <ExploreHaggadahsSectionFavouritesCarousel :haggadahs="favoriteHaggadahs" @viewAll="emit('viewAll')" />
      </UIContainer>
    </div>

    <div class="py-20">
      <GlobalBannerHaggadah variant="horizontal" />
    </div>

    <template v-if="loading">
      <div class="my-16 flex justify-center">
        <UISpinner size="12" />
      </div>
    </template>

    <template v-else>
      <div class="pb-[51px]">
        <UIContainer>
          <div v-for="section in haggadahsBySections" class="py-[70px]" :key="section.handle">
            <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
              <div>
                <UIHeading :level="5">
                  Haggadahs in <span class="text-secondary-500">{{ section.name }}</span>
                </UIHeading>
                <span class="mt-1 block"> {{ section.total }} Haggadahs • Curated by {{ section.curated_by }} </span>
              </div>
              <NuxtLink
                :to="`/explore-haggadahs?topic=${section.handle}`"
                class="ml-4 flex-shrink-0"
                @click="emit('getHaggadahsByCategory', section.handle)">
                Show all</NuxtLink
              >
            </div>

            <div class="mt-[50px]">
              <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                <GlobalHaggadahCard
                  v-for="({ book }, key) in section.books"
                  :key="key"
                  :route="`/haggadahs/${book?.handle}`"
                  :img-src="book?.haggadah_image"
                  :title="book?.title"
                  :slug="book?.handle"
                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
                  :read-time="book?.reading_length || 10"
                  :contributor-name="book?.author"
                  :contributor-initials="book?.author_initials"
                  :contributor-avatar="null"
                  :language-tags="['Trending', 'Humanity']"
                  :topic-tags="['Trending', 'Humanity']"
                  :completed-progress="50"
                  :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
                  :is-added-to-bookmark="book?.is_bookmarked !== '0'"
                  :is-liked="book?.is_liked !== '0'"
                  :download-url="book?.download_url" />
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
import { Haggadah } from '~/components/Global/Haggadah/types';
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
    type: Array as PropType<Haggadah[]>,
    required: true,
  },
});
const emit = defineEmits([
  'search',
  'getHaggadahsByCategory',
  'update:searchString',
  'update:loading',
  'viewAll',
]);
const searchString = useVModel(props, 'searchString', emit);
const loading = useVModel(props, 'loading', emit);

async function getTrendingHaggadahsSection() {
  let sections = [];
  try {
    const response = await vueApp.$api.book.getBooksTrendingSection();
    sections = { ...response?._data?.data?.sections };
  } catch (error) {
    console.log(error);
  }
  return sections;
}
const { data: initialHaggadahsBySections } = await useAsyncData(getTrendingHaggadahsSection);

const haggadahsBySections = ref({ ...initialHaggadahsBySections.value });

function getHaggadahsByTopic(category: string) {
  emit('getHaggadahsByCategory', category);
}
</script>
