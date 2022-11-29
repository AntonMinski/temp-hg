import { dataResponse, errorResponse } from '~/types/response';

export default class LibraryApi {
  private base;
  libraryPageUrl: string;
  constructor(base) {
    this.base = base;
    this.libraryPageUrl = 'Library-page';
  }

  async searchLibrary(params): Promise<dataResponse | errorResponse> {
    return this.base.get(`/explore/clips`, params);
  }
}
