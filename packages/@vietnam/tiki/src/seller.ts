'use strict';

import { TikiConfigs } from './interfaces';

export default class Seller {
  private base: string = '';
  private apiKey: string = '';

  constructor(configs: TikiConfigs) {
    const { apiKey = '', base = '' } = configs;
    this.apiKey = apiKey;
    this.base = base;
  }

  private apiRequest(
    method: string = '',
    endpoint: string = '',
    body: any = {}
  ): Promise<Array<any>> {
    const self = this;
    const { apiKey = '' } = self;
    const url: string = `${self.base}/${endpoint}`;
    let options = {
      method,
      headers: { 'tiki-api': apiKey, 'Content-Type': 'application/json;charset=UTF-8' }
    };
    options = Object.keys(body).length ? Object.assign(options, { body }) : options;
    return new Promise(resolve => {
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve([]);
        });
    });
  }
  /**
   * Me
   */
  public async getMe(): Promise<any> {
    return await this.apiRequest('GET', `sellers/me`);
  }

  public async updatePermissions(can_update_product: number): Promise<any> {
    const body = { can_update_product };
    return await this.apiRequest('POST', `sellers/me/updateCanUpdateProduct`, body);
  }
}
