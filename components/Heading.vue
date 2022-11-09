<script lang="ts" setup>
interface Props {
  level?: number;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
});

const levelClasses = {
  1: 'text-[3.5rem] font-semibold leading-[4.68rem]',
  2: 'text-[3.375rem] font-semibold leading-[4rem]',
  3: 'text-[2.75rem] font-semibold leading-[3.3rem]',
  4: 'text-[2rem] font-semibold leading-[2.4rem]',
  5: 'text-[1.625rem] font-semibold leading-[1.95rem]',
  6: 'text-xl font-semibold leading-6',
};

const levelClass = computed(() => levelClasses[props.level]);
</script>

<template>
  <component :is="`h${level}`" class="font-serif text-black dark:text-white" :class="levelClass">
    <slot />
  </component>
</template>
