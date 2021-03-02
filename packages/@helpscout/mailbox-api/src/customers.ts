'use strict';

import { HelpScoutModuleOptions } from './interfaces';
import helper from './helper';

interface CustomerAddressBody {
  city: string;
  state: string;
  postalCode: string;
  country: string;
  lines?: Array<string>;
}

type ChatHandleTypeEnum =
  | 'aim'
  | 'gtalk'
  | 'icq'
  | 'msn'
  | 'aim'
  | 'other'
  | 'qq'
  | 'skype'
  | 'xmpp'
  | 'yahoo';

interface CustomerChatHandleBody {
  type: ChatHandleTypeEnum;
  value: string;
}

type EmailTypeEnum = 'home' | 'other' | 'work';

interface CustomerEmailBody {
  type: EmailTypeEnum;
  value: string;
}

type PhoneTypeEnum = 'home' | 'other' | 'work' | 'mobile' | 'fax' | 'pager';

interface CustomerPhoneBody {
  type: PhoneTypeEnum;
  value: string;
}

type SocialProfileTypeEnum =
  | 'aboutme'
  | 'facebook'
  | 'flickr'
  | 'forsquare'
  | 'google'
  | 'googleplus'
  | 'linkedin'
  | 'other'
  | 'quora'
  | 'tungleme'
  | 'twitter'
  | 'youtube';

interface CustomerSocialProfileBody {
  type: SocialProfileTypeEnum;
  value: string;
}

export default class Customers {
  private appId: string;
  private appSecret: string;
  private base: string;

  constructor(options: HelpScoutModuleOptions) {
    const { appId, appSecret, base } = options;

    this.appId = appId;
    this.appSecret = appSecret;
    this.base = `${base}/customers`;
  }
  /**
   * CRUD
   */

  /**
   * Addresses
   */
  public async getCustomerAddress(customerId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/address`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }

  public async createCustomerAddress(customerId: number, body: CustomerAddressBody): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/address`;
    const method: string = 'POST';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async updateCustomerAddress(customerId: number, body: CustomerAddressBody): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/address`;
    const method: string = 'PUT';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async deleteCustomerAddress(customerId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/address`;
    const method: string = 'DELETE';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Chat Handles
   */
  public async listCustomerChatHandles(customerId: number, page: number = 1): Promise<any> {
    const { appId, appSecret, base } = this;
    if (page < 1) page = 1;
    const url: string = `${base}/${customerId}/chats?page=${page}`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { chats } = _embedded;
    return chats;
  }

  public async createCustomerChatHandle(
    customerId: number,
    body: CustomerChatHandleBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/chats`;
    const method: string = 'POST';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async updateCustomerChatHandle(
    customerId: number,
    chatId: number,
    body: CustomerChatHandleBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;

    const url: string = `${base}/${customerId}/chats/${chatId}`;
    const method: string = 'PUT';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async deleteCustomerChatHandle(customerId: number, chatId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/chats/${chatId}`;
    const method: string = 'DELETE';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Emails
   */
  public async listCustomerEmails(customerId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/emails`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { emails } = _embedded;
    return emails;
  }

  public async createCustomerEmail(customerId: number, body: CustomerEmailBody): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/emails`;
    const method: string = 'POST';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async updateCustomerEmail(
    customerId: number,
    emailId: number,
    body: CustomerEmailBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/emails/${emailId}`;
    const method: string = 'PUT';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async deleteCustomerEmail(customerId: number, emailId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/emails/${emailId}`;
    const method: string = 'DELETE';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Phones
   */
  public async listCustomerPhones(customerId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/phones`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { phones } = _embedded;
    return phones;
  }

  public async createCustomerPhone(customerId: number, body: CustomerPhoneBody): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/phones`;
    const method: string = 'POST';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async updateCustomerPhone(
    customerId: number,
    phoneId: number,
    body: CustomerPhoneBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/phones/${phoneId}`;
    const method: string = 'PUT';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async deleteCustomerPhone(customerId: number, phoneId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/phones/${phoneId}`;
    const method: string = 'DELETE';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Social Profiles
   */
  public async listCustomerSocialProfiles(customerId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/social-profiles`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const socialProfiles = _embedded['social-profiles'] || [];
    return socialProfiles;
  }

  public async createCustomerSocialProfile(
    customerId: number,
    body: CustomerSocialProfileBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/social-profiles`;
    const method: string = 'POST';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async updateCustomerSocialProfile(
    customerId: number,
    socialProfileId: number,
    body: CustomerSocialProfileBody
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/social-profiles/${socialProfileId}`;
    const method: string = 'PUT';
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async deleteCustomerSocialProfile(
    customerId: number,
    socialProfileId: number
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/social-profiles/${socialProfileId}`;
    const method: string = 'DELETE';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
  /**
   * Websites
   */
  public async listCustomerWebsites(customerId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/websites`;
    const method: string = 'GET';
    const res = await helper.request({ appId, appSecret }, { url, method });
    const { _embedded = {} } = res;
    const { websites } = _embedded;
    return websites;
  }

  public async createCustomerWebsite(customerId: number, value: string): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/websites`;
    const method: string = 'POST';
    const body: any = { value };
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async updateCustomerWebsite(
    customerId: number,
    websiteId: number,
    value: string
  ): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/websites/${websiteId}`;
    const method: string = 'PUT';
    const body: any = { value };
    const res = await helper.request({ appId, appSecret }, { url, method, body });
    return res;
  }

  public async deleteCustomerWebsite(customerId: number, websiteId: number): Promise<any> {
    const { appId, appSecret, base } = this;
    const url: string = `${base}/${customerId}/websites/${websiteId}`;
    const method: string = 'DELETE';
    const res = await helper.request({ appId, appSecret }, { url, method });
    return res;
  }
}
