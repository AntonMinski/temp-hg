<script lang="ts" setup>
interface Props {
    icon: string
    shape?: 'square' | 'circle'
}

const props = defineProps<Props>()

const shapes = {
    'square': 'text-3xl text-white rounded-lg p-3',
    'circle': 'text-3xl text-white rounded-full p-3'
}

const shape = computed(() => shapes[props.shape] ?? null)
</script>

<template>
    <span class="!leading-none" :class="[icon, shape]"></span>
</template>
