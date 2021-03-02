'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { ethnicMinorities } from '../src/';

describe('ethnic minorities', () => {
  it('get ethnic minorities', async () => {
    const minorities = await ethnicMinorities.getEthnicMinorities();
    console.log(minorities);
    assert.ok(typeof minorities === 'object' && minorities.length > 0);
  });
});
