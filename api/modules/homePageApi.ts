import { dataResponse, errorResponse } from '~/types/response';

export default class HomePageApi {
  private base;
  homePageUrl: string;
  constructor(base) {
    this.base = base;
    this.homePageUrl = 'home-page';
  }

  async getHomePage(): Promise<dataResponse | errorResponse> {
    return this.base.get(this.homePageUrl);
  }
}
