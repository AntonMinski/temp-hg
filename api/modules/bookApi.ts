import type { apiBase } from '~/types/api';
import { dataResponse, errorResponse } from '~/types/response';

export default class BookApi {
  private base: apiBase;
  bookUrl: string;
  constructor(base: apiBase) {
    this.base = base;
    this.bookUrl = 'books';
  }

  async getBooks<T>(): Promise<T> {
    return this.base.get(this.bookUrl);
  }

  async getSingleBook<T>(slug: String): Promise<T> {
    return this.base.get(this.bookUrl + '/' + slug);
  }

  async createBook<T>(bookData): Promise<T> {
    return this.base.post(this.bookUrl, bookData);
  }

  async updateBook<T>(slug: String, updateData): Promise<T> {
    return this.base.patch(this.bookUrl + '/' + slug, updateData);
  }

  async deleteBook<T>(slug: String): Promise<T> {
    return this.base.delete(this.bookUrl + '/' + slug);
  }

  async updateTitlePrivacy<T>(slug: String, updateData): Promise<T> {
    return this.base.post(`/update-title-book/${slug}`, updateData);
  }

  async saveBook<T>(slug: String): Promise<T> {
    return this.base.post(`/save-book/${slug}`);
  }

  async unSaveBook<T>(slug: String): Promise<T> {
    return this.base.post(`/unsave-book/${slug}`);
  }

  async inviteCollaborator<T>(slug: String, collaboratorData): Promise<T> {
    return this.base.post(`/invite-collaborator/${slug}`, collaboratorData);
  }

  async useAsATemplate<T>(slug: String, bookData): Promise<T> {
    return this.base.post(`/use-book-template/${slug}`, bookData);
  }
}
