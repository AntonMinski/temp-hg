<template>
  <VField
    :name="name"
    :type="type"
    as="div"
    class='border-none'
    :validateOnBlur="true"
    :validateOnChange="false"
    :validateOnInput="false"
    v-slot="{ field, errors, errorMessage }">
    <label v-if="label" :class="labelClasses" for="name">{{ label }}</label>
    <div class="relative flex items-center">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex w-10 items-center overflow-hidden pl-3">
        <slot name="prefix" />
      </div>
      <input
        v-bind="{ ...$attrs, ...field }"
        v-model="model"
        :disabled="disabled"
        :type="type"
        :class="[inputClasses, $slots.prefix ? 'pl-10' : '', errors.length ? errorClasses : '']"
        :name="name" />
      <div v-if="$slots.suffix" class="absolute right-3 flex items-center">
        <slot name="suffix">
          <UIIcon
            v-if="type === 'password'"
            icon="icon-eye-open"
            class="block cursor-pointer pl-0.5"
            @click="toggleShowPassword" />
        </slot>
      </div>
    </div>
    <p v-if="$slots.helper || errors.length" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <VErrorMessage v-if="errors.length" :name="name" as="div" class="text-danger-600" />
<!--      <span v-if="errors.length" class="text-danger-600">-->
<!--        {{ errors[0] }}-->
<!--      </span>-->
      <slot v-else name="helper" />
    </p>
  </VField>
</template>
<script lang="ts" setup>
import type { PropType, Ref, ComputedRef } from 'vue';
import { toRefs, ref, computed } from 'vue';
import { useVModel } from '@vueuse/core';
import { useField, Field } from 'vee-validate';
import { useInputClasses } from './composables/useInputClasses';
import type { InputSize } from './types';

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
  labelClasses: {
    type: String,
    default: '',
  },
});

const model = useVModel(props, 'modelValue');

// const { errorMessage } = useField(props.name);
// const showErrors: Ref<boolean> = ref(false);
// const errorsToShow: ComputedRef<boolean> = computed(() => showErrors.value && !!errorMessage.value);
const { inputClasses, labelClasses, errorClasses } = useInputClasses(toRefs(props));

// const capitalizeErrorMessage = computed(
//   () => `
//     ${(errorMessage.value && errorMessage.value?.charAt(0).toUpperCase() + errorMessage.value?.slice(1)) || ''}
//   `
// );

const showPassword: Ref<boolean> = ref(false);

function toggleShowPassword() {
  try {
    if (showPassword.value) {
      document.forms.login.password.type = 'password';
    } else {
      document.forms.login.password.type = 'text';
    }
    showPassword.value = !showPassword.value;
  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  background-color: transparent;
  color: inherit;
  -webkit-text-fill-color: inherit;
  -webkit-text-size-adjust: 100%;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
