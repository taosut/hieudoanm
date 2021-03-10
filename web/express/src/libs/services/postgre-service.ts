'use strict';

import { postgreClient } from '../../libs';

export default class PostgreService {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public async find(
    filterQuery: Record<string, any> = {},
    fields: Array<string> = []
  ): Promise<Array<any>> {
    const { tableName } = this;
    const rows: any = await postgreClient.find(tableName, filterQuery, fields);
    return rows;
  }
}
