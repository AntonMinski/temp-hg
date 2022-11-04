import { ref } from 'vue';

export const useClipStore = defineStore('clip', () => {
  // State
  const clips = ref([]);

  // Actions
  async function getClips() {
    try {
      const { _data } = await $http.get(`/clips`);
      clips.value = _data;
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function getSingleClip<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.get(`/clips/${slug}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function createClip<T>(clipData): Promise<T> {
    try {
      const { _data } = await $http.post(`/clips`, { body: clipData });
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function updateClip<T>(slug: String, clipData): Promise<T> {
    try {
      const { _data } = await $http.patch(`/clips/${slug}`, { body: clipData });
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function deleteClip<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.delete(`/clips/${slug}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function updateTitlePrivacy<T>(slug: String, clipData): Promise<T> {
    try {
      const { _data } = await $http.post(`/update-title-clip/${slug}`, { body: clipData });
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function saveClip<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.post(`/save-Clip/${slug}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  async function unSaveClip<T>(slug: String): Promise<T> {
    try {
      const { _data } = await $http.post(`/unsave-Clip/${slug}`);
      return _data;
    } catch (err) {
      return err;
    }
  }

  return {
    clips,
    getClips,
    getSingleClip,
    createClip,
    updateClip,
    deleteClip,
    updateTitlePrivacy,
    saveClip,
    unSaveClip,
  };
});
