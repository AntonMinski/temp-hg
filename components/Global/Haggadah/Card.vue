<script lang="ts" setup>
import { Ref } from 'vue';
import { handleAddToBookmark } from '~/composables/handleAddToBookmark';
const { vueApp } = useNuxtApp();
interface Props {
  col?: 4 | 6;
  route?: string | object;
  imgSrc: string;
  title: string;
  text?: string;
  contributorName?: string;
  contributorInitials?: string;
  contributorAvatar?: string;
  readTime?: string | number;
  languageTags?: string[];
  topicTags?: string[];
  completedProgress?: number;
  clips?: string[];
  isAddedToBookmark?: boolean;
  isLiked?: boolean;
  isOwner?: boolean;
  slug: string;
  downloadUrl?: string;
  hideOnwerBadge?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  col: 4,
  isAddedToBookmark: false,
  isOwner: true,
  route: '',
});

// bookmarks
async function addToBookmark(value: boolean): Promise<void> {
  if (await handleAddToBookmark(value, props.slug, vueApp, 'book')) {
    isAddedToBookmark.value = value;
  }
}
const card = getCurrentInstance();
const nuxtLink = resolveComponent('NuxtLink');

const isAddedToBookmark = ref(props.isAddedToBookmark);
const selectedClip = ref(props.clips?.[0] || null);
const isModalOpen: Ref<boolean> = ref(false);

const handleToggleModal = (val: boolean) => {
  isModalOpen.value = val;
};
</script>

<template>
  <UICard variant="image" :img-src="imgSrc">
    <div class="flex items-start justify-between space-x-2">
      <div :class="col == 6 ? 'order-1 flex-1' : null">
        <div v-if="isOwner && !hideOnwerBadge" class="mb-3.5 flex items-center space-x-1.5">
          <BlockOwnerBadge />
        </div>

        <NuxtLink :to="route">
          <UIHeading :level="6" class="text-left line-clamp-2">{{ title }}</UIHeading>
        </NuxtLink>
      </div>

      <BlockActionButtons
        :class="col == 6 ? '!ml-0 w-[205px] flex-shrink-0' : null"
        :index="card.vnode.key || card.uid"
        v-model:is-added-to-bookmark="isAddedToBookmark"
        @update:is-added-to-bookmark="addToBookmark"
        @share="handleToggleModal(true)" />
    </div>

    <div class="flex items-start" :class="col == 6 ? 'flex-row' : 'flex-col'">
      <div v-if="contributorName || readTime" class="w-full" :class="col == 6 ? 'order-1' : null">
        <div class="flex items-center space-x-[15px]" :class="!isOwner ? 'mt-4' : ''">
          <div v-if="readTime" class="inline-flex items-center space-x-2">
            <UIIcon icon="icon-book-o" class="text-secondary-600" />
            <span class="text-sm font-semibold text-gray-600 dark:text-gray-100">{{ readTime }} minutes read</span>
          </div>

          <BlockContributor
            class=""
            size="md"
            :initials="contributorInitials"
            :name="contributorName"
            :avatar="contributorAvatar"
            text="" />
        </div>

        <div v-if="text && col == 6" class="mt-2.5 text-left">{{ text }}</div>
      </div>

      <div :class="col == 6 ? 'w-[205px] flex-shrink-0' : null">
        <UITags v-if="languageTags?.length" :tags="languageTags" type="tertiary" outline />

        <UITags v-if="topicTags?.length" :tags="topicTags" type="accent-yellow" size="md" />
      </div>
    </div>

    <UIProgress v-if="isOwner && col == 4" :progress="completedProgress" class="mt-5.5" />

    <div v-if="isOwner && col == 4" class="mt-[37px] flex items-center space-x-2.5">
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

    <div v-if="isOwner && clips?.length && col == 4" class="mt-10 border-t pt-7 dark:border-gray-700">
      <div class="mb-2 flex items-center">
        <UIIcon icon="icon-dashboard text-lg mr-1.5" />
        <span class="mt-1 font-bold text-gray-900 dark:text-white">Choose section</span>
      </div>

      <UIDropdown :text="selectedClip" class="w-full" list-classes="w-full inset-x-0" color="dark" outline input>
        <UIListGroup class="!w-full">
          <UIListGroupItem v-for="clip in clips" :key="clip" @click="selectedClip = clip">
            {{ clip }}
          </UIListGroupItem>
        </UIListGroup>
      </UIDropdown>
    </div>

    <div v-if="isOwner && col == 6" class="-mx-5 -mb-5 mt-7">
      <UIButtonGroup class="mt-5 flex !w-full overflow-hidden rounded-t-none">
        <UIButton
          class="flex-1 !rounded-none border-b-0 border-l-0 !border-gray-300 dark:!border-gray-700"
          color="secondary"
          outline>
          <UIIcon icon="icon-eye-open" class="mr-[7px] text-xl" />
          View Clip
        </UIButton>
        <UIButton
          class="flex-1 !rounded-none border-b-0 border-r-0 !border-gray-300 text-gray-700 dark:!border-gray-700 dark:!text-gray-100"
          color="dark"
          outline>
          <UIIcon icon="icon-book-o" class="mr-[7px] text-xl" />
          Add to Haggadah
        </UIButton>
      </UIButtonGroup>
    </div>
  </UICard>
  <!-- Share :: Modal -->
  <GlobalSharedModal
    :open="isModalOpen"
    label="Haggadah Link"
    url="haggadot.com/haggadah/some-haggadah-name"
    @close="handleToggleModal(false)" />
</template>
