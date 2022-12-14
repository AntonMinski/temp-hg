<template xmlns="http://www.w3.org/1999/html">
  <div class="mx-auto max-w-[618px] rounded-lg bg-white px-[71px] py-[51px]">
    <VForm
      @submit="register"
      @invalid-submit=""
      :validation-schema="schema"
      :initial-values="initialValue"
      v-slot="{ meta: formMeta, errors: formErrors }">
      <UIHeading class="text-center !text-2xl !leading-9 !text-gray-900">Create an account</UIHeading>
      <div class="text-sm font-normal leading-6 text-gray-700">
        <p class="text-center">Creating Haggadahs are completely free for Seder lovers</p>
      </div>

      <div class="mt-[46px]">
        <UIInput
          v-model="email"
          :disabled="loading"
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your account email"
          class="bg-white placeholder:!font-normal placeholder:text-gray-500">
          <template #prefix>
            <img :src="emailIcon" alt="email prefix icon" />
          </template>
        </UIInput>
      </div>

      <div class="mt-[15px] flex items-center text-sm leading-[14px]">
        <UISwitch :checked="asOrganization" @change="asOrganization = !asOrganization" />
        <p class="ml-[9px] text-gray-700">Sign up as an organization</p>
        <Field
          type="checkbox"
          v-model="memberType"
          value="organization"
          name="memberType"
          id="memberType"
          v-slot="{ field }">
          <input
            type="checkbox"
            value="organization"
            name="memberType"
            v-bind="field"
            true-value="organization"
            false-value="personal" />
        </Field>
        <span class="mt-2">Sign up as an organization</span>
      </div>

      <div v-if="!asOrganization" class="mt-5 flex justify-between">
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
      <div class="mt-[21px] mb-2 flex justify-between">
        <div class="flex items-center justify-start text-xs">
          <Field
            name="agreeTerms"
            type="checkbox"
            v-model="agreeTerms"
            :disabled="loading"
            class="mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0" />
          <div class="leading-3 text-gray-600">
            By creating account I agree to the
            <NuxtLink class="text-secondary-600" to="/login">terms of service</NuxtLink>
          </div>
        </div>
      </div>
      <ErrorMessage name="agreeTerms" class="mt-2 text-sm text-secondary-500" />

      <p v-if="errorMessage" class="mt-9 rounded bg-danger-50 p-4 text-sm font-normal text-danger-700">
        {{ errorMessage }}
      </p>
      <div class="mt-[37px]">
        <UIButton
          type="submit"
          gradient="gradient1"
          class="w-full"
          :disabled="formMeta.touched && Object.keys(formErrors).length"
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
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import { object, string, ref as yupRef, boolean, lazy } from 'yup';
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from 'vue';
import { Form, Field, ErrorMessage, SubmissionHandler } from 'vee-validate';
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
const asOrganization: ComputedRef<boolean> = computed({
  get() {
    return memberType.value === 'organization' ? true : false;
  },
  set(newValue: boolean) {
    memberType.value = 
  }
});
const firstName: Ref<string> = ref('');
const middleName: Ref<string> = ref('');
const lastName: Ref<string> = ref('');
const organizationName: Ref<string> = ref('');

const password: Ref<string> = ref('');
const passwordConfirm: Ref<string> = ref('');

const agreeTerms: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref('');

// Initial values
const initialValue = {
  memberType: 'personal',
  agreeTerms: 'on',
};

const schema = object({
  email: string().required().email('Enter valid email address').label('Email Address'),
  password: string().required().min(8).max(12).label('Your Password'),
  passwordConfirm: string()
    .required()
    .oneOf([yupRef('password')], 'Passwords does not match') //Cross-Field Validation
    .label('Your Confirmation Password'),
  agreeTerms: string().notOneOf(['on'], 'Please agree with terms'),
  firstName: string()
    .when('memberType', {
      is: 'personal',
      then: string().required(),
      otherwise: string().notRequired(),
    })
    .label('First Name'),
  lastName: string()
    .when('memberType', {
      is: 'personal',
      then: string().required(),
      otherwise: string().notRequired(),
    })
    .label('Last Name'),
  organizationName: string().when('memberType', {
    is: 'organization',
    then: string().required(),
    otherwise: string().notRequired().label('Organization Name'),
  }),
});

async function register(values) {
  const data = {
    email: values.email,
    password: values.password,
    password_confirmation: values.passwordConfirm,
    first_name: values.firstName,
    middle_name: values.middleName,
    last_name: values.lastName,
    organization_name: values.organizationName,
    representative_fnm: values.firstName,
    representative_lnm: values.lastName,
    iagree: agreeTerms.value,
  };
  loading.value = true;
  try {
    const response = await vueApp.$api.auth.register(data);
    if (response?._data?.success) {
      await handleSuccessRegister();
    } else if (response?._data?.data) {
      errorMessage.value = response?._data?.data;
    }
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
}

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
