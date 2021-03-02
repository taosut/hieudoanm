'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

export default class Teams {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/teams`;
  }

  public async listTeams(page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}?page=${page}`;
    const method: string = 'GET';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { teams = [] } = _embedded;
    return teams;
  }

  public async listTeamMembers(teamId: number, page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}/${teamId}/members?page=${page}`;
    const method: string = 'GET';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    console.log(res);
    const { _embedded = {} } = res;
    const { users = [] } = _embedded;
    return users;
  }
}
