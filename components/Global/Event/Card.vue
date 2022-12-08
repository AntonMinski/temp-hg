<script lang="ts" setup>
import { computed, ComputedRef, ref, Ref, resolveComponent } from 'vue';

interface Props {
  col?: 4 | 6;
  host: string | object;
  title: string;
  imageSrc?: string;
  text?: string;
  date?: string;
  location: string;
  contributorName?: string;
  contributorAvatar?: string;
  contributorInitials?: string;
  userTags?: string[];
  isAddedToBookmark?: boolean;
  totalAttendees: number;
  attendeesCount: number;
  isAttending?: boolean;
  isOwner?: boolean;
  type: string;
}

const props = withDefaults(defineProps<Props>(), {
  col: 4,
  isAddedToBookmark: false,
  isAttending: false,
  isOwner: true,
  type: 'text',
});

const isAddedToBookmark = ref(props.isAddedToBookmark);

const nuxtLink = resolveComponent('NuxtLink');

// const route: ComputedRef<string> = computed(() => 'events/' + props.handle);
const route = 'events/';

// Date & Time
const dateObj = computed(() => {
  try {
    return new Date(props.date);
  } catch (e) {}
});

const cardWeekDay = computed(() => {
  if (dateObj.value instanceof Date && !isNaN(dateObj.value.getTime())) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObj.value);
  }
});

const cardDate = computed(() => {
  if (dateObj.value instanceof Date && !isNaN(dateObj.value.getTime())) {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(dateObj.value);
  }
});

const cardTime = computed(() => {
  if (dateObj.value instanceof Date && !isNaN(dateObj.value.getTime())) {
    return dateObj.value.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
});

// share modal
const isShareModalOpen: Ref<boolean> = ref(false);

function handleToggleModal(val: boolean) {
  isShareModalOpen.value = val;
}
</script>

<template>
  <UICard variant="image" :img-src="imageSrc" class="h-full w-full !max-w-none flex-none text-left">
    <div class="flex flex-1 flex-col" :class="{ 'p-12.5': col == 6 }">
      <div class="flex flex-col items-start lg:flex-row">
        <div :class="col == 6 ? 'flex-shrink-0 lg:w-48 xl:w-[233px]' : 'w-full'">
          <UIHeading v-if="col == 4" :level="5">{{ title }}</UIHeading>
          <span v-if="col == 6" class="block text-sm font-semibold leading-tight">{{ cardWeekDay }}</span>
          <span v-if="col == 6" class="block font-serif text-[30px] font-semibold leading-tight">{{ cardDate }}</span>
          <span class="block font-semibold text-secondary-500" :class="col == 6 ? 'mt-2' : 'mt-1.5'">{{
            cardTime
          }}</span>

          <div class="mt-2 flex items-start text-gray-500">
            <UIIcon icon="icon-location" class="mr-1.5 text-[17px]" />
            <span>{{ location }}</span>
          </div>

          <div class="flex items-end justify-between space-x-4 !mt-2">
            <UITags v-if="userTags.length" :tags="userTags" type="accent-yellow" size="md" />

            <div class='mt-2'>
            <BlockContributor
              v-if="col == 4"
              class="w-[124px]"
              size="sm"
              :initials="contributorInitials"
              :name="contributorName"
              :avatar="contributorAvatar"
              text="Hosting" />
            </div>
          </div>
        </div>

        <div v-if="col == 6" class="mt-[27px] flex-1 lg:mt-0 lg:ml-4 xl:ml-[25px]">
          <UIHeading :level="5">{{ title }}</UIHeading>
          <div class="mt-3 mb-2 text-sm text-gray-700 dark:text-gray-200">{{ text }}</div>

          <BlockContributor
            :initials="contributorInitials"
            :name="contributorName"
            :avatar="contributorAvatar"
            text="Hosting" />
        </div>
      </div>

      <div
        class="mt-auto flex flex-col items-center justify-between space-y-5 sm:flex-row sm:space-y-0"
        :class="col == 6 ? 'pt-[45px]' : 'mt-[25px]'">
        <div class="space-x-2.5">
          <UIButtonGroup
            class="group"
            :class="{ '!border-tertiary-300': isAddedToBookmark }"
            @click="isAddedToBookmark = !isAddedToBookmark">
            <UIButton
              class="px-4"
              :class="
                isAddedToBookmark
                  ? 'bg-tertiary-600 !text-white dark:bg-tertiary-400'
                  : 'group-hover:text-tertiary-600 dark:group-hover:text-tertiary-400'
              "
              color="link"
              size="sm"
              outline>
              Bookmark
            </UIButton>
            <UIButton
              class="px-2"
              :class="
                isAddedToBookmark
                  ? 'bg-tertiary-600 !text-white dark:bg-tertiary-400'
                  : 'group-hover:text-tertiary-600 dark:group-hover:text-tertiary-400'
              "
              color="link"
              size="sm"
              outline>
              <UIIcon :icon="isAddedToBookmark ? 'icon-bookmark-remove' : 'icon-bookmark-add'" class="text-lg" />
            </UIButton>
          </UIButtonGroup>

          <UIButtonGroup class="group" @click="handleToggleModal(true)">
            <UIButton
              class="px-4 group-hover:text-tertiary-600 dark:group-hover:text-tertiary-400"
              color="link"
              size="sm"
              outline>
              Share
            </UIButton>
            <UIButton
              class="px-2 group-hover:text-tertiary-600 dark:group-hover:text-tertiary-400"
              color="link"
              size="sm"
              outline>
              <UIIcon icon="icon-share" class="text-lg" />
            </UIButton>
          </UIButtonGroup>
        </div>

        <div
          class="flex flex-shrink-0 flex-col items-center space-y-3.5 self-stretch sm:flex-row sm:space-y-0 sm:space-x-3.5 sm:self-auto">
          <span class="whitespace-nowrap text-xs text-black dark:text-white">
            {{ attendeesCount }} attendees -
            <span class="text-gray-500">{{ totalAttendees - attendeesCount }} spots left</span>
          </span>

          <UIButton
            :color="isAttending ? 'primary' : 'secondary'"
            size="sm"
            class="!w-full max-w-[285px] sm:!w-[134px]"
            :outline="isAttending">
            {{ isAttending ? 'Attending' : 'Attend' }}
            <template #suffix>
              <UIIcon icon="icon-event-attend" />
            </template>
          </UIButton>
        </div>
      </div>

      <div v-if="isOwner && col == 4" class="mt-[37px] flex items-center space-x-2.5">
        <UIButton :tag="nuxtLink" :to="route" class="w-1/2 justify-center" color="secondary" size="sm">
          <template #prefix>
            <span class="icon-eye-open"></span>
          </template>
          Preview
        </UIButton>

        <UIDropdown
          class="w-1/2"
          text="More"
          placement="top"
          color="dark"
          size="sm"
          list-classes="right-0"
          outline
          hide-icon>
          <BlockMoreActionsList />
        </UIDropdown>
      </div>
    </div>
  </UICard>

  <!-- Share :: Modal -->
  <GlobalSharedModal
    :open="isShareModalOpen"
    label="Event Link"
    url="haggadot.com/event/some-event-name"
    @close="handleToggleModal(false)" />
</template>
