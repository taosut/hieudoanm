'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import helper from '../src/helper';

describe('helper', () => {
  it('get access token', async () => {
    const appId: string = process.env.HELPSCOUT_APP_ID;
    const appSecret: string = process.env.HELPSCOUT_APP_SECRET;

    const accessToken = await helper.getAccessToken({ appId, appSecret });
    console.log('accessToken', accessToken);
    assert.ok(typeof accessToken === 'string');
  });
});
