'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

export default class Ratings {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/ratings`;
  }

  public async getSatisfactionRating(ratingId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const method = 'GET';
    const url = `${base}/${ratingId}`;
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
}
