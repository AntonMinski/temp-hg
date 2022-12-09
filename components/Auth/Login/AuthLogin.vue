<template>
  <UIModal
    :open="open"
    size="sm"
    content-classes="!px-[50px] !py-[30px]"
    wrapper-classes="!bg-opacity-0"
    @close="onCloseModal">
    <template v-if="type === 'redirect'" #close-icon>
      <div />
    </template>
    <form name="login">
      <UIHeading class="!text-2xl !leading-9 !text-gray-900">Login in to your account</UIHeading>
      <div class="mt-[36px]">
        <UIInput
          v-model="email"
          :disabled="loading"
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your account email"
          class="bg-white !font-normal placeholder:!font-normal placeholder:text-gray-500 label:font-bold"
          labelClasses="!text-bold"
          :style="InputsBorderStyle" >
          <template #prefix>
            <img :src="emailIcon" alt="email prefix icon" />
          </template>
        </UIInput>
      </div>
      <div class="mt-5">
        <UIInput
          v-model="password"
          :disabled="loading"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your account password"
          class="bg-white !font-normal placeholder:text-gray-500"
          :style="InputsBorderStyle">
          <template #prefix>
            <img :src="passwordPrefix" alt="password prefix icon" />
          </template>
          <template #suffix>
            <UIIcon v-if="InputsBorderStyle" icon="icon-check-f" class="block text-primary-600" />
            <span v-if="errors.password" class="icon-warning text-[16.5px] text-danger-500" />
          </template>
        </UIInput>
      </div>
      <div class="mt-[21px] flex justify-between">
        <div class="flex items-center text-xs">
          <input
            v-model="rememberUser"
            :disabled="loading"
            type="checkbox"
            class="mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0" />
          <span class="leading-3 text-gray-600">Remember me</span>
        </div>
        <NuxtLink to="/forgot-password" class="text-xs text-tertiary-500">Forgot Password?</NuxtLink>
      </div>
      <p v-if="errorMessage" class="mt-9 rounded bg-danger-50 p-4 text-sm font-normal text-danger-700">
        {{ errorMessage }}
      </p>
      <div class="mt-[37px]">
        <UIButton @click="login" type="submit" gradient="gradient1" class="w-full"
          ><template v-if="loading">
            <UISpinner size="5" />
          </template>
          <template v-else> Sign in </template></UIButton
        >
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
        Don’t have an account? <NuxtLink class="text-secondary-500" to="/register">Create account</NuxtLink>
      </div>
    </form>
  </UIModal>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref, Ref } from 'vue';
import { useForm } from 'vee-validate';
import { useNuxtApp, useRouter } from '#app';
import { useEventListener } from '@vueuse/core';

const props = defineProps({
  type: {
    type: String as PropType<'modal' | 'redirect'>,
    default: 'redirect',
  },
});
const { vueApp } = useNuxtApp();
const router = useRouter();
const loading = ref(false);
const open: Ref<boolean> = ref(true);

const facebookIcon = (await import('@/assets/svg/facebook.svg')).default;
const googleIcon = (await import('@/assets/svg/google.svg')).default;
const passwordPrefix = (await import('@/assets/svg/clock-icon.svg')).default;
const emailIcon = (await import('@/assets/svg/email-icon.svg')).default;
const iconEye = (await import('@/assets/svg/icon-eye.svg')).default;

const onCloseModal = () => {
  open.value = false;
};

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const rememberUser: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');

const { handleSubmit, errors } = useForm({
  validationSchema: {
    email: 'required|email',
    password: 'required|minMax:8,12',
  },
});

const login = handleSubmit(async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await vueApp.$api.auth.login(email.value, password.value, rememberUser.value);
    if (response?.success) {
      await handleSuccessLogin();
    } else if (response?._data?.data) {
      errorMessage.value = response?._data?.data;
    }
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
});

const InputsBorderStyle = ref('');

async function handleSuccessLogin() {
  InputsBorderStyle.value = 'border-color: #00AC80';
  vueApp.$toast.success('Logged in successfully');
  setTimeout(async () => {
    InputsBorderStyle.value = '';

    if (props.type === 'redirect') {
      await router.push('/account/dashboard');
    } else {
      onCloseModal();
    }
  }, 2000);
}

onMounted(() => {
  useEventListener(document?.forms?.login, 'keydown', (e: KeyboardEvent) => {
    errorMessage.value = '';
  });
});
</script>
