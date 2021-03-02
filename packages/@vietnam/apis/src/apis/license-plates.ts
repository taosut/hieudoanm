'use strict';

import Base from './base';

import { ILicensePlate } from '../constants';

export default class LicensePlates extends Base {
  public async getLicensePlates(): Promise<Array<ILicensePlate>> {
    return await this.get('license-plates');
  }
}
