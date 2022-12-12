<template>
  <div class="pt-32">
    <UIContainer v-if="state">
      <div class="text-center">
        <span class="text-2xl font-semibold text-gray-800">
          <template v-if="!loading">
            <span class="text-secondary-500">{{ state.totalResults || 0 }}</span> results found
          </template>
          <template v-else> Searching... </template>
        </span>
        <UIHeading :level="2" class="!text-4xl !leading-[54px] text-gray-900">
          For search keyword <span class="text-secondary-500">{{ searchString }}</span>
        </UIHeading>
        <div class="mt-[54px] flex justify-center">
          <UIBadge
            v-for="tag in tags"
            :key="tag?.handle"
            type="gray"
            class="mr-[5px] mb-[5px] !rounded-full !px-[25px] !py-2 text-base"
            :class="tag?.handle === selectedTag?.handle ? '!bg-gradient1 !text-black' : '!bg-gray-100 !text-gray-600'"
            overwrite-classes="text-black"
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
            <UIButton
              class="mx-auto mt-[55px] !px-[45px] !py-3.5"
              size="lg"
              color="dark"
              @click="seeMoreItems('haggadahs')">
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
            <UIButton
              class="mx-auto mt-[55px] !px-[45px] !py-3.5"
              size="lg"
              color="dark"
              @click="seeMoreItems('clips')">
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
            <UIButton
              class="mx-auto mt-[55px] !px-[45px] !py-3.5"
              size="lg"
              color="dark"
              @click="seeMoreItems('events')">
              <NuxtLink to="/explore-events">
                See more events results <UIIcon icon="icon-arrow-right" size="4" class="ml-2" />
              </NuxtLink>
            </UIButton>
          </div>
        </div>

        <!--        <div class="mt-20 mb-20" v-if="state?.helpCenter?.length">-->
        <!--          <UIHeading :level="3" class="!text-4xl text-gray-900">-->
        <!--            <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Other-->
        <!--          </UIHeading>-->
        <!--          <div class="mt-[26px]">-->
        <!--            <div v-for="item in state.helpCenter" :key="item.handle">-->
        <!--              <span>{{ item.title }}</span>-->
        <!--              <div v-html="item.content" />-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--        <div class="mt-20 mb-20" v-if="state?.others?.length">-->
        <!--          <UIHeading :level="3" class="!text-4xl text-gray-900">-->
        <!--            <UIIcon icon="icon-clip-f" shape="square" class="mr-[15px] bg-gradient3 text-[24px] shadow-md" />Other-->
        <!--          </UIHeading>-->
        <!--          <div class="mt-[26px]">-->
        <!--            <div v-for="page in state.others" :key="page.handle">-->
        <!--              <span>{{ page.title }}</span>-->
        <!--              <div v-html="page.content" />-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </template>
      <div v-else class="my-16 flex justify-center">
        <UISpinner size="12" />
      </div>
    </UIContainer>
  </div>
</template>

<script lang="ts" setup>
import { useNuxtApp, useRoute, useRouter } from '#app';
import { onMounted, reactive, ref, Ref } from 'vue';
import { Tag, TagHandle, WebsiteSearchResponse, WebsiteSearchState } from '~/components/Search/types';
import { Haggadah, HaggadahWrapper } from '~/components/Global/Haggadah/types';
import { Clip } from '~/components/Global/Clip/types';
import { Event } from '~/components/Global/Event/types';
import { useSearchStore } from '~/store/search';
const searchStore = useSearchStore();

const loading = ref(false);
const route = useRoute();
const router = useRouter();
const { vueApp } = useNuxtApp();

const searchString: Ref<string> = ref((route.query.key as string) || '');
const tags: Tag[] = searchStore.tags;
const selectedTag = ref(searchStore.selectedTag);

// const { data: serverData } = await useAsyncData(getSearchData);
const state: WebsiteSearchState = reactive({
  haggadahs: [],
  clips: [],
  events: [],
  helpCenter: [],
  others: [],
  searchCategories: [],
  totalResults: 0,
});

onMounted(async () => {
  searchStore.$onAction(({ name, after, onError }) => {
    after(async (result) => {
      if (name === 'emitSearch') {
        await getSearchData(result.searchTerm, result.selectedOption);
      }
    });
    onError((error) => {
      console.error(error);
    });
  });
});

// on Server
const initialTag = findTagByName((route.query.type as string) || 'Everything');
searchStore.emitSearch(route.query.key as string, initialTag);
searchStore.setSelectedTag(initialTag);
await getSearchData(route.query.key as string, initialTag);

async function getSearchData(searchTerm: string, tag: Tag) {
  loading.value = true;
  searchString.value = searchTerm;
  selectedTag.value = tag;
  try {
    const response: WebsiteSearchResponse = await vueApp.$api.search.websiteSearch({
      term: searchTerm,
      type: (tag.handle as TagHandle) || '',
    });
    const data = { ...response?._data?.data?.searchresults };
    setState(data);
  } catch (error) {
    console.error(error);
  }
  loading.value = false;
}

function setState(data) {
  state.haggadahs = data?.book?.map((item: HaggadahWrapper) => item?.book) as Haggadah[];
  state.clips = data?.clips?.map((item) => item?.clip) as Clip[];
  state.events = data?.events?.map((item) => item?.event) as Event[];
  state.helpCenter = data?.help_center?.map((item) => item?.data);
  state.others = data?.others?.map((item) => item?.page);
  state.searchCategories = data?.search_categories as string[];
  state.totalResults = data?.total_results as number;
}

function findTagByName(tagName: string): Tag {
  return (tags.find((tag) => tag.name.toLowerCase() === tagName?.toLowerCase()) as Tag) || tags[0];
}

async function selectTagByName(tagName: string) {
  loading.value = true;
  const tag = findTagByName(tagName);
  searchStore.setSelectedTag(tag);
  await router.push({
    query: {
      ...route.query,
      type: tag.name,
    },
  });
  await getSearchData(searchString.value, tag);
  loading.value = false;
}

async function seeMoreItems(type: 'haggadahs' | 'clips' | 'events') {
  await router.push({
    name: `explore-${type}`,
    query: {
      mode: 'favorite',
      page: 1,
      sort: 'e',
    },
  });
}
</script>
