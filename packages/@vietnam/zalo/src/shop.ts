'use strict';

import helper from './helper';

import { ApiRequestOptions, CategoryRequestBody } from './interfaces';

export default class Shop {
  private access_token: string;
  private base: string;

  constructor(access_token: string = '', base: string) {
    this.access_token = access_token;
    this.base = `${base}/store`;
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
  /**
   * Attribute (Type)
   */
  public async createAttributeType(name: string): Promise<any> {
    return await this.apiRequest('POST', 'product/createattributetype', { body: { name } });
  }

  public async getAttributeTypes(name: string): Promise<any> {
    return await this.apiRequest('GET', 'product/getsliceattributetype');
  }

  public async createAttribute(name: string, type: string): Promise<any> {
    return await this.apiRequest('POST', 'product/createattributetype', { body: { name, type } });
  }

  public async getAttributes(options: any = {}): Promise<any> {
    const { offset = 0, limit = 10 } = options;
    const queryParams = { offset, limit };
    return await this.apiRequest('GET', 'product/getsliceattribute', { queryParams });
  }

  public async getAttribute(id: string): Promise<any> {
    return await this.apiRequest('GET', 'product/getattribute', { queryParams: { id } });
  }
  /**
   * Industry
   */
  public async getIndustries(): Promise<any> {
    return await this.apiRequest('GET', 'getindustry');
  }
  /**
   * Category
   */
  public async getCategories(options: any = {}): Promise<any> {
    const { offset = 0, limit = 10 } = options;
    const queryParams = { offset, limit };
    return await this.apiRequest('GET', 'category/getcategoryofoa', { queryParams });
  }

  public async createCategory(category: CategoryRequestBody): Promise<any> {
    return await this.apiRequest('GET', 'category/create', { body: category });
  }

  public async updateCategory(id: string, category: CategoryRequestBody): Promise<any> {
    const body = Object.assign({ id }, category);
    return await this.apiRequest('GET', 'category/create', { body });
  }
}
