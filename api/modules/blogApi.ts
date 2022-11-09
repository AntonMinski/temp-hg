export default class BlogApi {
  private base;
  blogUrl: string;
  constructor(base) {
    this.base = base;
    this.blogUrl = 'blogs';
  }

  async getBlogs<T>(): Promise<T> {
    return this.base.get(this.blogUrl);
  }

  async getSingleBlog<T>(slug: String): Promise<T> {
    return this.base.get(this.blogUrl + '/' + slug);
  }

  async searchInBlog<T>(searchData): Promise<T> {
    return this.base.post(this.blogUrl + `/search`, searchData);
  }
}
