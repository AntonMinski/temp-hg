<script lang="ts" setup>
interface Props {
    level: number
}

const props = withDefaults(defineProps<Props>(), {
    level: 1
})

const levelClasses = {
    1: 'text-6xl font-semibold leading-[4.68rem]'
}

const levelClass = computed(() => levelClasses[props.level])
</script>

<template>
    <component
        :is="`h${level}`"
        class="font-serif text-black dark:text-white mb-4"
        :class="levelClass"
    >
        <slot />
    </component>
</template>
