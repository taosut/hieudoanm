'use strict';

import Base from '../helper/base';
import {
  apis,
  IEndpoint,
  IResponse,
  IPagination,
  IStore,
  IStoreDeliveryAgainResponse,
  IStoreCreateResponse,
  IStoreClientResponse
} from '../helper/constants';

export default class Store extends Base {
  constructor(token: string, test: boolean) {
    super(token, test);
  }

  public async getStores(
    client_phone: string,
    pagination: IPagination
  ): Promise<Array<IStore> | any> {
    const endpoint: IEndpoint = apis.store.getStores;
    const { offset = 0, limit = 1000 } = pagination;
    const query = { client_phone, offset, limit };
    const response: IResponse = await this.fetch(endpoint, { query });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    const { shops = [] } = data;
    return shops;
  }

  public async createStore(
    district_id: number,
    ward_code: string,
    store: IStore
  ): Promise<IStoreCreateResponse> {
    const endpoint: IEndpoint = apis.store.createStore;
    const { name, phone, address } = store;
    const query = { district_id, ward_code, name, phone, address };
    const response: IResponse = await this.fetch(endpoint, { query });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }

  public async addStaff(shop_id: number, username: string): Promise<IStoreClientResponse> {
    const endpoint: IEndpoint = apis.store.addStaff;
    const response: IResponse = await this.fetch(endpoint, { body: { shop_id, username } });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }

  public async deliverAgain(
    shop_id: number,
    order_codes: Array<string>
  ): Promise<Array<IStoreDeliveryAgainResponse> | any> {
    const endpoint: IEndpoint = apis.store.deliverAgain;
    const response: IResponse = await this.fetch(endpoint, { body: { shop_id, order_codes } });
    let { code = 0, message = '', data = [] } = response;
    if (code !== 200) return { message };
    data = data || [];
    return data;
  }
}
