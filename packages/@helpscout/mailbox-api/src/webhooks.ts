'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

type EventEnum =
  | 'convo.agent.reply.created'
  | 'convo.assigned'
  | 'convo.created'
  | 'convo.customer.reply.created'
  | 'convo.deleted'
  | 'convo.merged'
  | 'convo.moved'
  | 'convo.note.created'
  | 'convo.status'
  | 'convo.tags'
  | 'customer.created'
  | 'customer.updated'
  | 'satisfaction.ratings';
type PayloadVersion = 'V1' | 'V2';

interface WebhookBody {
  url: string;
  events: Array<EventEnum>;
  secret: string;
  payloadVersion: PayloadVersion;
  label: string;
}

export default class Webhooks {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/webhooks`;
  }

  public async listWebhooks(page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}?page=${page}`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { webhooks = [] } = _embedded;
    return webhooks;
  }

  public async getWebhook(webhookId: number): Promise<any> {
    if (!webhookId) return { message: 'Invalid Webhook ID' };
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${webhookId}`;
    const method: string = 'GET';
    const webhook: any = await helper.request({ appId, appSecret }, { url, method });
    return webhook;
  }

  public async createWebhook(body: WebhookBody): Promise<any> {
    const { appId, appSecret, base: url } = this;
    const method: string = 'POST';
    const webhook: any = await helper.request({ appId, appSecret }, { url, method, body });
    return webhook;
  }

  public async updateWebhook(webhookId: number, body: WebhookBody): Promise<any> {
    const { appId, appSecret, base } = this;
    const method: string = 'PUT';
    const url: string = `${base}/${webhookId}`;
    const webhook: any = await helper.request({ appId, appSecret }, { url, method, body });
    return webhook;
  }

  public async deleteWebhook(webhookId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const method: string = 'DELETE';
    const url: string = `${base}/${webhookId}`;
    const webhook: any = await helper.request({ appId, appSecret }, { url, method });
    return webhook;
  }
}
