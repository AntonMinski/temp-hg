<template>
  <div class="pa-4 flex flex-col items-center px-8">
    <template v-if="mode === 'keyword'">
      <UISearch
        rules="required|min:2"
        redirect-address="/explore/clips"
        query-key="key"
        placeholder="Search community clips by type, category or keyword"
        size="large"
        class="mt-[25px]"
        :redirect="false"
        v-model:search-string="searchString"
        @search="emit('search')" />
      <slot name="filterGroup" />
      <UIHeading :level="4" class="mt-16 flex justify-center">
        <template v-if="loading">Searching...</template>
        <template v-else> {{ meta.total }} Clips found </template>
      </UIHeading>
      <UIHeading :level="2" class="mt-5 flex justify-center">
        For search keyword: <span class="text-secondary-500">{{ searchString }}</span>
      </UIHeading>
    </template>

    <template v-if="mode === 'group'">
      <UIHeading :level="2"> Explore haggadah clips </UIHeading>
      <UIHeading :level="4" class="mt-5">
        <template v-if="loading">Searching</template>
        <template v-else>{{ meta.total }}</template>
        Clips in <span class="text-primary-500">{{ searchFilters }}</span>
      </UIHeading>
      <slot name="filterGroup" />
    </template>

    <template v-if="loading && !loadingMore">
      <div class="mt-16">
        <UISpinner size="12" />
      </div>
    </template>

    <template v-else>
      <div id="sorting" class="my-16 flex justify-center">
        <UIBadge
          v-for="(sortingName, key) in sorting"
          class="mx-2"
          :key="key"
          :type="key === sortingType ? 'primary' : 'gray'"
          size="md"
          @click="applySorting(key)">
          {{ sortingName }}
        </UIBadge>
      </div>

      <div class="flex flex-wrap items-center justify-evenly">
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
      <UIButton :disabled="!meta.next" class="mx-4 mt-16 mb-4" size="large" color="dark" @click="emit('loadMore')"
        >Load more
        <template #suffix>
          <UISpinner v-if="loadingMore" size="4" class="ml-2" />
          <UIIcon v-else icon="icon-arrow-bottom" size="4" class="ml-2" />
        </template>
      </UIButton>
    </template>
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
});
const emit = defineEmits(['search', 'sort', 'loadMore', 'update:loading', 'update:searchString']);
const searchString = useVModel(props, 'searchString', emit);

const loading = useVModel(props, 'loading', emit);

const sortingType: Ref<ClipsSorting> = ref('p');

const sorting = {
  p: 'Most popular',
  r: 'Most recent',
  editor: 'Editor`s choice',
};

async function applySorting(type: ClipsSorting) {
  sortingType.value = type;
  if (type === 'p' || type === 'r') {
    route.query.sort = type;
    await router.push({ path: '/explore/clips', query: route.query });
  } // else would be favorite haggadahs
  emit('sort');
}
</script>
