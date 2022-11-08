import type { apiBase } from '~/types/api';
import { dataResponse, errorResponse } from '~/types/response';

export default class HomePageApi {
  private base: apiBase;
  homePageUrl: string;
  constructor(base: apiBase) {
    this.base = base;
    this.homePageUrl = 'home-page';
  }

  async getHomePage(): Promise<dataResponse | errorResponse> {
    return this.base.get(this.homePageUrl);
  }
}
