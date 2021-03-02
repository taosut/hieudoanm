'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import { phones } from '../src/';

describe('phones', () => {
  it('get providers', async () => {
    const providers = await phones.getProviders();
    console.log(providers);
    assert.ok(typeof providers === 'object' && providers.length > 0);
  });

  it('get prefixes', async () => {
    const prefixes = await phones.getPrefixes();
    console.log(prefixes);
    assert.ok(typeof prefixes === 'object' && prefixes.length > 0);
  });

  it('get provider from phone number', async () => {
    const provider: string = await phones.getProviderFromPhoneNumber('+84 (0) 908070605');
    console.log('provider', provider);
    assert.ok(provider === 'Mobifone');
  });
});
