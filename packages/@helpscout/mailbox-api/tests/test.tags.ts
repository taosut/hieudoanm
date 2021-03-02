'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('tags', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list tags', async () => {
    const tags = await helpScoutClient.tags.listTags();
    console.log(tags);
    assert.ok(typeof tags === 'object');
  });
});
