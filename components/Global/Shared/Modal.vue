<template>
  <Teleport to="body">
    <div
      v-show="open"
      class="fixed left-0 right-0 top-4 z-50 flex h-modal items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50 md:inset-0 md:h-full">
      <div class="relative h-full w-full max-w-2xl p-4 md:h-auto">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white px-[31px] py-[26px] shadow dark:bg-gray-800">
          <UIButton
            type="button"
            class="absolute right-0 top-0 ml-auto inline-flex h-10 w-10 items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white"
            @click="emit('close')">
            <UIIcon icon="icon-close" />
            <span class="sr-only">Close modal</span>
          </UIButton>

          <!-- Modal body -->
          <div>
            <div class="flex flex-col gap-[35px]">
              <div>
                <UIHeading :level="2" class="text-left !text-2xl">{{ title }}</UIHeading>
                <p class="text-left text-base text-gray-700">{{ description }}</p>
              </div>
              <div>
                <span class="mb-2.5 block text-left text-sm font-semibold text-gray-700">{{ label }}</span>
                <UIInput :model-value="url" readonly class="flex-1 bg-transparent focus:!ring-transparent">
                  <template #prefix>
                    <UIIcon icon="icon-link" class="mr-[8.5px] text-[16.5px] text-gray-700" />
                  </template>
                  <template #suffix>
                    <UIButton class="focus:bg-blue-500 focus:text-white" color="gray" outline size="xs">
                      <UIIcon icon="icon-duplicate" class="mr-2" /> Copy
                    </UIButton>
                  </template>
                </UIInput>
              </div>
              <div>
                <UIHeading :level="4" class="text-left font-sans !text-lg">Social Sharing</UIHeading>
                <p class="text-left text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div class="mt-[15px] flex gap-[18px]">
                  <UIButton color="dark" class="mb-[18px] w-full" outline size="lg">
                    <img :src="facebookIcon" alt="facebook" class="mr-[9px]" />Share on Facebook
                  </UIButton>
                  <UIButton color="dark" class="mb-[18px] w-full" outline size="lg">
                    <img :src="twitterIcon" alt="twitter" class="mr-[9px]" />Share on Twitter
                  </UIButton>
                </div>
                <div class="flex gap-[18px]">
                  <UIButton color="dark" class="w-full" outline size="lg">
                    <img :src="instagramIcon" alt="instgram" class="mr-[9px]" />Share on Instagram
                  </UIButton>
                  <UIButton color="dark" class="w-full" outline size="lg">
                    <img :src="linkedinIcon" alt="linkedin" class="mr-[9px] rounded-sm bg-white" />Share on LinkedIn
                  </UIButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Share with anyone',
  },
  description: {
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  label: {
    type: String,
    default: 'Link',
  },
  url: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);
const facebookIcon = (await import('@/assets/svg/facebook.svg')).default;
const twitterIcon = (await import('@/assets/svg/twitter.svg')).default;
const instagramIcon = (await import('@/assets/svg/instagram.svg')).default;
const linkedinIcon = (await import('@/assets/svg/linkedin.svg')).default;
</script>
