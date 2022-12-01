<template>
  <div>
    <div class="mb-[50px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
      <div class="inline-flex items-center space-x-4">
        <UIHeading :level="3" class="text-4xl !text-white"> Our Favourites Haggadahs </UIHeading>
      </div>

      <UIButtonGroup>
        <UIButton class="h-8 w-8 border border-white">
          <UIIcon icon="icon-arrow-left text-white" />
        </UIButton>
        <UIButton class="h-8 w-8 border border-white">
          <UIIcon icon="icon-arrow-right text-white" />
        </UIButton>
      </UIButtonGroup>
    </div>

    <div class="w-full items-start xl:flex">
      <div class="flex-1 overflow-hidden">
        <UICarousel :items="haggadahs" :breakpoints="{ xsm: 1, lg: 2 }" :justify-rows="true">
          <template v-slot:slide="slide">
            <div class="max-w-[625px]">
              <GlobalHaggadahCard
                route="#"
                :col="6"
                :img-src="slide.item.item_image || 'https://haggadot.us-east-1.linodeobjects.com/books/356996/conversions/GoldenGirls-cover.jpg'"
                :title="slide.item.title || '10 Minute Dayenu Seder'"
                :slug="slide.item.handle"
                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
                :read-time="slide.item.reading_length || 10"
                :contributor-name="slide.item.author"
                :contributor-initials="slide.item.author_initials"
                :contributor-avatar="null"
                :language-tags="['Trending', 'Humanity']"
                :topic-tags="['Trending', 'Humanity']"
                :completed-progress="50"
                :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
                :is-added-to-bookmark="slide.item.is_bookmarked !== '0'"
                :is-liked="slide.item.is_liked !== '0'"
                :download-url="slide.item.download_url"
                :hide-onwer-badge="true" />
            </div>
          </template>
        </UICarousel>

        <UIButton class="mx-auto mt-[70px] !flex" color="light" size="xl">
          Explore more favourite Haggadahs
          <template #suffix>
            <UIIcon icon="icon-arrow-right text-xl" />
          </template>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import { useAsyncData } from '#app';
import { storeToRefs } from 'pinia';
import type { Haggadah } from '~/components/Global/Haggadah/types';
import { usePageStore } from '~/store/page';

const pageStore = usePageStore();
const { homePageData } = storeToRefs(pageStore);

await useAsyncData(pageStore.getHomePage);

// Haggadahs Data
const haggadahs: ComputedRef<Haggadah[]> = computed(() => homePageData.value?.favorite_haggadahs?.slice(0, 6));
</script>
