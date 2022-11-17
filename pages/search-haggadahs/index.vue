<template>
  <div class='mt-[3rem]'>
    <UIHeading class='text-center' :level='1'>Search haggadah results</UIHeading>
    <div v-if='haggadahs.length' class="grid grid-cols-3 gap-x-[1.56rem] gap-y-[2.8rem]">
      <GlobalHaggadahCard
        v-for="(item, n) in haggadahs"
        :key="n"
        :img-src="item.haggadah.haggadah_image"
        :title="item.haggadah.title"
        :slug="item.haggadah.handle"
        :read-time="item.haggadah.reading_length || 10"
        :contributorName="item.haggadah.author"
        :contributorAvatar="null"
        :language-tags="['Trending', 'Humanity']"
        :topic-tags="['Trending', 'Humanity']" />
    </div>
    <div v-else-if='loading' class='mx-auto mt-8 flex justify-center'>
      <UISpinner size='12' />
    </div>
    <div v-else>
      <UIHeading :level='3'>No results found</UIHeading>
    </div>
  </div>
</template>


<script lang='ts' setup>
import type { booksSearchKey } from '~/types/books';
import type { Haggadah } from '~/components/Haggadah/types';
import { Ref } from 'vue';
const route = useRoute();
const { vueApp } = useNuxtApp();

const haggadahs: Ref<Haggadah[]> = ref([]);
const loading: Ref<boolean> = ref(true);

async function getData() {
  loading.value = true;

  const searchQuery: booksSearchKey = {
    key: route.query.haggadah as string,
    sort: route.query.sort as string || '',
  }
  console.log(searchQuery);
  const { _data } = await vueApp.$api.book.exploreBooks(searchQuery);
  console.log(_data.data);
  haggadahs.value = [..._data.data.searched_books];

  loading.value = false;
}
onMounted(getData);
</script>

