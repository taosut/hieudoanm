'use strict';

import helper from './helper';

import { ApiRequestOptions, ArticleRequestBody } from './interfaces';

export default class Article {
  private access_token: string;
  private base: string;

  constructor(access_token: string = '', base: string) {
    this.access_token = access_token;
    this.base = `${base}/article`;
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

  public async createArticle(type: string = '', article: ArticleRequestBody): Promise<any> {
    const body = Object.assign(article, { type });
    return await this.apiRequest('POST', 'create', { body });
  }

  public async getArticleId(token: string): Promise<any> {
    return await this.apiRequest('POST', 'verify', { body: { token } });
  }

  public async getArticleDetail(id: string): Promise<any> {
    return await this.apiRequest('GET', `getdetail`, { queryParams: { id } });
  }

  public async getArticles(options: any = {}): Promise<any> {
    const { type = 'normal', offset = 0, limit = 10 } = options;
    const queryParams = { type, offset, limit };
    return await this.apiRequest('GET', `getslice`, { queryParams });
  }

  public async deleteArticle(id: string): Promise<any> {
    return await this.apiRequest('POST', `remove`, { body: { id } });
  }

  public async updateArticle(
    id: string,
    type: string = '',
    article: ArticleRequestBody
  ): Promise<any> {
    const body = Object.assign({ id, type }, article);
    return await this.apiRequest('POST', `update`, { body });
  }
}
