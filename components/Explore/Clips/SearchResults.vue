<template>
  <div>
    <div class="bg-tertiary-500 pt-[72px] dark:bg-tertiary-800">
      <UIContainer class="flex flex-col items-center">
        <UIHeading :level="2" class="mb-8 !text-white"> Explore haggadah clips </UIHeading>
        <UISearch
          rules=""
          redirect-address="/explore-clips"
          query-key="key"
          placeholder="Search community clips by type, category or keyword"
          size="large"
          class="mx-auto"
          :redirect="false"
          :disabled="!searchString"
          v-model:search-string="searchString"
          @search="emit('search')" />
        <slot name="filterGroup" />
      </UIContainer>
    </div>

    <div v-if="false" class="bg-tertiary-500 pt-[87px] dark:bg-tertiary-800">
      <UIContainer class="text-center">
        <UIHeading :level="2"> Explore haggadah clips </UIHeading>
        <UIHeading :level="5" class="mt-5 !text-2xl !text-primary-500">
          <span v-if="loading" class="mr-2">Searching</span>
          <span v-else class="mr-2">{{ meta.total }}</span>
          <span class="dark:text-white">Clips in</span>{{ searchFilters }}
        </UIHeading>
        <slot name="filterGroup" />
      </UIContainer>
    </div>

    <div class="bg-gray-50 pt-[125px] pb-[100px] dark:bg-gray-900">
      <UIContainer class="flex flex-col items-center">
        <div class="mb-[33.5px]">
          <UIHeading :level="4" class="flex justify-center">
            <template v-if="loading">Searching...</template>
            <template v-else>
              <span class="mr-2 text-secondary-500">{{ meta.total }}</span> Clips found
            </template>
          </UIHeading>
          <ExploreClipsSearchInfo :state="state" />
        </div>

        <template v-if='clips.length'>


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
              <GlobalClipCard
                v-for="(clip, key) in clips"
                :key="key"
                :handle="clip.handle"
                :type="clip.cliptype"
                :section-title="clip.clip_section"
                :title="clip.title"
                :src="clip.image"
                :text="clip.covertext"
                :contributor-name="clip.author"
                :contributor-initials="clip.author_initials"
                :contributor-avatar="null"
                :downloads-count="clip.downloads"
                :likes-count="clip.likes"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']"
                :is-added-to-bookmarks="clip.is_bookmarked !== '0'"
                class="mx-2" />
            </div>

            <UIButton class="mx-auto mt-[81px] !px-[45px] !py-3.5" size="lg" color="dark" @click="emit('loadMore')"
              >Load more
              <template #suffix>
                <UISpinner v-if="loadingMore" size="4" class="ml-2" />
                <UIIcon v-else icon="icon-arrow-bottom" size="4" class="ml-2" />
              </template>
            </UIButton>
          </template>
        </template>
      </UIContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue';
import { Clip, ClipsSorting, Mode } from '~/components/Global/Clip/types';
import { useRoute, useRouter } from '#app';
import { useVModel } from '@vueuse/core';
const route = useRoute();
const router = useRouter();

const props = defineProps({
  clips: {
    type: Array as PropType<Clip[]>,
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
    type: String as PropType<ClipsSorting>,
    default: 'p',
  },
  searchKeywordDisplay: {
    type: String,
    default: '',
  },
  state: {
    type: Object,
    default: () => ({}),
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

async function applySorting(type: ClipsSorting) {
  currentSorting.value = type;
  if (type === 'p' || type === 'r') {
    await router.push({ query: { ...route.query, page: 1, sort: type } });
  } // else would be favorite haggadahs
  emit('sort');
}
</script>
