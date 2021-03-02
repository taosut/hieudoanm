'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('workflows', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list workflows', async () => {
    const workflows = await helpScoutClient.workflows.listWorkflows();
    console.log(workflows);
    assert.ok(typeof workflows === 'object');
  });
});
