<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <UIIcon icon="icon-book-f" shape="square" class="bg-gradient2 shadow-md" />
        <UIHeading :level="1" class="mt-5 text-center text-[3rem]">Explore Passover Haggadahs</UIHeading>
        <UISearch
          rules="required"
          redirect-address="/search-haggadahs"
          query-key="haggadah"
          placeholder="Search Haggadahs by keyword or topic"
          class="mt-[25px]" />
        <div class="mt-[45px] text-center">
          <span class="text-sm leading-none text-gray-900"> Popular categories </span>
          <div class="mt-[22px] flex flex-wrap justify-center space-x-1.5">
            <UIBadge
              v-for="category in categories"
              :key="category"
              size="md"
              type="accent-yellow"
              class="mb-1.5 md:mb-0">
              {{ category }}
            </UIBadge>
          </div>
        </div>
      </UIContainer>
    </div>

    <div
      id="favourite-haggadahs-carousel"
      class="mt-[90px] bg-tertiary-500 pt-[80px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <ExploreHaggadahsSectionFavouritesCarousel />
      </UIContainer>
    </div>

    <div class="pt-[80px]">
      <UIContainer>
        <div v-for="section in sections" :key="section.name" class="py-[70px]">
          <div class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
            <div>
              <UIHeading :level="3" class="text-[2rem] leading-[2.4rem]">
                Trending Haggadahs in <span class="text-secondary-500">{{ section.name }}</span>
              </UIHeading>
              <span class="mt-1 block"> 26 Haggadahs • Curated by Haggadot </span>
            </div>
            <NuxtLink to="#" class="ml-4 flex-shrink-0">Show all</NuxtLink>
          </div>

          <div class="mt-[45px]">
            <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-1 lg:grid-cols-3">
              <GlobalHaggadahCard
                v-for="item in haggadahs"
                :key="item"
                route="#"
                :img-src="haggadahsCardImage"
                title="10 Minute Dayenu Seder"
                :slug="`haddahs-${item}`"
                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
                :read-time="10"
                contributor-name="Haggadahs"
                contributor-initials="HD"
                :contributor-avatar="null"
                :topic-tags="['Trending', 'Humanity']"
                :is-added-to-bookmark="false"
                :is-owner="false"
                :is-liked="false" />
            </div>
          </div>
        </div>
      </UIContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';

const categories: Ref<string[]> = ref(['Family', 'Comedy', 'Pop Culture', 'Ukraine', 'Humanity', 'Kids']);
const sections: Ref<{ name: string }[]> = ref([
  {
    name: 'Equality',
  },
  {
    name: 'Kids',
  },
  {
    name: 'Women',
  },
  {
    name: 'Food',
  },
]);

const haggadahs = [...Array(3).keys()];
const haggadahsCardImage = (await import('@/assets/images/haggadah-card-image.png')).default;
</script>
