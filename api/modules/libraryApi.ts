import type { apiBase } from '~/types/api';
import { dataResponse, errorResponse } from '~/types/response';

export default class LibraryApi {
  private base: apiBase;
  libraryPageUrl: string;
  constructor(base: apiBase) {
    this.base = base;
    this.libraryPageUrl = 'Library-page';
  }

  async searchLibrary(params): Promise<dataResponse | errorResponse> {
    return this.base.get(`/clip-search`, params);
  }
}
