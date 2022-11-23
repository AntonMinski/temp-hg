import type { Ref } from 'vue';
import { computed, useSlots } from 'vue';
import classNames from 'classnames';
import type {
  ButtonDuotoneGradient,
  ButtonGradient,
  ButtonMonochromeGradient,
  ButtonSize,
  ButtonVariant,
} from '../types';
import { useFlowbiteThemable } from '../../../utils/FlowbiteThemable/composables/useFlowbiteThemable';

export type ButtonClassMap<T extends string> = { hover: Record<T, string>; default: Record<T, string> };

const buttonColorClasses: ButtonClassMap<ButtonVariant> = {
  default: {
    default:
      'text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800',
    blue: 'text-white bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 focus:outline-none dark:focus:ring-blue-800',
    alternative:
      'font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600',
    dark: 'text-white bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 dark:border-gray-700',
    light:
      'text-gray-600 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-700',
    green:
      'focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800',
    red: 'focus:outline-none text-white bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-900',
    yellow: 'focus:outline-none text-white bg-yellow-400 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900',
    purple:
      'focus:outline-none text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:focus:ring-purple-900',
    pink: 'focus:outline-none text-white bg-pink-700 focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:focus:ring-pink-900',

    // Custom
    primary: '',
    secondary: 'text-white bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-200',
    tertiary: 'text-white bg-tertiary-500 focus:outline-none focus:ring-2 focus:ring-tertiary-200',
    success: '',
    link: 'text-gray-700 dark:text-white bg-white dark:bg-gray-900 focus:outline-none',
    gray: 'bg-gray-600 text-white focus:outline-none',
  },
  hover: {
    default: 'hover:bg-blue-800 dark:hover:bg-blue-700',
    blue: 'hover:bg-blue-800 dark:hover:bg-blue-700',
    alternative: 'hover:bg-gray-100 hover:text-blue-700 dark:hover:text-white dark:hover:bg-gray-700',
    dark: 'hover:bg-gray-900 dark:hover:bg-gray-700',
    light: 'hover:bg-gray-300 dark:hover:bg-gray-600',
    green: 'hover:bg-green-800 dark:hover:bg-green-700',
    red: 'hover:bg-red-800 dark:hover:bg-red-700',
    yellow: 'hover:bg-yellow-500',
    purple: 'hover:bg-purple-800 dark:hover:bg-purple-700',
    pink: 'hover:bg-pink-800 dark:hover:bg-pink-700',

    // Custom
    primary: '',
    secondary: 'hover:bg-secondary-600',
    tertiary: 'hover:bg-tertiary-600',
    success: '',
    link: '',
  },
};

const buttonOutlineColorClasses: ButtonClassMap<Exclude<ButtonVariant, 'light' | 'alternative'>> = {
  default: {
    dark: 'text-gray-600 border border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 text-center dark:border-gray-600 dark:text-gray-400 dark:focus:ring-gray-800',
    default:
      'text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800',
    blue: 'text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-center dark:border-blue-500 dark:text-blue-500 dark:focus:ring-blue-800',
    green:
      'text-green-700 border border-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-center dark:border-green-500 dark:text-green-500 dark:focus:ring-green-800',
    purple:
      'text-purple-700 border border-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 text-center dark:border-purple-400 dark:text-purple-400 dark:focus:ring-purple-900',
    pink: 'text-pink-700 border border-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 text-center dark:border-pink-400 dark:text-pink-400 dark:focus:ring-pink-900',
    red: 'text-red-700 border border-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 text-center dark:border-red-500 dark:text-red-500 dark:focus:ring-red-900',
    yellow:
      'text-yellow-400 border border-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 text-center dark:border-yellow-300 dark:text-yellow-300 dark:focus:ring-yellow-900',

    // Custom
    primary:
      'text-primary-700 bg-transparent border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-200',
    secondary:
      'text-secondary-500 bg-transparent border border-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-200',
    tertiary: '',
    success:
      'text-success-500 bg-transparent border border-success-500 focus:outline-none focus:ring-2 focus:ring-success-200',
    link: 'text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none',
    gray: 'text-gray-600 border border-gray-200 focus:outline-none',
  },
  hover: {
    dark: 'hover:text-white hover:bg-gray-600',
    default: 'hover:text-white hover:bg-blue-800 dark:hover:text-white dark:hover:bg-blue-600',
    blue: 'hover:text-white hover:bg-blue-800 dark:hover:text-white dark:hover:bg-blue-600',
    green: 'hover:text-white hover:bg-green-800 dark:hover:text-white dark:hover:bg-green-600',
    purple: 'hover:text-white hover:bg-purple-800 dark:hover:text-white dark:hover:bg-purple-500',
    pink: 'hover:text-white hover:bg-pink-800 dark:hover:text-white dark:hover:bg-pink-500',
    red: 'hover:text-white hover:bg-red-800 dark:hover:text-white dark:hover:bg-red-600',
    yellow: 'hover:text-white hover:bg-yellow-500 dark:hover:text-white dark:hover:bg-yellow-400',
    gray: 'hover:text-white hover:bg-gray-500',

    // Custom
    primary: 'hover:text-white hover:bg-primary-700',
    secondary: 'hover:text-white hover:bg-secondary-500',
    tertiary: '',
    success: 'hover:text-white hover:bg-success-500',
    link: '',
  },
};

const buttonGradientClasses: ButtonClassMap<ButtonGradient> = {
  hover: {
    'cyan-blue': 'hover:bg-gradient-to-bl',
    'green-blue': 'hover:bg-gradient-to-bl',
    'pink-orange': 'hover:bg-gradient-to-bl',
    'purple-blue': 'hover:bg-gradient-to-bl',
    'purple-pink': 'hover:bg-gradient-to-l',
    'red-yellow': 'hover:bg-gradient-to-bl',
    'teal-lime': 'hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200',
    blue: 'hover:bg-gradient-to-br',
    cyan: 'hover:bg-gradient-to-br',
    green: 'hover:bg-gradient-to-br',
    lime: 'hover:bg-gradient-to-br',
    pink: 'hover:bg-gradient-to-br',
    purple: 'hover:bg-gradient-to-br',
    red: 'hover:bg-gradient-to-br',
    teal: 'hover:bg-gradient-to-br',

    // Custom
    gradient1: 'hover:bg-primary-400 hover:bg-none',
    gradient2: 'hover:bg-gradient-to-bl',
    gradient3: 'hover:bg-gradient-to-bl',
    gradient4: 'hover:bg-gradient-to-bl',
    gradient5: 'hover:bg-gradient-to-bl',
    gradient6: 'hover:bg-gradient-to-bl',
  },
  default: {
    'cyan-blue':
      'text-white bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800',
    'green-blue':
      'text-white bg-gradient-to-br from-green-400 to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800',
    'pink-orange':
      'text-white bg-gradient-to-br from-pink-500 to-orange-400 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800',
    'purple-blue':
      'text-white bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
    'purple-pink':
      'text-white bg-gradient-to-r from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800',
    'red-yellow':
      'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400',
    'teal-lime':
      'text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700',
    blue: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg',
    cyan: 'text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg',
    green:
      'text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg',
    lime: 'text-gray-900 bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 rounded-lg',
    pink: 'text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 rounded-lg',
    purple:
      'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 rounded-lg',
    red: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 rounded-lg',
    teal: 'text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 rounded-lg',

    // Custom
    gradient1:
      'text-gray-800 bg-gradient1 focus:ring-2 focus:outline-none focus:ring-primary-50 dark:focus:ring-primary-800',
    gradient2:
      'text-gray-800 bg-gradient2 focus:ring-2 focus:outline-none focus:ring-primary-50 dark:focus:ring-primary-800',
    gradient3:
      'text-gray-800 bg-gradient3 focus:ring-2 focus:outline-none focus:ring-primary-50 dark:focus:ring-primary-800',
    gradient4:
      'text-gray-800 bg-gradient4 focus:ring-2 focus:outline-none focus:ring-primary-50 dark:focus:ring-primary-800',
    gradient5:
      'text-gray-800 bg-gradient5 focus:ring-2 focus:outline-none focus:ring-primary-50 dark:focus:ring-primary-800',
    gradient6:
      'text-gray-800 bg-gradient6 focus:ring-2 focus:outline-none focus:ring-primary-50 dark:focus:ring-primary-800',
  },
};

const buttonOutlineGradientClasses: ButtonClassMap<ButtonDuotoneGradient> = {
  default: {
    'cyan-blue':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800',
    'green-blue':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800',
    'pink-orange':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800',
    'purple-blue':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
    'purple-pink':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800',
    'red-yellow':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-white focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400',
    'teal-lime':
      'relative inline-flex items-center justify-center overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800',

    // Custom
    gradient1:
      'text-primary-600 bg-transparent border border-primary-600 focus:ring-2 focus:outline-none focus:ring-primary-600 dark:focus:ring-primary-800',
    gradient2: '',
    gradient3: '',
    gradient4: '',
    gradient5: '',
    gradient6: '',
  },
  hover: {
    'cyan-blue': 'group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white',
    'green-blue': 'group-hover:from-green-400 group-hover:to-blue-600 hover:text-white',
    'pink-orange': 'group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white',
    'purple-blue': 'group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white',
    'purple-pink': 'group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white',
    'red-yellow': 'group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:hover:text-gray-900',
    'teal-lime': 'group-hover:from-teal-300 group-hover:to-lime-300 dark:hover:text-gray-900',

    // Custom
    gradient1: '',
    gradient2: '',
    gradient3: '',
    gradient4: '',
    gradient5: '',
    gradient6: '',
  },
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs font-semibold px-3 py-1 rounded-md',
  sm: 'h-9 text-sm font-semibold px-3 py-2 rounded-md',
  md: 'h-12 text-base font-semibold px-5 py-3 rounded-lg',
  lg: 'h-14 text-lg font-semibold px-5 py-3.5 rounded-lg',
  xl: 'text-lg font-bold px-6 py-4.5 rounded-lg',
};

const buttonSquareSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs p-1',
  sm: 'text-sm p-1.5',
  md: 'text-sm p-2',
  lg: 'text-base p-2.5',
  xl: 'text-base p-3',
};

const buttonShadowClasses: Record<ButtonMonochromeGradient, string> = {
  blue: 'shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80',
  cyan: 'shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80',
  green: 'shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80',
  lime: 'shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80',
  pink: 'shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80',
  purple: 'shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80',
  red: 'shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80',
  teal: 'shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80',
};

export type UseButtonClassesProps = {
  pill: Ref<boolean>;
  disabled: Ref<boolean>;
  loading: Ref<boolean>;
  outline: Ref<boolean>;
  size: Ref<ButtonSize>;
  square: Ref<boolean>;
  color: Ref<ButtonVariant>;
  gradient?: Ref<ButtonGradient | null>;
  shadow?: Ref<ButtonMonochromeGradient | '' | null>;
};

const simpleGradients = ['blue', 'green', 'cyan', 'teal', 'lime', 'red', 'pink', 'purple'];
const alternativeColors = ['alternative', 'light'];

export function useButtonClasses(props: UseButtonClassesProps): {
  wrapperClasses: Ref<string>;
  spanClasses: Ref<string>;
} {
  const slots = useSlots();

  const sizeClasses = computed(() => {
    if (props.square.value) return buttonSquareSizeClasses[props.size.value];
    return buttonSizeClasses[props.size.value];
  });

  const bindClasses = computed(() => {
    const isGradient = !!props.gradient.value;
    const isColor = !!props.color.value;
    const isOutline = props.outline.value;

    let hoverClass = '';
    let backgroundClass = '';

    if (isGradient && isOutline) {
      // GRADIENT AND OUTLINE
      if (!simpleGradients.includes(props.gradient.value!)) {
        backgroundClass =
          buttonOutlineGradientClasses.default[
            props.gradient.value as unknown as keyof typeof buttonOutlineGradientClasses.default
          ];

        if (!props.disabled.value)
          hoverClass =
            buttonOutlineGradientClasses.hover[
              props.gradient.value as unknown as keyof typeof buttonOutlineGradientClasses.hover
            ];
      } else {
        console.warn(`cannot use outline prop with "${props.gradient.value}" gradient`); // TODO: prettify
      }
    } else if (isGradient) {
      // JUST GRADIENT
      backgroundClass = buttonGradientClasses.default[props.gradient.value!];

      if (!props.disabled.value) hoverClass = buttonGradientClasses.hover[props.gradient.value!];
    } else if (isColor && isOutline) {
      // COLOR AND OUTLINE
      if (!alternativeColors.includes(props.color.value)) {
        const color = props.color.value;

        backgroundClass =
          buttonOutlineColorClasses.default[color as unknown as keyof typeof buttonOutlineColorClasses.default];

        if (!props.disabled.value)
          hoverClass =
            buttonOutlineColorClasses.hover[color as unknown as keyof typeof buttonOutlineColorClasses.hover];
      } else {
        console.warn(`cannot use outline prop with "${props.color.value}" color`); // TODO: prettify
      }
    } else {
      // JUST COLOR
      const color = props.color.value;

      backgroundClass = buttonColorClasses.default[color as unknown as keyof typeof buttonColorClasses.default];

      if (!props.disabled.value)
        hoverClass = buttonColorClasses.hover[color as unknown as keyof typeof buttonColorClasses.hover];
    }

    let shadowClass = '';
    if (props.shadow.value === '') {
      // if shadow prop passed without value - try to find color for shadow by gradient
      if (props.gradient.value && simpleGradients.includes(props.gradient.value!)) {
        shadowClass = buttonShadowClasses[props.gradient.value as unknown as keyof typeof buttonShadowClasses];
      }
    } else if (typeof props.shadow.value === 'string') {
      // if provided color for shadow - use it
      if (simpleGradients.includes(props.shadow.value)) {
        shadowClass = buttonShadowClasses[props.shadow.value as unknown as keyof typeof buttonShadowClasses];
      }
    }

    return classNames(
      backgroundClass,
      hoverClass,
      shadowClass,
      props.pill.value ? '!rounded-full' : '',
      props.disabled.value ? 'cursor-not-allowed opacity-50' : '',
      sizeClasses.value,
      slots.prefix || slots.suffix || props.loading.value ? 'inline-flex items-center' : ''
    );
  });

  const spanClasses = computed(() => {
    // if (!!props.gradient.value && props.outline.value) {
    //   // ONLY FOR GRADIENT OUTLINE BUTTON
    //   return classNames(
    //     'relative bg-white dark:bg-gray-900 rounded-md inline-flex items-center',
    //     sizeClasses.value,
    //     !props.disabled.value ? 'group-hover:bg-opacity-0 transition-all ease-in duration-75' : ''
    //   );
    // }
    return 'flex items-center justify-center';
  });

  return {
    wrapperClasses: bindClasses,
    spanClasses,
  };
}
