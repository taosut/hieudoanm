'use strict';

import Base from '../helper/base';
import {
  apis,
  IEndpoint,
  IService,
  IResponse,
  IServiceCalculateFeeRequest,
  IServiceCalculateFeeResponse,
  IServiceCalculateTimeRequest,
  IServiceCalculateTimeResponse
} from '../helper/constants';

export default class Service extends Base {
  constructor(token: string, test: boolean) {
    super(token, test);
  }

  public async getServices(
    shop_id: number,
    from_district: number,
    to_district: number
  ): Promise<Array<IService> | any> {
    const endpoint: IEndpoint = apis.service.getServices;
    const query = { shop_id, from_district, to_district };
    const response: IResponse = await this.fetch(endpoint, { query });
    let { code = 0, message = '', data = [] } = response;
    if (code !== 200) return { message };
    data = data || [];
    const services = data.map(item => {
      const { service_id, short_name, service_type_id } = item;
      return { service_id, short_name, service_type_id };
    });
    return services;
  }

  public async calculateFee(
    shop_id: number,
    location: IServiceCalculateFeeRequest
  ): Promise<IServiceCalculateFeeResponse | any> {
    const endpoint: IEndpoint = apis.service.calculateFee;
    const body = Object.assign({ shop_id }, location);
    const response: IResponse = await this.fetch(endpoint, { body });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }

  public async calculateExpectedDeliveryTime(
    shop_id: number,
    location: IServiceCalculateTimeRequest
  ): Promise<IServiceCalculateTimeResponse> {
    const endpoint: IEndpoint = apis.service.calculateExpectedDeliveryTime;
    const body = Object.assign({ shop_id }, location);
    const response: IResponse = await this.fetch(endpoint, { body });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }
}
