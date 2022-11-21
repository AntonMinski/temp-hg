<script lang="ts" setup>
import { ref, Ref } from 'vue';

interface Props {
  name: string;
  handle: string;
  userImage: string;
  totalFollowers?: number;
  totalBooks?: number;
  totalClips?: number;
  following?: boolean;
}

const { vueApp } = useNuxtApp();

const props = withDefaults(defineProps<Props>(), {
  totalFollowers: 0,
  totalBooks: 0,
  totalClips: 0,
  following: false,
});

const following: Ref<boolean> = ref(props.following);

async function followContributor() {
  if (following.value) {
    await vueApp.$api.contributor.unFollowContributor(props.handle);
    vueApp.$toast.success('Unfollowing contributor');
  } else {
    await vueApp.$api.contributor.followContributor(props.handle);
    vueApp.$toast.success('Following contributor');
  }
}
</script>

<template>
  <UICard class="h-full !w-full !max-w-[259px]" content-classes="p-[25px] pt-[35px]">
    <img v-if="userImage" class="mx-auto h-[105px] w-[117px] origin-center rounded-2xl object-cover" :src="userImage" />

    <div class="mt-[25px] mb-1.5">
      <UIHeading :level="6">{{ name }}</UIHeading>
      <span class="text-xs text-gray-600">
        {{ totalFollowers }} Followers • {{ totalBooks }} Haggadahs • {{ totalClips }} Clips
      </span>
    </div>

    <UIButton size="sm" gradient="gradient1" class="mt-auto" :outline="following">
      <UIIcon v-if="following" icon="icon-check" class="mr-1.5 text-base" />
      {{ following ? 'Following' : 'Follow' }}
    </UIButton>
  </UICard>
</template>
