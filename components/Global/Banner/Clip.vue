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
  full: 'max-w-[714px] px-[55px] pt-[78px] text-center flex-col',
  half: 'max-w-[333px] px-[30px] pt-[70px] text-center flex-col',
  horizontal: 'max-w-[1034px] min-h-[218px] pl-[46px] pr-[22px] items-end justify-between mx-auto space-x-[25px]',
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
  full: 'w-full max-w-[420px] mx-auto mt-[45px]',
  half: 'w-full max-w-[420px] mx-auto mt-[45px]',
  horizontal: 'w-[380px] h-[213px]',
};

const imageClass = computed<string>(() => imageClasses[props.variant]);
</script>

<template>
  <div class="relative flex w-full rounded-xl bg-secondary-50 dark:bg-secondary-600" :class="bannerClass">
    <div :class="variant == 'horizontal' ? 'pt-[44px] pb-[35px]' : null">
      <UIHeading :level="4" class="!text-secondary-500 dark:!text-secondary-200" :class="titleClass">
        Got an interesting content for your Clip?
      </UIHeading>

      <p class="pt-[7px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem officiis eaque.</p>

      <UIButton color="tertiary" :size="buttonSize" class="mt-6.5">
        Create your own Clip
        <template #suffix>
          <UIIcon icon="icon-arrow-right" class="text-xl" />
        </template>
      </UIButton>
    </div>

    <div class="mt-auto flex-shrink-0">
      <img src="~/assets/svg/create-clip.svg" alt="Create Clip" :class="imageClass" />
    </div>
  </div>
</template>
