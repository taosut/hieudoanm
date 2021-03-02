'use strict';

import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { v1 as uuid } from 'uuid';

import { ConfigsV1, TransactionV1, RequestBody } from './interfaces';

export default class V1 {
  private base: string = '';
  private test: boolean = false;

  private appid: string = '';
  private key1: string = '';
  private key2: string = '';

  constructor(configs: ConfigsV1) {
    this.appid = configs.appid;
    this.key1 = configs.key1;
    this.key2 = configs.key2;

    const { test = false } = configs;
    const testBase: string = 'https://sandbox.zalopay.com.vn/v001';
    const prodBase: string = 'https://zalopay.com.vn/v001';
    this.test = test;
    this.base = test ? testBase : prodBase;
  }

  public async getListMerchantBanks() {
    const self = this;
    const { test = false, appid = '', key1 = '' } = self;
    const testBase: string = 'https://sbgateway.zalopay.vn/api/getlistmerchantbanks';
    const prodBase: string = 'https://gateway.zalopay.vn/api/getlistmerchantbanks';
    const url: string = test ? testBase : prodBase;

    const reqtime = Date.now();
    let params = { appid, reqtime };
    const data = [appid, reqtime].join('|');
    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    params = Object.assign(params, { mac });

    return new Promise(resolve => {
      axios
        .get(url, { params })
        .then(res => resolve(res.data))
        .catch(error => resolve(error));
    });
  }

  public async getRefundStatus(mrefundid: string): Promise<any> {
    const self = this;
    const { base = '', appid = '', key1 = '' } = self;
    const url: string = `${base}/tpe/getpartialrefundstatus`;
    const timestamp = Date.now();
    let params = { appid, timestamp, mrefundid };

    const data = [appid, mrefundid, timestamp].join('|');
    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    params = Object.assign(params, { mac });

    return new Promise(resolve => {
      axios
        .get(url, { params })
        .then(res => resolve(res.data))
        .catch(error => resolve(error));
    });
  }

  public async refund(
    zptransid: string,
    amount: number = 0,
    description: string = ''
  ): Promise<any> {
    const self = this;
    const { base = '', appid = '', key1 = '' } = self;
    const url: string = `${base}/tpe/partialrefund`;

    const timestamp = Date.now();
    const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`; // unique id
    const mrefundid = `${moment().format('YYMMDD')}_${appid}_${uid}`;

    let params = { appid, mrefundid, timestamp, zptransid, amount, description };
    const data = [appid, zptransid, amount, description, timestamp].join('|');
    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    params = Object.assign(params, { mac });

    return new Promise(resolve => {
      axios
        .post(url, null, { params })
        .then(res => resolve(res.data))
        .catch(error => resolve(error));
    });
  }

  public async getTransactionStatus(apptransid: string): Promise<any> {
    const self = this;
    const { base = '', appid = '' } = self;
    const url: string = `${base}/tpe/getstatusbyapptransid`;

    return new Promise(resolve => {
      axios
        .get(url, { params: { appid, apptransid } })
        .then(res => resolve(res.data))
        .catch(error => resolve(error));
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

  public async createTransaction(transaction: TransactionV1): Promise<any> {
    const self = this;
    const { base = '' } = self;
    const url: string = `${base}/tpe/createorder`;
    const params = self.createRequestBody(transaction);

    return new Promise(resolve => {
      axios
        .post(url, null, { params })
        .then(res => resolve(res.data))
        .catch(error => resolve(error));
    });
  }

  private createRequestBody(transaction: TransactionV1): any {
    const self = this;
    const { appid = '', key1 = '' } = self;
    const apptransid: string = `${moment().format('YYMMDD')}_${uuid()}`;
    const apptime: number = Date.now();
    let {
      appuser = '',
      amount = 0,
      embeddata = {},
      items = [],
      bankcode = '',
      description = '',
      phone = '',
      email = '',
      address = ''
    } = transaction;
    embeddata = JSON.stringify(embeddata);
    const item = JSON.stringify(items);

    let requestBody = {
      amount,
      appid,
      appuser,
      apptime,
      apptransid,
      embeddata,
      item,
      bankcode,
      description,
      phone,
      email,
      address
    };

    const data = [
      `${appid}`,
      `${apptransid}`,
      `${appuser}`,
      `${amount}`,
      `${apptime}`,
      `${embeddata}`,
      `${item}`
    ].join('|');

    const mac: string = CryptoJS.HmacSHA256(data, key1).toString();
    requestBody = Object.assign(requestBody, { mac });
    return requestBody;
  }
}
