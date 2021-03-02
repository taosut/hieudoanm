'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('webhooks', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list webhooks', async () => {
    const webhooks = await helpScoutClient.webhooks.listWebhooks();
    console.log(webhooks);
    assert.ok(typeof webhooks === 'object');
  });

  it('get webhook', async () => {
    const webhook = await helpScoutClient.webhooks.getWebhook(4900);
    console.log(webhook);
    assert.ok(typeof webhook === 'object');
  });
});
