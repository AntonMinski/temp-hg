import { ref } from 'vue';
import type { dataResponse } from './types/response';

export const useHomeStore = defineStore('home', () => {
  // State
  const homePage = ref([]);

  // Actions
  async function getHomePage(): Promise<dataResponse> {
    try {
      const { _data } = await $http.get(`/home-page`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    homePage,
    getHomePage,
  };
});
