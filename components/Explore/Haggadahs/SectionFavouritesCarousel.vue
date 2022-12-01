<template>
  <div>
    <div class="mb-[50px] items-center justify-between space-y-12 lg:flex lg:space-y-0">
      <div class="inline-flex items-center space-x-4">
        <UIHeading :level="3" class="text-4xl !text-white"> Our Favourites Haggadahs </UIHeading>
      </div>

      <UIButtonGroup>
        <UIButton
          class="h-8 w-8 border border-white text-white hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400">
          <UIIcon icon="icon-arrow-left" />
        </UIButton>
        <UIButton
          class="h-8 w-8 border border-white text-white hover:bg-gray-100 hover:text-tertiary-600 dark:hover:bg-gray-600 dark:hover:text-tertiary-400">
          <UIIcon icon="icon-arrow-right" />
        </UIButton>
      </UIButtonGroup>
    </div>

    <div class="w-full items-start xl:flex">
      <div class="flex-1 overflow-hidden">
        <UICarousel :items="haggadahs" :breakpoints="{ xs: 1, lg: 2 }" :justify-rows="true">
          <template v-slot:slide="slide">
            <div class="max-w-[625px]">
              <GlobalHaggadahCard
                route="#"
                :col="6"
                :img-src="haggadahsCardImage"
                title="Comedy Seder"
                :slug="`haggadahs-${slide}`"
                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
                :read-time="10"
                contributor-name="Haggadahs"
                contributor-initials="HD"
                :contributor-avatar="null"
                :topic-tags="['Trending', 'Humanity']"
                :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
                :completed-progress="50"
                :language-tags="['Trending', 'Humanity']"
                :is-added-to-bookmark="false"
                :is-owner="true"
                :is-liked="false"
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
const haggadahs = [...Array(10).keys()];
const haggadahsCardImage = (await import('@/assets/images/haggadah-card-image.png')).default;
</script>
