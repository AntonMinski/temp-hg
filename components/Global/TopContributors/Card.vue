<template>
  <div class='flex items-center justify-center'>
    <div>
      {{ name }}
      {{ handle }}
      {{ total_followers }}
      {{ total_books }}
      {{ total_clips }}
    </div>
    <img class='w-[118px]' v-if="user_image" :src="user_image" />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';

const { vueApp } = useNuxtApp();
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  handle: {
    type: String,
    required: true,
  },
  user_image: {
    type: String,
    required: true,
  },
  total_followers: {
    type: Number,
    default: 0,
  },
  total_books: {
    type: Number,
    default: 0,
  },
  total_clips: {
    type: Number,
    default: 0,
  },
  following: {
    type: Boolean,
    default: false,
  },
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
