<script lang="ts" setup>

</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="container max-w-screen-xl py-8 px-4 lg:py-16">
            <div class="grid gap-8 items-start mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
                <div class="relative col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                    <Typography>
                        Create interesting Haggadah
                        <span class="relative top-2 icon-book-f text-7xl text-transparent bg-gradient2 bg-clip-text"></span>
                        for your Passover Seder
                    </Typography>
                    <p class="text-lg font-normal tracking-wide text-gray-700 mb-16 dark:text-gray-400">We're the largest online resource for the Passover Haggadah with thousands of options for blessings, artwork, translations, songs, activities and more. Mix and match, download and print at home.</p>
                    <form action="#" class="">
                        <div class="justify-center items-center mx-auto mb-3 space-y-4 sm:flex lg:justify-start sm:space-y-0 sm:space-x-4">
                            <Input placeholder="Enter email to get started" class="w-96">
                                <template #prefix>
                                    <span class="icon-email leading-none text-gray-500 dark:text-gray-400"></span>
                                </template>
                            </Input>

                            <Button gradient="gradient1">
                                Get started
                                <template #suffix>
                                    <span class="icon-arrow-right text-xl font-semibold leading-none"></span>
                                </template>
                            </Button>
                        </div>
                        <div class="flex justify-center items-center divide-x divide-gray-200 lg:justify-start">
                            <div class="flex items-center pr-5 text-sm font-light text-gray-500 dark:text-gray-400">
                                <span class="icon-star text-gray-900 dark:text-white leading-none mr-2 -mt-0.5"></span>
                                <span class="mr-2 font-normal text-gray-900 dark:text-white">1,456+</span> Reviews
                            </div>
                            <div class="flex items-center pl-5 text-sm text-gray-900 dark:text-white">
                                <span class="icon-fire leading-none mr-2 -mt-0.5"></span>
                                Absolutely free for Seder lovers
                            </div>
                        </div>
                    </form>

                    <img src="~/assets/svg/signal.svg" class="absolute -top-7 -right-2 w-9 h-12">
                </div>
                <div class="col-span-6">
                    <img src="~/assets/images/hero-image.png" alt="Hero Image">
                </div>
            </div>
        </div>
    </section>
</template>
