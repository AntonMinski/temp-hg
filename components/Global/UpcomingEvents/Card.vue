<script lang="ts" setup>
interface Props {
  col?: 4 | 6;
  route: string | object;
  title: string;
  src?: string;
  contributorName?: string;
  contributorAvatar?: string;
  downloadsCount?: number;
  likesCount?: number;
  languageTags?: string[];
  topicTags?: string[];
  isAddedToBookmark?: boolean;
  isOwner?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  col: 4,
  downloadsCount: 0,
  likesCount: 0,
  isAddedToBookmark: false,
  isOwner: true,
});
</script>

<template>
  <UICard variant="image" :img-src="src" class="h-full w-full !max-w-none flex-none text-left">
    <div>
      <div class="flex items-start space-x-[15px]">
        <NuxtLink :to="route">
          <UIHeading :level="6" class="line-clamp-2">{{ title }}</UIHeading>
        </NuxtLink>
      </div>
    </div>
  </UICard>
</template>
