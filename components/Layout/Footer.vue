<template>
  <div class="flex items-center justify-center">
    <UIInput v-model="email" name="email" />
    <UIButton @click="subscribeNewsletter">Subscribe</UIButton>
  </div>
</template>

<script lang="ts" setup>
import type { FooterItems, FooterMenuItem, FooterMenuItemChild } from './types';
import { computed, ComputedRef, Ref, ref } from 'vue';
import { useForm } from 'vee-validate';
import { useHomeStore } from '~/store/home';
const homeStore = useHomeStore();
const { vueApp } = useNuxtApp();

const footerData: ComputedRef<FooterItems> = computed(() => homeStore.homePageData?.footer_details);

// logo
const logoUrl = computed(() => homeStore.homePageData?.dark_logo || '~/assets/svg/logo-light.svg');

// part below logo:
const siteDescription: ComputedRef<string> = computed(() => footerData?.value?.footer_site_description);

const socialLinks: ComputedRef<string[]> = computed(() => footerData?.value?.footer_social_media_links);

const copyrightText: ComputedRef<string> = computed(() => footerData?.value?.footer_copyright_text);

// Sitemap
const menuItems: ComputedRef<FooterMenuItem[]> = computed(() => footerData?.value?.footer_menu_items);

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
