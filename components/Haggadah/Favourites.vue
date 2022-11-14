<script lang="ts" setup>
import type { Haggadah } from '~/components/Haggadah/types';
import { PropType } from 'vue';

// Haggadahs Data
// const haggadahs: ComputedRef<Haggadah[]> = computed(() => homeStore.homePageData.featured_haggadah?.slice(0, 6));
const props = defineProps({
  haggadahs: {
    type: Array as PropType<Haggadah[]>,
    default: '',
  },
});
</script>

<template>
  <div id="favourite-haggadahs" class="bg-white dark:bg-gray-800">
    <UIContainer class="py-24">
      <div class="mb-12 flex items-center justify-between">
        <div class="inline-flex items-center space-x-4">
          <UIIcon  icon="icon-book-f" shape="square" class="bg-gradient2 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> Our Favourites Haggadahs </UIHeading>
        </div>

        <UISearch
          rules="required"
          redirect-address='/search-haggadahs'
          query-key='haggadah'
          placeholder="Search Haggadahs by keyword or topic"
          />
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
    </UIContainer>
  </div>
</template>
