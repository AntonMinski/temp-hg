import { Haggadah, HaggadahWrapper } from '~/components/Global/Haggadah/types';
import { Clip } from '~/components/Global/Clip/types';
import { Event } from '~/components/Global/Event/types'

export type RouteQuery = {
  key: string;
  type: string;
};

export type WebsiteSearchApiKeys = {
  term?: string;
  type?: string;
}

export type WebsiteSearchResponse = {
  _data: {
    data: {
      searchresults: {
        book: HaggadahWrapper[];
        clips;
        events;
        help_center;
        others;
        search_categories: string[];
        total_results: number;
      }
    }
  }
}

export type TagHandle = '' | 'books' | 'clips' | 'events' | 'help_center' | 'others';

export type Tag = {
  name: string;
  handle: TagHandle;
}

export type WebsiteSearchState = {
  haggadahs: Haggadah[];
  clips: Clip[];
  events: Event[];
  helpCenter;
  others;
  searchCategories: string[];
  totalResults: number;
};
