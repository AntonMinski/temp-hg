<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { Clip } from '~~/components/Global/Clip/types';
import { usePageStore } from '~/store/page';

const pageStore = usePageStore();

const type = 'image';
const languageTags = ['English'];
const topicTags = ['Chad Gadya', 'Dayenu'];

const favoriteClips: ComputedRef<Clip[]> = computed(
  () => pageStore.homePageData?.favorite_clips?.slice(0, 6).map((clipWrapper) => clipWrapper.clip) || []
);
</script>

<template>
  <div>
    <div class="mt-[33px] mb-20">
      <UIContainer>
        <UIButton color="link" size="lg" class="rounded-md bg-gray-100" square>
          <UIIcon icon="icon-arrow-left" class="text-xl" />
        </UIButton>

        <div class="mt-10 flex items-start">
          <div>
            <UICard class="mr-[70px] !max-w-[637px] !border-dashed">
              <img v-if="type == 'image'" src="~/assets/images/clip-image.png" />
              <audio v-if="type == 'audio'">
                <source src="" type="audio/mp3" />
              </audio>
              <video v-if="type == 'video'">
                <source src="" type="audio/mp4" />
              </video>

              <div class="mt-5 space-y-2">
                <p v-for="i in 10" :key="i">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eos ipsa consequuntur libero nostrum
                  sequi ipsum saepe dolores. Aut sint eveniet sapiente labore et a, doloremque impedit voluptatum quod
                  delectus!
                </p>
              </div>
            </UICard>

            <div class="mt-[25px] text-xs text-gray-800 dark:text-gray-200">
              <span class="font-semibold">Source:</span> www.friendseder.com
            </div>
          </div>

          <div class="w-full max-w-[533px]">
            <UIHeading :level="4"> Sing... Sing A Song </UIHeading>

            <div class="mt-4 inline-flex items-center space-x-3">
              <BlockActivitiesCount :count="0" action="download" />
              <BlockActivitiesCount :count="0" action="like" />
              <UIButton color="link" size="sm" class="!ml-[30px] !h-auto !bg-transparent !p-0">
                <template #prefix>
                  <UIIcon icon="icon-like" class="text-xl text-primary-700" />
                </template>
                Give a Like
              </UIButton>
            </div>

            <div class="mt-[25px] text-sm text-gray-700 dark:text-gray-300">
              Haggadah Section: <span class="text-semibold text-gray-800 dark:text-gray-200">NIRTZAH</span>
            </div>

            <div class="flex flex-wrap">
              <UITags v-if="languageTags.length" :tags="languageTags" type="tertiary" class="pr-4.5" outline />
              <UITags
                v-if="topicTags.length"
                :tags="topicTags"
                type="accent-yellow"
                size="md"
                tag-class="!px-3 !py-1.5" />
            </div>

            <BlockActionButtons :index="1" class="mt-[35px]" :group="false" />

            <div class="mt-[45px] flex items-center">
              <UIButton gradient="gradient1" size="lg" class="mr-[15px] flex-1">
                <template #prefix>
                  <UIIcon icon="icon-book-o" class="text-xl" />
                </template>
                Add to my Haggadah
              </UIButton>
              <UIButton color="link" size="lg" class="flex-1" outline>
                <template #prefix>
                  <UIIcon icon="icon-edit" class="text-xl" />
                </template>
                Edit this clip
              </UIButton>
            </div>

            <UICard class="mt-[45px] !max-w-none">
              <div class="flex items-end">
                <BlockContributor initials="FS" name="" size="lg" class="!mt-0" />
                <div class="ml-3 mr-4 flex flex-col">
                  <span class="-ml-2 text-xs font-semibold text-gray-700 dark:text-gray-300">Contributed by</span>
                  <span class="text-lg font-bold text-gray-900 dark:text-gray-100">#Friendseder</span>
                  <span class="text-xs text-gray-600 dark:text-gray-400">
                    212 Followers • 12 Haggadahs • 26 Clips
                  </span>
                </div>
                <UIButton color="secondary" size="sm" class="ml-auto w-[102px] flex-shrink-0"> Follow </UIButton>
              </div>
            </UICard>

            <UICard class="mt-[49px] !max-w-none">
              <div class="p-[5px]">
                <UIHeading :level="6"> The #Friendseder Haggadah </UIHeading>
                <div class="mt-2.5 flex items-center">
                  <div class="inline-flex items-center space-x-2">
                    <UIIcon icon="icon-book-o" class="text-secondary-600" />
                    <span class="text-sm font-semibold text-gray-600 dark:text-gray-100"> 10 minutes read </span>
                  </div>

                  <BlockContributor initials="FS" name="#Friendseder" text="" class="!mt-0 ml-[15px]" />
                </div>

                <div class="mt-[19px]">
                  <span class="text-sm font-semibold">Table of contents</span>

                  <div class="mt-2.5 h-[240px] divide-y divide-gray-100 overflow-auto dark:divide-gray-700">
                    <div v-for="i in 6" :key="i" class="px-[7px] py-2.5">
                      <span class="block text-xs font-bold uppercase text-gray-500"> Introduction </span>
                      <span class="mt-[1px] block text-sm font-semibold">The Traditional Passover Seder Order</span>
                    </div>
                  </div>
                </div>
              </div>
            </UICard>

            <UICard class="mt-[30px] !max-w-none !rounded-[14px]">
              <div class="p-[5px]">
                <div class="flex items-center">
                  <UIHeading :level="6">Clip remake history</UIHeading>
                  <UIBadge type="gray" class="ml-4.5 !rounded-full">02</UIBadge>
                </div>

                <div class="mt-[25px] divide-y divide-gray-200 dark:divide-gray-700">
                  <div class="flex items-center py-[15px]">
                    <BlockContributor initials="FS" text="" size="lg" class="!mt-0" />
                    <div class="ml-3">
                      <span class="block font-bold">Sing...Sing A Song</span>
                      <div class="text-sm text-gray-700 dark:text-gray-300">
                        Created by <span class="font-bold text-secondary-500">Friendseder</span>
                      </div>
                    </div>
                    <UIBadge class="ml-auto flex-shrink-0">Owner</UIBadge>
                  </div>
                  <div class="flex items-center py-[15px]">
                    <BlockContributor initials="FS" text="" size="lg" class="!mt-0" />
                    <div class="ml-3">
                      <span class="block font-bold">Sing...Sing A Song</span>
                      <div class="text-sm text-gray-700 dark:text-gray-300">
                        Created by <span class="font-bold text-secondary-500">Friendseder</span>
                      </div>
                    </div>
                    <UIBadge class="ml-auto flex-shrink-0">Owner</UIBadge>
                  </div>
                </div>
              </div>
            </UICard>
          </div>
        </div>
      </UIContainer>
    </div>

    <GlobalBannerHaggadahAndClips class="!pt-20 !pb-[50px]" />

    <UIContainer>
      <div class="py-[70px]">
        <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
          <div>
            <UIHeading :level="5"> More Clips from <span class="text-secondary-500">#Friendseder</span> </UIHeading>
          </div>
          <NuxtLink to="#" class="ml-4 flex-shrink-0">Show all</NuxtLink>
        </div>

        <div class="mt-[50px]">
          <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalClipCard
              v-for="(clip, key) in favoriteClips.slice(0, 3)"
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

    <UIContainer class="flex flex-col items-center py-[70px]">
      <div class="items-center justify-between space-y-12 self-stretch lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <GlobalClipIcon />

          <UIHeading :level="3" class="text-4xl"> Our Favourites Clips </UIHeading>
        </div>

        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search clips by keyword or topic" />
      </div>

      <div class="mt-[92px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
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

      <div class="mx-auto mt-[91px]">
        <UIButton gradient="gradient1" size="lg" class="mr-[25px]">
          View More Favourites Clips
          <template #suffix>
            <UIIcon icon="icon-arrow-right" class="text-xl" />
          </template>
        </UIButton>
        <UIButton color="link" size="lg" outline>
          View All Clips
          <template #suffix>
            <UIIcon icon="icon-arrow-right" class="text-xl" />
          </template>
        </UIButton>
      </div>
    </UIContainer>

    <GlobalBannerPassoverAndSupport />
  </div>
</template>
