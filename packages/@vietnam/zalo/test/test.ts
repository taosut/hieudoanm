'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import Zalo from '../src';

describe('Zalo', () => {
  it('set up zalo', async () => {
    const zalo = new Zalo('apiKey');
    console.log(zalo);
    assert.ok(typeof zalo === 'object');
  });
});
