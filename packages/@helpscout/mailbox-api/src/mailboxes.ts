'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

export default class Mailboxes {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/mailboxes`;
  }

  public async listMailboxes(page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}?page=${page}`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { mailboxes = [] } = _embedded;
    return mailboxes;
  }

  public async getMailbox(mailboxId: number): Promise<any> {
    if (!mailboxId) return { message: 'Invalid Mailbox ID' };
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${mailboxId}`;
    const method: string = 'GET';
    const mailbox = await helper.request({ appId, appSecret }, { url, method });
    return mailbox;
  }

  public async listMailboxCustomFields(mailboxId: number, page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}/${mailboxId}/fields?page=${page}`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { fields = [] } = _embedded;
    return fields;
  }

  public async listMailboxFolders(mailboxId: number, page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}/${mailboxId}/folders?page=${page}`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { folders = [] } = _embedded;
    return folders;
  }
}
