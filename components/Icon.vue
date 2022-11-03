<script lang="ts" setup>
interface Props {
    icon: string
    shape?: 'square' | 'circle'
}

const props = defineProps<Props>()

const shapes = {
    'square': 'text-3xl rounded-lg p-3',
    'circle': 'text-3xl rounded-full p-3'
}

const shape = computed(() => shapes[props.shape] ?? null)
</script>

<template>
    <span class="text-white !leading-none" :class="[icon, shape]"></span>
</template>
