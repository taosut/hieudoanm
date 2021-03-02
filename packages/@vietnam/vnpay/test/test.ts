'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import VNPay from '../src';

describe('VNPay', () => {
  const configs = {
    tmnCode: '1SNJ89L8',
    secretKey: 'ODJLXOCEWMFIEJXHJNMZUVFFVRDDXLOT',
    returnUrl: 'http://localhost:8888/order/vnpay_return'
  };

  it('get banks', async () => {
    const vnpay = new VNPay(configs);
    const banks = vnpay.getBanks();
    console.log(banks);
    assert.ok(typeof banks === 'object');
  });

  it('get categories', async () => {
    const vnpay = new VNPay(configs);
    const categories = vnpay.getCategories();
    console.log(categories);
    assert.ok(typeof categories === 'object');
  });

  it('create payment url', async () => {
    const vnpay = new VNPay(configs);
    const order = {
      description: 'Test',
      type: 'test',
      amount: 1000,
      ipAddr: '127.0.0.1',
      bankCode: 'NCB'
    };
    const url: string = vnpay.createPaymentUrl(order);
    console.log(url);
    assert.ok(typeof url === 'string');
  });
});
