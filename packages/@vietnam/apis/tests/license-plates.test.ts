'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { licensePlates } from '../src/';

describe('license plates', () => {
  it('get license plates', async () => {
    const plates = await licensePlates.getLicensePlates();
    console.log(plates);
    assert.ok(typeof plates === 'object' && plates.length > 0);
  });
});
