'use strict';

import { licensePlates, ILicensePlate } from '../constants/license-plates';

export default class LicensePlatesService {
  public getLicensePlates(license: string): Array<ILicensePlate> {
    return licensePlates.filter(plate =>
      license ? plate.license.toString().toLowerCase().includes(license.toLowerCase()) : true
    );
  }
}
