'use strict';

import { api } from './constant';
import { request, getTime, addZero } from './libs';

export const syncStockHistory = async () => {
  const { year, month, date, hours, minutes } = getTime(7);
  const dateTime: string = `${year}-${addZero(month)}-${addZero(date)} ${addZero(hours)}:${addZero(
    minutes
  )}`;
  console.log('Sync Stock History', dateTime);
  if (hours === 16) {
    const url: string = `${api}/finance/history/sync`;
    const response = await request(url, 'POST');
    console.log('Sync Stock History', response);
  }
};
