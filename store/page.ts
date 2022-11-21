import { ref } from 'vue';
import { useNuxtApp } from '#app';
import type { dataResponse, errorResponse } from '~/types/response';


export const usePageStore = defineStore('page', () => {
  // State
  const pageData = ref(null);

  // Actions
  async function getPageData(path: string): Promise<dataResponse | void> {
    try {
      const { vueApp } = useNuxtApp();
      const { _data } = await vueApp.$api.page.getPage(path);
      pageData.value = { ..._data.data };
      // return _data;
    } catch (err) {
      throw err;
    }
  }

  return {
    pageData,
    getPageData,
  };
});
