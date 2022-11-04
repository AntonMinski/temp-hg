<script lang="ts" setup>
const imgSrc = (await import('@/assets/images/haggadah-card-image.png')).default
const avatarSrc = (await import('@/assets/images/avatar.png')).default
</script>

<template>
    <div class="bg-white dark:bg-gray-800">
        <Container class="py-24">

            <div class="flex items-center justify-between mb-12">
                <div class="inline-flex items-center space-x-4">
                    <Icon
                        icon="icon-book-f"
                        shape="square"
                        class="bg-gradient2 shadow-md"
                    />

                    <Heading :level="3" class="text-4xl">
                        Our Favourites Haggadahs
                    </Heading>
                </div>

                <Input
                    placeholder="Search Haggadahs by keyword or topic"
                    class="w-134 h-11.5 !rounded-full pl-5.5"
                >
                    <template #suffix>
                        <Button gradient="gradient1" class="w-8 h-8" square pill>
                            <Icon icon="icon-search" class="!text-sm !text-gray-900" />
                        </Button>
                    </template>
                </Input>
            </div>

            <div class="grid grid-cols-3 gap-x-[1.56rem] gap-y-[2.8rem]">

                <HaggadahCard
                    v-for="i in 6"
                    :key="i"
                    :img-src="imgSrc"
                    title="Golden Girls Haggadah"
                    read-time="10 mins"
                    contributorName="Haggadot"
                    :contributorAvatar="avatarSrc"
                    :language-tags="['Trending', 'Humanity']"
                    :topic-tags="['Trending', 'Humanity']"
                />

            </div>

        </Container>
    </div>
</template>
