'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import * as assert from 'assert';
import { describe, it } from 'mocha';

import HelpScout from '../src';

describe('teams', () => {
  const helpScoutClient = new HelpScout({
    appId: process.env.HELPSCOUT_APP_ID,
    appSecret: process.env.HELPSCOUT_APP_SECRET
  });

  it('list teams', async () => {
    const teams = await helpScoutClient.teams.listTeams();
    console.log(teams);
    assert.ok(typeof teams === 'object');
  });

  it('list team members', async () => {
    const teamMembers = await helpScoutClient.teams.listTeamMembers(408526);
    console.log(teamMembers);
    assert.ok(typeof teamMembers === 'object');
  });
});
