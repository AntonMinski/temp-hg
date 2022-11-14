import type { SearchProps } from '../types';
import { computed } from 'vue';
import { simplifyTailwindClasses } from '~/utils/simplifyTailwindClasses';


const inputBaseClasses: string = '!rounded-full';
const buttonBaseClasses: string = '!rounded-full';
const iconBaseClasses: string = '!text-gray-900';


const inputSizeClasses = {
  default: 'h-11.5 w-134 text-base ',
  large: 'h-14.5 w-134 text-lg ',
};

const buttonSizeClasses = {
  default: 'h-8 w-8 ',
  large: 'h-10 w-10 ',
}

const iconSizeClasses = {
  default: '!text-sm ',
  large: '!text-lg',
};

export function useSearchClasses(props: SearchProps) {
  const size = props.size.value;

  const inputClasses = computed(() => {
    return simplifyTailwindClasses(inputBaseClasses, inputSizeClasses[size]);
  });
  const buttonClasses = computed(() => {
    return simplifyTailwindClasses(buttonBaseClasses, buttonSizeClasses[size]);
  });
  const iconClasses = computed(() => {
    return simplifyTailwindClasses(iconBaseClasses, iconSizeClasses[size]);
  });

  return { inputClasses, buttonClasses, iconClasses };
}
