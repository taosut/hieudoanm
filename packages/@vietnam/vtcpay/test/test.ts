'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import VTCPay from '../src/';

describe('VTCPay', () => {
  const configs = {
    website_id: '182356',
    url_return: 'https://example.com/',
    secret_key: 'TestTest1234#1234',
    receiver_account: '0357758300',
    test: true
  };

  it('get banks', async () => {
    const vtcpay = new VTCPay(configs);
    const banks = vtcpay.getBanks();
    console.log(banks);
    assert.ok(typeof banks === 'object');
  });

  it('get countries', async () => {
    const vtcpay = new VTCPay(configs);
    const countries = vtcpay.getCountries();
    console.log(countries);
    assert.ok(typeof countries === 'object');
  });

  it('create payment url', async () => {
    const vtcpay = new VTCPay(configs);
    const order = {
      amount: 1000,
      address: 'test_address',
      city: 'test_city',
      email: 'test@gmail.com',
      first_name: 'test_first_name',
      phone: '0123456789',
      family_name: 'test_family_name',
      country: 'VN',
      payment_type: 'VTCPay',
      postcode: 100000,
      state: ''
    };
    const url: string = vtcpay.createPaymentUrl(order);
    console.log(url);
    assert.ok(typeof url === 'string');
  });
});
