'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('users', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list users', async () => {
    const users = await helpScoutClient.users.listUsers();
    console.log(users);
    assert.ok(typeof users === 'object');
  });

  it('get user', async () => {
    const user = await helpScoutClient.users.getUser(273006);
    console.log(user);
    assert.ok(typeof user === 'object');
  });

  it('get resource owner', async () => {
    const owner = await helpScoutClient.users.getResourceOwner();
    console.log(owner);
    assert.ok(typeof owner === 'object');
  });
});
