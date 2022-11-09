<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useAuthModuleStore } from '~/store/authModule';
const { setUserEmail } = useAuthStore();
const { loggedIn } = useAuthModuleStore();
const { vueApp } = useNuxtApp();

const email = ref('');
const { handleSubmit, errors } = useForm({
  validationSchema: {
    email: 'required|email|',
  },
});

const getStarted = handleSubmit(async (): Promise<void> => {
  setUserEmail(email.value);

  const { _data } = await vueApp.$api.auth.checkUserExist(email.value);
  const emailRegistered = _data.success && _data.response;

  if (emailRegistered && !loggedIn) {
    await navigateTo('/login');
  } if (!emailRegistered) {
    await navigateTo('/register');
  }
});
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <Container class="py-8 lg:py-16">
      <div class="mb-16 grid items-start gap-8 lg:mb-24 lg:grid-cols-12 lg:gap-12">
        <div class="relative col-span-6 text-center sm:mb-6 lg:mb-0 lg:text-left">
          <Heading class="mb-4">
            Create interesting Haggadah
            <span class="icon-book-f relative top-2 bg-gradient2 bg-clip-text text-7xl text-transparent"></span>
            for your Passover Seder
          </Heading>
          <p class="mb-16 text-lg font-normal tracking-wide text-gray-700 dark:text-gray-400">
            We're the largest online resource for the Passover Haggadah with thousands of options for blessings,
            artwork, translations, songs, activities and more. Mix and match, download and print at home.
          </p>
          <form action="#" class="">
            <div
              class="mx-auto mb-3 items-top justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 lg:justify-start">
              <Input size="lg" placeholder="Enter email to get started" v-model="email" name="email" class="w-96">
                <template #prefix>
                  <span class="icon-email leading-none text-gray-500 dark:text-gray-400"></span>
                </template>
              </Input>

              <Button size="lg" gradient="gradient1" @click="getStarted" :disabled="!!errors.email">
                Get started
                <template #suffix>
                  <span class="icon-arrow-right text-xl font-semibold leading-none"></span>
                </template>
              </Button>
            </div>
            <div class="flex items-center justify-center divide-x divide-gray-200 font-semibold lg:justify-start">
              <div class="flex items-center pr-5 text-sm text-gray-900 dark:text-white">
                <span class="icon-star mr-2 -mt-0.5 leading-none"></span>
                <span class="mr-2">1,456+</span> Reviews
              </div>
              <div class="flex items-center pl-5 text-sm text-gray-900 dark:text-white">
                <span class="icon-fire mr-2 -mt-0.5 leading-none"></span>
                Absolutely free for Seder lovers
              </div>
            </div>
          </form>

          <img src="~/assets/svg/signal.svg" class="absolute -top-7 -right-2 h-12 w-9" />
        </div>
        <div class="relative col-span-4 inline-flex lg:col-span-6">
          <img src="~/assets/images/hero-image.png" alt="Hero Image" />
          <img src="~/assets/svg/Flower.svg" alt="Hero Image" class="absolute -top-8 right-0 xl:-right-8" />
          <img src="~/assets/svg/Yellow-Heart.svg" alt="Hero Image" class="absolute -bottom-10 left-24" />
        </div>
      </div>

      <div class="items-center space-y-4 md:flex md:space-x-4 md:space-y-0 lg:mb-12">
        <QuickLink
          to="#"
          icon="icon-book-f"
          icon-bg-color="bg-gradient2"
          title="Favorite Haggadahs"
          subtitle="Checkout our" />

        <QuickLink
          to="#"
          icon="icon-media-image-f"
          icon-bg-color="bg-gradient3"
          title="Favorite Clips"
          subtitle="Checkout our" />

        <QuickLink
          to="#"
          icon="icon-calendar-f"
          icon-bg-color="bg-gradient1"
          title="Upcoming Events"
          subtitle="View our community" />
      </div>
    </Container>
  </section>
</template>
