'use strict';

import { api } from '../constant';
import { request, getTime, addZero, convertJSONtoCSV } from '../libs';

const fields: Array<string> = [
  'symbol',
  'name',
  'industry',
  'subsector',
  'group',
  'latest',
  'start',
  'latestDate',
  'startDate',
  'diffToMin',
  'diffToMax',
  'diff',
  'min',
  'minDate',
  'median',
  'average',
  'max',
  'maxDate',
  'low',
  'numberOfDates'
];

export const syncCompanies = async (): Promise<Array<any>> => {
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
  console.log(`Sync Stock - Companies`, companies.length);
  return companies;
};

export const syncPotentials = async (): Promise<void> => {
  const to: number = Date.now();
  const from: number = to - 1000 * 60 * 60 * 24 * 30;
  const url: string = `${api}/finance/potentials`;
  const potentials: Array<string> = await request(url, 'POST', { from, to });
  console.log(`Sync Stock - Potentials - From ${from} - To ${to}`, potentials.length);
  const path: string = '../docs/finance/stock/potentials.csv';
  await convertJSONtoCSV(potentials, fields, path);
};

export const syncHighlights = async (): Promise<void> => {
  const to: number = Date.now();
  const from: number = to - 1000 * 60 * 60 * 24 * 30;
  const url: string = `${api}/finance/highlights`;
  const highlights: Array<string> = await request(url, 'POST', { from, to });
  console.log(`Sync Stock - Highlights - From ${from} - To ${to}`, highlights.length);
  const path: string = '../docs/finance/stock/highlights.csv';
  await convertJSONtoCSV(highlights, fields, path);
};

export const syncHistory = async (companies: Array<any>): Promise<void> => {
  for (const company of companies) {
    const { symbol } = company;
    const url: string = `${api}/finance/history/sync`;
    try {
      const { status = 'ERROR' } = await request(url, 'POST', { symbol });
      console.log('Sync Stock - History', symbol, status);
    } catch (error) {
      console.log('Sync Stock - History error', error);
    }
  }
};

export const syncStock = async (): Promise<void> => {
  const { year, month, date, hours, minutes } = getTime(7);
  const dateTime: string = `${year}-${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(
    minutes
  )}`;
  console.log('Sync Stock', dateTime);
  if (hours === 16) {
    const companies: Array<any> = await syncCompanies();
    await syncHistory(companies);
  } else if (hours > 16) {
    await syncHighlights();
    await syncPotentials();
  }
};
