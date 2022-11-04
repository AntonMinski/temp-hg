import { ref } from 'vue';

export const useBlogStore = defineStore('blog', () => {
  // State
  const blogs = ref([]);

  // Actions
  async function getBlogs<T>(): Promise<T> {
    try {
      const { _data } = await $http.get(`/blogs`);
      blogs.value = _data;
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function getSingleBlog<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.get(`/blogs/${slug}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function searchInBlog<T>(searchData): Promise<T> {
    try {
      const { _data } = await $http.post(`/blogs/search`, { body: searchData });
      return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    blogs,
    getBlogs,
    getSingleBlog,
    searchInBlog,
  };
});
