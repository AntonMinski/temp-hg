<template>
  <div class="mx-auto max-w-[466px] rounded-lg bg-white px-[50px] py-[30px]">
    <form @submit.prevent>
      <UIHeading class="!text-2xl !leading-9 !text-gray-900">Login in to your account test</UIHeading>
      <div class="mt-[36px]">
        <UIInput
          v-model="email"
          name="email"
          label="Email Address"
          placeholder="Enter your account email"
          class="bg-white !font-normal placeholder:!font-normal placeholder:text-gray-500"
          :error-message="errors.email">
          <template #prefix>
            <img :src="emailIcon" alt="email prefix icon" />
          </template>
        </UIInput>
      </div>
      <div class="mt-5">
        <UIInput
          v-model="password"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          placeholder="Enter your account password"
          class="bg-white !font-normal placeholder:text-gray-500"
          :error-message="errors.password">
          <template #prefix>
            <img :src="passwordPrefix" alt="password prefix icon" />
          </template>
          <template #suffix>
            <span v-if="errors.password" class="icon-warning text-[16.5px] text-danger-500" />
            <img
              v-else
              :src="iconEye"
              alt="password suffix icon"
              class="cursor-pointer pl-0.5"
              @click="showPassword = !showPassword" />
          </template>
        </UIInput>
      </div>
      <div v-if="errorMessage" class="mt-[37px] rounded-md bg-danger-50 p-4">
        <p class="text-sm font-normal text-danger-700">
          {{ errorMessage }}
        </p>
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
        <UIButton gradient="gradient1" class="w-full" :loading="isSubmitting" @click="handleLogin()">Sign in</UIButton>
      </div>
      <div class="relative mt-[41px] flex items-center justify-center">
        <div class="absolute h-px w-full bg-gray-200"></div>
        <span class="relative z-10 bg-white px-2.5 text-gray-400">OR</span>
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
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { useForm } from 'vee-validate';

const facebookIcon = (await import('@/assets/svg/facebook.svg')).default;
const googleIcon = (await import('@/assets/svg/google.svg')).default;
const passwordPrefix = (await import('@/assets/svg/clock-icon.svg')).default;
const emailIcon = (await import('@/assets/svg/email-icon.svg')).default;
const iconEye = (await import('@/assets/svg/icon-eye.svg')).default;

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const showPassword: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required',
  },
});

const handleLogin = handleSubmit(async (): Promise<void> => {
  errorMessage.value = 'Email address or password information does not match. Try again with different information';
});
</script>
