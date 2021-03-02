'use strict';

import {
  TikiConfigs,
  OrderQueryParams,
  OrderItemsInfo,
  OrderDeliveryStatus,
  OrderData
} from './interfaces';

import helper from './helper';

export default class Order {
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
   * Orders
   */
  public async getOrders(queryParams: OrderQueryParams): Promise<any> {
    const queryParamsString = helper.convertObjectToQueryString(queryParams);
    return await this.apiRequest('GET', `orders?${queryParamsString}`);
  }

  public async getOrder(order_code: string): Promise<any> {
    return await this.apiRequest('GET', `orders/${order_code}`);
  }

  public async confirmItems(data: OrderItemsInfo): Promise<any> {
    return await this.apiRequest('POST', `orders/confirmItems`, data);
  }

  public async updateDeliveryStatus(data: OrderDeliveryStatus): Promise<any> {
    return await this.apiRequest('POST', `orders/updateDeliveryStatus`, data);
  }

  public async getOrderShippingLabel(order_code: string): Promise<any> {
    return await this.apiRequest('GET', `orders/${order_code}/print`);
  }

  public async getOrderPOLabel(order_code: string): Promise<any> {
    return await this.apiRequest('GET', `orders/${order_code}/PO`);
  }

  public async createMockOrder(data: OrderData): Promise<any> {
    return await this.apiRequest('POST', 'orders', data);
  }

  public async updateMockOrderStatus(order_code: string, status: string): Promise<any> {
    return await this.apiRequest('POST', `orders/${order_code}/updateStatus`, { status });
  }
  /**
   * Warehouses
   */
  public async getWarehouses(): Promise<any> {
    return await this.apiRequest('GET', `warehouses`);
  }
}
