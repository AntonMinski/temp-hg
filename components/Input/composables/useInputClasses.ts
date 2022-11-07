import type { Ref } from 'vue';
import { computed } from 'vue';
import type { InputSize } from '@/components/Input/types';
import { simplifyTailwindClasses } from '@/utils/simplifyTailwindClasses';

// LABEL
const defaultLabelClasses = 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300';

// INPUT
const defaultInputClasses =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';
const disabledInputClasses = 'cursor-not-allowed bg-gray-100';
const inputSizeClasses: Record<InputSize, string> = {
  lg: 'p-5 py-3.5 h-14',
  md: 'p-3 h-12',
  sm: 'p-2 text-sm h-9',
};

export type UseInputClassesProps = {
  size: Ref<InputSize>;
  disabled: Ref<boolean>;
};

export function useInputClasses(props: UseInputClassesProps): {
  inputClasses: Ref<string>;
  labelClasses: Ref<string>;
} {
  const inputClasses = computed(() => {
    return simplifyTailwindClasses(
      defaultInputClasses,
      inputSizeClasses[props.size.value],
      props.disabled.value ? disabledInputClasses : ''
    );
  });

  const labelClasses = computed(() => {
    return defaultLabelClasses;
  });

  return {
    inputClasses,
    labelClasses,
  };
}
