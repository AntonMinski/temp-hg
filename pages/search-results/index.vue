<template>
  <div class="pt-32">
    <UIContainer v-if="state">
      <div class="text-center">
        <span class="text-2xl font-semibold text-gray-800">
          <span class="text-secondary-500">{{ state.totalResults }}</span> results found
        </span>
        <UIHeading :level="2" class="!text-4xl !leading-[54px] text-gray-900">
          For search keyword <span class="text-secondary-500">{{ route.query?.key }}</span>
        </UIHeading>
        <div class="mt-[54px] flex justify-center">
          <UIBadge
            v-for="tag in tags"
            :key="tag?.handle"
            type="gray"
            class="mr-[5px] mb-[5px] !rounded-full !px-[25px] !py-2 text-base"
            :class="tag?.handle === selectedTag?.handle ? '!bg-gradient1 !text-white' : '!bg-gray-100 !text-gray-600'"
            size="lg"
            @click="selectTagByName(tag.name)">
            {{ tag?.name }}
          </UIBadge>
        </div>
      </div>
      <template v-if="!loading">
        <div class="mt-[100px]" v-if="state?.haggadahs?.length">
          <UIHeading :level="3" class="!text-4xl text-gray-900">
            <UIIcon icon="icon-book-f" shape="square" class="mr-[15px] bg-gradient2 shadow-md" />Haggadahs
          </UIHeading>
          <div class="mt-[26px]">
            <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlobalHaggadahCard
                v-for="haggadah in state?.haggadahs"
                :key="haggadah.handle"
                :route="`/haggadahs/${haggadah.handle}`"
                :img-src="haggadah.haggadah_image"
                :title="haggadah.title"
                :slug="haggadah.handle"
                text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet accusamus sit rem officia. Sit aperiam, tempora iste ab porro hic ratione consequatur a illum harum voluptate optio! Alias, nihil sapiente."
                :read-time="haggadah.reading_length || 10"
                :contributor-name="haggadah.author"
                :contributor-initials="haggadah.author_initials"
                :contributor-avatar="null"
                :language-tags="['Trending', 'Humanity']"
                :topic-tags="['Trending', 'Humanity']"
                :completed-progress="50"
                :clips="['Introduction > Karpas', 'Clip #1', 'Clip #2']"
                :is-added-to-bookmark="haggadah.is_bookmarked !== '0'"
                :is-liked="haggadah.is_liked !== '0'"
                :download-url="haggadah.download_url" />
            </div>
          </div>
          <div class="text-center">
            <UIButton class="mx-auto mt-[55px] !px-[45px] !py-3.5" size="lg" color="dark">
              <NuxtLink to="/explore-haggadahs">
                See more haggadahs results <UIIcon icon="icon-arrow-right" size="4" class="ml-2" />
              </NuxtLink>
            </UIButton>
          </div>
        </div>
        <div class="mt-20 mb-20" v-if="state?.clips?.length">
          <UIHeading :level="3" class="!text-4xl text-gray-900">
            <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Clips
          </UIHeading>
          <div class="mt-[26px]">
            <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlobalClipCard
                v-for="item in state?.clips"
                :key="item.handle"
                :handle="item.handle"
                :type="item.cliptype"
                :section-title="item.clip_section"
                :title="item.title"
                :src="item.image"
                :text="item.covertext"
                :contributor-name="item.author"
                :contributor-initials="item.author_initials"
                :contributor-avatar="null"
                :downloads-count="item.downloads"
                :likes-count="item.likes"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']"
                :is-added-to-bookmark="item.is_bookmarked !== '0'" />
            </div>
          </div>
          <div class="text-center">
            <UIButton class="mx-auto mt-[55px] !px-[45px] !py-3.5" size="lg" color="dark">
              <NuxtLink to="/explore-clips">
                See more clips results <UIIcon icon="icon-arrow-right" size="4" class="ml-2" />
              </NuxtLink>
            </UIButton>
          </div>
        </div>
        <div class="mt-20 mb-20" v-if="state?.events?.length">
          <UIHeading :level="3" class="!text-4xl text-gray-900">
            <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Events
          </UIHeading>
          <div class="mt-[26px]">
            <div class="grid grid-cols-1 place-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
              <GlobalEventCard
                v-for="item in state?.events"
                :col="6"
                text="noApiDataText"
                :contributor-name="item.host"
                :contributor-initials="item.host_initials"
                :contributor-avatar="null"
                :user-tags="['Fitness', 'Outdoor']"
                :total-attendees="0"
                :attendees-count="0"
                :is-attending="false"
                :type="item.type"
                :title="item.title"
                :src="item.cover_image"
                :language-tags="['English', 'Hebrew']"
                :topic-tags="['Chad Gadya', 'Dayenu']"
                :host="item.host"
                section-title="No Api data yet"
                :image-src="item.cover_image"
                :date="item.scheduled_at"
                :location="item.venue"
                :durationl="item.duration"
                :category="item.category" />
            </div>
          </div>
          <div class="text-center">
            <UIButton class="mx-auto mt-[55px] !px-[45px] !py-3.5" size="lg" color="dark">
              <NuxtLink to="/explore-events">
                See more events results <UIIcon icon="icon-arrow-right" size="4" class="ml-2" />
              </NuxtLink>
            </UIButton>
          </div>
        </div>

        <div class="mt-20 mb-20" v-if="state?.helpCenter?.length">
          <UIHeading :level="3" class="!text-4xl text-gray-900">
            <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Other
          </UIHeading>
          <div class="mt-[26px]">
            <div v-for="item in state.helpCenter" :key="item.handle">
              <span>{{ item.title }}</span>
              <div v-html="item.content" />
            </div>
          </div>
        </div>

        <div class="mt-20 mb-20" v-if="state?.others?.length">
          <UIHeading :level="3" class="!text-4xl text-gray-900">
            <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Other
          </UIHeading>
          <div class="mt-[26px]">
            <div v-for="page in state.others" :key="page.handle">
              <span>{{ page.title }}</span>
              <div v-html="page.content" />
            </div>
          </div>
        </div>
      </template>
      <div v-else class="my-16 flex justify-center">
        <UISpinner size="12" />
      </div>
    </UIContainer>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData, useNuxtApp, useRoute, useRouter } from '#app';
import { reactive, ref, Ref } from 'vue';
import { Tag, TagHandle, WebsiteSearchResponse, WebsiteSearchState } from '~/components/Search/types';
import { useTags } from '~/components/Search/composables/useTags';
import { Haggadah, HaggadahWrapper } from '~/components/Global/Haggadah/types';
import { Clip } from '~/components/Global/Clip/types';
import { Event } from '~/components/Global/Event/types';

const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();
const loading = ref(false);

const tags: Tag[] = useTags;
const selectedTag: Ref<Tag> = ref(findTagByName(route.query.type as string));

async function getSearchData() {
  try {
    const response: WebsiteSearchResponse = await vueApp.$api.search.websiteSearch({
      term: route.query.key as string,
      type: selectedTag.value.handle as TagHandle,
    });
    const data = { ...response?._data?.data?.searchresults };
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
const { data: serverData } = await useAsyncData(getSearchData);
const state: WebsiteSearchState = reactive({
  haggadahs: [],
  clips: [],
  events: [],
  helpCenter: [],
  others: [],
  searchCategories: [],
  totalResults: 0,
});

setState(serverData.value);

function setState(data) {
  state.haggadahs = data?.book?.map((item: HaggadahWrapper) => item?.book) as Haggadah[];
  state.clips = data?.clips?.map((item) => item?.clip) as Clip[];
  state.events = data?.events?.map((item) => item?.event) as Event[];
  state.helpCenter = data?.help_center?.map((item) => item?.data);
  state.others = data?.others?.map((item) => item?.page);
  state.searchCategories = data?.search_categories as string[];
  state.totalResults = data?.total_results as number;
}

function findTagByName(tagName: string) {
  return tags.find((tag) => tag.name === tagName) as Tag;
}

async function selectTagByName(tagName: string) {
  loading.value = true;
  selectedTag.value = findTagByName(tagName);
  await router.push({
    query: {
      ...route.query,
      type: selectedTag.value.name,
    },
  });
  const newData = await getSearchData();
  setState(newData);
  loading.value = false;
}

const items = [...Array(3).keys()];
const haggadahsCardImage = (await import('@/assets/images/haggadah-card-image.png')).default;
</script>
