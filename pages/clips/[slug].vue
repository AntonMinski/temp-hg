<script lang="ts" setup>
import { computed, ComputedRef, onMounted, reactive, Ref, ref } from 'vue';
import { Clip } from '~/components/Global/Clip/types';
import { usePageStore } from '~/store/page';
import { useAsyncData, useNuxtApp, useRoute } from '#app';
import { ContributedBy, Contributor } from '~/components/Global/Contributor/types';
import { handleAddToBookmark } from '~/composables/handleAddToBookmark';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';

const route = useRoute();
const { vueApp } = useNuxtApp();

const pageStore = usePageStore();

const languageTags = ['English'];
const topicTags = ['Chad Gadya', 'Dayenu'];

const favoriteClips: ComputedRef<Clip[]> = computed(
  () => pageStore.homePageData?.favorite_clips?.slice(0, 6).map((clipWrapper) => clipWrapper.clip) || []
);

// DATA
async function getInitialData() {
  const slug = route.params.slug as string;
  const clipResponse = await vueApp.$api.clip.exploreClip(slug);
  const clipData = { ...clipResponse._data.data };
  return clipData;
}

const { data: clipData } = await useAsyncData(getInitialData);
const clip: Clip = clipData.value.clip_details.clip;
const contributor: ContributedBy = clipData.value.contributed_by;
const book = clipData.value.user_book;
const metaData = clipData.value.meta_tags;

// Clips by contributor
const clipsByContributor = reactive({
  clips: [] as Clip[],
  loading: true,
  meta: {} as any,
  name: '',
  handle: '',
  total_clips: 0,
});


async function getClipsByContributor() {
  const response = await vueApp.$api.clip.getClipsByContributor(contributor.handle);
  clipsByContributor.clips = response._data.data.map((clipWrapper) => clipWrapper.clip);
  clipsByContributor.loading = false;
  clipsByContributor.meta = {...response._data.meta};
  clipsByContributor.name = response._data.name;
  clipsByContributor.handle = response._data.handle;
  clipsByContributor.total_clips = response._data.total_clips;
}
onMounted(getClipsByContributor);

// Likes

const isLikedTemporary: Ref<Boolean> = ref(false);
isLikedTemporary.value = clip.is_liked !== '0';

async function likeClip() {
  try {
    if (!isLikedTemporary.value) {
      await vueApp.$api.clip.likeClip(clip.handle);
      clip.likes = clip.likes + 1;
      isLikedTemporary.value = true;
      vueApp.$toast.success(`liked`);
    } else {
      await vueApp.$api.clip.unLikeClip(clip.handle);
      clip.likes = clip.likes - 1;
      isLikedTemporary.value = false;
      vueApp.$toast.success(`unliked`);
    }
  } catch (error) {
    console.log(error);
  }
}

const isAddedToBookmarkTemporary: Ref<Boolean> = ref(false);
isAddedToBookmarkTemporary.value = clip.is_liked !== '0';

// Bookmarks
async function addToBookmark(add: boolean): Promise<void> {
  try {
    await handleAddToBookmark(add, clip.handle, 'clip');
    isAddedToBookmarkTemporary.value = add;
  } catch (error) {
    console.error(error);
  }
}

async function downloadClip(): Promise<void> {
  try {
    const response = await vueApp.$api.clip.downloadClip(clip.handle);
    if (response._data.success) {
      const url = window.URL.createObjectURL(new Blob([response._data.download_clip_url]));
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = url;
    }
  } catch (error) {
    console.error(error);
  }
}

async function shareClip() {
  // not implemented yet
}

const followingContributor: Ref<Boolean> = ref(false);
followingContributor.value = contributor.is_following === '1';

async function followContributor() {
  try {
    if (followingContributor.value) {
      await vueApp.$api.contributor.unFollowContributor(contributor.handle);
      followingContributor.value = false;
      vueApp.$toast.success(`unfollowed`);
    } else {
      await vueApp.$api.contributor.followContributor(contributor.handle);
      followingContributor.value = true;
      vueApp.$toast.success(`followed`);
    }
  } catch (error) {
    console.log(error);
  }
}

const meta = getMetaObject(metaData);
useHead({
  title: metaData?.title,
  meta: meta,
});
</script>

<template>
  <div v-if="clip.handle">
    <div class="mt-[33px] mb-20">
      <UIContainer>
        <UIButton color="link" size="lg" class="rounded-md bg-gray-100" square>
          <UIIcon icon="icon-arrow-left" class="text-xl" />
        </UIButton>

        <div class="mt-10 flex items-start">
          <div>
            <UICard class="mr-[70px] !max-w-[637px] !border-dashed">
              <img v-if="clip.media.image" :src="clip.media.image" />
              <audio v-if="clip.media.audio">
                <source :src="clip.media.audio" type="audio/mp3" />
              </audio>
              <video v-if="clip.media.video">
                <source :src="clip.media.video" type="audio/mp4" />
              </video>

              <div v-if="clip.body" v-html="clip.body" class="mt-5 space-y-2" />
            </UICard>

            <div class="mt-[25px] text-xs text-gray-800 dark:text-gray-200">
              <span class="font-semibold">Source: &nbsp;</span> {{ clip.clipsource }}
            </div>
          </div>

          <div class="w-full max-w-[533px]">
            <UIHeading :level="4"> {{ clip.title }} </UIHeading>

            <div class="mt-4 inline-flex items-center space-x-3">
              <BlockActivitiesCount :count="clip.downloads" action="download" />
              <BlockActivitiesCount :count="clip.likes" action="like" />
              <UIButton color="link" size="sm" class="!ml-[30px] !h-auto !bg-transparent !p-0" @click="likeClip">
                <template #prefix>
                  <UIIcon v-if="isLikedTemporary" icon="icon-like" class="text-xl font-bold text-blue-700" />
                  <UIIcon v-else icon="icon-like" class="text-xl text-primary-700" />
                </template>
                <template v-if="isLikedTemporary"> UnLike </template>
                <template v-else> Give a Like </template>
              </UIButton>
            </div>

            <div class="mt-[25px] text-sm text-gray-700 dark:text-gray-300">
              Haggadah Section:
              <span class="text-semibold text-gray-800 dark:text-gray-200">{{ clip.clip_section }}</span>
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

            <BlockActionButtons
              :index="1"
              v-model:is-added-to-bookmark="isAddedToBookmarkTemporary"
              @add-to-bookmark="addToBookmark(true)"
              @remove-from-bookmark="addToBookmark(false)"
              @download="downloadClip"
              @share="shareClip"
              class="mt-[35px]"
              :group="false" />

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
                <BlockContributor
                  :initials="contributor.author_initials"
                  :name="contributor.author"
                  text="Contributed by"
                  size="lg"
                  class="!mt-0">
                  <template #details>
                    <span class="block text-xs text-gray-600 dark:text-gray-400">
                      {{ contributor.total_followers }} Followers • {{ contributor.total_books }} Haggadahs •
                      {{ contributor.total_clips }} Clips
                    </span>
                  </template>
                </BlockContributor>
                <UIButton
                  color="secondary"
                  size="sm"
                  class="ml-auto w-[102px] flex-shrink-0"
                  @click="followContributor">
                  <template v-if="followingContributor"> Unfollow </template>
                  <template v-else> Follow </template>
                </UIButton>
              </div>
            </UICard>

            <UICard class="mt-[49px] !max-w-none">
              <div class="p-[5px]">
                <UIHeading :level="6"> {{ book.title }} </UIHeading>
                <div class="mt-2.5 flex items-center">
                  <div class="inline-flex items-center space-x-2">
                    <UIIcon icon="icon-book-o" class="text-secondary-600" />
                    <span class="text-sm font-semibold text-gray-600 dark:text-gray-100">
                      {{ book.reading_length }} minutes read
                    </span>
                  </div>

                  <BlockContributor
                    :initials="book.author_initials"
                    :name="book.author"
                    text=""
                    class="!mt-0 ml-[15px]" />
                </div>

                <div class="mt-[19px]">
                  <span class="text-sm font-semibold">Table of contents</span>

                  <div class="mt-2.5 h-[240px] divide-y divide-gray-100 overflow-auto dark:divide-gray-700">
                    <div v-for="(sections, name) in book.table_of_content" :key="name" class="px-[7px] py-2.5">
                      <ul class="block text-xs font-bold uppercase text-gray-500">
                        {{
                          name
                        }}
                      </ul>
                      <li v-for="section in sections" class="mt-[1px] block text-sm font-semibold">- {{ section }}</li>
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
            <UIHeading :level="5"> More Clips from <span class="text-secondary-500">{{ contributor.author }}</span> </UIHeading>
          </div>
          <NuxtLink to="#" class="ml-4 flex-shrink-0">Show all</NuxtLink>
        </div>

        <template v-if="clipsByContributor.loading">
          <div class="mt-16 flex justify-center">
            <UISpinner size="12" />
          </div>
        </template>


        <div v-else class="mt-[50px]">
          <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalClipCard
              v-for="(clip, key) in clipsByContributor?.clips?.slice(0, 3)"
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
          redirect-address="/explore-clips"
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
          <NuxtLink to="/explore-clips">View More Favourites Clips</NuxtLink>
          <template #suffix>
            <UIIcon icon="icon-arrow-right" class="text-xl" />
          </template>
        </UIButton>
        <UIButton color="link" size="lg" outline>
          <NuxtLink to="/explore-clips">View All Clips</NuxtLink>
          <template #suffix>
            <UIIcon icon="icon-arrow-right" class="text-xl" />
          </template>
        </UIButton>
      </div>
    </UIContainer>

    <GlobalBannerPassoverAndSupport />
  </div>
</template>
