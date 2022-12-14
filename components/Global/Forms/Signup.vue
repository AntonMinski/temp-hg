<template>
  <div class="mx-auto max-w-[618px] rounded-lg bg-white px-[71px] py-[51px]">
    <form @submit.prevent>
      <UIHeading class="text-center !text-2xl !leading-9 !text-gray-900">Create an account</UIHeading>
      <div class="text-sm font-normal leading-6 text-gray-700">
        <p class="text-center">Creating Haggadahs are completely free for Seder lovers</p>
      </div>

      <div class="mt-[46px]">
        <UIInput
          v-model="email"
          name="email"
          label="Email address"
          placeholder="Enter your account email"
          class="bg-white placeholder:!font-normal placeholder:text-gray-500">
          <template #prefix>
            <img :src="emailIcon" alt="email prefix icon" />
          </template>
        </UIInput>
      </div>

      <div class="mt-[15px] flex items-center text-sm leading-[14px]">
        <UISwitch :checked="isOrganization" @change="isOrganization = !isOrganization" />
        <p class="ml-[9px] text-gray-700">Sign up as an organization</p>
      </div>
      <div v-if="isOrganization">
        <div class="mt-[23px]">
          <UIInput
            v-model="organizationName"
            name="organizationName"
            label="Organization name"
            placeholder="Enter organization name" />
        </div>
        <div class="mt-[15px] flex gap-[10px]">
          <UIInput
            v-model="representativeFirstName"
            name="representativeFirstName"
            label="Representative first name"
            placeholder="James"
            class="w-max-[233px] w-full" />
          <UIInput
            v-model="representativeLastName"
            name="representativeLastName"
            label="Representative last name"
            placeholder="Hoffman"
            class="w-max-[233px] w-full" />
        </div>
      </div>
      <div v-else class="flex justify-between gap-[10px] pt-[23px]">
        <UIInput
          v-model="firstName"
          name="firstName"
          label="First name"
          placeholder="John"
          class="w-max-[152px] w-full" />
        <UIInput v-model="middleName" name="middleName" label="Middle name" class="w-max-[152px] w-full" />
        <UIInput
          v-model="lastName"
          name="lastName"
          label="Last name"
          placeholder="Hoffman"
          class="w-max-[152px] w-full" />
      </div>

      <div class="mt-5">
        <UIInput
          v-model="password"
          name="password"
          label="Password"
          placeholder="Choose your account password"
          type="password"
          class="bg-white pb-[8px] !font-normal placeholder:text-gray-500" />
        <span class="text-sm leading-[21px] text-gray-500">Minimum 6 and maximum 12 characters</span>
      </div>

      <div class="pt-5">
        <UIInput
          v-model="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm chosen password"
          type="password"
          class="bg-white !font-normal placeholder:text-gray-500" />
      </div>

      <div class="mt-[21px] flex justify-between">
        <div class="flex items-center text-xs">
          <input
            v-model="termOfCondition"
            type="checkbox"
            class="mr-3 rounded border-gray-200 checked:border-transparent checked:bg-primary-500 focus:ring-0" />

          <p class="text-xs leading-3 text-gray-600">
            By creating account I agree to the <span class="text-[#DE674A]">terms of service</span>
          </p>
        </div>
      </div>

      <div class="mt-[37px]">
        <UIButton
          gradient="gradient1"
          class="!w-full"
          prop-span-classes="!w-full !justify-start !text-left"
          :loading="isSubmitting"
          @click="handleSignup">
          Create accout
        </UIButton>
      </div>
      <div class="relative mt-[41px] flex justify-center">
        <div class="absolute h-px w-[326px] bg-gray-200"></div>
        <span class="relative z-10 mt-[-10px] bg-white px-2.5">OR</span>
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
const emailIcon = (await import('@/assets/svg/email-icon.svg')).default;

const isOrganization: Ref<boolean> = ref(false);
const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const firstName: Ref<string> = ref('');
const middleName: Ref<string> = ref('');
const lastName: Ref<string> = ref('');
const organizationName: Ref<string> = ref('');
const representativeFirstName: Ref<string> = ref('');
const representativeLastName: Ref<string> = ref('');
const confirmPassword: Ref<string> = ref('');
const termOfCondition: Ref<boolean> = ref(false);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: {
    email: 'required|email',
    firstName: 'required',
    lastName: 'required',
    organizationName: 'required',
    password: 'required',
    confirmPassword: 'required',
  },
});

const handleSignup = handleSubmit(async (values): Promise<void> => {
  // Todo
  console.log(values);
});
</script>
