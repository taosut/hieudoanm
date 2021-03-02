'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import Tiki from '../src/';

describe('Tiki', () => {
  it('set up tiki', async () => {
    const tiki = new Tiki('apiKey');
    console.log(tiki);
    assert.ok(typeof tiki === 'object');
  });
});
