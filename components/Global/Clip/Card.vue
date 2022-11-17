<script lang="ts" setup>
import type { CardType } from './types';
import { HTML } from 'mdast';
import { computed, ComputedRef, Ref, ref } from 'vue';
import { handleAddToBookmark } from '~/composables/handleAddToBookmark';
const { vueApp } = useNuxtApp();

interface Props {
  handle: string;
  type: CardType;
  sectionTitle: string;
  title: string;
  src?: string;
  text?: string | HTML;
  contributorName?: string;
  contributorAvatar?: string;
  downloadsCount?: number;
  likesCount?: number | string;
  languageTags?: string[];
  topicTags?: string[];
  isAddedToBookmark?: boolean;
  isOwner?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  downloadsCount: 0,
  likesCount: 0,
  isAddedToBookmark: false,
  isOwner: true,
});

const iconClasses: Record<CardType, string> = {
  text: 'bg-gray-500',
  image: 'bg-[#FFBE41]',
  audio: 'bg-[#14C8E0]',
  video: 'bg-[#5F75E8]',
};

const iconClass = computed<string>(() => iconClasses[props.type]);

const nuxtLink = resolveComponent('NuxtLink');
const card = getCurrentInstance();

const route: ComputedRef<string> = computed(() => 'clip/' + props.handle);

// bookmarks
const isAddedToBookmark: Ref<boolean> = ref(props.isAddedToBookmark);
async function addToBookmark(value: boolean): Promise<void> {
  if (await handleAddToBookmark(value, props.handle, vueApp, 'clip')) {
    isAddedToBookmark.value = value;
  }
}
</script>

<template>
  <UICard class="my-2 h-full w-full min-w-[350px] !max-w-[28rem] flex-none text-left">
    <div>
      <span class="mb-1 block text-xs font-semibold text-gray-500">{{ sectionTitle }}</span>

      <div class="flex items-start space-x-[15px]">
        <NuxtLink :to="route">
          <UIHeading :level="6" class="line-clamp-2">{{ title }}</UIHeading>
        </NuxtLink>
        <UIIcon
          :icon="`icon-media-${props.type}-f`"
          class="flex-shrink-0 rounded-full p-3 text-[22px] text-white"
          :class="iconClass" />
      </div>

      <div v-if="isOwner" class="mt-2.5 flex items-center space-x-1.5">
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
    </div>

    <div class="relative -mx-5 mt-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
      <div
        v-if="type == 'text'"
        v-html="text"
        class="max-h-[250px] overflow-y-auto px-[36px] py-6 text-sm leading-normal text-gray-900 dark:text-gray-100" />
      <img v-else :src="src" class="h-[251px] w-full object-cover object-center" />
      <UIIcon
        v-if="type == 'video'"
        icon="icon-play"
        shape="circle"
        class="absolute mr-3 h-16 w-16 bg-gray-600 px-3.5 py-3 !text-[42px] !text-white opacity-[0.85] shadow-md" />
    </div>

    <div class="mt-5 flex items-center justify-between">
      <CardActionButtons
        :index="card.vnode.key || card.uid"
        :is-added-to-bookmark="isAddedToBookmark"
        @update:is-added-to-bookmark="addToBookmark" />

      <div class="ineline-flex items-center space-x-3">
        <div class="inline-flex items-center space-x-1.5">
          <UIIcon icon="icon-download" class="text-secondary-500" />
          <span class="text-sm font-semibold">{{ downloadsCount }} downloads</span>
        </div>

        <div class="inline-flex items-center space-x-1.5">
          <UIIcon icon="icon-heart" class="text-secondary-500" />
          <span class="text-sm font-semibold">{{ likesCount }} likes</span>
        </div>
      </div>
    </div>

    <div v-if="contributorName" class="mt-5 inline-flex items-center space-x-2">
      <img v-if="contributorAvatar" :src="contributorAvatar" :alt="contributorName" class="h-7 w-7" />
      <span class="text-sm font-semibold text-gray-600 dark:text-gray-300">
        Contributed by <span class="font-semibold text-gray-900 dark:text-gray-100">{{ contributorName }}</span>
      </span>
    </div>

    <BlockTags v-if="languageTags.length" :tags="languageTags" type="tertiary" outline />

    <BlockTags v-if="topicTags.length" :tags="topicTags" type="accent-yellow" size="md" />

    <div v-if="isOwner" class="mt-10 flex items-center space-x-2.5">
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

    <div class="-mx-5 -mb-5 mt-auto">
      <UIButtonGroup class="mt-5 flex !w-full overflow-hidden rounded-t-none">
        <UIButton
          class="flex-1 !rounded-none border-b-0 border-l-0 !border-gray-300 dark:!border-gray-700"
          color="secondary"
          outline
          :tag="nuxtLink"
          :to="route">
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
</template>
