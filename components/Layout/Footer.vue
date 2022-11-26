<script lang="ts" setup>
import { computed, ComputedRef, Ref, ref } from 'vue';
import { useForm } from 'vee-validate';
import type { FooterItems, FooterMenuItem, FooterMenuItemChild } from './types';
import { useGlobalStore } from '~/store/global';
import { useNuxtApp } from '#app';

const globalStore = useGlobalStore();
const { vueApp } = useNuxtApp();

const footerData: ComputedRef<FooterItems> = computed(() => globalStore.globalData?.footer_details);

// logo
const logoUrl = computed(() => globalStore.globalData?.dark_logo || '/_nuxt/assets/svg/logo-light.svg');

// part below logo:
const siteDescription: ComputedRef<string> = computed(() => footerData?.value?.footer_site_description);

const socialLinks = computed(() => footerData?.value?.footer_social_media_links);
const socialLinksTypes = ['facebook', 'twitter', 'instagram', 'pinterest'];

const copyrightText: ComputedRef<string> = computed(() => footerData?.value?.footer_copyright_text);

// Sitemap
const menuItems: ComputedRef<FooterMenuItem[]> = computed(() =>
  footerData?.value?.footer_menu_items.map((parentItem) => {
    return {
      ...parentItem,
      child: parentItem.child.map((childItem) => {
        return {
          ...childItem,
          handle: childItem.handle === '0' ? '#' : childItem.handle,
        };
      }),
    };
  }));

// email
const email: Ref<string> = ref('');
// validation
const { handleSubmit, errors } = useForm({
  validationSchema: {
    email: 'required|email|',
  },
});
// Subscribe action
const subscribeNewsletter = handleSubmit(async (): Promise<void> => {
  // backend not documented / implemented yet
  /*
  try {
    await vueApp.$api.home.subscribeNewsletter(email.value);
    vueApp.$toast.success('You have successfully subscribed to our newsletter');
  } catch (error) {
     vueApp.$toast.error(error || 'Something went wrong');
  }
   */
});
</script>

<template>
  <div class="bg-gray-600 py-16 text-white dark:bg-gray-900">
    <UIContainer>
      <div class="flex flex-col lg:flex-row lg:items-start">
        <div class="mr-[90px] w-full flex-shrink-0 lg:max-w-sm">
          <img :src="logoUrl" alt="Haggadot" />
          <p class="mt-5 text-sm text-gray-100">
            {{ siteDescription }}
          </p>

          <div class="mt-[35px] flex items-center space-x-5.5 text-3xl text-primary-500">
            <template v-for="type in socialLinksTypes" :key="type">
              <NuxtLink v-if="socialLinks[type]" :to="socialLinks[type]" class="hover:text-primary-300">
                <UIIcon :icon="`icon-${type}-f`" />
              </NuxtLink>
            </template>
          </div>
        </div>

        <div
          class="mt-10 grid flex-1 grid-cols-1 items-start gap-y-10 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-y-0">
          <div v-for="parent in menuItems" :key="parent.name" class="flex flex-1 flex-col space-y-4">
            <span class="text-sm font-bold uppercase">{{ parent.name }}</span>
            <NuxtLink v-for="child in parent.child" :to="child.handle">{{ child.label }}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="mx-auto mt-[71px] flex w-full max-w-3xl items-center rounded-lg bg-gray-700 py-3 px-10">
        <label for="newsletter" class="mr-8 flex-shrink-0"> Sign up to our newsletter </label>

        <UIInput id="newsletter" v-model="email" placeholder="Enter your email address" name="email" class="w-full">
          <template #prefix>
            <span class="icon-email leading-none text-gray-500 dark:text-gray-400"></span>
          </template>

          <template #suffix>
            <UIButton gradient="gradient1" class="-mr-1.5 rounded-l-none" @click="subscribeNewsletter"
              >Subscribe</UIButton
            >
          </template>
        </UIInput>
      </div>

      <div class="mt-[71px] border-t border-[#626C7A] pt-6.5 text-center dark:border-gray-700">
        <span class="text-gray-50">{{ copyrightText }}</span>
        <div class="mt-[5px] divide-x divide-gray-300 text-xs text-gray-300">
          <NuxtLink to="#" class="px-2 hover:text-white">Terms of use</NuxtLink>
          <NuxtLink to="#" class="px-2 hover:text-white">Privacy Policy</NuxtLink>
          <NuxtLink to="#" class="px-2 hover:text-white">Content Policy</NuxtLink>
        </div>
      </div>
    </UIContainer>
  </div>
</template>
