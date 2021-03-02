'use strict';

import helper from './helper';

import { ApiRequestOptions } from './interfaces';

interface Info {
  name: string;
  phone: string;
  address: string;
  city_id: string;
  district_id: string;
}

export default class OfficialAccount {
  private access_token: string;
  private base: string;

  constructor(access_token: string = '', base: string) {
    this.access_token = access_token;
    this.base = `${base}/oa`;
  }

  private async apiRequest(
    method: string,
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<any> {
    const self = this;
    const { access_token = '', base = '' } = self;
    let { queryParams = {}, body = {} } = options;
    queryParams = Object.assign({ access_token }, queryParams);
    const queryParamsString = helper.convertObjectToQueryString(queryParams);
    const url = `${base}/${endpoint}?${queryParamsString}`;
    const headers = { 'Content-Type': 'application/json' };
    let init: RequestInit = { method, headers };
    init = Object.keys(body).length ? Object.assign(options, { body }) : options;
    return new Promise(resolve => {
      fetch(url, init)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve(error);
        });
    });
  }

  public async sendMessage(user_id: string, text: string): Promise<any> {
    const body = { recipient: { user_id }, message: { text } };
    return this.apiRequest('POST', 'message', { body });
  }

  public async updateFollowerInfo(user_id: string, info: Info): Promise<any> {
    const body = Object.assign({ user_id }, info);
    return this.apiRequest('POST', 'updatefollowerinfo', { body });
  }
  /**
   * IP
   */
  public async registerIP(ip: string, name: string): Promise<any> {
    return this.apiRequest('POST', 'registerip', { body: { ip, name } });
  }

  public async removeIP(ip: string, name: string): Promise<any> {
    return this.apiRequest('POST', 'removeip', { body: { ip, name } });
  }
  /**
   * Info
   */
  public async getProfile(user_id: string): Promise<any> {
    const data = JSON.stringify({ user_id });
    return this.apiRequest('GET', 'getprofile', { queryParams: { data } });
  }

  public async getOfficialAccount(): Promise<any> {
    return this.apiRequest('GET', 'tag/getoa');
  }

  public async getFollowers(offset: number, limit: number): Promise<any> {
    const data = JSON.stringify({ offset, limit });
    return this.apiRequest('GET', 'getoa', { queryParams: { data } });
  }

  public async listRecentChat(offset: number, limit: number): Promise<any> {
    const data = JSON.stringify({ offset, limit });
    return this.apiRequest('GET', 'listrecentchat', { queryParams: { data } });
  }

  public async getConversation(user_id: string, offset: number, limit: number): Promise<any> {
    const data = JSON.stringify({ user_id, offset, limit });
    return this.apiRequest('GET', 'conversation', { queryParams: { data } });
  }
  /**
   * Tags
   */
  public async getTags(): Promise<any> {
    return this.apiRequest('GET', 'tag/gettagsofoa');
  }

  public async tagFollower(user_id: string, tag_name: string): Promise<any> {
    const body = { user_id, tag_name };
    return this.apiRequest('POST', 'tag/tagfollower', { body });
  }

  public async removeFollowerFromTag(user_id: string, tag_name: string): Promise<any> {
    const body = { user_id, tag_name };
    return this.apiRequest('POST', 'tag/rmfollowerfromtag', { body });
  }

  public async removeTag(tag_name: string): Promise<any> {
    const body = { tag_name };
    return this.apiRequest('POST', 'tag/rmtag', { body });
  }
}
