<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { usePageStore } from '~~/store/page';

const pageStore = usePageStore();

const favoriteClips: ComputedRef<Clip[]> = computed(
  () => pageStore.homePageData?.favorite_clips?.map((clipWrapper) => clipWrapper.clip) || []
);

const emit = defineEmits(['search']);
</script>

<template>
  <div>
    <div class="bg-tertiary-500 pt-[72px] dark:bg-tertiary-800">
      <UIContainer>
        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search community clips by type, category or keyword"
          size="large"
          class="mx-auto"
          :redirect="false"
          @search="emit('search')" />

        <!-- Fliter Clip -->
      </UIContainer>
    </div>

    <div class="bg-gray-50 pt-[125px] pb-[100px] dark:bg-gray-800">
      <UIContainer class="flex flex-col items-center">
        <UIHeading :level="6"><span class="mr-2 text-secondary-500">02</span>Clips found</UIHeading>
        <UIHeading :level="4" class="!text-4xl">
          For Search keyword <span class="text-secondary-500">Comedy</span>
        </UIHeading>

        <div class="space-x-[5px] pt-[33.5px]">
          <UICategoryPill :is-active="true" class="!px-[25px]"> Most popular </UICategoryPill>
          <UICategoryPill class="!px-[25px]"> Most recent </UICategoryPill>
          <UICategoryPill class="!px-[25px]"> Editor's choice </UICategoryPill>
        </div>
      </UIContainer>

      <UIContainer class="mt-[75.5px] flex flex-col items-center">
        <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GlobalClipCard
            v-for="(clip, key) in favoriteClips"
            :key="key"
            :handle="clip.handle"
            :type="clip.cliptype"
            :section-title="clip.clip_section"
            :title="clip.title"
            :src="clip.image"
            :text="clip.body"
            :contributor-name="clip.author"
            :contributor-initials="clip.author_initials"
            :contributor-avatar="null"
            :downloads-count="clip.downloads"
            :likes-count="clip.likes"
            :language-tags="['English', 'Hebrew']"
            :topic-tags="['Chad Gadya', 'Dayenu']"
            :is-added-to-bookmarks="clip.is_bookmarked !== '0'" />
        </div>

        <UIButton color="dark" size="lg" class="mx-auto mt-[81px] !px-[45px] !py-3.5">
          Load More
          <template #suffix>
            <UIIcon icon="icon-arrow-bottom" />
          </template>
        </UIButton>
      </UIContainer>
    </div>

    <div class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <GlobalContributorSectionTop />

    <GlobalBannerPassoverAndSupport />
  </div>
</template>
