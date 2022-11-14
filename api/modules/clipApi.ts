import type { apiBase } from '~/types/api';
import type { clipSearchParams, clipSearchResult } from '~/types/clip';
import { errorResponse } from '~/types/response';

export default class ClipApi {
  private base: apiBase;
  clipUrl: string;
  constructor(base: apiBase) {
    this.base = base;
    this.clipUrl = 'clips';
  }

  async getClips<T>(): Promise<T> {
    return this.base.get(this.clipUrl);
  }

  async getSingleClip<T>(slug: String): Promise<T> {
    return this.base.get(this.clipUrl + '/' + slug);
  }

  async createClip<T>(clipData): Promise<T> {
    return this.base.post(this.clipUrl, clipData);
  }

  async updateClip<T>(slug: String, updateData): Promise<T> {
    return this.base.patch(this.clipUrl + '/' + slug, updateData);
  }

  async deleteClip<T>(slug: String): Promise<T> {
    return this.base.delete(this.clipUrl + '/' + slug);
  }

  async updateTitlePrivacy<T>(slug: String, updateData): Promise<T> {
    return this.base.post(`/update-title-clip/${slug}`, updateData);
  }

  async saveClip<T>(slug: String): Promise<T> {
    return this.base.post(`/save-clip/${slug}`);
  }

  async unSaveClip<T>(slug: String): Promise<T> {
    return this.base.post(`/unsave-clip/${slug}`);
  }

  async exploreClips(searchOptions: clipSearchParams): Promise<clipSearchResult| errorResponse> {
    return this.base.get('explore-clip', searchOptions);
  }
}
