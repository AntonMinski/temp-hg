import type { BadgeType, BadgeSize } from '../types';
import { computed } from 'vue';
import type { Ref } from 'vue';
import classNames from 'classnames';

const defaultBadgeClasses = 'rounded flex items-center justify-center';
const defaultOutlineBadgeClasses = ' bg-transparent border';
const badgeLinkClasses = 'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:text-blue-800 dark:hover:bg-blue-300';
const onlyIconClasses = 'p-1 rounded-full mr-2';

const badgeTextClasses: Record<BadgeType, string> = {
  // Custom
  primary: 'text-gray-900',
  tertiary: 'text-tertiary-500',
  'accent-yellow': 'text-gray-900',
  danger: '',
  gray: 'text-white',
};

const badgeTypeClasses: Record<BadgeType, string> = {
  // Custom
  primary: 'bg-primary-400',
  tertiary: '',
  'accent-yellow': 'bg-accent-yellow-500',
  danger: '',
  gray: 'bg-gray-500',
};

const badgeOutlineTextClasses: Record<BadgeType, string> = {
  primary: 'text-primary-700',
  tertiary: 'text-tertiary-500',
  'accent-yellow': '',
  danger: 'text-danger-500',
  gray: '',
};

const badgeOutlineTypeClasses: Record<BadgeType, string> = {
  // Custom
  primary: 'border-primary-700',
  tertiary: 'border-tertiary-500',
  'accent-yellow': '',
  danger: 'border-danger-500',
  gray: '',
};

const badgeSizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs font-normal leading-none px-2 py-[5px]',
  md: 'text-sm font-medium leading-none px-3 py-1.5',
  lg: 'font-medium px-3.5 py-2',
};

export type UseBadgeClassesProps = {
  type: Ref<BadgeType>;
  size: Ref<BadgeSize>;
  href: Ref<string>;
  outline: Ref<boolean>;
};
export type UseBadgeClassesOptions = {
  isContentEmpty: Ref<boolean>;
};

export function useBadgeClasses(
  props: UseBadgeClassesProps,
  options: UseBadgeClassesOptions
): {
  badgeClasses: Ref<string>;
} {
  const badgeClasses = computed<string>(() => {
    const badgeClasses = props.outline.value ? defaultBadgeClasses + defaultOutlineBadgeClasses : defaultBadgeClasses;
    const typeClasses = props.outline.value
      ? badgeOutlineTypeClasses[props.type.value]
      : badgeTypeClasses[props.type.value];
    const textClasses = props.outline.value
      ? badgeOutlineTextClasses[props.type.value]
      : badgeTextClasses[props.type.value];

    return classNames(
      badgeSizeClasses[props.size.value],
      props.href.value ? '' : typeClasses,
      props.href.value ? '' : textClasses,
      props.href.value ? badgeLinkClasses : '',
      options.isContentEmpty.value ? onlyIconClasses : badgeClasses
    );
  });
  return {
    badgeClasses,
  };
}
