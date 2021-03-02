'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('ratings', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('get satisfaction rating', async () => {
    const satisfactionRating = await helpScoutClient.ratings.getSatisfactionRating(1);
    console.log(satisfactionRating);
    assert.ok(typeof satisfactionRating === 'object');
  });
});
