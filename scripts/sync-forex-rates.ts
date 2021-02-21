'use strict';

import { request } from './libs';

export const syncForexRates = async () => {
  const url: string = 'https://vietnamdb.herokuapp.com/api/banks/forex/sync';
  const response = await request(url, 'POST');
  console.log('Sync Forex Rates', response);
};
