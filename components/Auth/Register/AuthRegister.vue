<template>
  <UIModal
    :open="open"
    size="md"
    content-classes="!px-[50px] !py-[30px]"
    wrapper-classes="!bg-opacity-0"
    @close="onCloseModal">
    <template v-if="type === 'redirect'" #close-icon>
      <div />
    </template>
    <form name="register">
      <UIHeading class="!text-2xl !leading-9 !text-gray-900">Create an account</UIHeading>
      <div class="mt-[36px]">
        <UIInput
          v-model="email"
          :disabled="loading"
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your account email"
          class="bg-white !font-normal placeholder:!font-normal placeholder:text-gray-500" />
      </div>

      <input
        type="checkbox"
        v-model="memberType"
        name="memberType"
        true-value="organization"
        false-value="personal" />
      <span class="mt-2">Sign up as an organization</span>

      <div v-if="memberType === 'personal'" class="mt-5 flex justify-between">
        <UIInput
          v-model="firstName"
          :disabled="loading"
          name="firstName"
          label="First name"
          class="bg-white !font-normal placeholder:text-gray-500">
          <template #suffix>
            <UIIcon icon="icon-check-f" class="block text-primary-600" />
          </template>
        </UIInput>
        <UIInput
          v-model="middleName"
          :disabled="loading"
          name="middleName"
          label="Middle name"
          class="mx-1.5 bg-white !font-normal placeholder:text-gray-500">
        </UIInput>
        <UIInput
          v-model="lastName"
          :disabled="loading"
          name="lastName"
          label="Last name"
          class="bg-white !font-normal placeholder:text-gray-500">
        </UIInput>
      </div>
      <div v-else class="mt-5">
        <UIInput
          v-model="organizationName"
          :disabled="loading"
          name="organizationName"
          label="Organization name"
          class="bg-white !font-normal placeholder:text-gray-500" />
        <div class="mt-5 flex justify-between">
          <UIInput
            v-model="firstName"
            :disabled="loading"
            name="firstName"
            label="Representative first name"
            class="mr-1 w-full bg-white !font-normal placeholder:text-gray-500">
          </UIInput>
          <UIInput
            v-model="lastName"
            :disabled="loading"
            name="lastName"
            label="Representative last name"
            class="ml-1 w-full bg-white !font-normal placeholder:text-gray-500">
          </UIInput>
        </div>
      </div>

      <div class="mt-5">
        <UIInput
          v-model="password"
          :disabled="loading"
          type="password"
          name="password"
          label="Password"
          placeholder="Choose your account password"
          class="bg-white !font-normal placeholder:text-gray-500">
        </UIInput>
      </div>
      <div class="mt-5">
        <UIInput
          v-model="passwordConfirm"
          :disabled="loading"
          type="password"
          name="passwordConfirm"
          label="Confirm password"
          placeholder="Confirm chosen password"
          class="bg-white !font-normal placeholder:text-gray-500">
          <template v-if="InputsBorderStyle" #suffix>
            <UIIcon icon="icon-check-f" class="block text-primary-600" />
          </template>
        </UIInput>
      </div>
      <div class="mt-[21px] flex justify-between">
        <div class="flex items-center justify-start text-xs">
          <input
            v-model="agreeTerms"
            :disabled="loading"
            type="checkbox"
            class="mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0" />
          <div class="leading-3 text-gray-600">
            By creating account I agree to the
            <NuxtLink class="text-secondary-600" to="/login">terms of service</NuxtLink>
          </div>
        </div>
      </div>
      <p v-if="errorMessage" class="mt-9 rounded bg-danger-50 p-4 text-sm font-normal text-danger-700">
        {{ errorMessage }}
      </p>
      <div class="mt-[37px]">
        <UIButton @click="register" type="submit" gradient="gradient1" class="w-full"
          ><template v-if="loading">
            <UISpinner size="5" />
          </template>
          <template v-else>Create account</template></UIButton
        >
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
        Already have an account? <NuxtLink class="text-secondary-500" to="/login">Log in</NuxtLink>
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

const onCloseModal = () => {
  open.value = false;
};

const email: Ref<string> = ref('');

const memberType: Ref<'personal' | 'organization'> = ref('personal');
const firstName: Ref<string> = ref('');
const middleName: Ref<string> = ref('');
const lastName: Ref<string> = ref('');
const organizationName: Ref<string> = ref('');

const password: Ref<string> = ref('');
const passwordConfirm: Ref<string> = ref('');

const agreeTerms: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');

const { handleSubmit, errors } = useForm({
  validationSchema: {
    email: 'required|email',
    firstName: 'requiredDepends:memberType,personal',
    lastName: 'required',
    iagree: 'required',
    password: 'required|minMax:8,12|passwordMatch:passwordConfirm',
    passwordConfirm: 'required|minMax:8,12|passwordMatch:password',
    memberType: 'required',
  },
});

const register = handleSubmit(async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await vueApp.$api.auth.register({});
    if (response?._data?.success) {
      await handleSuccessRegister();
    } else if (response?._data?.data) {
      errorMessage.value = response?._data?.data;
    }
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
});

const InputsBorderStyle = ref('');

async function handleSuccessRegister() {
  InputsBorderStyle.value = 'border-color: #00AC80';
  await setTimeout(async () => {
    InputsBorderStyle.value = '';
  }, 2000);

  if (props.type === 'redirect') {
    await router.push('/');
  } else {
    onCloseModal();
  }
}

onMounted(() => {
  useEventListener(document.forms.register, 'keydown', (e: KeyboardEvent) => {
    errorMessage.value = '';
  });
});
</script>
