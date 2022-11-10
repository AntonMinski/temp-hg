<script lang="ts" setup>
import type { Haggadah } from '~/components/Haggadah/types';
import { PropType, ref } from 'vue';
const { vueApp } = useNuxtApp();

// Haggadahs Data
// const haggadahs: ComputedRef<Haggadah[]> = computed(() => homeStore.homePageData.featured_haggadah?.slice(0, 6));
const props = defineProps({
  haggadahs: {
    type: Array as PropType<Haggadah[]>,
    default: '',
  },
});

// Search
const searchString = ref('');
async function searchHaggadahs(): Promise<void> {
  await navigateTo({
    path: `/search-haggadahs`,
    query: {
      haggadah: searchString.value,
    },
  });
}
</script>

<template>
  <div id="favourite-haggadahs" class="bg-white dark:bg-gray-800">
    <Container class="py-24">
      <div class="mb-12 flex items-center justify-between">
        <div class="inline-flex items-center space-x-4">
          <Icon icon="icon-book-f" shape="square" class="bg-gradient2 shadow-md" />

          <Heading :level="3" class="text-4xl"> Our Favourites Haggadahs </Heading>
        </div>

        <Input
          v-model="searchString"
          placeholder="Search Haggadahs by keyword or topic"
          class="h-11.5 w-134 !rounded-full pl-5.5">
          <template #suffix>
            <Button gradient="gradient1" class="h-8 w-8" square pill @click="searchHaggadahs">
              <Icon icon="icon-search" class="!text-sm !text-gray-900" />
            </Button>
          </template>
        </Input>
      </div>

      <div class="grid grid-cols-3 gap-x-[1.56rem] gap-y-[2.8rem]">
        <HaggadahCard
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
    </Container>
  </div>
</template>
