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
        <!-- Temporarily -->
        <div class="mt-[90px]" />
      </UIContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
const categories: Ref<string[]> = ref(['Family', 'Comedy', 'Pop Culture', 'Ukraine', 'Humanity', 'Kids']);
</script>
