<template>
  <div>
    <div class="pt-[72px]">
      <UIContainer class="flex flex-col items-center">
        <GlobalClipIcon />
        <UIHeading :level="2" class="mt-5">Explore Haggadah Clips</UIHeading>
        <UISearch
          rules="required|min:2"
          redirect-address="/clip-search"
          query-key="key"
          placeholder="Search community clips by type, category or keyword"
          size="large"
          class="mt-[25px]"
          :redirect="false"
          @search="getPageData" />

        <div class="mt-[50px]">
          <span class="text-sm leading-none text-gray-500"> Popular categories </span>

          <div class="mt-[22px] flex flex-wrap space-x-1.5">
            <UIBadge
              v-for="category in popularCategories"
              :key="category.handle"
              size="md"
              type="tertiary-reverse"
              @click="getClipsByCategory(category.handle)">
              {{ category.name }}
            </UIBadge>
          </div>
        </div>

        <UICard
          class="[-50px] mt-16"
          variant="horizontal-full"
          content-classes="flex flex-col items-center w-full !p-6 !overflow-visible">
          <div id="filter-heading" class="mb-6 flex items-center">
            <img src="~/assets/images/clips-filter.png" alt="Filter clips" />
            <span class="ml-1.5">Filter clips</span>
          </div>
          <div
            id="filter-dropdown-group"
            class="flex-wap mt-6 flex w-full flex-col flex-wrap items-center justify-around lg:flex-row">
            <UIFilterDropdown
              class="flex-grow px-2"
              text="Haggadah Section"
              :items="haggadahSections"
              v-model="selectedHaggadahSections" />
            <UIFilterDropdown
              class="flex-grow px-2"
              text="Clip Categories"
              :items="categories"
              v-model="selectedCategories"
              v-model:child="selectedChildCategories"
              menu-type="group" />
            <UIFilterDropdown
              class="flex-grow px-2"
              text="Media Type"
              :items="mediaTypes"
              v-model="selectedMediaTypes" />
            <UIButton
              gradient="gradient1"
              class="mx-2 mt-2 flex min-w-[128px] items-center lg:mt-0"
              size="md"
              @click="getClipsByFilters"
            >Apply filter</UIButton
            >
            <UIButton
              v-if="hasFilters"
              class="mx-2 mt-2 flex min-w-[128px] items-center lg:mt-0"
              size="md"
              @click="resetFilters"
            >Clear</UIButton
            >
          </div>
        </UICard>
      </UIContainer>
    </div>

    <div class="bg-secondary-500 pt-[140px] pb-[100px] text-center dark:bg-gray-600">
      <UIContainer>
        <UIHeading :level="4" class="!text-white">Our Favourites Clips</UIHeading>

        <div class="mt-[62px] grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <GlobalClipCard
            v-for="(clip, key) in clips.slice(0, 6)"
            :key="key"
            :handle="clip.handle"
            :type="clip.cliptype"
            :section-title="clip.clip_section"
            :title="clip.title"
            :src="clip.image"
            :text="clip.body"
            :contributor-name="clip.author"
            :contributor-initials="clip.author_initials"
            :contributor-avatar="null"
            :downloads-count="clip.downloads"
            :likes-count="clip.likes"
            :language-tags="['English', 'Hebrew']"
            :topic-tags="['Chad Gadya', 'Dayenu']"
            :is-added-to-bookmarks="clip.is_bookmarked !== '0'" />
        </div>

        <UIButton class="mx-auto mt-[90px] !flex" color="link" size="lg">
          View more favourite clips
          <template #suffix>
            <UIIcon icon="icon-arrow-right text-xl" />
          </template>
        </UIButton>
      </UIContainer>
    </div>

    <div class="py-20">
      <GlobalBannerClip variant="horizontal" />
    </div>

    <div class="pb-[51px]">
      <ExploreClipsBase :clips="clips" :sections="haggadahSections.slice(0, 5)" />
    </div>
  </div>
</template>
<script>
export default {
  name: '_old'
};
</script>
<style scoped>
</style>
