'use strict';

import { vietnamAPI } from '../constant';
import { request } from '../libs';

export const syncForexRates = async (): Promise<void> => {
  const url: string = `${vietnamAPI}/banks/forex/sync`;
  const response = await request(url, 'POST');
  console.log('Sync Forex Rates', response);
};
