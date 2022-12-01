export type ContributorWrapper = {
  data: {
    name: string;
    handle: string;
    user_image: string;
    total_followers: number;
    total_books: number;
    total_clips: number;
  }
}

export type Contributor = {
  author_initials: string;
  image: string;
  bio;
  city: string;
  state: string;
  country: string;
  facebook: string;
  twitter_account: string;
  name: string;
  handle: string;
  user_image: string;
  total_followers: number;
  total_user_books: number;
  total_user_clips: number;
  total_collaborators: number;
  total_user_events: number;
}
