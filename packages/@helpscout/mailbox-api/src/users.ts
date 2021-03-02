'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

export default class Users {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/users`;
  }

  public async listUsers(page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}?page=${page}`;
    const method: string = 'GET';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { users = [] } = _embedded;
    return users;
  }

  public async getUser(userId: number | string): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${userId}`;
    const method: string = 'GET';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }

  public async getResourceOwner(): Promise<Array<any>> {
    return await this.getUser('me');
  }

  public async deleteUser(userId: number): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${userId}`;
    const method: string = 'DELETE';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
}
