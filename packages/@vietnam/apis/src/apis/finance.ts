'use strict';

import Base from './base';

import { IFinanceCompany } from '../constants';

export default class Finance extends Base {
  public async getListedCompanies(): Promise<Array<IFinanceCompany>> {
    return await this.get('finance/companies');
  }
}
