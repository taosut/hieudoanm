'use strict';

import helper from './helper';

import { ApiRequestOptions } from './interfaces';

export default class Social {
  private access_token: string;
  private base: string;

  constructor(access_token: string = '', base: string) {
    this.access_token = access_token;
    this.base = `${base}`;
  }

  private async apiRequest(
    method: string = '',
    endpoint: string = '',
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

  public async sendMessage(to: string, message: string, link: string): Promise<any> {
    const queryParams = { message, link, to };
    return await this.apiRequest('POST', 'me/message', { queryParams });
  }

  public async sendAppRequests(to: string, message: string): Promise<any> {
    const queryParams = { message, to };
    return await this.apiRequest('POST', 'apprequests', { queryParams });
  }

  public async postArticle(link: string, message: string): Promise<any> {
    const queryParams = { message, link };
    return await this.apiRequest('POST', 'me/feed', { queryParams });
  }

  public async getFriends(offset: string, limit: string, fields: Array<string> = []) {
    if (!fields.length) fields = ['id', 'name', 'picture', 'gender'];
    const _fields = fields.join(',');
    const queryParams = { offset, limit, fields: _fields };
    return await this.apiRequest('GET', 'me/friends', { queryParams });
  }

  public async getInvitableFriends(offset: string, limit: string, fields: Array<string> = []) {
    if (!fields.length) fields = ['id', 'name', 'picture', 'gender'];
    const _fields = fields.join(',');
    const queryParams = { offset, limit, fields: _fields };
    return await this.apiRequest('GET', 'me/invitable_friends', { queryParams });
  }

  public async getDetail(fields: Array<string> = []) {
    if (!fields.length) fields = ['id', 'name', 'picture', 'gender', 'birthday'];
    const _fields = fields.join(',');
    const queryParams = { fields: _fields };
    return await this.apiRequest('GET', 'me', { queryParams });
  }
}
