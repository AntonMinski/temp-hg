<script lang="ts" setup>
interface Props {
    to: object|string
    icon: string
    iconBgColor: string
    title: string
    subtitle: string
}

defineProps<Props>()
</script>

<template>
    <NuxtLink :to="to" class="flex items-center w-full md:w-auto border border-gray-300 rounded-lg p-5 pr-20 space-x-5">
        <Icon
            :icon="icon"
            shape="square"
            :class="iconBgColor"
        />

        <div>
            <span class="block text-sm text-gray-500 font-semibold mb-0.5">{{ subtitle }}</span>
            <Heading :level="6">{{ title }}</Heading>
        </div>
    </NuxtLink>
</template>
