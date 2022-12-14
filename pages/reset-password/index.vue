<template>
  <div class="relative flex min-h-[calc(100vh-70px)] overflow-hidden bg-gray-500 pt-[80px] pb-[80px]">
    <RetreivePasswordSuccessMessage
      v-if="isResetPassword"
      title="Password reset"
      message="Your account password has been reset. You can now login to your account with your new chosen password"
      width="max-w-[640px]">
      <UIButton color="secondary" class="mt-9 w-full cursor-pointer" @click="router.push('/login')">Login</UIButton>
    </RetreivePasswordSuccessMessage>

    <form
      v-else
      class="shadow-3xl m-auto max-w-[521px] rounded-lg bg-white py-[51px] px-[71px]"
      @submit.prevent="handleResetPassword">
      <div class="text-center">
        <UIHeading :level="3" class="!font-serif !text-3xl !font-semibold !leading-[45px] !text-gray-900">
          Reset Password
        </UIHeading>
      </div>
      <p class="mb-[46px] mt-1 text-center text-base leading-6 text-gray-700">
        Passwords must be at least 6 characters long. Remember that it is not recommended that you reuse usernames and
        passwords for different services and websites.
      </p>
      <div>
        <UIInput
          v-model="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Minimum 6 and maximum 12 characters"
          class="!text-black"
          label-classes="leading-6 text-gray-900 text-base">
          <template #prefix>
            <img :src="passwordPrefix" />
          </template>
        </UIInput>
      </div>
      <div class="mt-5">
        <UIInput
          v-model="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          placeholder="Must match new password"
          class="!text-black"
          label-classes="leading-6 text-gray-900 text-base">
          <template #prefix>
            <img :src="passwordPrefix" />
          </template>
        </UIInput>
      </div>
      <UIButton gradient="gradient1" class="mt-9 h-[46px] w-full" :loading="isSubmitting" type="submit">
        Reset Password
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

const passwordPrefix = (await import('@/assets/svg/clock-icon.svg')).default;
const overlayImage = (await import('@/assets/images/retreive-password.png')).default;
const rightOverlayImage = (await import('@/assets/svg/retreive-password-right-shape.svg')).default;
const leftOverlayImage = (await import('@/assets/svg/sign-up-icon.svg')).default;

definePageMeta({ layout: 'auth' });

const router = useRouter();
const isResetPassword: Ref<boolean> = ref(false);
const password: Ref<string> = ref('');
const confirmPassword: Ref<string> = ref('');

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    password: 'required',
    confirmPassword: 'required',
  },
});

const handleResetPassword = handleSubmit(async (): Promise<void> => {
  isResetPassword.value = true;
});
</script>
