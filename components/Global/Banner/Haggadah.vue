<script lang="ts" setup>
import { ButtonSize } from '../UI/Button/types';

type BannerVariant = 'full' | 'half' | 'horizontal';

interface Props {
  variant?: BannerVariant;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
});

const bannerClasses: Record<BannerVariant, string> = {
  full: 'max-w-[714px] px-[55px] pt-[78px] text-center',
  half: 'max-w-[333px] px-[30px] pt-[70px] text-center',
  horizontal: 'max-w-[1034px] min-h-[218px] pl-[46px] pr-[23px] flex items-end justify-between mx-auto',
};

const bannerClass = computed<string>(() => bannerClasses[props.variant]);

const titleClasses: Record<BannerVariant, string> = {
  full: '!text-2xl md:!text-3xl',
  half: '!text-2xl',
  horizontal: '!text-2xl',
};

const titleClass = computed<string>(() => titleClasses[props.variant]);

const buttonSizes: Record<BannerVariant, ButtonSize> = {
  full: 'md',
  half: 'sm',
  horizontal: 'md',
};

const buttonSize = computed<ButtonSize>(() => buttonSizes[props.variant]);

const imageClasses: Record<BannerVariant, string> = {
  full: 'w-full max-w-[268px] mx-auto mt-[45px]',
  half: 'w-full max-w-[268px] mx-auto mt-[45px]',
  horizontal: 'w-[239px] h-[219px]',
};

const imageClass = computed<string>(() => imageClasses[props.variant]);

const yellowHeartClasses: Record<BannerVariant, string> = {
  full: 'top-[-51px] right-[99px] h-[101px] w-[106px]',
  half: 'top-[-51px] right-[99px] h-[101px] w-[106px]',
  horizontal: 'top-[-46px] right-[262px] h-[91px] w-[96px]',
};

const yellowHeartClass = computed<string>(() => yellowHeartClasses[props.variant]);
</script>

<template>
  <div class="relative w-full rounded-xl bg-tertiary-100 dark:bg-tertiary-500" :class="bannerClass">
    <div :class="variant == 'horizontal' ? 'pt-[44px] pb-[35px]' : null">
      <UIHeading :level="4" class="!text-tertiary-500 dark:!text-tertiary-200" :class="titleClass">
        Inspired to create your own Haggadah?
      </UIHeading>

      <p class="pt-[7px]">Make your own Haggadah and share with other Seder lovers around the world</p>

      <UIButton color="secondary" :size="buttonSize" class="mt-6.5">
        Create your own Haggadah
        <template #suffix>
          <UIIcon icon="icon-arrow-right" class="text-xl" />
        </template>
      </UIButton>
    </div>

    <img
      src="~/assets/svg/Yellow-Heart.svg"
      alt="Yellow Heart"
      class="absolute top-[-51px] right-[99px] h-[101px] w-[106px]"
      :class="yellowHeartClass" />

    <div class="mt-auto flex-shrink-0">
      <img src="~/assets/svg/create-haggadah.svg" alt="Create Haggadah" class="mb-[-1px]" :class="imageClass" />
    </div>
  </div>
</template>
