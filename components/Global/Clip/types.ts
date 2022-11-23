import { HTML } from 'mdast';

export type Clip = {
  handle: string;
  title: string;
  author: string;
  author_initials: string;
  image: string;
  body: HTML;
  clip_section: string;
  clipsource: string;
  cliptype: CardType;
  downloads: number;
  is_bookmarked: '0' | '1' | Boolean;
  keywords: string[];
  language: string[];
  likes: `${number}` | number;
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
  sort?: 'r' | 'p';
};

export type clipSearchResult = {
  _data: {
    data: {
      popular_categories;
      featured_collaborator;
      got_intresting_content_arr;
      inspired_to_create_haggadah_arr;
      passover_guide_arr;
      recent_searches;
      clips: clipContainer[];
      filter_clips: {
        haggadah_sections: HaggadahSection[];
      }
      support_us_arr;
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
