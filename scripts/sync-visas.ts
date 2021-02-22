'use strict';

import { api } from './constant';
import { request, convertJSONtoCSV } from './libs';

export const syncVisas = async () => {
  const url: string = `${api}/visas`;
  const requirements = await request(url);
  const fields: Array<string> = ['country', 'requirement'];
  const path: string = `../docs/visas/visas.csv`;
  await convertJSONtoCSV(requirements, fields, path);
};
