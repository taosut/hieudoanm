'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('properties', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list customer property definitions', async () => {
    const customerPropertyDefinitions = await helpScoutClient.properties.listCustomerPropertyDefinitions();
    console.log(customerPropertyDefinitions);
    assert.ok(typeof customerPropertyDefinitions === 'object');
  });
});
