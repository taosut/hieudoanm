'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { finance } from '../src/';

describe('finance', () => {
  it('get listed companies', async () => {
    const listedCompanies = await finance.getListedCompanies();
    console.log(listedCompanies);
    assert.ok(typeof listedCompanies === 'object' && listedCompanies.length > 0);
  });
});
