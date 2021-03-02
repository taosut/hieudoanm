'use strict';

import Conversations from './conversations';
import Customers from './customers';
import Mailboxes from './mailboxes';
import Properties from './properties';
import Ratings from './ratings';
import Reports from './reports';
import Tags from './tags';
import Teams from './teams';
import Users from './users';
import Webhooks from './webhooks';
import Workflows from './workflows';

import { HelpScoutAppOptions } from './interfaces';

export default class HelpScout {
  private base: string = 'https://api.helpscout.net/v2';

  public conversations: Conversations;
  public customers: Customers;
  public mailboxes: Mailboxes;
  public properties: Properties;
  public ratings: Ratings;
  public reports: Reports;
  public tags: Tags;
  public teams: Teams;
  public users: Users;
  public webhooks: Webhooks;
  public workflows: Workflows;

  constructor(options: HelpScoutAppOptions) {
    const { appId, appSecret } = options;
    const { base } = this;

    this.conversations = new Conversations({ appId, appSecret, base });
    this.customers = new Customers({ appId, appSecret, base });
    this.mailboxes = new Mailboxes({ appId, appSecret, base });
    this.properties = new Properties({ appId, appSecret, base });
    this.ratings = new Ratings({ appId, appSecret, base });
    this.reports = new Reports({ appId, appSecret, base });
    this.tags = new Tags({ appId, appSecret, base });
    this.teams = new Teams({ appId, appSecret, base });
    this.users = new Users({ appId, appSecret, base });
    this.webhooks = new Webhooks({ appId, appSecret, base });
    this.workflows = new Workflows({ appId, appSecret, base });
  }
}
