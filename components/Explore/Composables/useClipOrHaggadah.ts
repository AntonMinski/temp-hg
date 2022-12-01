import { computed, ComputedRef, reactive, Ref, ref } from 'vue';
import {
  Clip,
  ClipCategory,
  clipContainer,
  clipSearchParams,
  ClipsSorting,
  MediaType,
  Mode,
} from '~/components/Global/Clip/types';
import { useRoute, useRouter } from '#app';
import { DropdownItem, DropdownItemParent } from '~/components/UI/Dropdown/types';
import { Haggadah } from '~/components/Global/Haggadah/types';

export function useClipOrHaggadah(
  initialMode: Mode = 'main',
  initialSort: ClipsSorting = 'p',
  initialClipsOrHaggadahs: Clip[] | Haggadah[] = [],
  initialMeta = {},
  initialCategories: ClipCategory[] = [],
  initialHaggadahSections: DropdownItem[] = [],
  initialPopularCategories: ClipCategory[] = [],
  fetchClipsOrHaggadahs: Function
) {
  type State = {
    mode: Mode;
    meta?;
    searchString?: string;
    searchKeywordDisplay?: string;
    clipsOrHaggadahs?: Clip[] | Haggadah[];
    haggadahSections?: DropdownItem[];
    categories?: ClipCategory[];
    popularCategories?: ClipCategory[];
    mediaType?: MediaType;
    loading?: boolean;
    loadingMore?: boolean;
    currentSorting?: ClipsSorting;
    mediaTypes?: MediaType[];
    selectedMediaTypes?: string[];
    selectedCategories?: string[];
    selectedChildCategories?: string[];
    selectedHaggadahSections?: string[];
  };

  const router = useRouter();
  const route = useRoute();

  const state: State = reactive({
    mode: 'main',
    meta: {},
    searchString: '',
    searchKeywordDisplay: '',
    loading: false,
    loadingMore: false,
    currentSorting: 'p',
    clipsOrHaggadahs: [],
    categories: [],
    popularCategories: [],
    haggadahSections: [],
    mediaTypes: [
      { name: 'Text', handle: 'text' },
      { name: 'Video', handle: 'video' },
      { name: 'Audio', handle: 'audio' },
      { name: 'Image', handle: 'image' },
    ] as MediaType[],
    selectedMediaTypes: [],
    selectedCategories: [],
    selectedChildCategories: [],
    selectedHaggadahSections: [],
  });

  state.mode = initialMode;
  state.currentSorting = initialSort;
  state.searchString = route.query.key as string;
  state.clipsOrHaggadahs = [...initialClipsOrHaggadahs];
  state.meta = { ...initialMeta };
  state.categories = [...initialCategories];
  state.popularCategories = [...initialPopularCategories];
  state.haggadahSections = [...initialHaggadahSections];

  const searchFilters: ComputedRef<string> = computed(() =>
    state.selectedHaggadahSections
      .concat(state.selectedCategories)
      .concat(state.selectedChildCategories)
      .concat(state.selectedMediaTypes)
      .join(',')
  );

  async function getClipsByFilters() {
    state.loading = true;
    state.mode = state.searchString ? 'keyword' : 'topics';
    state.searchKeywordDisplay = state.searchString;

    let searchOptions: string = '';
    let query = {};

    function addToQuery(key: string, value: string) {
      if (searchOptions) {
        searchOptions += '&';
      } else {
        searchOptions += '?';
      }
      searchOptions += `${key}=$`;
      query[key] = value;
    }
    function prepareQueryParent(
      itemsToFilter: DropdownItem[] | DropdownItemParent[],
      selectedItems: string[],
      key: string
    ): void {
      itemsToFilter
        .filter((item) => selectedItems.includes(item.handle))
        .map((item) => item.handle)
        .map((handle) => addToQuery(key, handle));
    }
    function prepareQueryChild(itemsToFilter: DropdownItemParent[], selectedItems: string[], key: string): void {
      itemsToFilter
        .map((item) => item.child)
        .flat()
        .filter((item) => selectedItems.includes(item.handle))
        .map((item) => item.handle)
        .map((handle) => addToQuery(key, handle));
    }
    addToQuery('key', state.searchString);
    prepareQueryParent(state.haggadahSections, state.selectedHaggadahSections, 'haggadah_section[]');
    prepareQueryParent(state.categories, state.selectedCategories, 'parent_category[]');
    prepareQueryChild(state.categories, state.selectedChildCategories, 'child_category[]');
    prepareQueryParent(state.mediaTypes, state.selectedMediaTypes, 'media_type[]');
    addToQuery('page', '1');
    addToQuery('sort', state.currentSorting);

    await router.push({ query });

    // await getClips(searchOptions);
  }

  async function getItemsByCategory(categoryHandle: string) {
    state.mode = 'topics';
    state.selectedCategories = [categoryHandle];
    const query = { 'parent_category[]': categoryHandle, page: '1' };
    await router.push({ query });
    await getItems(query);
  }

  async function getItems(searchOptions: clipSearchParams | string) {
    state.loading = true;
    if (typeof searchOptions !== 'string') {
      searchOptions.page = searchOptions.page || 1;
      searchOptions.sort = searchOptions.sort || state.currentSorting || 'p';
    }
    console.log('searchOptions', searchOptions);
    const { items, meta } = await fetchClipsOrHaggadahs(searchOptions);
    state.clipsOrHaggadahs = [...items];
    state.meta = { ...meta };
    state.loading = false;
  }

  async function searchItems(): Promise<void> {
    console.log('searchItems');
    state.searchKeywordDisplay = state.searchString;
    state.mode = 'keyword';
    await getItems(route.query);
  }

  async function loadMoreItems() {
    state.loadingMore = true;
    const currentPage = route.query.page ? parseInt(route.query.page as string) : 1;
    await router.push({
      query: {
        ...route.query,
        page: currentPage + 1,
      },
    });
    const { items, meta } = await fetchClipsOrHaggadahs({
      ...route.query,
      page: currentPage + 1,
    });
    state.clipsOrHaggadahs.push(...items);
    state.meta = { ...meta };
    state.loadingMore = false;
  }

  async function setSorting() {
    await getItems(route.query);
  }

  async function getItemsBySection(sectionHandle: string) {
    state.selectedHaggadahSections = [sectionHandle];
    state.mode = 'topics';
    await getItems(route.query);
  }

  async function clearFilters() {
    state.loading = true;
    if (state.mode === 'keyword' && state.searchString) {
      await router.push({ query: { key: state.searchString } });
      await getItems({ key: state.searchString, page: 1 });
    } else if (state.mode === 'topics') {
      state.mode = 'main';
      await router.push({ query: {} });
      state.loading = false;
      // await getClips({ page: 1 });
    }
  }

  return {
    state,
    searchFilters,
    getItemsByFilters: getClipsByFilters,
    getItemsByCategory,
    searchItems,
    getItems,
    loadMoreItems,
    setSorting,
    getItemsBySection,
    clearFilters,
  };
}
