export const useLibraryStore = defineStore('library', () => {
  async function searchLibrary<T>(searchString: String): Promise<T> {
    try {
      const { _data } = await $http.get(`/clip-search${searchString}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    searchLibrary,
  };
});
