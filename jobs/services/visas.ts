'use strict';

import { api } from '../constant';
import { request, convertJSONtoCSV } from '../libs';

export const syncVisas = async (): Promise<void> => {
  const url: string = `${api}/visas`;
  const requirements = await request(url);
  if (!requirements.length) return;
  const fields: Array<string> = ['country', 'requirement'];
  const path: string = `../docs/visas/visas.csv`;
  await convertJSONtoCSV(requirements, fields, path);
};
