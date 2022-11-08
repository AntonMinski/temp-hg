import type { apiBase } from '~/types/api';
import { dataResponse, errorResponse } from '~/types/response';

export default class BlogApi {
  private base: apiBase;
  blogUrl: string;
  constructor(base: apiBase) {
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
