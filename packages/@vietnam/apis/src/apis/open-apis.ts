'use strict';

import Base from './base';

import { IOpenAPI } from '../constants';

export default class OpenAPIs extends Base {
  public async getOpenAPIs(): Promise<Array<IOpenAPI>> {
    return await this.get('open-apis');
  }
}
