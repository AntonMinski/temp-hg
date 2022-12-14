export type HaggadahBook = {
  book: {
    author: string;
    cover: {
      background: string;
      book_cover_image: string;
      image: string;
    }
    covertext: string;
    details;
    followers: string;
    handle: string;
    image: string;
    key: string;
    likes: string;
    reading_length: string;
    tags: string;
    title: string;
    updated_at: Date;
  }
}

export type Haggadah = {
  haggadah: {
    author: string;
    haggadah_image: string;
    handle: string;
    is_saved: boolean;
    keywords: string | string[];
    reading_length: number;
    title: string;
  }
}
