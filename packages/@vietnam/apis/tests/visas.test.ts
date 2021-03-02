'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { visas } from '../src/';

describe('sports', () => {
  it('get visa requirements', async () => {
    const requirements = await visas.getVisaRequirements();
    console.log(requirements);
    assert.ok(typeof requirements === 'object' && requirements.length > 0);
  });
});
