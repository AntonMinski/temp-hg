<template>
  <div>
    <div class="mb-[50px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
      <div class="inline-flex items-center space-x-4">
        <UIHeading :level="3" class="text-4xl !text-white"> Our Favourites Haggadahs </UIHeading>
      </div>

      <UIButtonGroup>
        <UIButton
          @click="movePrev"
          class="h-8 w-8 border border-white text-white hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400">
          <UIIcon icon="icon-arrow-left" />
        </UIButton>
        <UIButton
          @click="moveNext"
          class="h-8 w-8 border border-white text-white hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400">
          <UIIcon icon="icon-arrow-right" />
        </UIButton>
      </UIButtonGroup>
    </div>

    <div class="w-full items-start xl:flex">
      <div class="flex-1 overflow-hidden">
        <UICarousel ref="carousel" :items="haggadahs" :breakpoints="{ xs: 1, lg: 2 }" :justify-rows="true" >
          <template v-slot:slide="slide">
            <div class="max-w-[625px]">
              <GlobalHaggadahCard
                :route="`/haggadahs/${slide.item.handle}`"
                :col="6"
                :img-src="slide.item.haggadah_image || slide.item.image"
                :title="slide.item.title"
                :slug="slide.item.handle"
                :text="slide.item.covertext"
                :read-time="slide.item.reading_length || 10"
                :contributor-name="slide.item.author"
                :contributor-initials="slide.item.author_initials"
                :contributor-avatar="null"
                :topic-tags="['Trending', 'Humanity']"
                :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
                :completed-progress="50"
                :language-tags="['Trending', 'Humanity']"
                :is-added-to-bookmark="slide.item.is_bookmarked !== '0'"
                :is-owner="true"
                :is-liked="slide.item.is_liked !== '0'"
                :hide-onwer-badge="true" />
            </div>
          </template>
        </UICarousel>

        <UIButton @click="emit('viewAll')" class="mx-auto mt-[70px] !flex" color="light" size="xl">
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
import { Haggadah } from '~/components/Global/Haggadah/types';
import { PropType, ref } from 'vue';
import { templateRef } from '@vueuse/core'

const carousel = ref(null)



const props = defineProps({
  haggadahs: {
    type: Array as PropType<Haggadah[]>,
    default: () => [],
  },
});
const emit = defineEmits(['viewAll']);

// move carousel by top buttons

function moveNext() {
  // carousel.value.moveNext();
}
function movePrev() {
  // carousel.value.movePrev;
}
</script>
