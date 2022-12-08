import { WebsiteSearchApiKeys, WebsiteSearchResponse } from '~/components/Search/types';
import { errorResponse } from '~/types/response';

export default class SearchApi {
  private base;
  constructor(base) {
    this.base = base;
  }

  async websiteSearch(searchQuery: WebsiteSearchApiKeys): Promise<WebsiteSearchResponse | errorResponse> {
    return this.base.get('website-search/' + searchQuery.term + '/' + searchQuery.type);
  }


}
