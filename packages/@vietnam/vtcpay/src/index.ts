'use strict';

import * as qs from 'qs';
import { v4 as uuidv4 } from 'uuid';
import * as CryptoJS from 'crypto-js';

import _configs from './configs';
import { Configs, Order } from './interfaces';

export default class VTCPay {
  private banks: Array<any> = _configs.banks;
  private codes: Array<any> = _configs.codes;
  private countries: Array<any> = _configs.countries;

  private currency: string = 'VND';
  private language: string = 'vi';
  private transaction_type: string = 'sale';
  private payment_types = ['VTCPay', 'DomesticBank', 'InternationalCard'];

  private website_id: string | number = '';
  private url_return: string = '';
  private secret_key: string = '';
  private receiver_account: string = '';
  private test: boolean = false;

  private checkout_url: string = '';

  constructor(configs: Configs) {
    this.website_id = configs.website_id;
    this.secret_key = configs.secret_key;
    this.url_return = configs.url_return;
    this.receiver_account = configs.receiver_account;

    const { test = false } = configs;
    this.test = configs.test;

    const test_checkout_url = 'http://alpha1.vtcpay.vn/portalgateway/checkout.html';
    const live_checkout_url = 'https://vtcpay.vn/bank-gateway/checkout.html';
    this.checkout_url = test ? test_checkout_url : live_checkout_url;
  }

  public getBanks(): any {
    return this.banks;
  }

  public getCountries(): any {
    return this.countries;
  }

  public createPaymentUrl(order: Order): string {
    const self = this;

    const {
      currency = '',
      language = '',
      transaction_type = '',
      website_id = '',
      secret_key = '',
      url_return = '',
      receiver_account = '',
      payment_types = [],
      test = false
    } = self;

    let {
      amount = 0,
      address: bill_to_address = 'n/a',
      city: bill_to_address_city = 'n/a',
      email: bill_to_email = 'n/a',
      first_name: bill_to_forename = 'n/a',
      phone: bill_to_phone = 'n/a',
      family_name: bill_to_surname = 'n/a',
      country = 'n/a',
      payment_type = payment_types[0],
      postcode = 'n/a'
    } = order;
    if (!payment_types.includes(payment_type)) payment_type = payment_types[0];

    const createDate = self.now();
    const reference_number = `${createDate}_${uuidv4()}`;

    let vtcPayParams = self.sortObject({
      amount,
      bill_to_address,
      bill_to_address_city,
      bill_to_email,
      bill_to_forename,
      bill_to_phone,
      bill_to_surname,
      country,
      currency,
      language,
      payment_type,
      postcode,
      receiver_account,
      reference_number,
      transaction_type,
      url_return,
      website_id
    });

    vtcPayParams = Object.assign(vtcPayParams, { secret_key });
    const signData = Object.keys(vtcPayParams)
      .map(key => vtcPayParams[key] || '')
      .join('|');
    console.log(signData);

    let signature: string = CryptoJS.SHA256(signData).toString();
    signature = test ? signature : signature.toUpperCase();

    delete vtcPayParams.secret_key;
    vtcPayParams = Object.assign(vtcPayParams, { signature });

    const queryParamsString = qs.stringify(vtcPayParams, { encode: true });
    const paymentUrl = `${self.checkout_url}?${queryParamsString}`;
    return paymentUrl;
  }

  public verifyReturnUrl(data: any): any {
    const self = this;
    const { secret_key, codes = [], test } = self;
    const {
      amount = 0,
      message = '',
      payment_type = '',
      reference_number = '',
      status = '',
      trans_ref_no = '',
      website_id = '',
      signature
    } = data;

    const vtcPayParams = {
      amount,
      message,
      payment_type,
      reference_number,
      status,
      trans_ref_no,
      website_id,
      secret_key
    };

    const signData = Object.keys(vtcPayParams)
      .map(key => vtcPayParams[key] || '')
      .join('|');
    let checkSum: string = CryptoJS.SHA256(signData).toString();
    checkSum = test ? checkSum : checkSum.toUpperCase();

    if (signature !== checkSum) return { message: 'Wrong Signature' };
    return codes.find(code => code.code === status) || {};
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
