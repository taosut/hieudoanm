'use strict';

import * as qs from 'qs';
import * as sha256 from 'sha256';
import { v4 as uuidv4 } from 'uuid';

import { Configs, Order } from './interfaces';
import _configs from './configs';

export default class VNPay {
  private banks: Array<any> = _configs.banks;
  private categories: Array<any> = _configs.categories;
  private codes: any = _configs.codes;

  private payUrl: string = '';
  private testPayUrl: string = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

  private defaultParams: any = {};

  private secretKey: string;

  constructor(configs: Configs) {
    this.payUrl = configs.payUrl || this.testPayUrl;
    this.secretKey = configs.secretKey;

    this.defaultParams = {
      vnp_ReturnUrl: configs.returnUrl,
      vnp_TmnCode: configs.tmnCode,
      vnp_Version: '2.0.0',
      vnp_CurrCode: 'VND',
      vnp_Locale: 'vn'
    };
  }

  public getBanks(): Array<any> {
    return this.banks;
  }

  public getCategories(): Array<any> {
    return this.categories;
  }

  public createPaymentUrl(order: Order): string {
    const self = this;

    const { secretKey = '', payUrl = '' } = self;

    const command = 'pay';
    const createDate = self.now();
    const transactionRef = `${createDate}_${uuidv4()}`;
    const { description = '', type = '', amount = 0, ipAddr = '', bankCode = '' } = order;

    let vnp_Params = self.sortObject({
      ...self.defaultParams,
      vnp_Command: command,
      vnp_TxnRef: transactionRef,
      vnp_OrderInfo: description,
      vnp_OrderType: type,
      vnp_Amount: amount * 100,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      vnp_BankCode: bankCode
    });

    const signData = secretKey + qs.stringify(vnp_Params, { encode: false });
    const secureHash = sha256(signData);

    vnp_Params = Object.assign(vnp_Params, {
      vnp_SecureHashType: 'SHA256',
      vnp_SecureHash: secureHash
    });

    const queryParamsString = qs.stringify(vnp_Params, { encode: true });
    const paymentUrl = `${payUrl}?${queryParamsString}`;

    return paymentUrl;
  }

  public verifyReturnUrl(vnp_Params: any): any {
    const self = this;
    const { secretKey = '', codes = [] } = self;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = self.sortObject(vnp_Params);
    const signData: string = secretKey + qs.stringify(vnp_Params, { encode: false });
    const checkSum: string = sha256(signData);

    if (secureHash !== checkSum) return { message: 'Wrong Signature' };
    const responseCode: string = vnp_Params['vnp_ResponseCode'];
    const response: any = codes.find(code => code.code === responseCode) || {};
    const { message = 'Error' } = response;
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
