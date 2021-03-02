'use strict';

import Base from './base';

import {
  IAdministrativeDivisionsPostalCode,
  IAdministrativeDivisionsProvince,
  IAdministrativeDivisionsDistrict,
  IAdministrativeDivisionsWard
} from '../constants';

export default class AdministrativeDivisions extends Base {
  private prefix: string = 'administrative-divisions';

  public async getMarcoRegions(): Promise<Array<IAdministrativeDivisionsProvince>> {
    return await this.get(`${this.prefix}/macro-regions`);
  }

  public async getRegions(): Promise<Array<IAdministrativeDivisionsProvince>> {
    return await this.get(`${this.prefix}/regions`);
  }

  public async getPostalCodes(): Promise<Array<IAdministrativeDivisionsPostalCode>> {
    return await this.get(`${this.prefix}/postal-codes`);
  }

  public async getProvinces(): Promise<Array<IAdministrativeDivisionsProvince>> {
    return await this.get(`${this.prefix}/provinces`);
  }

  public async getDistricts(province_id: string): Promise<Array<IAdministrativeDivisionsDistrict>> {
    return await this.get(`${this.prefix}/districts?province_id=${province_id}`);
  }

  public async getWards(
    skip: number = 0,
    limit: number = 100
  ): Promise<Array<IAdministrativeDivisionsWard>> {
    return await this.get(`${this.prefix}/wards?skip=${skip}&limit=${limit}`);
  }
}
