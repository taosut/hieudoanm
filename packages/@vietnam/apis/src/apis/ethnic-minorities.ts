'use strict';

import Base from './base';

import { IEthnicMinority } from '../constants';

export default class EthnicMinorities extends Base {
  public async getEthnicMinorities(): Promise<Array<IEthnicMinority>> {
    return await this.get('ethnic-minorities');
  }
}
