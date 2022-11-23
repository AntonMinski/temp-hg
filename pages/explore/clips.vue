<script lang="ts" setup>
import { Ref } from 'vue';
import { Clip, clipContainer } from '~~/components/Global/Clip/types';
import { useHomeStore } from '~~/store/home';

const homeStore = useHomeStore();
const clips: Ref<Clip[]> = ref([]);

clips.value = homeStore?.homePageData?.favorite_clips.slice(0, 6).map((clip: clipContainer) => clip.clip);

const sections = ['Introduction', 'Kadesh'];
</script>

<template>
  <div>
    <div class="bg-secondary-500 pt-[140px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <UIHeading :level="4" class="!text-white">Our Favourites Clips</UIHeading>

        <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GlobalClipCard
            v-for="(clip, key) in clips"
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

        <UIButton class="mx-auto mt-[90px] !flex" color="link" size="lg">
          View more favourite clips
          <template #suffix>
            <UIIcon icon="icon-arrow-right text-xl" />
          </template>
        </UIButton>
      </UIContainer>
    </div>

    <div class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <div>
      <UIContainer>
        <div v-for="section in sections" :key="section" class="py-[70px]">
          <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div>
              <UIHeading :level="5">
                Clips in <span class="text-secondary-500">{{ section }}</span>
              </UIHeading>
              <span class="mt-1 block"> 98 Clips • Curated by Haggadot </span>
            </div>
            <NuxtLink to="#" class="ml-4 flex-shrink-0">Show all</NuxtLink>
          </div>

          <div class="mt-[50px]">
            <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlobalClipCard
                v-for="(clip, key) in clips.slice(0, 3)"
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
          </div>
        </div>
      </UIContainer>
    </div>
  </div>
</template>
