<script lang="ts" setup>
const nuxtLink = resolveComponent('NuxtLink')
const bgImage = (await import('@/assets/images/how-it-works-bg.png')).default
</script>

<template>
    <div
        class="relative overflow-hidden text-white bg-tertiary-500 dark:bg-tertiary-900 bg-no-repeat bg-right-bottom"
        :style="`background-image: url(${bgImage})`"
    >
        <img src="~/assets/svg/Eye.svg" class="absolute bottom-0.5 -right-8 rotate-[-15.69deg]">

        <div class="container max-w-screen-xl flex flex-col px-4 py-28 space-y-24">
            <div class="flex flex-col items-center">
                <Heading :level="3" class="text-white mb-1">
                    How it works
                </Heading>

                <p class="text-lg">We have made it simple with three easy steps</p>
            </div>

            <div class="flex items-center space-x-16">

                <HowItWorksCard
                    :step="1"
                    title="Start with pre-defined templates"
                    paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac."
                />

                <HowItWorksCard
                    :step="2"
                    title="Add or edit Haggadah sections"
                    paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac."
                />

                <HowItWorksCard
                    :step="3"
                    title="Print or share online"
                    paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin vulputate sodales turpis habitant risus ac."
                />

            </div>

            <div class="inline-flex items-center space-x-10 mx-auto">
                <Button :tag="nuxtLink" to="#" size="xl" color="link" class="py-4">
                    Make a Haggadah
                    <template #suffix>
                        <span class="icon-arrow-right text-xl leading-none"></span>
                    </template>
                </Button>

                <NuxtLink to="#" class="inline-flex items-center text-lg text-accent-yellow-500 font-bold">
                    <span class="icon-play text-3xl text-gray-700 bg-accent-yellow-500 leading-none pl-3 pr-2 py-2.5 rounded-full mr-3 shadow-md"></span>
                    Watch the video
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
