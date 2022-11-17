<script lang="ts" setup>
import { PropType } from 'vue';
import type { Haggadah } from '~/components/Haggadah/types';

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
      <div class="mb-12 items-center justify-between space-y-12 lg:flex lg:space-y-0">
        <div class="inline-flex items-center space-x-4">
          <UIIcon icon="icon-book-f" shape="square" class="bg-gradient2 shadow-md" />

          <UIHeading :level="3" class="text-4xl"> Our Favourites Haggadahs </UIHeading>
        </div>

        <UISearch
          rules="required"
          redirect-address="/search-haggadahs"
          query-key="haggadah"
          placeholder="Search Haggadahs by keyword or topic" />
      </div>

      <div class="grid gap-x-[1.56rem] gap-y-[2.8rem] md:grid-cols-2 lg:grid-cols-3">
        <GlobalHaggadahCard
          v-for="(item, n) in haggadahs"
          :key="n"
          route="#"
          :img-src="item.haggadah.haggadah_image"
          :title="item.haggadah.title"
          :slug="item.haggadah.handle"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
          :read-time="item.haggadah.reading_length || 10"
          :contributor-name="item.haggadah.author"
          :contributor-avatar="null"
          :language-tags="['Trending', 'Humanity']"
          :topic-tags="['Trending', 'Humanity']"
          :completed-progress="50"
          :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
          :is-added-to-bookmark="item.haggadah.is_bookmarked !== '0'" />
      </div>

      <UIButton class="mx-auto mt-16.5 !flex" color="dark" size="xl">
        Show all
        <template #suffix>
          <UIIcon icon="icon-arrow-right text-xl" />
        </template>
      </UIButton>
    </UIContainer>
  </div>
</template>
