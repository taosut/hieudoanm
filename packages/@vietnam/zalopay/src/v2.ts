'use strict';

import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';

import { ConfigsV2, TransactionV2, RequestBody } from './interfaces';

export default class V2 {
  private base: string = '';
  private test: boolean = false;
  private currency: string = 'VND';

  private app_id: string = '';
  private key1: string = '';
  private key2: string = '';

  private order_types = ['GOODS', 'TRANSPORTATION', 'HOTEL', 'FOOD', 'TELCARD', 'BILLING'];
  private product_codes = ['ESCROW', 'QR', 'DIRECT', 'AGREEMENT'];

  constructor(configs: ConfigsV2) {
    this.app_id = configs.app_id;
    this.key1 = configs.key1;
    this.key2 = configs.key2;

    const { test = false } = configs;
    const testBase: string = 'https://sb-openapi.zalopay.vn/v2';
    const prodBase: string = 'https://openapi.zalopay.vn/v2';
    this.test = test;
    this.base = test ? testBase : prodBase;
  }

  public async getListMerchantBanks() {
    const self = this;
    const { test = false, app_id = '', key1 = '' } = self;
    const testBase: string = 'https://sbgateway.zalopay.vn/api/getlistmerchantbanks';
    const prodBase: string = 'https://gateway.zalopay.vn/api/getlistmerchantbanks';
    const url: string = test ? testBase : prodBase;

    const reqtime = Date.now();
    let params = { appid: app_id, reqtime };
    const data = [app_id, reqtime].join('|');
    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    params = Object.assign(params, { mac });

    return new Promise(resolve => {
      axios
        .get(url, { params })
        .then(res => {
          const { data = {} } = res;
          const { banks = {} } = data;
          const keys = Object.keys(banks);
          let list = [];
          for (const key of keys) {
            console.log(banks[key]);
            list = list.concat(banks[key]);
          }
          console.log(list);
          resolve(list);
        })
        .catch(error => {
          const { response = {} } = error;
          const { data = {} } = response;
          resolve(data);
        });
    });
  }

  public async getRefundStatus(m_refund_id: string): Promise<any> {
    const self = this;
    const { base = '', app_id = '', key1 = '' } = self;
    const url: string = `${base}/query_refund`;
    const timestamp = Date.now().toString();

    const data = [app_id, m_refund_id, timestamp].join('|');
    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();

    const params = new URLSearchParams();
    params.append('app_id', app_id);
    params.append('m_refund_id', m_refund_id);
    params.append('timestamp', timestamp);
    params.append('mac', mac);

    return new Promise(resolve => {
      axios
        .post(url, params)
        .then(res => resolve(res.data))
        .catch(error => {
          const { response = {} } = error;
          const { data = {} } = response;
          resolve(data);
        });
    });
  }

  public async refund(
    zp_trans_id: string,
    amount: number = 0,
    description: string = ''
  ): Promise<any> {
    const self = this;
    const { base = '', app_id = '', key1 = '' } = self;
    const url: string = `${base}/refund`;

    const timestamp = Date.now();
    const uid = self.generateOTP(10);
    const m_refund_id = `${moment().format('YYMMDD')}_${app_id}_${uid}`;

    let params = { app_id, zp_trans_id, amount, description, timestamp, m_refund_id };
    const data = [app_id, zp_trans_id, amount, description, timestamp].join('|');
    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    params = Object.assign(params, { mac });

    return new Promise(resolve => {
      axios
        .post(url, null, { params })
        .then(res => resolve(res.data))
        .catch(error => {
          const { response = {} } = error;
          const { data = {} } = response;
          resolve(data);
        });
    });
  }

  public async getTransactionStatus(app_trans_id: string): Promise<any> {
    const self = this;
    const { base = '', app_id = '', key1 = '' } = self;
    const url: string = `${base}/query`;

    const data = [`${app_id}`, `${app_trans_id}`, `${key1}`].join('|');
    const mac = CryptoJS.HmacSHA256(data, key1).toString();

    const params = new URLSearchParams();
    params.append('app_id', app_id);
    params.append('app_trans_id', app_trans_id);
    params.append('mac', mac);

    console.log(params);

    return new Promise(resolve => {
      axios
        .post(url, params)
        .then(res => resolve(res.data))
        .catch(error => {
          const { response = {} } = error;
          const { data = {} } = response;
          resolve(data);
        });
    });
  }

  public handleCallback(requestBody: RequestBody): any {
    const self = this;
    const { key2 = '' } = self;
    const { data: dataStr, mac: reqMac } = requestBody;
    const mac = CryptoJS.HmacSHA256(dataStr, key2).toString();

    if (reqMac !== mac) return { code: -1, message: 'Invalid Mac' };

    try {
      const data = JSON.parse(dataStr);
      return { code: 1, message: 'success', data };
    } catch (error) {
      return { code: 0, message: error.message };
    }
  }

  public async createTransaction(transaction: TransactionV2): Promise<any> {
    const self = this;
    const { base = '' } = self;
    const url: string = `${base}/create`;
    const params = self.createTransactionParams(transaction);
    const { app_trans_id = '' } = params;

    return new Promise(resolve => {
      axios
        .post(url, null, { params })
        .then(res => {
          let { data = {} } = res;
          data = Object.assign(data, { app_trans_id });
          resolve(data);
        })
        .catch(error => {
          const { response = {} } = error;
          const { data = {} } = response;
          resolve(data);
        });
    });
  }

  private createTransactionParams(transaction: TransactionV2): any {
    const self = this;
    const { app_id = '', key1 = '', currency = '' } = self;
    const app_trans_id: string = `${moment().format('YYMMDD')}${self.generateOTP(8)}`;
    const app_time: number = Date.now();
    let {
      app_user = '',
      amount = 0,
      bank_code = '',
      description = '',
      /**
       * optional
       */
      callback_url = '',
      title = '',
      phone = '',
      email = '',
      address = ''
    } = transaction;

    const {
      item = '',
      order_type = '',
      embed_data = '',
      device_info = '',
      product_code = ''
    } = self.processTransactionData();

    let requestBody = {
      app_id,
      app_user,
      app_trans_id,
      app_time,
      amount,
      order_type,
      title,
      description,
      callback_url,
      device_info,
      item,
      embed_data,
      currency,
      product_code,
      bank_code,
      phone,
      email,
      address
    };

    const data = [app_id, app_trans_id, app_user, amount, app_time, embed_data, item].join('|');

    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    requestBody = Object.assign(requestBody, { mac });
    return requestBody;
  }

  private generateOTP(length = 4) {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  private processTransactionData(data: any = {}): any {
    const self = this;
    const { order_types = [], product_codes = [] } = self;
    let {
      items = [],
      order_type = '',
      product_code = '',
      redirecturl = '',
      zlppaymentid = '',
      campaigncode = '',
      columninfo = {},
      device_info = {}
    } = data;
    // item
    const item: string = JSON.stringify(items);
    // order_type
    order_type = order_type.toUpperCase();
    if (!order_types.includes(order_type)) order_type = 'GOODS';
    // product_code
    product_code = product_code.toUpperCase();
    if (!product_codes.includes(product_code)) product_code = '';
    // embed_data
    let embed_data: string | any = {};
    embed_data = redirecturl ? Object.assign(embed_data, { redirecturl }) : embed_data;
    embed_data = zlppaymentid ? Object.assign(embed_data, { zlppaymentid }) : embed_data;
    embed_data = campaigncode
      ? Object.assign(embed_data, { promotioninfo: JSON.stringify({ campaigncode }) })
      : embed_data;
    embed_data = columninfo
      ? Object.assign(embed_data, { columninfo: JSON.stringify(columninfo) })
      : embed_data;
    embed_data = JSON.stringify(embed_data);
    // device_info
    device_info = JSON.stringify(device_info);

    return { item, order_type, product_code, embed_data, device_info };
  }
}
