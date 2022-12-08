<template>
  <UIContainer class="py-[95px]">
    <div v-if="haggadah" class="flex justify-between">
      <div class="flex max-w-[678px] gap-x-[26px] align-baseline">
        <div>
          <UIIcon icon="icon-book-f" shape="square" class="flex bg-gradient2 p-[15px] text-[40px] shadow-md" />
        </div>
        <div>
          <span class="block text-lg font-bold leading-none text-gray-600">Haggadahs</span>
          <UIHeading :level="2" class="text-[48px] leading-[72px] !text-gray-900">{{ haggadah?.title }}</UIHeading>
          <p class="font-normal leading-6 text-gray-800">
            {{ haggadah?.covertext }}
          </p>
          <div class="flex items-center gap-x-5">
            <div class="mt-3.5 flex items-center space-x-2">
              <UIIcon icon="icon-book-o" class="text-lg text-secondary-600" />
              <span class="text-sm font-semibold leading-[21px] text-gray-600 dark:text-gray-100"
                >{{ haggadah?.reading_length }} minutes read</span
              >
            </div>
          </div>
          <div class="flex items-center gap-[18px]">
            <div>
              <UITags
                :tags="topics"
                type="tertiary"
                outline
                tag-class="h-[22px] py-[5px] px-2"
                class="mt-6 gap-[3px]" />
            </div>
            <div>
              <UITags
                :tags="categories"
                type="accent-yellow"
                size="md"
                tag-class="h-[26px] py-1.5 px-3 !text-gray-700"
                class="mt-6 gap-[3px]" />
            </div>
          </div>
          <div class="mt-3.5 pt-[15px]">
            <UIHeading :level="6" class="text-[16px] leading-[24px] !text-gray-600">Note</UIHeading>
            <p class="font-normal leading-6 text-gray-800">
              Lorem ipsum dolor sit amet consectetur. Neque erat ipsum posuere et cras netus lorem.
            </p>
          </div>
        </div>
      </div>
      <div class="flex w-full max-w-[398px] flex-col justify-center">
        <UIButton gradient="gradient1" class="h-[55px] text-lg" @click="customizeHaggadah">
          <UIIcon icon="icon-document" class="mr-2.5" /> Customize this Haggadah
        </UIButton>
        <UIButton class="mt-[18px]" color="dark" outline>
          <UIIcon icon="icon-edit" class="mr-2.5" /> Edit Haggadah
        </UIButton>
        <BlockActionButtons
          v-model:is-added-to-bookmark="isAddedToBookmarkTemporary"
          @add-to-bookmark="addToBookmark(true)"
          @remove-from-bookmark="addToBookmark(false)"
          @download="downloadHaggadah"
          @share="shareHaggadah"
          :group="false"
          :index="1"
          class="mt-[30px]" />
      </div>
    </div>
  </UIContainer>
</template>

<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue';
import { Haggadah } from '~/components/Global/Haggadah/types';
import { loginModal } from '~/composables/loginModal';
import { loginRedirect } from '~/composables/loginRedirect';
import { useNuxtApp } from '#app';
import { handleAddToBookmark } from '~/composables/handleAddToBookmark';
const { vueApp } = useNuxtApp();

const props = defineProps({
  haggadah: {
    type: Object as PropType<Haggadah>,
    required: true,
  },
});

if (!props.haggadah) {
  console.error('Haggadah not fetched from the Api');
}

const isLikedTemporary: Ref<Boolean> = ref(props.haggadah?.is_liked === '1');
async function likeHaggadah() {
  // show login modal, authentication required
  if (loginModal()) {
    vueApp.$toast.error('not Authenticated');
    return false;
  }
  try {
    if (!isLikedTemporary.value) {
      await vueApp.$api.book.likeBook(props.haggadah?.handle);
      isLikedTemporary.value = true;
      vueApp.$toast.success(`liked`);
    } else {
      await vueApp.$api.book.unLikeBook(props.haggadah?.handle);
      isLikedTemporary.value = false;
      vueApp.$toast.success(`unliked`);
    }
  } catch (error) {
    if (error.statusCode === 401 || error.statusCode === 403) {
      loginModal();
    }
  }
}

const isAddedToBookmarkTemporary: Ref<Boolean> = ref(props.haggadah?.is_bookmarked === '1');
// Bookmarks
async function addToBookmark(add: boolean): Promise<void> {
  try {
    // show login modal, authentication required, not implemented yet
    if (await handleAddToBookmark(add, props.haggadah?.handle, 'book')) {
      isAddedToBookmarkTemporary.value = add;
    }
  } catch (error) {
    console.error(error);
  }
}

async function downloadHaggadah(): Promise<void> {
  // not implemented yet
}

async function shareHaggadah() {
  // not implemented yet
}

async function customizeHaggadah() {
  if (await loginRedirect()) {
    vueApp.$toast.error('not Authenticated');
    return false;
  }
}

const topics = ['Trending', 'Humanity'];
const categories = ['Chad Gadya', 'Dayenu'];
</script>
