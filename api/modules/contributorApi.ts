import type { apiBase } from '~/types/api';
import { dataResponse, errorResponse } from '~/types/response';

export default class ContributorApi {
  private base: apiBase;
  contributorsUrl: string;
  constructor(base: apiBase) {
    this.base = base;
    this.contributorsUrl = 'contributors';
  }

  async getFeaturedContributors(searchData): Promise<dataResponse> {
    return this.base.get(this.contributorsUrl, searchData);
  }

  async getContributorsDetails<T>(slug: String): Promise<T> {
    return this.base.$http.get(this.contributorsUrl + '/' + slug);
  }
}
