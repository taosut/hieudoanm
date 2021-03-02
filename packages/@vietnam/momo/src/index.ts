'use strict';

import fetch from 'node-fetch';
import * as CryptoJS from 'crypto-js';

import { Configs, Order } from './interfaces';
import _configs from './configs';

export default class Momo {
  private base: string = '';

  private codes: Array<any> = _configs.codes;

  private partnerCode: string = '';
  private accessKey: string = '';
  private secretKey: string = '';
  private publicKey: string = '';
  private notifyUrl: string = '';
  private returnUrl: string = '';

  private requestType: string = 'captureMoMoWallet';

  constructor(configs: Configs) {
    const {
      partnerCode = '',
      accessKey = '',
      secretKey = '',
      publicKey = '',
      notifyUrl = '',
      returnUrl = '',
      test = true
    } = configs;

    this.partnerCode = partnerCode;
    this.accessKey = accessKey;
    this.publicKey = publicKey;
    this.secretKey = secretKey;
    this.publicKey = publicKey;
    this.notifyUrl = notifyUrl;
    this.returnUrl = returnUrl;

    const production: string = 'https://payment.momo.vn';
    const sandbox: string = 'https://test-payment.momo.vn';
    const base = test ? sandbox : production;
    this.base = `${base}/gw_payment/transactionProcessor`;
  }

  public async transactionProcessor(order: Order): Promise<any> {
    const self = this;
    const { base = '' } = self;
    const requestBody = self.createRequestBody(order);
    console.log(base, requestBody);

    return new Promise(resolve => {
      fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(requestBody)
      })
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve(error);
        });
    });
  }

  private createRequestBody(order: Order): any {
    const self = this;
    const {
      partnerCode = '',
      accessKey = '',
      notifyUrl = '',
      secretKey = '',
      returnUrl = '',
      requestType
    } = self;
    let { orderId = '', amount = 1000, orderInfo = '', requestId = '', extraData = '' } = order;
    const _amount = amount.toString();
    extraData = self.convertObjectToQueryString(extraData);

    let requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount: _amount,
      orderId,
      orderInfo,
      returnUrl,
      notifyUrl,
      extraData
    };

    const signData = self.convertObjectToQueryString(requestBody);
    const signature: string = CryptoJS.HmacSHA256(signData, secretKey).toString();

    requestBody = Object.assign(requestBody, { requestType, signature });

    return requestBody;
  }

  private convertObjectToQueryString(o: any): string {
    const keys = Object.keys(o);
    return keys
      .map(key => {
        const value: string = o[key].toString();
        return `${key}=${value}`;
      })
      .join('&');
  }
}
