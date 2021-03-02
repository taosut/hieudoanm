'use strict';

import * as assert from 'assert';
import { describe, it } from 'mocha';

import ZaloPay from '../src';

describe('ZaloPay', () => {
  it('banks', async () => {
    const configs = {
      app_id: '553',
      key1: '9phuAOYhan4urywHTh0ndEXiV3pKHr5Q',
      key2: 'Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3',
      test: true
    };
    const zaloPay = new ZaloPay(configs);
    const banks: any = await zaloPay.getListMerchantBanks();
    assert.ok(typeof banks === 'object');
  });

  it('common apis', async () => {
    const configs = {
      app_id: '2553',
      key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
      key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
      test: true
    };

    const items = [
      {
        itemid: 'knb',
        itemname: 'kim nguyen bao',
        itemprice: 198400,
        itemquantity: 1
      }
    ];

    const zaloPay = new ZaloPay(configs);
    const transaction = {
      app_user: 'demo',
      items,
      amount: 50000,
      description: 'ZaloPay Integration Demo',
      bank_code: 'zalopayapp'
    };
    const data = await zaloPay.createTransaction(transaction);
    const app_trans_id = '20082271598012';
    console.log(data);
    const status = await zaloPay.getTransactionStatus(app_trans_id);
    console.log(status);
    const refund = await zaloPay.refund('190508000000022', 50000, 'test');
    console.log(refund);
    const { refund_id } = refund;
    const refundStatus = await zaloPay.getRefundStatus(refund_id);
    console.log(refundStatus);
    assert.ok(typeof data === 'object');
  });
});
