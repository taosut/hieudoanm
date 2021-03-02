'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

type OpEnum = 'add' | 'move' | 'remove' | 'replace';
type PathEnum =
  | '/assignTo'
  | '/draft'
  | '/mailboxId'
  | '/primaryCustomer.id'
  | '/status'
  | '/subject'
  | '/hidden'
  | '/text';

interface ConversationUpdateBody {
  op: OpEnum;
  path: PathEnum;
  value?: string | number | boolean;
}

interface CustomField {
  id: number;
  value: string;
}

interface AttachmentBody {
  fileName: string;
  mimeType: string;
  data: string;
}

export default class Conversations {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/conversations`;
  }
  /**
   * CRUD
   */
  public async updateConversation(
    conversationId: number,
    body: ConversationUpdateBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}`;
    const method: string = 'PATCH';
    const res: any = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public changeConversationSubject(conversationId: number, subject: string): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/subject';
    const body: ConversationUpdateBody = { op, path, value: subject };
    return this.updateConversation(conversationId, body);
  }

  public changeConversationCustomer(conversationId: number, customerId: number): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/primaryCustomer.id';
    const body: ConversationUpdateBody = { op, path, value: customerId };
    return this.updateConversation(conversationId, body);
  }

  public publishConversationDraft(conversationId: number): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/draft';
    const body: ConversationUpdateBody = { op, path, value: true };
    return this.updateConversation(conversationId, body);
  }

  public moveConversationToMailbox(conversationId: number, mailboxId: number): Promise<any> {
    const op: OpEnum = 'move';
    const path: PathEnum = '/mailboxId';
    const body: ConversationUpdateBody = { op, path, value: mailboxId };
    return this.updateConversation(conversationId, body);
  }

  public changeConversationStatus(conversationId: number, status: string): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/status';
    const body: ConversationUpdateBody = { op, path, value: status };
    return this.updateConversation(conversationId, body);
  }

  public assignConversationToUser(conversationId: number, userId: number): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/assignTo';
    const body: ConversationUpdateBody = { op, path, value: userId };
    return this.updateConversation(conversationId, body);
  }

  public unassignConversation(conversationId: number): Promise<any> {
    const op: OpEnum = 'remove';
    const path: PathEnum = '/assignTo';
    const body: ConversationUpdateBody = { op, path };
    return this.updateConversation(conversationId, body);
  }

  public async deleteConversation(conversationId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}`;
    const method: string = 'DELETE';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Attachments
   */
  public async getConversationAttachmentData(
    conversationId: number,
    attachmentId: number
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}/attachments/${attachmentId}/data`;
    const method: string = 'GET';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }

  public async uploadAttachmentToConversation(
    conversationId: number,
    threadId: number,
    attachment: AttachmentBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}/threads/${threadId}/attachments`;
    const method: string = 'POST';
    const res: any = await helper.request({ appId, appSecret }, { url, method, body: attachment });
    return res;
  }

  public async deleteConversationAttachment(
    conversationId: number,
    attachmentId: number
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}/attachments/${attachmentId}`;
    const method: string = 'DELETE';
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Custom Fields
   */
  public async updateConversationCustomFields(
    conversationId: number,
    fields: Array<CustomField>
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}/fields`;
    const method: string = 'PUT';
    const body: any = { fields };
    const res: any = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }
  /**
   * Tags
   */
  public async updateConversationTags(conversationId: number, tags: Array<string>): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${conversationId}/tags`;
    const method: string = 'PUT';
    const body: any = { tags };
    const res: any = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }
  /**
   * Threads
   */
  public async listConversationThreads(conversationId: number, page: number = 1): Promise<any> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const method: string = 'GET';
    const url: string = `${base}/${conversationId}/threads?page=${page}`;
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }

  public async getConversationThreadOriginalSource(
    conversationId: number,
    threadId: number
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const method: string = 'GET';
    const url: string = `${base}/${conversationId}/threads/${threadId}/original-source`;
    const res: any = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }

  public async updateConversationThread(
    conversationId: number,
    threadId: number,
    body: ConversationUpdateBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const method: string = 'GET';
    const url: string = `${base}/${conversationId}/threads/${threadId}/original-source`;
    const res: any = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async changeConversationThreadText(
    conversationId: number,
    threadId: number,
    text: string
  ): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/text';
    const body = { op, path, value: text };
    const res: any = await this.updateConversationThread(conversationId, threadId, body);
    return res;
  }

  private async changeConversationThreadVisibility(
    conversationId: number,
    threadId: number,
    value: boolean
  ): Promise<any> {
    const op: OpEnum = 'replace';
    const path: PathEnum = '/hidden';
    const body = { op, path, value };
    const res: any = await this.updateConversationThread(conversationId, threadId, body);
    return res;
  }

  public async hideConversationThread(conversationId: number, threadId: number): Promise<any> {
    return this.changeConversationThreadVisibility(conversationId, threadId, true);
  }

  public async unhideConversationThread(conversationId: number, threadId: number): Promise<any> {
    return this.changeConversationThreadVisibility(conversationId, threadId, false);
  }
}
