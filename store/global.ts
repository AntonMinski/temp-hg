import { ref } from 'vue';
import { useNuxtApp } from '#app';
import type { dataResponse } from '~/types/response';

export const useGlobalStore = defineStore('global', () => {
  // State
  const globalData = ref(null);

  // Actions
  async function getGlobalData(): Promise<dataResponse> {
    try {
      const { vueApp } = useNuxtApp();
      const { _data } = await vueApp.$api.page.getGlobalData();
      globalData.value = { ..._data.data };
      // return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    globalData,
    getGlobalData,
  };
});
