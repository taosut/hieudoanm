'use strict';

import Base from './helper/base';
import {
  apis,
  IOptions,
  IEndpoint,
  IToken,
  IResponse,
  IOrderCreateRequest,
  IOrderCreateResponse,
  IShopAddRequest,
  IXFastRequest,
  IProduct,
  IAddressRequest,
  IAddressPick,
  IOrderCancelResponse,
  IOrderGetResponse,
  IOrderEstimateFeeRequest,
  IOrderEstimateFeeResponse
} from './helper/constants';

export default class GHTK extends Base {
  constructor(token: string, options: IOptions) {
    const { sandbox = false } = options;
    super(token, sandbox);
  }

  public async createOrder(body: IOrderCreateRequest): Promise<IOrderCreateResponse> {
    const endpoint: IEndpoint = apis.createOrder;
    const response: IResponse = await this.fetch(endpoint, { body });
    const { success = false, message = '', order = {} } = response;
    if (!success) return { message };
    return order;
  }

  public async estimateFee(query: IOrderEstimateFeeRequest): Promise<IOrderEstimateFeeResponse> {
    const endpoint: IEndpoint = apis.estimateFee;
    const response: IResponse = await this.fetch(endpoint, { query });
    const { success = false, message = '', data = {} } = response;
    if (!success) return { message };
    return data;
  }

  public async getOrder(code: string): Promise<IOrderGetResponse> {
    const endpoint: IEndpoint = apis.getOrder;
    endpoint.production = `${apis.getOrder.production}/${code}`;
    endpoint.sandbox = `${apis.getOrder.sandbox}/${code}`;
    const response: IResponse = await this.fetch(endpoint);
    const { success = false, message = '', data = {} } = response;
    if (!success) return { message };
    return data;
  }

  public async cancelOrder(code: string): Promise<IOrderCancelResponse> {
    const endpoint: IEndpoint = apis.cancelOrder;
    endpoint.production = `${apis.cancelOrder.production}/${code}`;
    endpoint.sandbox = `${apis.cancelOrder.sandbox}/${code}`;
    const response: IResponse = await this.fetch(endpoint);
    const { success = false, message = '' } = response;
    if (!success) return { message };
    return { message };
  }

  public async printOrder(code: string): Promise<any> {
    const endpoint: IEndpoint = apis.printOrder;
    endpoint.production = `${apis.printOrder.production}/${code}`;
    endpoint.sandbox = `${apis.printOrder.sandbox}/${code}`;
    const response: IResponse = await this.fetch(endpoint);
    const { success = false, message = '', data = [] } = response;
    if (!success) return { message };
    return data;
  }

  public async getPickUpAddresses(): Promise<Array<IAddressPick> | any> {
    const endpoint: IEndpoint = apis.getPickUpAddresses;
    const response: IResponse = await this.fetch(endpoint);
    const { success = false, message = '', data = [] } = response;
    if (!success) return { message };
    return data;
  }

  public async getLevel4Addresses(query: IAddressRequest): Promise<Array<string> | any> {
    const endpoint: IEndpoint = apis.getLevel4Addresses;
    const response: IResponse = await this.fetch(endpoint, { query });
    const { success = false, message = '', data = [] } = response;
    if (!success) return { message };
    return data;
  }

  public async getProducts(term: string): Promise<Array<IProduct> | any> {
    const endpoint: IEndpoint = apis.getProducts;
    const response: IResponse = await this.fetch(endpoint, { query: { term } });
    const { success = false, message = '', data = [] } = response;
    if (!success) return { message };
    return data;
  }

  public async getXFastServices(query: IXFastRequest): Promise<any> {
    const endpoint: IEndpoint = apis.getXFastServices;
    const response: IResponse = await this.fetch(endpoint, { query });
    const { success = false, message = '', data = {} } = response;
    if (!success) return { message };
    return data;
  }

  public async addShop(query: IShopAddRequest): Promise<IToken> {
    const endpoint: IEndpoint = apis.addShop;
    const response: IResponse = await this.fetch(endpoint, { query });
    const { success = false, message = '', data = {} } = response;
    if (!success) return { message };
    return data;
  }

  public async getShopToken(email: string, password: string): Promise<IToken> {
    const endpoint: IEndpoint = apis.getShopToken;
    const response: IResponse = await this.fetch(endpoint, { body: { email, password } });
    const { success = false, message = '', data = {} } = response;
    if (!success) return { message };
    return data;
  }
}
