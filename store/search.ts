import type { Ref } from 'vue';

export const useSearchStore = defineStore('search', () => {
  const isSearchBarOpen: Ref<boolean> = ref(true);

  function setIsSearchOpen(open: boolean): void {
    isSearchBarOpen.value = open;
  }

  return {
    isSearchBarOpen,
    setIsSearchOpen,
  };
});
