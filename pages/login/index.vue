<template>
  <UIModal :open="true" size="sm" content-classes="!px-[50px] !py-[30px]" @close="onCloseModal">
    <form>
      <UIHeading class="!text-2xl !leading-9 !text-gray-900">Login in to your account</UIHeading>
      <div class="mt-[36px]">
        <UIInput
          label="Email Address"
          placeholder="Enter your account email"
          class="bg-white !font-normal placeholder:!font-normal placeholder:text-gray-500" />
      </div>
      <div class="mt-5">
        <UIInput
          label="Password"
          placeholder="Enter your account password"
          class="bg-white !font-normal placeholder:text-gray-500" />
      </div>
      <div class="mt-[21px] flex justify-between">
        <div class="flex items-center text-xs">
          <input
            type="checkbox"
            class="mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0" />
          <span class="leading-3 text-gray-600">Remember me</span>
        </div>
        <a href="#" class="text-xs text-tertiary-500">Forget Password?</a>
      </div>
      <div class="mt-[37px]">
        <UIButton gradient="gradient1" class="w-full">Sign in</UIButton>
      </div>
      <div class="relative mt-[41px] flex items-center justify-center">
        <div class="absolute h-px w-full bg-gray-200"></div>
        <span class="relative z-10 bg-white px-2.5">OR</span>
      </div>
      <div class="mt-[33px] mb-11">
        <UIButton color="gray" outline class="w-full !text-sm text-gray-700">
          <img :src="facebookIcon" alt="facebook icon" class="mr-[9px]" />Sign in with Facebook
        </UIButton>
        <UIButton color="gray" outline class="mt-3 w-full !text-sm text-gray-700">
          <img :src="googleIcon" alt="google icon" class="mr-[9px]" />Sign in with Google
        </UIButton>
      </div>
      <div class="mt-9 text-center text-sm font-normal text-gray-500">
        Don’t have an account? <span class="text-secondary-500">Create account</span>
      </div>
    </form>
  </UIModal>
</template>

<script lang="ts" setup>
import { useRouter } from '#app';
const facebookIcon = (await import('@/assets/svg/facebook.svg')).default;
const googleIcon = (await import('@/assets/svg/google.svg')).default;

const router = useRouter();
const onCloseModal = () => {
  router.push('/');
};
</script>
