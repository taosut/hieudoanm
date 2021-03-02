'use strict';

import Base from './base';

import { IVisaRequirement } from '../constants';

export default class Visas extends Base {
  public async getVisaRequirements(): Promise<Array<IVisaRequirement>> {
    return await this.get('visas');
  }
}
