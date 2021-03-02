'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import FPT from '../src';

describe('FPT', () => {
  it('set up fpt', async () => {
    const fpt = new FPT('apiKey');
    console.log(fpt);
    assert.ok(typeof fpt === 'object');
  });
});
