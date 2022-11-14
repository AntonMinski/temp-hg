<script lang="ts" setup>
interface Props {
    progress?: number
    color?: string
    size?: string
}

const props = withDefaults(defineProps<Props>(), {
    progress: 0,
    color: 'primary',
    size: 'xs',
})

type ProgressColors = 'primary' | 'secondary' | 'gray'

const colors: Record<ProgressColors, string> = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    gray: 'bg-gray-600',
}

const sizes = {
    xs: 'text-xs font-semibold',
}

const borderRadiuses = {
    xs: 'rounded-sm',
}

const color = computed<string>(() => colors[props.color])
const size = computed<string>(() => sizes[props.size])
const borderRadius = computed<string>(() => borderRadiuses[props.size])
</script>

<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-1.5" :class="size">
            <span>Completed</span>
            <span>{{ progress }}%</span>
        </div>

        <div class="flex items-stretch w-full bg-gray-200 h-[5px]" :class="borderRadius">
            <span :class="[color, borderRadius]" :style="`width: ${progress}%`"></span>
        </div>
    </div>
</template>
