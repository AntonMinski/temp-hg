<script lang="ts" setup>
interface Props {
  imgSrc: string;
  title: string;
  contributorName?: string;
  contributorAvatar?: string;
  readTime?: string;
  languageTags?: string[];
  topicTags?: string[];
  isOwner?: boolean;
}

withDefaults(defineProps<Props>(), {
  isOwner: true,
});
</script>

<template>
  <Card variant="image" :img-src="imgSrc">
    <div class="mb-[19px] flex items-start justify-between space-x-2">
      <div>
        <div v-if="isOwner" class="mb-3.5 flex items-center space-x-1.5">
          <Badge outline>
            <template #icon>
              <Icon icon="icon-eye-open-f mr-[5px]" />
            </template>
            Public
          </Badge>

          <Badge type="danger" outline>
            <template #icon>
              <Icon icon="icon-eye-close-f mr-[5px]" />
            </template>
            Private
          </Badge>

          <Badge type="gray">
            <template #icon>
              <Icon icon="icon-draft mr-[5px]" />
            </template>
            Draft
          </Badge>
        </div>

        <NuxtLink to="#">
          <Heading :level="6">{{ title }}</Heading>
        </NuxtLink>
      </div>

      <ButtonGroup>
        <Button class="!h-auto !p-2.5" color="link" outline>
          <Icon icon="icon-bookmark-add" class="!text-base" />
        </Button>
        <Button class="!h-auto !p-2.5" color="link" outline>
          <Icon icon="icon-download" class="!text-base" />
        </Button>
        <Button class="!h-auto !p-2.5" color="link" outline>
          <Icon icon="icon-share" class="!text-base" />
        </Button>
      </ButtonGroup>
    </div>

    <div v-if="contributorName || readTime" class="mb-5 flex items-center space-x-[15px]">
      <div v-if="readTime" class="inline-flex items-center space-x-2">
        <Icon icon="icon-book-o" class="text-secondary-600" />
        <span class="text-sm font-semibold text-gray-600 dark:text-gray-100">{{ readTime }} read</span>
      </div>

      <div v-if="contributorName" class="inline-flex items-center space-x-2">
        <img :src="contributorAvatar" alt="{{ contributorName }}" class="h-7 w-7" />
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-100"> By {{ contributorName }} </span>
      </div>
    </div>

    <div class="mb-3 flex flex-wrap items-center">
      <Badge v-for="tag in languageTags" type="tertiary" class="mr-[5px] mb-[5px]" outline>
        {{ tag }}
      </Badge>
    </div>

    <div class="mb-3 flex flex-wrap items-center">
      <Badge v-for="tag in topicTags" type="accent-yellow" class="mr-[5px] mb-[5px]">
        {{ tag }}
      </Badge>
    </div>
  </Card>
</template>
