import { dataResponse } from '~/types/response';

export default class ContributorApi {
  private base;
  contributorsUrl: string;
  constructor(base) {
    this.base = base;
    this.contributorsUrl = 'contributors';
  }

  async getFeaturedContributors(searchData): Promise<dataResponse> {
    return this.base.get(this.contributorsUrl, searchData);
  }

  async getContributorsDetails<T>(slug: String): Promise<T> {
    return this.base.get(this.contributorsUrl + '/' + slug);
  }
}
