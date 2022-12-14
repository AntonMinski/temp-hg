<template>
  <div class="relative flex min-h-[calc(100vh-70px)] overflow-hidden bg-gray-500 pt-[80px] pb-[80px]">
    <RetreivePasswordSuccessMessage
      v-if="isEmailSent"
      title="Email Sent"
      message="Please check your inbox or spam folder at name@example.com for a link to reset your password" />

    <form
      v-else
      class="shadow-3xl m-auto max-w-[521px] rounded-lg bg-white py-[51px] px-[71px]"
      @submit.prevent="handleResetLink">
      <div class="text-center">
        <UIHeading :level="3" class="!font-serif !text-3xl !font-semibold !leading-[45px] text-gray-900">
          Forgot your password?
        </UIHeading>
      </div>
      <p class="mb-[46px] mt-1 text-center text-base leading-6 text-gray-700">
        Enter your email address below and we'll send you a link to reset your password.
      </p>
      <UIInput
        v-model="email"
        name="email"
        label="Email address"
        placeholder="Enter your account email"
        class="!text-black"
        label-classes="leading-6 text-gray-900 text-base">
        <template #prefix>
          <img :src="emailIcon" />
        </template>
      </UIInput>
      <UIButton gradient="gradient1" class="mt-9 h-[46px] w-full" :loading="isSubmitting" type="submit">
        Send reset link
      </UIButton>
      <UIButton class="mt-2.5 h-[46px] w-full cursor-pointer text-secondary-500" @click="router.push('/signin')">
        Signin
      </UIButton>
    </form>
    <img :src="overlayImage" class="absolute right-0 bottom-[-137px] hidden w-full max-w-[50%] lg:block" />
    <img :src="rightOverlayImage" class="absolute top-[119px] right-[88px] hidden lg:block" />
    <img :src="leftOverlayImage" class="absolute bottom-[66px] left-[63px] hidden lg:block" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from '#app';
import { Ref, ref } from 'vue';
import { useForm } from 'vee-validate';
import { definePageMeta } from '#imports';

const emailIcon = (await import('@/assets/svg/email-icon.svg')).default;
const overlayImage = (await import('@/assets/images/retreive-password.png')).default;
const rightOverlayImage = (await import('@/assets/svg/retreive-password-right-shape.svg')).default;
const leftOverlayImage = (await import('@/assets/svg/sign-up-icon.svg')).default;

definePageMeta({ layout: 'auth' });

const router = useRouter();
const isEmailSent: Ref<boolean> = ref(false);
const email: Ref<string> = ref('');

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    email: 'required|email',
  },
});

const handleResetLink = handleSubmit(async (): Promise<void> => {
  isEmailSent.value = true;
});
</script>
