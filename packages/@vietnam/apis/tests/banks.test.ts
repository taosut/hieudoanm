'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { banks } from '../src/';

describe('banks', () => {
  it('get banks', async () => {
    const _banks = await banks.getBanks();
    console.log(_banks);
    assert.ok(typeof _banks === 'object' && _banks.length > 0);
  });

  it('get forex bank id', async () => {
    const ids: Array<string> = await banks.getForexBanks();
    console.log(ids);
    assert.ok(typeof ids === 'object' && ids.length > 0);
  });

  it('get forex rates', async () => {
    const rates: Array<any> = await banks.getForexRates();
    console.log(rates);
    assert.ok(typeof rates === 'object' && rates.length > 0);
  });

  it('get forex rates by bank', async () => {
    const bankId: string = 'vietcombank';
    const rates: Array<any> = await banks.getForexRatesByBank(bankId);
    console.log(rates);
    assert.ok(typeof rates === 'object' && rates.length > 0);
  });
});
