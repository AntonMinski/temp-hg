import { ref } from 'vue';

export const usePageStore = defineStore('page', () => {
  // State
  const pages = ref([]);

  // Actions
  async function getPages<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.get(`/pages/${slug}`);
      pages.value = _data;
      return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    getPages,
  };
});
