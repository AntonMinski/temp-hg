<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useAuthStore } from '~/store/auth';
import { useAuthModuleStore } from '~/store/authModule';
import { useHomeStore } from '~/store/home';
const { setUserEmail } = useAuthStore();
const { loggedIn } = useAuthModuleStore();
const homeStore = useHomeStore();
const { vueApp } = useNuxtApp();

// page data
const homePageData = computed(() => homeStore.homePageData);

// scroll to element
function scroll(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Get started
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
  }
  if (!emailRegistered) {
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
            {{ homePageData.hero_section.tag_line }}
            <span class="icon-book-f relative top-2 bg-gradient2 bg-clip-text text-7xl text-transparent"></span>
          </Heading>
          <p class="mb-16 text-lg font-normal tracking-wide text-gray-700 dark:text-gray-400">
            {{ homePageData.hero_section.description }}
          </p>
          <form action="#" class="">
            <div
              class="items-top mx-auto mb-3 justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 lg:justify-start">
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
                <span class="mr-2">{{ homePageData?.site_feed_back?.reviews }}</span>
              </div>
              <div class="flex items-center pl-5 text-sm text-gray-900 dark:text-white">
                <span class="icon-fire mr-2 -mt-0.5 leading-none"></span>
                {{ homePageData?.site_feed_back?.message }}
              </div>
            </div>
          </form>

          <img src="~/assets/svg/signal.svg" class="absolute -top-7 -right-2 h-12 w-9" />
        </div>
        <div class="relative col-span-4 inline-flex lg:col-span-6">
          <img :src="homePageData?.hero_section?.image" alt="Hero Image" />
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
          subtitle="Checkout our"
          @click="scroll('favourite-haggadahs')" />

        <QuickLink
          to="#"
          icon="icon-media-image-f"
          icon-bg-color="bg-gradient3"
          title="Favorite Clips"
          subtitle="Checkout our"
          @click="scroll('favourite-clips')"
        />

        <QuickLink
          to="#"
          icon="icon-calendar-f"
          icon-bg-color="bg-gradient1"
          title="Upcoming Events"
          subtitle="View our community"
          @click="scroll('upcoming-events')"
        />
      </div>
    </Container>
  </section>
</template>
