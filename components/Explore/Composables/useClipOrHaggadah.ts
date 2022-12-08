import { computed, ComputedRef, reactive, Ref, ref } from 'vue';
import { Clip, ClipCategory, clipSearchParams, ClipsSorting, MediaType } from '~/components/Global/Clip/types';
import type { Mode, ClipOrHaggadah } from '~/components/Explore/types';
import { useRoute, useRouter } from '#app';
import { DropdownItem, DropdownItemParent } from '~/components/UI/Dropdown/types';
import { useSearchInfo } from '~/components/Explore/Composables/useSearchInfo';
import { Haggadah } from '~/components/Global/Haggadah/types';
import { Sorting } from '~/components/Explore/types';

export function useClipOrHaggadah(initialData: InitialData) {
  const router = useRouter();
  const route = useRoute();

  const state: State = reactive({
    // ---------- DATA  ----------
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
    mediaTypes: [],
    selectedMediaTypes: [],
    selectedCategories: [],
    selectedChildCategories: [],
    selectedHaggadahSections: [],
    searchInfoHeadingParts: [],
    searchInfoHeadingLevel: 2,
    type: 'clip',

    // ---------- METHODS  ----------

    async getClipsByFilters() {
      state.loading = true;
      state.mode = state.searchString ? 'keyword' : 'topics';
      state.searchKeywordDisplay = state.searchString;

      let searchOptions: string = '';
      let query = {};

      function addToQuery(key: string, value: string) {
        if (!value) return;

        if (searchOptions) {
          searchOptions += '&';
        } else {
          searchOptions += '?';
        }
        searchOptions += `${key}=${value}`;
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
      addToQuery('contributor', state.contributorHandle);
      prepareQueryParent(state.haggadahSections, state.selectedHaggadahSections, 'haggadah_section[]');
      prepareQueryParent(state.categories, state.selectedCategories, 'parent_category[]');
      prepareQueryChild(state.categories, state.selectedChildCategories, 'child_category[]');
      prepareQueryParent(state.mediaTypes, state.selectedMediaTypes, 'media_type[]');
      addToQuery('page', '1');
      addToQuery('sort', state.currentSorting);

      await router.push({ query });

      await state.getItems(searchOptions);
    },

    async getItemsByCategory(categoryHandle: string) {
      state.mode = 'topics';
      state.selectedCategories = [categoryHandle];
      let query;
      if (state.type === 'clip') {
        query = { 'parent_category[]': categoryHandle, page: '1' };
      } else {
        query = { topic: categoryHandle, page: '1' };
      }
      await router.push({ query });
      window.scrollTo(0, 0);
      await state.getItems(query);
    },

    async viewMore() {
      state.mode = 'favorite';
      state.currentSorting = 'e';
      window.scrollTo(0, 0);
      await state.getItems({ sort: 'e' });
    },

    async getItems(searchOptions: clipSearchParams | string) {
      state.loading = true;
      state.getSearchInfo();
      if (typeof searchOptions !== 'string') {
        searchOptions.page = searchOptions.page || 1;
        searchOptions.sort = state.currentSorting || 'p';
      }
      const { items, meta } = await initialData.fetchClipsOrHaggadahs(searchOptions);
      state.clipsOrHaggadahs = [...items];
      state.meta = { ...meta };
      state.loading = false;
    },

    async searchItems(): Promise<void> {
      state.searchKeywordDisplay = state.searchString;
      state.mode = 'keyword';
      await state.getItems(route.query);
    },

    async loadMoreItems() {
      state.loadingMore = true;
      const currentPage = route.query.page ? parseInt(route.query.page as string) : 1;
      await router.push({
        query: {
          ...route.query,
          page: currentPage + 1,
        },
      });
      const { items, meta } = await initialData.fetchClipsOrHaggadahs({
        ...route.query,
        page: currentPage + 1,
      });
      state.clipsOrHaggadahs.push(...items);
      state.meta = { ...meta };
      state.loadingMore = false;
    },

    async setSorting() {
      await state.getItems(route.query);
    },

    async getItemsBySection(sectionHandle: string) {
      state.selectedHaggadahSections = [sectionHandle];
      state.mode = 'topics';
      await state.getItems(route.query);
    },

    async clearFilters() {
      state.loading = true;
      const newQuery = {
        key: state.searchString,
        contributor: state.contributorHandle,
        page: '1',
        sort: route.query.sort,
      };
      if (!newQuery.key && !newQuery.contributor) {
        this.state.mode = 'main';
      }
      await router.push({ query: newQuery });
      await state.getItems(newQuery);
      state.loading = false;
    },

    getSearchInfo() {
      const { headingParts, headingLevel } = useSearchInfo(state);
      state.searchInfoHeadingParts = [...headingParts];
      state.searchInfoHeadingLevel = headingLevel;
    },
  });

  // ------------ Mounted ------------

  state.mode = initialData?.initialMode;
  state.currentSorting = initialData?.initialSort;
  state.searchString = route.query.key as string;
  state.searchKeywordDisplay = state.searchString;
  // // @ts-ignore
  state.clipsOrHaggadahs = (initialData?.initialClips || initialData?.initialHaggadahs) as ClipOrHaggadah[];
  state.meta = { ...initialData?.initialMeta };
  state.categories = initialData?.categories;
  state.popularCategories = initialData?.popularCategories;
  state.haggadahSections = initialData?.haggadahSections;
  state.mediaTypes = initialData?.mediaTypes;
  state.type = initialData?.type;
  state.getSearchInfo();
  state.contributorName = initialData?.contributorName;
  state.contributorHandle = initialData?.contributorHandle;
  state.getSearchInfo();

  // -------------  Computed  --------------

  const searchFilters: ComputedRef<string> = computed(() =>
    state.selectedHaggadahSections
      .concat(state.selectedCategories)
      .concat(state.selectedChildCategories)
      .concat(state.selectedMediaTypes)
      .join(',')
  );

  return {
    state,
    searchFilters,
  };
}

export type Type = 'clip' | 'haggadah';

export type State = {
  mode: Mode;
  meta?;
  searchString?: string;
  searchKeywordDisplay?: string;
  clipsOrHaggadahs?: ClipOrHaggadah[];
  haggadahSections?: DropdownItem[];
  categories?: ClipCategory[];
  popularCategories?: ClipCategory[];
  mediaType?: MediaType;
  loading?: boolean;
  loadingMore?: boolean;
  currentSorting?: Sorting;
  mediaTypes?: MediaType[];
  selectedMediaTypes?: string[];
  selectedCategories?: string[];
  selectedChildCategories?: string[];
  selectedHaggadahSections?: string[];
  searchInfoHeadingParts;
  searchInfoHeadingLevel: number;
  type: Type;
  contributorName?: string;
  contributorHandle?: string;

  getClipsByFilters: Function;
  getItemsByCategory: Function;
  searchItems: Function;
  getItems: Function;
  viewMore: Function;
  loadMoreItems: Function;
  setSorting: Function;
  getItemsBySection: Function;
  clearFilters: Function;
  getSearchInfo: Function;
};

export type InitialData = {
  initialMode: Mode;
  initialSort: Sorting;
  initialHaggadahs?: Haggadah[];
  initialClips?: Clip[];
  initialMeta;
  popularCategories: ClipCategory[];
  categories?: ClipCategory[];
  haggadahSections?: DropdownItem[];
  fetchClipsOrHaggadahs: Function;
  type?: Type;
  contributorName?: string;
  contributorHandle?: string;
  mediaTypes?: MediaType[];
};
