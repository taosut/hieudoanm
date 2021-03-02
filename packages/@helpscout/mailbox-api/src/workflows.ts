'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

type StatusValues = 'active' | 'inactive';

export default class Workflows {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/workflows`;
  }

  public async listWorkflows(page: number = 1): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}?page=${page}`;
    const method: string = 'GET';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { workflows = [] } = _embedded;
    return workflows;
  }

  public async updateWorkflowStatus(workflowId: number, status: StatusValues): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${workflowId}`;
    const method: string = 'PATCH';
    const body: any = { op: 'replace', path: '/status', value: status };
    const res: any = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async runManualWorkflows(
    workflowId: number,
    conversationIds: Array<number>
  ): Promise<Array<any>> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${workflowId}/run`;
    const method: string = 'POST';
    const body: any = { conversationIds };
    const res: any = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }
}
