<template>
  <div>
    <div class="bg-tertiary-500 pt-[85px] pb-[60px] dark:bg-tertiary-800">
      <UIContainer v-if="mode === 'topics'">
        <UISearch
          v-model:search-string="searchString"
          rules=""
          redirect-address="/explore-haggadahs"
          query-key="key"
          placeholder="Search Haggadahs by keyword or topics"
          size="large"
          class="mx-auto"
          :redirect="false"
          :disabled="!searchString"
          @search="emit('search')" />

        <div class="mt-[50px] flex flex-col items-center">
          <span class="text-sm leading-none text-white"> Popular topics </span>

          <div class="mt-[22px] flex flex-wrap space-x-1.5">
            <UIBadge
              v-for="category in popularCategories"
              :key="category.handle"
              size="md"
              type="primary"
              @click="emit('getClipsByCategory', category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>
      </UIContainer>

      <UIContainer v-if="mode === 'keyword'" class="text-center">
        <UIHeading :level="2"> Family haggadahs </UIHeading>
        <UIHeading :level="5" class="mt-5 !text-2xl text-white">
          <span v-if="loading" class="mr-2">Searching</span>
          <span v-else class="mr-2 text-primary-500">{{ meta.total }}</span> Haggadahs
        </UIHeading>
      </UIContainer>
    </div>

    <div class="bg-gray-50 pt-[125px] pb-[100px] dark:bg-gray-900">
      <UIContainer class="flex flex-col items-center">
        <div v-if="mode === 'keyword'" class="mb-[53.5px]">
          <UIHeading :level="4" class="flex justify-center">
            <template v-if="loading">Searching...</template>
            <template v-else>
              <span class="mr-2 text-secondary-500">{{ meta.total }}</span> Haggadahs found
            </template>
          </UIHeading>
          <UIHeading :level="2" class="mt-0.5 flex justify-center">
            For search keyword:&nbsp;<span class="ml-2 text-secondary-500">{{ searchKeywordDisplay }}</span>
          </UIHeading>
        </div>

        <div id="sorting" class="flex justify-center space-x-[5px]">
          <UICategoryPill
            v-for="(sortingName, key) in sortingTypes"
            :key="key"
            :is-active="key === currentSorting"
            @click="applySorting(key)">
            {{ sortingName }}
          </UICategoryPill>
        </div>
        <template v-if="loading && !loadingMore">
          <div class="mt-16 flex justify-center">
            <UISpinner size="12" />
          </div>
        </template>

        <template v-else>
          <div class="mt-[75.5px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalHaggadahCard
              v-for="(item, key) in haggadahs"
              :key="key"
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

          <UIButton class="mx-auto mt-[81px] !px-[45px] !py-3.5" size="lg" color="dark" @click="emit('loadMore')">
            Load more
            <template #suffix>
              <UISpinner v-if="loadingMore" size="4" class="ml-2" />
              <UIIcon v-else icon="icon-arrow-bottom" size="4" class="ml-2" />
            </template>
          </UIButton>
        </template>
      </UIContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { useVModel } from '@vueuse/core';
import { useRoute, useRouter } from '#app';
import { Haggadah, HaggadahsSorting, Mode } from '~~/components/Global/Haggadah/types';
const route = useRoute();
const router = useRouter();

const props = defineProps({
  haggadahs: {
    type: Array as PropType<Haggadah[]>,
    required: true,
  },
  mode: {
    type: String as PropType<Mode>,
    required: true,
  },
  searchFilters: {
    type: String,
    default: '',
  },
  searchString: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingMore: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object,
  },
  currentSorting: {
    type: String as PropType<HaggadahsSorting>,
    default: 'p',
  },
  searchKeywordDisplay: {
    type: String,
    default: '',
  },
});
const emit = defineEmits([
  'search',
  'sort',
  'loadMore',
  'update:loading',
  'update:currentSorting',
  'update:searchString',
]);
const searchString = useVModel(props, 'searchString', emit);

const loading = useVModel(props, 'loading', emit);

const currentSorting = useVModel(props, 'currentSorting', emit);

const sortingTypes = {
  p: 'Most popular',
  r: 'Most recent',
  editor: 'Editor`s choice',
};

async function applySorting(type: HaggadahsSorting) {
  currentSorting.value = type;
  if (type === 'p' || type === 'r') {
    await router.push({ query: { ...route.query, page: 1, sort: type } });
  } // else would be favorite haggadahs
  emit('sort');
}
</script>
