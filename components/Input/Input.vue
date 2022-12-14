<template>
  <div>
    <label v-if="label" :class="labelClasses">{{ label }}</label>
    <div class="relative flex items-center">
      <div
        v-if="$slots.prefix"
        class="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center overflow-hidden pl-3">
        <slot name="prefix" />
      </div>
      <input
        v-bind="$attrs"
        v-model="model"
        :disabled="disabled"
        :type="type"
        @input="showErrors = false"
        @blur="showErrors = true"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '', errorsToShow ? errorClasses : '']" />
      <div v-if="$slots.suffix" class="absolute right-1.5">
        <slot name="suffix" />
      </div>
    </div>
    <p v-if="$slots.helper || errorsToShow" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <span v-if="errorsToShow" class="text-danger-600">{{ errorMessage }}</span>
      <slot v-else name="helper" />
    </p>
  </div>
</template>
<script lang="ts" setup>
import type { PropType, Ref, ComputedRef } from 'vue';
import type { InputSize } from './types';
import { useInputClasses } from './composables/useInputClasses';
import { toRefs, ref, computed } from 'vue';
import { useVModel } from '@vueuse/core';
import { useField } from 'vee-validate';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'text' | 'password'>,
    default: 'text',
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'md',
  },
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
  },
});

const model = useVModel(props, 'modelValue');

const { errorMessage } = useField(props.name);
const showErrors: Ref<boolean> = ref(false);
const errorsToShow: ComputedRef<boolean> = computed(() => showErrors.value && !!errorMessage.value);

const { inputClasses, labelClasses, errorClasses } = useInputClasses(toRefs(props));
</script>
