'use strict';

import { api } from './constant';
import { request, getTime, addZero, convertJSONtoCSV } from './libs';

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

export const syncPotentials = async () => {
  const to: number = Date.now();
  const from: number = to - 1000 * 60 * 60 * 24 * 30;
  const url: string = `${api}/finance/potentials`;
  const potentials: Array<string> = await request(url, 'POST', { from, to });
  const path: string = '../docs/finance/stock/potentials.csv';
  await convertJSONtoCSV(potentials, fields, path);
};

export const syncHighlights = async () => {
  const to: number = Date.now();
  const from: number = to - 1000 * 60 * 60 * 24 * 30;
  const url: string = `${api}/finance/highlights`;
  const highlights: Array<string> = await request(url, 'POST', { from, to });
  const path: string = '../docs/finance/stock/highlights.csv';
  await convertJSONtoCSV(highlights, fields, path);
};

export const syncHistory = async () => {
  const url: string = `${api}/finance/history/sync`;
  const response = await request(url, 'POST');
  console.log('Sync Stock - History', response);
};

export const syncStock = async () => {
  const { year, month, date, hours, minutes } = getTime(7);
  const dateTime: string = `${year}-${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(
    minutes
  )}`;
  console.log('Sync Stock', dateTime);
  if (hours === 16) {
    await syncHistory();
    await syncHighlights();
    await syncPotentials();
  }
};
