<template>
  <div class="pb-[51px]">
    <UIContainer>
      <div class="py-[70px]">
        <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
          <div>
            <UIHeading :level="5">
              Other Haggadahs by <span class="text-secondary-500">{{ contributor.author }}</span>
            </UIHeading>
          </div>
          <NuxtLink
            :to="`/explore-haggadahs?topic=${section.handle}`"
            class="ml-4 flex-shrink-0"
            @click="emit('moreHaggadahsByAuthor', contributor.handle)">
            Show all</NuxtLink
          >
        </div>

        <div class="mt-[50px]">
          <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlobalHaggadahCard
              v-for="haggadah in section.books"
              :key="haggadah.handle"
              :route="`haggadahs/${haggadah.handle}`"
              :img-src="haggadah.haggadah_image"
              :title="haggadah.title"
              :slug="haggadah.handle"
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
              :read-time="haggadah.reading_length || 10"
              :contributor-name="haggadah.author"
              :contributor-initials="haggadah.author_initials"
              :contributor-avatar="null"
              :language-tags="['Trending', 'Humanity']"
              :topic-tags="['Trending', 'Humanity']"
              :completed-progress="50"
              :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
              :is-added-to-bookmark="haggadah.is_bookmarked !== '0'"
              :is-liked="haggadah.is_liked !== '0'"
              :download-url="haggadah.download_url" />
          </div>
        </div>
      </div>
    </UIContainer>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData, useNuxtApp } from '#app';
import { PropType, reactive } from 'vue';
import { Contributor } from '~/components/Global/Contributor/types';
import { Haggadah } from '~/components/Global/Haggadah/types';
const { vueApp } = useNuxtApp();

const props = defineProps({
  contributor: {
    type: Object as PropType<Contributor>,
    required: true,
  },
});
const emit = defineEmits(['moreHaggadahsByAuthor']);

async function getTrendingHaggadahsSection() {
  let data = {
    books: [] as Haggadah[],
    name: '' as string,
    handle: '' as string,
    total_books: 0 as number,
  };
  try {
    const response = await vueApp.$api.book.getBooksByAuthor(props.contributor.handle);
    data.books = [...response?._data?.data?.map((item) => item.book).slice(0, 3)];
    data.name = response?._data?.name;
    data.handle = response?._data?.handle;
    data.total_books = response?._data?.total_books;
  } catch (error) {
    console.log(error);
  }
  return data;
}
const { data } = await useAsyncData(getTrendingHaggadahsSection);
const initialData = data.value;

const section = reactive({
  books: initialData.books,
  name: initialData.name,
  handle: initialData.handle,
  total: initialData.total_books,
  curated_by: props.contributor.name,
});
</script>
