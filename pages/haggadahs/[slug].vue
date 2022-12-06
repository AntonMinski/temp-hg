<template>
  <div>
    <ExploreHaggadahsPreviewHeader :haggadah="haggadah" />
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
              Follow Contributor
            </UIButton>
            <UIButton
              color="light"
              class="w-full border bg-transparent text-white hover:bg-white hover:text-gray-900"
              @click="viewProfile">
              View Profile
            </UIButton>
          </div>
        </div>
      </UIContainer>
    </div>
    <ExploreHaggadahsPreviewByAuthor :contributor="contributor" />
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData, useNuxtApp, useRoute } from '#app';
import { Haggadah } from '~/components/Global/Haggadah/types';
import { ref, Ref } from 'vue';
import { Contributor } from '~/components/Global/Contributor/types';
import { getMetaObject } from '~/composables/meta';
import { useHead } from '#head';
import { loginModal } from '~/composables/loginModal';
import { loginRedirect } from '~/composables/loginRedirect';

const Avatar = (await import('@/assets/images/avatar.png')).default;
const route = useRoute();
const { vueApp } = useNuxtApp();

async function getInitialData() {
  const slug = route.params.slug as string;
  const response = await vueApp.$api.book.exploreSingleBook(slug);
  const data = { ...response._data.data };
  return data;
}
const { data } = await useAsyncData(getInitialData);
const initialData = data.value;

const haggadah: Ref<Haggadah> = ref(initialData?.book);
const contributor: Ref<Contributor> = ref(initialData?.contributed_by);
const similarTopicHaggadah: Ref<Haggadah> = ref(initialData?.similar_topic_haggadah);
const meta_tags = ref(initialData?.meta_tags);

async function followContributor() {
  const response = await vueApp.$api.contributor.followContributor(contributor.value.id);
  // check if user is logged in
  if (loginModal()) {
    return;
  }
  // api not implemented yet
}

async function viewProfile() {
  // check if admin is authenticated
  if (await loginRedirect()) {
    return;
  }
  // api not implemented yet
}

const metaObject = getMetaObject(meta_tags);
useHead({
  title: meta_tags?.title,
  meta: metaObject,
});
</script>

<style>
.contributor-details,
.contributor-details * {
  @apply text-white;
}
</style>
