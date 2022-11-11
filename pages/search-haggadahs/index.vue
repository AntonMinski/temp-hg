<template>
  <div class='mt-[3rem]'>
    <Heading class='text-center' :level='1'>Search haggadah results</Heading>
    <div v-if='haggadahs.length' class="grid grid-cols-3 gap-x-[1.56rem] gap-y-[2.8rem]">
      <HaggadahCard
        v-for="(item, n) in haggadahs"
        :key="n"
        :img-src="item.book.cover.book_cover_image"
        :title="item.book.title"
        :read-time="item.book.reading_length"
        :contributorName="item.book.author"
        :contributorAvatar="item.book.image"
        :language-tags="['Trending', 'Humanity']"
        :topic-tags="['Trending', 'Humanity']" />
    </div>
    <div v-else-if='loading' class='mx-auto mt-8 flex justify-center'>
      <Spinner size='12' />
    </div>
    <div v-else>
      <Heading :level='3'>No results found</Heading>
    </div>
  </div>
</template>


<script lang='ts' setup>
import type { booksSearchKey } from '~/types/books';
import { HaggadahBook } from '~/components/Haggadah/types';
import { Ref } from 'vue';
const route = useRoute();
const { vueApp } = useNuxtApp();

const haggadahs: Ref<HaggadahBook[]> = ref([]);
const loading: Ref<boolean> = ref(true);

async function getData() {
  loading.value = true;

  const searchQuery: booksSearchKey = {
    key: route.query.haggadah as string,
    sort: route.query.sort as string || '',
  }
  console.log(searchQuery);
  const { _data } = await vueApp.$api.explore.exploreBooks(searchQuery);
  console.log(_data.data);
  haggadahs.value = _data.data.books;

  loading.value = false;
}
onMounted(getData);
</script>

