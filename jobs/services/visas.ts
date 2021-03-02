'use strict';

import { visas } from 'vnapis';

import { convertJSONtoCSV } from '../libs';

export const syncVisas = async (): Promise<void> => {
  const requirements = await visas.getVisaRequirements();
  if (!requirements.length) return;
  const fields: Array<string> = ['country', 'requirement'];
  const path: string = `../docs/visas/visas.csv`;
  await convertJSONtoCSV(requirements, fields, path);
};
