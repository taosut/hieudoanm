'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('mailboxes', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list mailboxes', async () => {
    const mailboxes = await helpScoutClient.mailboxes.listMailboxes();
    console.log(mailboxes);
    assert.ok(typeof mailboxes === 'object');
  });

  it('get mailbox', async () => {
    const mailbox = await helpScoutClient.mailboxes.getMailbox(108683);
    console.log(mailbox);
    assert.ok(typeof mailbox === 'object');
  });

  it('list mailbox fields', async () => {
    const fields = await helpScoutClient.mailboxes.listMailboxCustomFields(108683);
    console.log(fields);
    assert.ok(typeof fields === 'object');
  });

  it('list mailbox folders', async () => {
    const folders = await helpScoutClient.mailboxes.listMailboxFolders(108683);
    console.log(folders);
    assert.ok(typeof folders === 'object');
  });
});
