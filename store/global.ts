import { Ref, ref } from 'vue';
import { useNuxtApp } from '#app';
import type { dataResponse } from '~/types/response';
import { Haggadah } from '~/components/Global/Haggadah/types';
import { Clip } from '~/components/Global/Clip/types';

export const useGlobalStore = defineStore('global', () => {
  const { vueApp } = useNuxtApp();
  // State
  const globalData = ref(null);
  const favorite_haggadahs: Ref<Haggadah[]> = ref([]);
  const favorite_clips: Ref<Clip[]> = ref([]);

  // Actions
  async function setGlobalData(): Promise<dataResponse> {
    try {
      const { vueApp } = useNuxtApp();
      const { _data } = await vueApp.$api.page.getGlobalData();
      globalData.value = { ..._data.data };
      // return _data;
    } catch (err) {
      return err;
    }
  }

  async function setHaggadahs() {
    const { vueApp } = useNuxtApp();
    const response = await vueApp.$api.book.getBooksData();
    favorite_haggadahs.value = response?._data?.data?.favorite_book.map((item) => item.book);
  }

  async function setClips() {
    const { vueApp } = useNuxtApp();
    const response = await vueApp.$api.clip.getClipsPageData();
    favorite_clips.value = response?._data?.data?.favourite_clips?.map((item) => item.clip) || [];
  }

  async function setAppData() {
    await Promise.all([setGlobalData(), setHaggadahs(), setClips()]);
  }

  return {
    globalData,
    favorite_haggadahs,
    favorite_clips,
    setAppData,
  };
});
