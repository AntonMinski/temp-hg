import { HTML } from 'mdast';

export type Clip = {
  handle: string;
  title: string;
  author: string;
  author_initials: string;
  image: string;
  covertext: string;
  body: HTML;
  clip_section: string;
  clipsource: string;
  cliptype: CardType;
  downloads: number;
  is_bookmarked: '0' | '1' | Boolean;
  is_liked: '0' | '1' | Boolean;
  keywords: string[];
  language: string[];
  likes: number;
  media: {
    audio: string;
    image;
    video;
  };
};

export type clipSearchParams = {
  key?: string;
  'media_type[]'?: string | string[];
  'parent_category[]'?: string | string[];
  'children_category[]'?: string | string[];
  'haggadah_section[]'?: string | string[];
  sort?: 'r' | 'p' | 'editor';
  page?: string | number;
};

export type clipSearchResult = {
  _data: {
    data: {
      popular_categories;
      recent_searches;
      media_type;
      clips: clipContainer[];
      filter_clips: {
        haggadah_sections: HaggadahSection[];
      }
      meta_tags;
      clip_in;
      support_us_arr;
      results_found: number;
    };
  };
};

export type clipContainer = {
  clip: Clip;
};

export type HaggadahSection = {
  handle: string;
  name: string;
}

export type CardType = 'text' | 'image' | 'audio' | 'video';

export type ClipCategory = {
  handle: string;
  name: string;
};

export type ClipCategoryParent = {
  handle: string;
  name: string;
  child: ClipCategory[];
};


export type ClipSection = {
  name: string;
  handle: string;
  total: number;
  clips: Clip[];
}


export type Mode = 'main' | 'topics' | 'keyword';

export type MediaType = {
  name: string;
  handle: string;
};

export type ClipsSorting = 'p' | 'r' | 'editor'
