import { HTML } from 'mdast';

export type clipSearchParams = {
  key?: string;
  'media_type[]'?: string[];
  'category[]'?: [string | number] | string | number;
  'scategory[]'?: Number[];
  'clip_type[]'?: Number[];
  sort?: 'r' | 'p';
};

export type clipSearchResult = {
  _data: {
    data: {
      featured_collaborator;
      got_intresting_content_arr;
      inspired_to_create_haggadah_arr;
      passover_guide_arr;
      recent_searches;
      searched_clips: clipContainer[];
      support_us_arr;
    };
  };
};

export type clipFindAllResult = {
  _data: {
    data: {
      popular_categories: string[];
      clips: clipContainer[];
      recent_searches;
      inspired_to_create_haggadah_arr;
      got_intresting_content_arr;
      clip_in;
      featured_collaborator;
      passover_guide_arr;
      support_us_arr;
    };
  };
};

export type clipContainer = {
  clip: Clip;
};
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

export type CardType = 'text' | 'image' | 'audio' | 'video';

export type ClipCategory = {
  handle: string;
  name: string;
};
