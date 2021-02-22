'use strict';

import fs from 'fs';

import { api } from './constant';
import { request, convertJSONtoCSV } from './libs';

export const syncCompanies = async () => {
  const url: string = `${api}/finance/companies`;
  const companies = await request(url);
  const fields: Array<string> = [
    'symbol',
    'industry',
    'market',
    'name',
    'sector',
    'subsector',
    'supersector',
    'group',
    'listingDate'
  ];
  const path: string = `../docs/finance/companies.csv`;
  await convertJSONtoCSV(companies, fields, path);
};
