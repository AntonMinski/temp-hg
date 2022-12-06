<template>
  <div>
    <div class="bg-tertiary-500 pt-[85px] pb-[60px] dark:bg-tertiary-800">
      <UIContainer class="flex flex-col items-center">
        <UIHeading :level="2" class="mb-8 !text-white"> Explore Haggadahs </UIHeading>
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
              @click="emit('getItemsByCategory', category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>
      </UIContainer>
    </div>

    <div class="bg-gray-50 pt-[125px] pb-[100px] dark:bg-gray-900">
      <UIContainer class="flex flex-col items-center">
        <div class="mb-[53.5px]">
          <UIHeading :level="4" class="flex justify-center">
            <template v-if="loading">Searching...</template>
            <template v-else>
              <span class="mr-2 text-secondary-500">{{ numberOfResults }}</span> Haggadahs found
            </template>
          </UIHeading>
          <ExploreHaggadahsSearchInfo :mode="mode" :search-keyword="searchKeywordDisplay" :search-topic="searchTopic" />
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
              v-for="(haggadah, key) in haggadahs"
              :key="key"
              route="#"
              :img-src="haggadah.haggadah_image || ''"
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

          <UIButton
            :disabled="!canLoadMore"
            class="mx-auto mt-[81px] !px-[45px] !py-3.5"
            size="lg"
            color="dark"
            @click="emit('loadMore')">
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
import { computed, ComputedRef, PropType } from 'vue';
import { useVModel } from '@vueuse/core';
import { useRoute, useRouter } from '#app';
import { Haggadah, HaggadahsSorting, Mode } from '~~/components/Global/Haggadah/types';
import { DropdownItem } from '~/components/UI/Dropdown/types';
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
  popularCategories: {
    type: Array as PropType<DropdownItem[]>,
  },
  searchTopic: {
    type: String,
    default: '',
  },
  state: {
    type: Object,
  },
});
const emit = defineEmits([
  'search',
  'sort',
  'loadMore',
  'getItemsByCategory',
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
  e: 'Editor`s choice',
};

const numberOfResults: ComputedRef<string | number> = computed(() => {
  if (props.meta?.total > 0 && props.meta?.total < 10) {
    return '0' + props.meta?.total;
  } else if (props.meta?.total > 10) {
    return props.meta?.total;
  } else {
    return '0';
  }
});

const canLoadMore: ComputedRef<boolean> = computed(() => {
  return props.meta?.last_page > props.meta?.current_page;
});

async function applySorting(type: HaggadahsSorting) {
  currentSorting.value = type;
  if (type === 'p' || type === 'r') {
    await router.push({ query: { ...route.query, page: 1, sort: type } });
  } // else would be favorite haggadahs
  emit('sort');
}
</script>
