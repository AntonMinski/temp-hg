import type { apiBase } from '~/types/api';
import { dataResponse, errorResponse } from '~/types/response';

export default class PageApi {
  private base: apiBase;
  pageUrl: string;
  constructor(base: apiBase) {
    this.base = base;
    this.pageUrl = 'pages';
  }

  async getPages(slug: String): Promise<dataResponse | errorResponse> {
    return this.base.get(this.pageUrl + '/' + slug);
  }
}
