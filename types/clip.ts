export type clipSearchParams = {
  key?: string;
  media_type?: string[];
  category?: Number[];
  scategory?: Number[];
  clip_type?: Number[];
  sort?: 'r'|'p';
}

export type clipSearchResult = {
  _data: {
    data: {
      featured_collaborator;
      got_intresting_content_arr;
      inspired_to_create_haggadah_arr;
      passover_guide_arr;
      recent_searches;
      searched_clips: clipFromSearch[];
      support_us_arr;
    }
  }

}

export type clipFromSearch = {
  clip: {
    author: string;
    body: string;
    clip_section: string;
    clipsource: string;
    cliptype: string;
    downloads: number;
    handle: string;
    image: string;
    is_bookmarked: boolean | null;
    keywords: string[];
    language: string[];
    likes: string;
    media: {
      audio: string;
      image;
      video;
    }
    title: string;
  }

}




