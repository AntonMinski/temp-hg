import classNames from 'classnames';
import type { Ref } from 'vue';
import { computed } from 'vue';
import type { ModalSize } from '~/components/UI/Modal/types';

// Modal
const defaultModalWrapperClasses =
  'fixed inset-0 z-50 px-3 flex overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50';

const defaultModalClasses = 'relative h-auto w-full m-auto';

const defaultModalContentClasses =
  'relative rounded-lg bg-white px-[31px] py-[26px] my-10 shadow dark:bg-gray-800 h-auto';

const defaultCloseIconClasses =
  'absolute right-0 top-0 ml-auto inline-flex h-10 w-10 items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white';

const modalSizeClasses: Record<ModalSize, string> = {
  xl: 'max-w-[1440px]',
  lg: 'max-w-screen-xl',
  md: 'max-w-[711px]',
  sm: 'max-w-[466px]',
};

export type UseModalClassesProps = {
  size: Ref<ModalSize>;
  wrapperClasses: Ref<string>;
  contentClasses: Ref<string>;
};

export function useModalClasses(props: UseModalClassesProps): {
  modalWrapperClasses: Ref<string>;
  modalClasses: Ref<string>;
  modalContentClasses: Ref<string>;
  closeIconClasses: Ref<string>;
} {
  const modalWrapperClasses = computed(() => classNames(defaultModalWrapperClasses, props.wrapperClasses.value));
  const modalClasses = computed(() => classNames(defaultModalClasses, modalSizeClasses[props.size.value]));
  const modalContentClasses = computed(() => classNames(defaultModalContentClasses, props.contentClasses.value));
  const closeIconClasses = computed(() => classNames(defaultCloseIconClasses));

  return {
    modalWrapperClasses,
    modalClasses,
    modalContentClasses,
    closeIconClasses,
  };
}
