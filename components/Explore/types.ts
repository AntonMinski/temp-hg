import { Clip } from '~/components/Global/Clip/types';
import { Haggadah, HaggadahsSorting } from '~/components/Global/Haggadah/types';

export type Mode = 'main' | 'keyword' | 'topics' | 'contributor' | 'favorite';
export type ClipOrHaggadah = Clip | Haggadah;

export type SearchParams = {
  key?: string;
  'media_type[]'?: string | string[];
  'parent_category[]'?: string | string[];
  'children_category[]'?: string | string[];
  'haggadah_section[]'?: string | string[];
  sort?: HaggadahsSorting;
  page?: string | number;
};

export type Sorting = 'p' | 'r' | 'e' | '';
