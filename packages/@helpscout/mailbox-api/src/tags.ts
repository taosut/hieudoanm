'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

export default class Tags {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/tags`;
  }

  public async listTags(page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const method: string = 'GET';
    const url: string = `${base}?page=${page}`;
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { tags = [] } = _embedded;
    return tags;
  }
}
