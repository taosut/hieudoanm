'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import OnePay from '../src/';

describe('OnePay', () => {
  const configs = {
    accessCode: 'D67342C2',
    merchant: 'ONEPAY',
    secretKey: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
    returnUrl: 'http://vn-payments-demo.now.sh/payment/onepaydom/callback'
  };

  it('create payment url', async () => {
    const onePay = new OnePay(configs);
    const order = { description: `test`, amount: 1000, ipAddr: '127.0.0.1', type: 'domestic' };
    const url: string = onePay.createPaymentUrl(order);
    console.log(url);
    assert.ok(typeof url === 'string');
  });
});
