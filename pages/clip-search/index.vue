<template>
  <div class='mt-[3rem]'>
    <span>Clip Card would be here</span>
    <div v-for='(clip, n) in clips' :key='n'>{{ clip }}</div>
  </div>
</template>

<script lang='ts' setup>
import { ref, Ref } from 'vue';
import type { clipSearchResult } from '~/types/clip';
const route = useRoute();
const { vueApp } = useNuxtApp();

const clips = ref([]);
const loading: Ref<boolean> = ref(true);

async function getData() {
  loading.value = true;

  const searchOptions = {
    key: route.query.key as string,
    media_type: route.query.media_type as string || '',
    category: route.query.category as string[] || '',
    scategory: route.query.scategory as string[] || '',
    clip_type: route.query.clip_type as string[] || '',
    sort: route.query.sort as 'r'|'p' || '',
  }
  console.log(searchOptions);
  const response: clipSearchResult = await vueApp.$api.clip.exploreClips(searchOptions);
  clips.value = [ ...response._data.data.searched_clips];
  console.log(clips.value);

  loading.value = false;
}
onMounted(getData);
</script>

