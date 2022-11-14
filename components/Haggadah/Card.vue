<script lang="ts" setup>
import { handleAddToBookmark } from './composables/handleAddToBookmark';
const { vueApp } = useNuxtApp();
interface Props {
  route?: string | object;
  imgSrc: string;
  title: string;
  contributorName?: string;
  contributorAvatar?: string;
  readTime?: string | number;
  languageTags?: string[];
  topicTags?: string[];
  completedProgress?: number;
  clips?: string[];
  isAddedToBookmark?: boolean;
  isOwner?: boolean;
  slug: string;
}

const props = withDefaults(defineProps<Props>(), {
  isAddedToBookmark: false,
  isOwner: true,
  route: '',
});

// bookmarks
function addToBookmark() {
  handleAddToBookmark(isAddedToBookmark.value, props.slug, vueApp);
}
const card = getCurrentInstance();
const nuxtLink = resolveComponent('NuxtLink');

const isAddedToBookmark = ref(props.isAddedToBookmark);
const selectedClip = ref(props.clips?.[0] || null);
</script>

<template>
  <UICard variant="image" :img-src="imgSrc">
    <div class="flex items-start justify-between space-x-2">
      <div>
        <div v-if="isOwner" class="mb-3.5 flex items-center space-x-1.5">
          <UIBadge outline>
            <template #icon>
              <UIIcon icon="icon-eye-open-f mr-[5px]" />
            </template>
            Public
          </UIBadge>

          <UIBadge type="danger" outline>
            <template #icon>
              <UIIcon icon="icon-eye-close-f mr-[5px]" />
            </template>
            Private
          </UIBadge>

          <UIBadge type="gray">
            <template #icon>
              <UIIcon icon="icon-draft mr-[5px]" />
            </template>
            Draft
          </UIBadge>
        </div>

        <NuxtLink :to="route">
          <UIHeading :level="6" class="line-clamp-2">{{ title }}</UIHeading>
        </NuxtLink>
      </div>

      <CardActionButtons :index="card.vnode.key" :is-added-to-bookmark="isAddedToBookmark" />
    </div>

    <div v-if="contributorName || readTime" class="mt-[19px] flex items-center space-x-[15px]">
      <div v-if="readTime" class="inline-flex items-center space-x-2">
        <UIIcon icon="icon-book-o" class="text-secondary-600" />
        <span class="text-sm font-semibold text-gray-600 dark:text-gray-100">{{ readTime }} minutes read</span>
      </div>

      <div v-if="contributorName" class="inline-flex items-center space-x-2">
        <img v-if="contributorAvatar" :src="contributorAvatar" alt="{{ contributorName }}" class="h-7 w-7" />
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-100"> By {{ contributorName }} </span>
      </div>
    </div>

    <BlockTags v-if="languageTags?.length" :tags="languageTags" type="tertiary" outline />

    <BlockTags v-if="topicTags?.length" :tags="topicTags" type="accent-yellow" size="md" />

    <BlockProgress v-if="isOwner" :progress="completedProgress" class="mt-5.5" />

    <div v-if="isOwner" class="mt-[37px] flex items-center space-x-2.5">
      <UIButton :tag="nuxtLink" :to="route" class="w-1/2 justify-center" color="secondary" size="sm">
        <template #prefix>
          <span class="icon-eye-open"></span>
        </template>
        Preview
      </UIButton>

      <UIDropdown
        class="w-1/2"
        text="More"
        placement="top"
        color="dark"
        size="sm"
        list-classes="right-0"
        outline
        hide-icon>
        <BlockMoreActionsList />
      </UIDropdown>
    </div>

    <div v-if="isOwner && clips?.length" class="mt-10 border-t pt-7 dark:border-gray-700">
      <div class="mb-2 flex items-center">
        <UIIcon icon="icon-dashboard text-lg mr-1.5" />
        <span class="mt-1 font-bold text-gray-900 dark:text-white">Choose section</span>
      </div>

      <UIDropdown :text="selectedClip" class="w-full" outline>
        <UIListGroup>
          <UIListGroupItem v-for="clip in clips" :key="clip" @click="selectedClip = clip">
            {{ clip }}
          </UIListGroupItem>
        </UIListGroup>
      </UIDropdown>
    </div>
  </UICard>
</template>
