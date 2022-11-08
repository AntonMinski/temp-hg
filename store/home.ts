import { ref } from 'vue';
import { useNuxtApp } from '#app';
import type { dataResponse } from '~/types/response';

export const useHomeStore = defineStore('home', () => {
  // State
  const homePage = ref(null);

  // Actions
  async function getHomePage(): Promise<dataResponse> {
    try {
      const { vueApp } = useNuxtApp();
      const { _data } = await vueApp.$api.home.getHomePage();
      homePage.value = { ..._data.data };
      // return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    homePage,
    getHomePage,
  };
});
