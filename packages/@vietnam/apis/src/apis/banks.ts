'use strict';

import Base from './base';

import { IBank } from '../constants';

export default class Banks extends Base {
  public async getBanks(): Promise<Array<IBank>> {
    return await this.get('banks');
  }

  public async getForexRates(): Promise<Array<any>> {
    const rates: Array<any> = (await this.get(`banks/forex/rates`)) || [];
    return rates;
  }

  public async getForexRatesByBank(id: string = 'vietcombank'): Promise<Array<any>> {
    const rates: Array<any> = (await this.get(`banks/forex/rates/${id}`)) || [];
    return rates;
  }
}
