'use strict';

import Base from './base';

export default class YouTube extends Base {
  public async getVideoCategories(): Promise<Array<Record<string, any>>> {
    return await this.get(`youtube/video-categories`);
  }

  public async getTrending(categoryId: number = 0): Promise<Array<Record<string, any>>> {
    return await this.get(`youtube/trending?categoryId=${categoryId}`);
  }

  public async getMusicTrending(): Promise<Array<Record<string, any>>> {
    return await this.getTrending(10);
  }
}
