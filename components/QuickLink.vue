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
        <div class="flex items-center justify-center w-14 h-14 rounded-lg" :class="iconBgColor">
            <span class="text-3xl text-white leading-none" :class="icon"></span>
        </div>
        <div>
            <span class="block text-sm text-gray-500 font-semibold mb-0.5">{{ subtitle }}</span>
            <Typography :level="6">{{ title }}</Typography>
        </div>
    </NuxtLink>
</template>
