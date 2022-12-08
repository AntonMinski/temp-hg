<template>
  <div>
    <PreviewHaggadahsHeader :haggadah="haggadah" />
    <div class="bg-tertiary-500 py-6">
      <UIContainer>
        <div class="flex justify-between">
          <div class="flex items-center">
            <div class="ml-2 flex flex-col gap-0.5">
              <BlockContributor
                :initials="contributor.author_initials"
                :name="contributor.author"
                text="Contributed by"
                size="lg"
                class="contributor-details !mt-0">
                <template #heading>
                  <span class="text-xs text-white">Contributed by</span>
                  <UIHeading :level="6" class="mb-2 !text-white">{{ contributor.author }}</UIHeading>
                </template>
                <template #details>
                  <span class="block text-xs text-gray-600 dark:text-gray-400">
                    {{ contributor.total_followers }} Followers • {{ contributor.total_books }} Haggadahs •
                    {{ contributor.total_clips }} Clips
                  </span>
                </template>
              </BlockContributor>
            </div>
          </div>
          <div class="flex w-[411px] items-center">
            <UIButton
              class="mr-4 w-full bg-accent-yellow-500 text-gray-900 hover:bg-accent-yellow-600"
              @click="followContributor">
              <template v-if="isFollowingTemporarily"> UnFollow Contributor </template>
              <template v-else> Follow Contributor </template>
            </UIButton>
            <UIButton
              color="light"
              outline
              class="w-full border bg-transparent text-white hover:bg-white hover:text-gray-900"
              @click="viewProfile">
              View Profile
            </UIButton>
          </div>
        </div>
      </UIContainer>
    </div>
    <PreviewHaggadahsByAuthor :contributor="contributor" />
    <PreviewHaggadahsSimilarHaggadahs :similar-haggadahs="similarTopicHaggadahs" />
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData, useNuxtApp, useRoute } from '#app';
import { Haggadah } from '~/components/Global/Haggadah/types';
import { ref, Ref } from 'vue';
import { ContributedBy } from '~/components/Global/Contributor/types';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { loginModal } from '~/composables/loginModal';
import { loginRedirect } from '~/composables/loginRedirect';

const Avatar = (await import('@/assets/images/avatar.png')).default;
const route = useRoute();
const { vueApp } = useNuxtApp();

async function getInitialData() {
  const slug = route.params.slug as string;
  let data;
  try {
    const response = await vueApp.$api.book.exploreSingleBook(slug);
    data = { ...response._data.data };
  } catch (error) {
    console.error(error);
  }
  return data;
}
const { data } = await useAsyncData(getInitialData);
const initialData = data.value;

const meta_tags = ref(initialData?.meta_tags);
const metaObject = getMetaObject(meta_tags);
useHead({
  title: meta_tags?.title,
  meta: metaObject,
});

const haggadah: Ref<Haggadah> = ref(initialData?.book);
const contributor: Ref<ContributedBy> = ref(initialData?.contributed_by);
const similarTopicHaggadahs: Ref<Haggadah[]> = ref(
  initialData?.similar_topic_book?.map((item) => item?.book).slice(0, 3)
);

const isFollowingTemporarily = ref(contributor.value?.is_following === '1');
async function followContributor() {
  // check if user is logged in
  if (loginModal()) {
    vueApp.$toast.error('not Authenticated');
    return;
  }

  let response;
  try {
    if (isFollowingTemporarily.value) {
      response = await vueApp.$api.contributor.followContributor(contributor.value?.handle);
    } else {
      response = await vueApp.$api.contributor.unFollowContributor(contributor.value?.handle);
    }
    if (response?._data?.success) {
      isFollowingTemporarily.value = !isFollowingTemporarily.value;
    }
  } catch (error) {
    console.error(error);
  }
}

async function viewProfile() {
  // check if admin is authenticated
  if (await loginRedirect()) {
    vueApp.$toast.error('not Authenticated');
    return;
  }
  // api not implemented yet
}
</script>

<style>
.contributor-details,
.contributor-details * {
  @apply text-white;
}
</style>
