import type { Ref } from 'vue';
import { ref } from 'vue';
import { Tag } from '~/components/Search/types';

export const useSearchStore = defineStore('search', () => {
  const tags: Tag[] = [
    {
      name: 'Everything',
      handle: '',
    },
    {
      name: 'Haggadahs',
      handle: 'book',
    },
    {
      name: 'Clips',
      handle: 'clips',
    },
    {
      name: 'Events',
      handle: 'events',
    },
    // not implemented yet:

    // {
    //   name: 'Helpcenter',
    //   handle: 'help_center',
    // },
    // {
    //   name: 'Other',
    //   handle: 'others',
    // },
  ];
  const selectedTag: Ref<Tag> = ref(tags[0]);
  const searchTerm: Ref<string> = ref('');

  const isSearchBarOpen: Ref<boolean> = ref(true);

  function setIsSearchOpen(open: boolean): void {
    isSearchBarOpen.value = open;
  }

  function setSelectedTag(tag: Tag): void {
    selectedTag.value = tag;
  }

  function emitSearch(searchKeyword: string, selectedOption: Tag): { searchTerm: string; selectedOption: Tag } {
    searchTerm.value = searchKeyword;
    return { searchTerm: searchKeyword, selectedOption };
  }

  return {
    tags,
    searchTerm,
    selectedTag,
    isSearchBarOpen,
    setIsSearchOpen,
    setSelectedTag,
    emitSearch,
  };
});
