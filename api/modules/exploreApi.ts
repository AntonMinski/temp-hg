import type { dataResponse, errorResponse } from '~/types/response';
import type { booksSearchKey } from '~/types/books';

export default class ExploreApi {
  private base;
  constructor(base) {
    this.base = base;
  }

  async exploreBooks(searchKey: booksSearchKey): Promise<dataResponse| errorResponse> {
    return this.base.get('explore-book', searchKey);
  }
}
