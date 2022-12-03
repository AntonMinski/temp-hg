import { dataResponse, errorResponse, statusResponse } from '~/types/response';
import { booksSearchKey } from '~/types/books';

export default class BookApi {
  private base;
  bookUrl: string;
  constructor(base) {
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

  async bookmarkBook(slug: String): Promise<statusResponse | errorResponse> {
    return this.base.post(`bookmark-book/${slug}`, {}, { showSuccessToast: false });
  }

  async unBookmarkBook(slug: String): Promise<statusResponse | errorResponse> {
    return this.base.post(`unbookmark-book/${slug}`, {}, { showSuccessToast: false });
  }

  async likeBook(slug: String): Promise<statusResponse | errorResponse> {
    return this.base.post(`/like-book/${slug}`);
  }

  async unLikeBook(slug: String): Promise<statusResponse | errorResponse> {
    return this.base.post(`/unlike-book/${slug}`);
  }

  async exploreBooks(searchKey: booksSearchKey): Promise<dataResponse | errorResponse> {
    return this.base.get('explore-book', searchKey);
  }

  async exploreSingleBook(slug: string): Promise<dataResponse | errorResponse> {
    return this.base.get('explore-book/' + slug);
  }

  async getBooksData() {
    return this.base.get('global-books');
  }

  async getBooksTrendingSection() {
    return this.base.get('book-section');
  }
}
