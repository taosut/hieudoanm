'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

interface UpdateRequestOptions {
  op: 'replace' | 'remove';
  path: string;
  value: string;
}

export default class Properties {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = base;
  }

  public async listCustomerPropertyDefinitions(): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    const method = 'GET';
    const url = `${base}/customer-properties`;
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const customerProperties = _embedded['customer-properties'] || [];
    return customerProperties;
  }

  public async updateCustomerProperties(customerId: number, body: Array<UpdateRequestOptions>): Promise<any> {
    const { appId, appSecret, base } = this;
    const method = 'PATCH';
    const url = `${base}/customers/${customerId}/properties`;
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }
}
