'use strict';

import * as qs from 'qs';
import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

import _configs from './configs';
import { Configs, Order } from './interfaces';

export default class OnePay {
  private codes: any = _configs.codes;

  private domesticUrl: string = 'https://mtf.onepay.vn/onecommpay/vpc.op';
  private internationalUrl: string = 'https://mtf.onepay.vn/vpcpay/vpcpay.op';

  private defaultParams: any = {};

  private secretKey: string;

  constructor(configs: Configs) {
    this.secretKey = configs.secretKey;

    this.defaultParams = {
      vpc_AccessCode: configs.accessCode,
      vpc_ReturnURL: configs.returnUrl,
      vpc_Merchant: configs.merchant,
      vpc_Locale: 'vn',
      vpc_Version: '2',
      vpc_Currency: 'VND',
      vpc_Command: 'pay'
    };
  }

  public createPaymentUrl(order: Order): string {
    const self = this;

    const { secretKey = '', domesticUrl = '', internationalUrl = '' } = self;

    const createDate = self.now();
    const transactionRef = `${createDate}_${uuidv4()}`;
    const { description = '', amount = 0, ipAddr = '', type = 'domestic' } = order;

    let payUrl = '';
    switch (type) {
      case 'domestic':
        payUrl = domesticUrl;
        break;
      case 'international':
        payUrl = internationalUrl;
        break;
      default:
        payUrl = domesticUrl;
    }

    let vpc_Params = self.sortObject({
      ...self.defaultParams,
      // Order
      vpc_MerchTxnRef: transactionRef,
      vpc_OrderInfo: description,
      vpc_Amount: amount * 100,
      vpc_TicketNo: ipAddr
    });

    const signData: string = qs.stringify(vpc_Params, { encode: false });
    const secureHash: string = CryptoJS.HmacSHA256(signData, secretKey).toString().toUpperCase();

    vpc_Params = Object.assign(vpc_Params, { vpc_SecureHash: secureHash });

    const queryParamsString = qs.stringify(vpc_Params, { encode: true });
    const paymentUrl = `${payUrl}?${queryParamsString}`;
    return paymentUrl;
  }

  public verifyReturnUrl(vpc_params: any): any {
    const self = this;
    const { secretKey = '', codes = [] } = self;
    const secureHash = vpc_params['vpc_SecureHash'];

    delete vpc_params['vpc_SecureHash'];

    vpc_params = self.sortObject(vpc_params);
    const signData = qs.stringify(vpc_params, { encode: false });
    const checkSum: string = CryptoJS.HmacSHA256(signData, secretKey).toString().toUpperCase();

    if (secureHash !== checkSum) return { message: 'Wrong Signature' };

    let responseCode: string = vpc_params['vpc_TxnResponseCode'] || '';
    const response: any = codes.find(code => code.code.toString() === responseCode) || {};
    const { vn: message = 'Error' } = response;
    return { message };
  }

  private addZero(i: number = 0): string {
    return i > 9 ? `${i}` : `0${i}`;
  }

  private now(): string {
    const self = this;
    const d = new Date();
    const yyyy = d.getFullYear();
    const MM = `${self.addZero(d.getMonth() + 1)}`;
    const dd = `${self.addZero(d.getDate())}`;

    const hh = `${self.addZero(d.getHours())}`;
    const mm = `${self.addZero(d.getMinutes())}`;
    const ss = `${self.addZero(d.getSeconds())}`;

    return `${yyyy}${MM}${dd}${hh}${mm}${ss}`;
  }

  private sortObject(o: any): any {
    const sorted = {};
    const keys = [];

    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    keys.sort();

    for (const key of keys) {
      sorted[key] = o[key];
    }

    return sorted;
  }
}
