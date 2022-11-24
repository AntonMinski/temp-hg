import { dataResponse, errorResponse } from '~/types/response';

export default class PageApi {
  private base;
  pageUrl: string;
  constructor(base) {
    this.base = base;
    this.pageUrl = 'pages';
  }

  async getPage(slug: string): Promise<dataResponse | errorResponse> {
    return this.base.get(this.pageUrl + slug);
  }

  async getHomePage(): Promise<dataResponse | errorResponse> {
    return this.base.get('home-page');
  }

  async getGlobalData(): Promise<dataResponse | errorResponse> {
    return this.base.get('global-response');
  }

}
