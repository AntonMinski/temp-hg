import type { dataResponse } from '~/types/response';

export const useContributorStore = defineStore('contributor', () => {
  // State
  // const contributors = ref([]);

  // Actions
  async function getFeaturedContributors(searchString: String = ''): Promise<dataResponse> {
    try {
      const { _data } = await $http.get(`/contributors?search=${searchString}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function getContributorsDetails<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.get(`/contributors/${slug}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    getFeaturedContributors,
    getContributorsDetails,
  };
});
