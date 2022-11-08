<script lang="ts" setup>
const nuxtLink = resolveComponent('NuxtLink');
const bgImage = (await import('@/assets/images/how-it-works-bg.png')).default;
</script>

<template>
  <div
    class="relative overflow-hidden bg-tertiary-500 bg-right-bottom bg-no-repeat text-white dark:bg-tertiary-900"
    :style="`background-image: url(${bgImage})`">
    <img src="~/assets/svg/Eye.svg" class="absolute bottom-0.5 -right-8 rotate-[-15.69deg]" />

    <Container class="flex flex-col space-y-24 py-28">
      <div class="flex flex-col items-center">
        <Heading :level="3" class="mb-1 text-white"> How it works </Heading>

        <p class="text-lg">We have made it simple with three easy steps</p>
      </div>

      <div class="flex items-center space-x-16">
        <HowItWorksCard
          :step="1"
          title="Start with pre-defined templates"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac." />

        <HowItWorksCard
          :step="2"
          title="Add or edit Haggadah sections"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac." />

        <HowItWorksCard
          :step="3"
          title="Print or share online"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac." />
      </div>

      <div class="mx-auto inline-flex items-center space-x-10">
        <Button :tag="nuxtLink" to="#" size="xl" color="link" class="py-4">
          Make your Haggadah
          <template #suffix>
            <span class="icon-arrow-right text-xl leading-none"></span>
          </template>
        </Button>

        <NuxtLink to="#" class="inline-flex items-center text-lg font-bold text-accent-yellow-500">
          <Icon
            icon="icon-play"
            shape="circle"
            class="mr-3 h-[47px] w-[47px] bg-accent-yellow-500 px-2.5 py-2.5 !text-gray-700 shadow-md" />
          Watch the video
        </NuxtLink>
      </div>
    </Container>
  </div>
</template>
