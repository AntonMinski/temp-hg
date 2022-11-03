<script lang="ts" setup>
interface Props {
    icon: string
    type?: 'square' | 'circle'
}

const props = defineProps<Props>()

const types = {
    'square': 'rounded-lg p-3',
    'circle': 'rounded-full p-3'
}

const type = computed(() => types[props.type] ?? null)
</script>

<template>
    <span class="text-3xl text-white leading-none" :class="[icon, type]"></span>
</template>
