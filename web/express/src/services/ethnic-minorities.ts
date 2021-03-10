'use strict';

import { ethnicMinorities } from '../constants';

export default class EthnicMinoritiesService {
  public async getEthnicMinorities(type_en: string = ''): Promise<Array<any>> {
    return ethnicMinorities.filter(minority =>
      type_en ? minority.type_en.toLowerCase().includes(type_en.toLowerCase()) : true
    );
  }
}
