'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { openAPIs } from '../src/';

describe('openAPIs', () => {
  it('get Open APIs', async () => {
    const apis = await openAPIs.getOpenAPIs();
    console.log(apis);
    assert.ok(typeof apis === 'object' && apis.length > 0);
  });
});
