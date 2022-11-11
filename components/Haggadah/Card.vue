<script lang="ts" setup>
import { handleAddToBookmark } from './composables/handleAddToBookmark';
const { vueApp } = useNuxtApp();
interface Props {
  imgSrc: string;
  title: string;
  contributorName?: string;
  contributorAvatar?: string;
  readTime?: string | number;
  languageTags?: string[];
  topicTags?: string[];
  isOwner?: boolean;
  slug: string;
}

const props = withDefaults(defineProps<Props>(), {
  isOwner: true,
});

// bookmarks
const inBookmarks = computed(() => {
  return false;
});
function addToBookmark() {
  handleAddToBookmark(inBookmarks.value, props.slug, vueApp);
}
</script>

<template>
  <UICard variant="image" :img-src="imgSrc">
    <div class="mb-[19px] flex items-start justify-between space-x-2">
      <div>
        <div v-if="isOwner" class="mb-3.5 flex items-center space-x-1.5">
          <UIBadge outline>
            <template #icon>
              <UIIcon  icon="icon-eye-open-f mr-[5px]" />
            </template>
            Public
          </UIBadge>

          <UIBadge type="danger" outline>
            <template #icon>
              <UIIcon  icon="icon-eye-close-f mr-[5px]" />
            </template>
            Private
          </UIBadge>

          <UIBadge type="gray">
            <template #icon>
              <UIIcon  icon="icon-draft mr-[5px]" />
            </template>
            Draft
          </UIBadge>
        </div>

        <NuxtLink to="#">
          <UIHeading :level="6">{{ title }}</UIHeading>
        </NuxtLink>
      </div>

      <UIButtonGroup>
        <UIButton class="!h-auto !p-2.5" color="link" outline @click="addToBookmark">
          <UIIcon  v-if="inBookmarks" icon="icon-bookmark-remove" class="!text-base" />
          <UIIcon  v-else icon="icon-bookmark-add" class="!text-base" />
        </UIButton>
        <UIButton class="!h-auto !p-2.5" color="link" outline>
          <UIIcon  icon="icon-download" class="!text-base" />
        </UIButton>
        <UIButton class="!h-auto !p-2.5" color="link" outline>
          <UIIcon  icon="icon-share" class="!text-base" />
        </UIButton>
      </UIButtonGroup>
    </div>

    <div v-if="contributorName || readTime" class="mb-5 flex items-center space-x-[15px]">
      <div v-if="readTime" class="inline-flex items-center space-x-2">
        <UIIcon  icon="icon-book-o" class="text-secondary-600" />
        <span class="text-sm font-semibold text-gray-600 dark:text-gray-100">{{ readTime }} minutes read</span>
      </div>

      <div v-if="contributorName" class="inline-flex items-center space-x-2">
        <img v-if="contributorAvatar" :src="contributorAvatar" :alt="contributorName" class="h-7 w-7" />
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-100"> By {{ contributorName }} </span>
      </div>
    </div>

    <div class="mb-3 flex flex-wrap items-center">
      <UIBadge v-for="tag in languageTags" type="tertiary" class="mr-[5px] mb-[5px]" outline>
        {{ tag }}
      </UIBadge>
    </div>

    <div class="mb-3 flex flex-wrap items-center">
      <UIBadge v-for="tag in topicTags" type="accent-yellow" class="mr-[5px] mb-[5px]">
        {{ tag }}
      </UIBadge>
    </div>
  </UICard>
</template>
