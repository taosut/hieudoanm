'use strict';

import { request, getTime, addZero } from './libs';

export const syncStockHistory = async () => {
  const { year, month, date, hours, minutes } = getTime(7);
  const dateTime: string = `${year}-${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(minutes)}`;
  console.log('syncStockHistory', dateTime);
  if (hours === 16) {
    const url: string = 'https://vietnamdb.herokuapp.com/api/finance/history/sync';
    const response = await request(url, 'POST');
    console.log('syncStockHistory', response);
  }
};
