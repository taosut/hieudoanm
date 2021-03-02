'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

interface ReportOptions {
  start: string;
  end: string;
  previousStart: string;
  previousEnd: string;
  user?: number;
  page?: number;
  rows?: number;
  mailboxes?: Array<number>;
  tags?: Array<number>;
  folders?: Array<number>;
  sites?: Array<string>;
  types?: 'email' | 'chat' | 'phone';
  viewBy?: 'day' | 'week' | 'month';
  range?:
    | 'replies'
    | 'firstReplyResolved'
    | 'resolved'
    | 'responseTime'
    | 'firstResponseTime'
    | 'handleTime';
  rangeId?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  field?: 'tagid' | 'replyid' | 'workflowid' | 'customerid';
  fieldId?: number;
  sortField?:
    | 'number'
    | 'modifiedAt'
    | 'repliesSent'
    | 'rating'
    | 'responseTviewByDescriptionime'
    | 'resolveTime';
  sortOrder?: 'ASC' | 'DESC';
  rating?: 'great' | 'ok' | 'all' | 'not-good';
  officeHours?: boolean;
}

export default class Reports {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/reports`;
  }

  private processQueryParameters(
    options: ReportOptions,
    validParameters: Array<string> = []
  ): string {
    const {
      start,
      end,
      previousStart,
      previousEnd,
      user = '',
      field = '',
      fieldId = '',
      page = 1,
      rows = 25,
      mailboxes: _mailboxes = [],
      tags: _tags = [],
      folders: _folders = [],
      sites: _sites = [],
      types = '',
      viewBy = '',
      range = '',
      rangeId = '',
      sortField = '',
      sortOrder = '',
      rating = '',
      officeHours = false
    } = options;
    const mailboxes: string = _mailboxes.join(',');
    const tags: string = _tags.join(',');
    const folders: string = _folders.join(',');
    const sites: string = _sites.join(',');
    const queryParameters: any = {
      start,
      end,
      previousStart,
      previousEnd,
      user,
      page,
      rows,
      mailboxes,
      tags,
      folders,
      sites,
      types,
      viewBy,
      range,
      rangeId,
      field,
      fieldId,
      sortField,
      sortOrder,
      rating,
      officeHours
    };
    return helper.queryStringify(queryParameters, validParameters);
  }
  /**
   * Company
   */
  public async getCompanyOverallReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/company?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getCompanyCustomersHelpedReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/company/customers-helped?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getCompanyDrilldownReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'range',
      'rangeId',
      'page',
      'rows'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/company/drilldown?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
  /**
   * Conversations
   */
  public async getConversationsOverallReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getConversationsVolumesByAllChannelsReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/volume-by-channel?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getConversationsBusyTimesReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/busy-times?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getConversationsDrilldownReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'page',
      'rows'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/drilldown?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getConversationsDrilldownByFieldReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'field',
      'fieldId',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'page',
      'rows'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/fields-drilldown?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getNewConversationsReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/new?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getNewConversationsDrilldownReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'page',
      'rows'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/new-drilldown?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getConversationsReceivedMessagesStatisticsReport(
    options: ReportOptions
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/conversations/received-messages?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
  /**
   * Docs
   */
  public async getDocsOverallReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'sites'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/docs?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
  /**
   * Happiness
   */
  public async getHappinessOverallReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/happiness?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getHappinessRatingsReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'page',
      'rating',
      'sortField',
      'sortOrder'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/happiness/ratings?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
  /**
   * Productivity
   */
  public async getProductivityOverallReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/productivity?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getProductivityFirstResponseTimeReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/productivity/first-response-time?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getProductivityRepliesSentReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/productivity/replies-sent?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getProductivityResolutionTimeReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/productivity/resolution-time?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getProductivityResolvedReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/productivity/resolved?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getProductivityResponseTimeReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/productivity/response-time?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
  /**
   * User
   */
  public async getUserOverallReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserConversationHistoryReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'officeHours',
      'sortField',
      'sortOrder',
      'page'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/conversation-history?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserCustomersHelpedReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/customers-helped?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserDrilldownReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'page',
      'rows'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/drilldown?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserHappinessReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/happiness?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserHappinessDrilldownReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'page',
      'rating',
      'sortField',
      'sortOrder'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/ratings?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserRepliesReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/replies?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getUserResolutionsReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'user',
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'types',
      'viewBy'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/user/resolutions?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
  /**
   * Basic
   */
  public async getChatReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'officeHours'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/chat?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getEmailReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'officeHours'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/email?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }

  public async getPhoneReport(options: ReportOptions): Promise<any> {
    const { appId, appSecret, base } = this;
    const validParameters: Array<string> = [
      'start',
      'end',
      'previousStart',
      'previousEnd',
      'mailboxes',
      'tags',
      'folders',
      'officeHours'
    ];
    const queryParameters: string = this.processQueryParameters(options, validParameters);
    const url: string = `${base}/phone?${queryParameters}`;
    const method: string = 'GET';
    const report: any = await helper.request({ appId, appSecret }, { url, method });
    return report;
  }
}
